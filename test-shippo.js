require('dotenv').config();

const SHIPPO_TOKEN = process.env.SHIPPO_API_KEY;

if (!SHIPPO_TOKEN) {
  console.error("❌ SHIPPO_API_KEY not found in .env");
  process.exit(1);
}

console.log(`Checking Shippo API key: ${SHIPPO_TOKEN.substring(0, 12)}...`);

async function verifyShippo() {
  try {
    const response = await fetch('https://api.goshippo.com/carriers/', {
      headers: {
        'Authorization': `ShippoToken ${SHIPPO_TOKEN}`
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Shippo API Key is VALID!");
      console.log(`Found ${data.results ? data.results.length : 0} carriers.`);
    } else {
      const text = await response.text();
      console.log("❌ Shippo API Key is INVALID!");
      console.log("Raw Response:", text);
    }
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  }
}

verifyShippo();
