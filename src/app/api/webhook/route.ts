import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { createShippoOrder } from '@/lib/shippo';

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
    const adminEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'info@Firstchristiansalliance.org';
    const customerEmail = session.customer_details?.email;

    console.log(`Processing successful checkout for session: ${session.id}`);

    // 1. Sync to Shippo
    try {
      const address = (session as any).shipping_details?.address || session.customer_details?.address;
      
      const orderData = {
        id: session.id,
        customer_email: customerEmail || '',
        customer_name: session.customer_details?.name || 'Guest',
        shipping_address: {
          line1: address?.line1 || '',
          line2: address?.line2 || '',
          city: address?.city || '',
          state: address?.state || '',
          postal_code: address?.postal_code || '',
          country: address?.country || 'US'
        },
        items: [], // Line items should ideally be fetched or passed via metadata
        total_amount: session.amount_total || 0,
        shipping_cost: session.shipping_cost?.amount_total || 0,
        shipping_method: 'Standard',
        status: 'paid',
        created_at: new Date()
      };

      // Extract items from metadata if we saved them (api/checkout/route.ts saves them)
      const metadata = session.metadata || {};
      const items: any[] = [];
      let i = 1;
      while (metadata[`item_${i}_name`]) {
        items.push({
          product_id: metadata[`item_${i}_sku`] || `item_${i}`,
          product_name: metadata[`item_${i}_name`],
          quantity: parseInt(metadata[`item_${i}_qty`] || '1'),
          unit_price: parseInt(metadata[`item_${i}_price`] || '0')
        });
        i++;
      }
      (orderData as any).items = items;

      await createShippoOrder(orderData as any);
    } catch (shippoErr) {
      console.error("Shippo sync failed:", shippoErr);
    }

    // 2. Send Emails
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("Resend API key missing. Email simulated.");
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        if (customerEmail) {
          await resend.emails.send({
            from: 'FCAO Store <orders@Firstchristiansalliance.org>',
            to: customerEmail,
            subject: 'Order Confirmation - First Christians Alliance Outreach',
            html: `<h1>Thank you for your order!</h1><p>We have received your payment for ${session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'} ${session.currency?.toUpperCase()}.</p><p>We will process your shipment shortly.</p>`
          });
        }

        await resend.emails.send({
          from: 'FCAO System <system@Firstchristiansalliance.org>',
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
