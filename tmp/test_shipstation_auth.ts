
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const apiKey = process.env.SHIPSTATION_API_KEY;

if (!apiKey) {
  console.error("SHIPSTATION_API_KEY not found in .env");
  process.exit(1);
}

async function runAuthTests() {
  console.log("Starting Auth Header Variations Test with Key:", apiKey.substring(0, 5) + "...");
  
  const variations = [
    { name: "Header: API-Key", headers: { 'API-Key': apiKey } },
    { name: "Header: x-api-key", headers: { 'x-api-key': apiKey } },
    { name: "Header: X-Api-Key", headers: { 'X-Api-Key': apiKey } },
    { name: "Authorization: Bearer", headers: { 'Authorization': `Bearer ${apiKey}` } },
    { name: "Authorization: Basic (Key:)", headers: { 'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}` } },
    { name: "Authorization: Basic (:Key)", headers: { 'Authorization': `Basic ${Buffer.from(':' + apiKey).toString('base64')}` } },
    { name: "Authorization: Basic (Key:Key)", headers: { 'Authorization': `Basic ${Buffer.from(apiKey + ':' + apiKey).toString('base64')}` } }
  ];

  for (const v of variations) {
    console.log(`\nTesting ${v.name}...`);
    try {
      // Use a simple GET endpoint to verify auth
      const response = await fetch('https://ssapi.shipstation.com/v2/carriers', {
        method: 'GET',
        headers: { ...v.headers, 'Content-Type': 'application/json' }
      });

      console.log(`Status: ${response.status} ${response.statusText}`);
      if (response.ok) {
        console.log("✅ SUCCESS with " + v.name);
        // If we find one, we can stop or report all
      } else {
        const text = await response.text();
        console.log(`Body: ${text.substring(0, 50)}...`);
      }
    } catch (err) {
      console.log(`Request Error: ${err.message}`);
    }
  }
}

runAuthTests();
