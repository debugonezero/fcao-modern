import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});



export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const adminEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'info@firstchristiansallianceoutreach.org';
    const customerEmail = session.customer_details?.email;

    console.log(`Processing successful checkout for session: ${session.id}`);

    // Skip Database and Shippo for now (Vercel uses Stripe as source of truth via Live Proxy)
    // We can add a cloud DB like Supabase later if persistent records outside Stripe are needed.

    // 2. Send Emails
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("Resend API key missing. Email simulated.");
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        if (customerEmail) {
          await resend.emails.send({
            from: 'FCAO Store <orders@firstchristiansallianceoutreach.org>',
            to: customerEmail,
            subject: 'Order Confirmation - First Christians Alliance Outreach',
            html: `<h1>Thank you for your order!</h1><p>We have received your payment for ${session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'} ${session.currency?.toUpperCase()}.</p><p>We will process your shipment shortly.</p>`
          });
        }

        await resend.emails.send({
          from: 'FCAO System <system@firstchristiansallianceoutreach.org>',
          to: adminEmail,
          subject: 'New Store Order Received!',
          html: `<h1>New Order Received</h1><p>Customer: ${session.customer_details?.name}</p><p>Email: ${customerEmail}</p><p>Amount: ${(session.amount_total || 0) / 100} ${session.currency}</p>`
        });
      }
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
