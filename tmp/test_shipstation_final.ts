
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.SHIPSTATION_API_KEY;
const apiSecret = process.env.SHIPSTATION_API_SECRET;
const authKey = process.env.SHIPSTATION_AUTH_KEY;

async function runExhaustiveTests() {
  console.log("Testing credentials against ShipStation API...");

  const testConfigs = [
    { name: "Woo Consumer Key:Secret -> Basic Auth (V2)", url: 'https://ssapi.shipstation.com/v2/rates', key: apiKey, secret: apiSecret },
    { name: "Woo Consumer Key:Secret -> Basic Auth (V1)", url: 'https://ssapi.shipstation.com/rates', key: apiKey, secret: apiSecret },
    { name: "WCSS Auth Key -> API-Key Header (V2)", url: 'https://ssapi.shipstation.com/v2/rates', key: authKey, secret: null },
    { name: "WCSS Auth Key -> Bearer (V2)", url: 'https://ssapi.shipstation.com/v2/rates', key: authKey, secret: null, bearer: true }
  ];

  for (const t of testConfigs) {
    console.log(`\n--- Testing: ${t.name} ---`);
    if (!t.key) { console.log("Skipping: missing key"); continue; }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (t.secret) {
        headers['Authorization'] = `Basic ${Buffer.from(`${t.key}:${t.secret}`).toString('base64')}`;
    } else if (t.bearer) {
        headers['Authorization'] = `Bearer ${t.key}`;
    } else {
        headers['API-Key'] = t.key;
    }

    try {
      const response = await fetch(t.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          carrierCode: "stamps_com",
          fromPostalCode: "91205",
          toState: "CA",
          toCountry: "US",
          toPostalCode: "90210",
          toCity: "Beverly Hills",
          weight: { value: 2, units: "pounds" },
          dimensions: { units: "inches", length: 12, width: 9, height: 3 },
          confirmation: "delivery", residential: true
        })
      });

      console.log(`Status: ${response.status} ${response.statusText}`);
      if (response.ok) {
        console.log("✅ SUCCESS!");
        process.exit(0);
      } else {
        const text = await response.text();
        console.log(`Body: ${text.substring(0, 100)}...`);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  
  console.log("\nAll credential combinations failed. Moving to Smart Rules Fallback.");
  process.exit(1);
}

runExhaustiveTests();
