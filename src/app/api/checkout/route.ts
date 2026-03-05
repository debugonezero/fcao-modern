import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe (will throw an error if key is completely missing in prod, but we fall back gracefully for the prototype)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2026-02-25.clover', // Update to latest supported type if needed (Next.js server environments)
});

export async function POST(request: Request) {
  try {
    const { items, mode = 'payment', shipping } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe API key is missing. Simulation mode.' }, { status: 200 });
    }

    // Determine the host for success/cancel redirects
    const origin = request.headers.get('origin') || 'http://localhost:8080';

    // Construct line items and metadata
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const metadata: Record<string, string> = {
      order_source: 'Website Cart'
    };

    items.forEach((item: any, index: number) => {
      if (item.isCustomAmount) {
        // Handle Donations or Custom Amounts using price_data
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name || 'Donation',
            },
            unit_amount: (item.amount || 0) * 100, // Convert to cents
            ...(mode === 'subscription' && {
              recurring: { interval: 'month' }
            })
          },
          quantity: 1,
        });
      } else {
        // Resolve priceId if it's a placeholder
        const resolvedPriceId = process.env[item.priceId] || item.priceId;
        
        line_items.push({
          price: resolvedPriceId,
          quantity: item.quantity || 1,
        });
      }

      // Add to metadata (Stripe allows 50 keys, we use index prefixed)
      metadata[`item_${index + 1}_name`] = item.name || 'Item';
      metadata[`item_${index + 1}_qty`] = (item.quantity || 1).toString();
      metadata[`item_${index + 1}_sku`] = (item.productId || 'N/A').toString();
    });

    // Add Shipping as a line item if provided
    let shippingFee = shipping;

    // Check if we have any "shippable" items (non-donations)
    const hasShippableItems = items.some((item: any) => !item.isCustomAmount);

    // Skip shipping calculation if all items are donations
    if (!hasShippableItems) {
      shippingFee = null;
    } 
    // Server-side fallback: If shippable items exist but no shipping was provided by the UI, 
    // calculate a baseline Standard fee locally.
    else if (!shippingFee || shippingFee.cost <= 0) {
      console.warn("Checkout received without shipping fee. Calculating server-side fallback.");
      try {
        const { calculateSmartRates } = await import('@/lib/shipping');
        const { getProductWeight } = await import('@/lib/products');
        
        let totalWeight = 0;
        for (const item of items) {
          const shippingInfo = getProductWeight(item.productId);
          const weightStr = shippingInfo?.weight || "1.4 lbs";
          const weightValue = parseFloat(weightStr.replace(/[^\d.]/g, ''));
          totalWeight += (weightValue * item.quantity);
        }
        
        const rates = calculateSmartRates(totalWeight);
        shippingFee = {
          name: rates[0].name + " (Auto-applied)",
          cost: rates[0].cost
        };
      } catch (err) {
        console.error("Server-side shipping fallback calculation failed:", err);
        // Absolute safety fallback: Minimum $7.45
        shippingFee = { name: "Standard Shipping (Safe Default)", cost: 745 };
      }
    }

    if (shippingFee && shippingFee.cost > 0) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping: ${shippingFee.name || 'Standard'}`,
          },
          unit_amount: shippingFee.cost,
        },
        quantity: 1,
      });
      metadata['shipping_method'] = shippingFee.name || 'Standard';
      metadata['shipping_cost'] = shippingFee.cost.toString();
    }

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/cart?canceled=true`,
      line_items,
      metadata,
      shipping_address_collection: {
         allowed_countries: ['US', 'CA', 'GB', 'AM'],
      },
      automatic_tax: { enabled: true },
      customer_creation: 'always',
      customer_update: {
        address: 'auto',
        shipping: 'auto',
      },
      billing_address_collection: 'required',
    };

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionPayload);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
