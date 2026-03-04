import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

// Helper to convert data to ShipStation XML
function objectToXml(sessions: any[]): string {
  let xml = '<?xml version="1.0" encoding="utf-8"?>\n<Orders>';
  
  sessions.forEach(session => {
    const address = session.shipping_details?.address || session.customer_details?.address;
    const createdAt = new Date(session.created * 1000).toISOString();
    
    xml += `\n  <Order>
    <OrderID><![CDATA[${session.id}]]></OrderID>
    <OrderNumber><![CDATA[FCAO-${session.id.slice(-5).toUpperCase()}]]></OrderNumber>
    <OrderDate>${createdAt}</OrderDate>
    <OrderStatus><![CDATA[awaiting_shipment]]></OrderStatus>
    <CustomerEmail><![CDATA[${session.customer_details?.email || ''}]]></CustomerEmail>
    <CustomerName><![CDATA[${session.customer_details?.name || 'Guest Customer'}]]></CustomerName>
    <Recipient>
      <Name><![CDATA[${session.customer_details?.name || 'Guest Customer'}]]></Name>
      <Address1><![CDATA[${address?.line1 || ''}]]></Address1>
      <Address2><![CDATA[${address?.line2 || ''}]]></Address2>
      <City><![CDATA[${address?.city || ''}]]></City>
      <State><![CDATA[${address?.state || ''}]]></State>
      <PostalCode><![CDATA[${address?.postal_code || ''}]]></PostalCode>
      <Country><![CDATA[${address?.country || 'US'}]]></Country>
    </Recipient>
    <Items>`;
    
    // Extract items from metadata (we saved as item_1_name, item_1_qty, item_1_sku etc)
    const metadata = session.metadata || {};
    let i = 1;
    while (metadata[`item_${i}_name`]) {
      xml += `
      <Item>
        <SKU><![CDATA[${metadata[`item_${i}_sku`]}]]></SKU>
        <Name><![CDATA[${metadata[`item_${i}_name`]}]]></Name>
        <Quantity>${metadata[`item_${i}_qty`]}</Quantity>
        <UnitPrice>0.00</UnitPrice> 
      </Item>`;
      i++;
    }
    
    xml += `
    </Items>
  </Order>`;
  });
  
  xml += '\n</Orders>';
  return xml;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  // Basic Auth Check
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Basic ${Buffer.from(`${process.env.SHIPSTATION_USER}:${process.env.SHIPSTATION_PASS}`).toString('base64')}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (action === 'export') {
    try {
      // Fetch the 50 most recent successful checkout sessions from Stripe
      const sessions = await stripe.checkout.sessions.list({
        limit: 50,
        status: 'complete'
      });

      // Filter or sort can be done here if needed (e.g. by date range from ShipStation)
      const xml = objectToXml(sessions.data);
      
      return new Response(xml, {
        headers: {
          'Content-Type': 'text/xml'
        }
      });
    } catch (err) {
      console.error("Stripe fetch for ShipStation failed:", err);
      return new Response('Error', { status: 500 });
    }
  }

  return NextResponse.json({ status: 'ready' });
}

export async function POST(request: Request) {
  // Post notifications from ShipStation (Tracking updates)
  // Since we have no database, we can log these or update Stripe metadata
  return new Response('OK', { status: 200 });
}
