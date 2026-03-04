
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.SHIPSTATION_API_KEY;

if (!apiKey) {
  console.error("SHIPSTATION_API_KEY not found in .env");
  process.exit(1);
}

async function testRates() {
  console.log("Testing ShipStation V2 Rates API with API-Key...");
  
  try {
    const response = await fetch('https://ssapi.shipstation.com/shipments/getrates', {
      method: 'POST',
      headers: {
        'API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        carrierCode: "stamps_com",
        fromPostalCode: "91205",
        toState: "CA",
        toCountry: "US",
        toPostalCode: "90210",
        toCity: "Beverly Hills",
        weight: { value: 2, units: "pounds" },
        dimensions: { units: "inches", length: 12, width: 9, height: 3 },
        confirmation: "delivery",
        residential: true
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("SUCCESS! Rates received:");
      console.log(JSON.stringify(data, null, 2));
    } else {
      const error = await response.text();
      console.error(`FAILED! Status: ${response.status}`);
      console.error(`Error: ${error}`);
    }
  } catch (err) {
    console.error("Request failed:", err);
  }
}

testRates();
