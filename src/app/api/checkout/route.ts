import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe (will throw an error if key is completely missing in prod, but we fall back gracefully for the prototype)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-02-25.clover', // Update to latest supported type if needed (Next.js server environments)
});

export async function POST(request: Request) {
  try {
    const { priceId, quantity = 1, mode = 'payment', amount, isCustomAmount } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe API key is missing. Simulation mode.' }, { status: 200 });
    }

    // Determine the host for success/cancel redirects
    const origin = request.headers.get('origin') || 'http://localhost:8080';

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode, // 'payment' or 'subscription'
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/shop?canceled=true`,
      line_items: []
    };

    // Handle Custom Donation amounts vs Fixed Product Prices
    if (isCustomAmount && amount) {
      sessionPayload.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom FCAO Donation',
            },
            unit_amount: Math.round(amount * 100), // Stripe expects cents
          },
          quantity: 1,
        }
      ];
    } else if (priceId) {
      sessionPayload.line_items = [
        {
          price: priceId,
          quantity: quantity,
        }
      ];
    } else {
      return NextResponse.json({ error: 'Missing priceId or custom amount' }, { status: 400 });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionPayload);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
