
const TEST_ITEMS = [
  {
    priceId: 'NEXT_PUBLIC_STRIPE_BOOK_PRICE_ID',
    quantity: 1,
    name: 'Faithful Saints of Christ',
    productId: '1'
  }
];

async function testServerFallback() {
  console.log("--- Testing Server-Side Shipping Fallback ---");
  
  // We send a request WITHOUT the shipping object
  try {
    const response = await fetch('http://localhost:8080/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: TEST_ITEMS }) // No shipping field
    });

    const data = await response.json();
    console.log(`Status: ${response.status}`);
    
    if (data.url) {
       console.log("✅ SUCCESS: Checkout session created even without frontend shipping.");
       console.log("Next Step: Verify that a shipping line item exists in the Stripe session (manual check or log audit).");
    } else {
       console.log("❌ FAILURE:", data.error);
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
}

testServerFallback();
