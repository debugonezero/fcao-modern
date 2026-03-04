
import { calculateSmartRates } from '../src/lib/shipping';

console.log("--- FCAO Shipping Zone Test ---");

// Test 1: Local (California - Zip 91xxx)
const localRates = calculateSmartRates(1.4, "91205");
console.log("\nLocal Order (91205 - CA):");
console.log(`Standard: $${(localRates[0].cost / 100).toFixed(2)}`);
console.log(`Priority: $${(localRates[1].cost / 100).toFixed(2)}`);

// Test 2: East Coast (New York - Zip 10xxx)
const eastCoastRates = calculateSmartRates(1.4, "10001");
console.log("\nEast Coast Order (10001 - NY):");
console.log(`Standard: $${(eastCoastRates[0].cost / 100).toFixed(2)}`);
console.log(`Priority: $${(eastCoastRates[1].cost / 100).toFixed(2)}`);

if (eastCoastRates[0].cost > localRates[0].cost) {
  console.log("\n✅ SUCCESS: Zone Surcharge correctly applied for East Coast!");
} else {
  console.log("\n❌ FAILURE: Zone Surcharge not detected.");
  process.exit(1);
}
