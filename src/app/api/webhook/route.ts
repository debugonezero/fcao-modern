import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1. Save to Database for ShipStation
    try {
      const { saveOrder } = await import('@/lib/db');
      type Order = import('@/lib/db').Order;
      
      // Use any to avoid strict type mismatch on dynamic Stripe sessions
      const sessionAny = session as any;
      const address = sessionAny.shipping_details?.address || session.customer_details?.address;
      
      const orderData: Order = {
        id: `FCAO-${Date.now()}-${session.id.slice(-5)}`.toUpperCase(),
        stripe_session_id: session.id,
        customer_email: customerEmail || '',
        customer_name: session.customer_details?.name || 'Guest Customer',
        shipping_address: {
          line1: address?.line1 || 'No Address Provided',
          line2: address?.line2 || '',
          city: address?.city || '',
          state: address?.state || '',
          postal_code: address?.postal_code || '',
          country: address?.country || 'US'
        },
        total_amount: session.amount_total || 0,
        currency: session.currency || 'usd',
        status: 'pending',
        created_at: new Date().toISOString(),
        items: []
      };

      // Extract items and shipping from metadata
      const metadata = session.metadata || {};
      const items: any[] = [];
      
      // Look for item_1_name, item_1_qty, item_1_sku etc
      let i = 1;
      while (metadata[`item_${i}_name`]) {
        items.push({
          product_id: metadata[`item_${i}_sku`],
          product_name: metadata[`item_${i}_name`],
          quantity: parseInt(metadata[`item_${i}_qty`] || "1"),
          unit_price: 0, // We could calculate this from total/qty if needed
          stripe_price_id: "" 
        });
        i++;
      }

      orderData.items = items;
      orderData.shipping_method = metadata['shipping_method'] || 'Standard';
      orderData.shipping_cost = parseInt(metadata['shipping_cost'] || "0");

      saveOrder(orderData);
      console.log(`Order ${orderData.id} persisted to database.`);

      // 2. Push to Shippo
      const { createShippoOrder } = await import('@/lib/shippo');
      const shippoResult = await createShippoOrder(orderData);
      
      if (shippoResult.success) {
        console.log(`Shippo Sync Successful: ${shippoResult.shippoId}`);
      }
    } catch (dbErr) {
      console.error("Failed to save order or sync to Shippo:", dbErr);
    }

    // 2. Send Emails
    try {
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
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
