
import { Order, OrderItem } from './db';

/**
 * Shippo Integration Library
 * Handles sending orders to Shippo for fulfillment.
 */

export const createShippoOrder = async (orderData: Order) => {
  const SHIPPO_TOKEN = process.env.SHIPPO_API_KEY;

  if (!SHIPPO_TOKEN) {
    console.error("SHIPPO_API_KEY missing in .env. Order not synced to Shippo.");
    return { success: false, error: "Missing API Key" };
  }

  console.log(`Pushing Order ${orderData.id} to Shippo...`);

  try {
    const response = await fetch('https://api.goshippo.com/orders/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${SHIPPO_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to_address: {
          city: orderData.shipping_address.city,
          company: "",
          country: orderData.shipping_address.country,
          email: orderData.customer_email,
          name: orderData.customer_name,
          phone: "",
          state: orderData.shipping_address.state,
          street1: orderData.shipping_address.line1,
          street2: orderData.shipping_address.line2 || "",
          zip: orderData.shipping_address.postal_code
        },
        from_address: {
          city: "Glendale",
          company: "FCAO",
          country: "US",
          email: "info@Firstchristiansalliance.org",
          name: "Armen Simonian",
          phone: "",
          state: "CA",
          street1: "123 Main St", // Update with real address
          zip: "91205"
        },
        line_items: orderData.items.map((item: OrderItem) => ({
          quantity: item.quantity,
          sku: item.product_id,
          title: item.product_name,
          total_price: (item.unit_price / 100).toString(),
          currency: "USD",
          weight: "1.4", // Default to book weight or lookup
          weight_unit: "lb"
        })),
        placed_at: new Date().toISOString(),
        order_number: orderData.id,
        order_status: "PAID",
        shipping_cost: ((orderData.shipping_cost || 0) / 100).toString(),
        shipping_cost_currency: "USD",
        shipping_method: orderData.shipping_method,
        subtotal_price: ((orderData.total_amount - (orderData.shipping_cost || 0)) / 100).toString(),
        total_price: (orderData.total_amount / 100).toString(),
        total_tax: "0.00",
        currency: "USD"
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Order synced to Shippo: ${data.object_id}`);
      return { success: true, shippoId: data.object_id };
    } else {
      console.error("❌ Shippo Sync Failed:", data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error("Shippo Connection Error:", err);
    return { success: false, error: err };
  }
};
