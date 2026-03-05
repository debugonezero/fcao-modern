import { Order, OrderItem } from './db';
import { getProductWeight } from './products';

/**
 * Shippo Integration Library
 * Handles sending orders to Shippo for fulfillment.
 */

// Helper to parse weight strings (e.g., "1.4 lbs" or "20 oz") to pounds
const parseWeightToLbs = (weightStr: string): number => {
  if (!weightStr) return 0;
  const value = parseFloat(weightStr.replace(/[^\d.]/g, ''));
  if (weightStr.toLowerCase().includes('oz')) return value / 16;
  return value;
};

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
          company: "First Christians Alliance Outreach",
          country: "US",
          email: "info@Firstchristiansalliance.org",
          name: "Armen Simonian",
          phone: "855-333-3547",
          state: "CA",
          street1: "123 Main St", 
          zip: "91205"
        },
        line_items: orderData.items.map((item: any) => {
          const shippingInfo = getProductWeight(item.product_id);
          const itemWeight = parseWeightToLbs(shippingInfo?.weight || "0.5 lb");
          
          return {
            quantity: item.quantity,
            sku: item.product_id,
            title: item.product_name,
            unit_price: (item.unit_price / 100).toString(),
            total_price: ((item.unit_price * item.quantity) / 100).toFixed(2),
            currency: "USD",
            weight: itemWeight.toString(),
            weight_unit: "lb"
          };
        }),
        // Total weight = (Item Weights + Packaging Weights)
        weight: orderData.items.reduce((acc: number, item: any) => {
          const info = getProductWeight(item.product_id);
          const iW = parseWeightToLbs(info?.weight || "0.5 lb");
          const pW = parseWeightToLbs(info?.packagingWeight || "0 oz");
          return acc + ((iW + pW) * item.quantity);
        }, 0).toFixed(2),
        weight_unit: "lb",
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
