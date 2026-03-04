/**
 * Smart Shipping Rules for FCAO
 * Calculates shipping costs locally based on weight and Geographic Zones.
 */

export interface ShippingRate {
  name: string;
  cost: number; // in cents
  estimatedDays: string;
}

/**
 * Calculates shipping based on weight and distance (Zones)
 * @param totalWeightLbs Total weight of the cart
 * @param destinationZip Customer zip code
 */
export const calculateSmartRates = (totalWeightLbs: number, destinationZip?: string): ShippingRate[] => {
  const rates: ShippingRate[] = [];

  // 1. Calculate Zone Surcharge (Distance)
  // Our warehouse is in Glendale, CA (91205) -> Zone 9
  // Zip codes starting with 0, 1, 2, 3 are far (East/South)
  let zoneSurcharge = 0;
  
  if (destinationZip) {
    const firstDigit = destinationZip.trim().charAt(0);
    // If shipping to East Coast/Midwest (Zips 0-4), add a distance buffer
    if (['0', '1', '2', '3', '4'].includes(firstDigit)) {
      zoneSurcharge = 350; // Add $3.50 for long distance logistics
    }
  }

  // 2. Standard Shipping Calculation
  let standardCost = 595 + zoneSurcharge; 
  
  if (totalWeightLbs > 1) {
    // Add $1.50 per additional pound
    standardCost += Math.ceil(totalWeightLbs - 1) * 150;
  }

  rates.push({
    name: "Standard Shipping (Ground)",
    cost: standardCost,
    estimatedDays: zoneSurcharge > 0 ? "6-8 business days" : "4-5 business days"
  });

  // 3. Priority Shipping Calculation
  let priorityCost = 1350 + zoneSurcharge; // Base $13.50 + zone
  if (totalWeightLbs > 1) {
    priorityCost += Math.ceil(totalWeightLbs - 1) * 350; // Priority weight is more expensive
  }

  rates.push({
    name: "Priority Shipping (Expedited)",
    cost: priorityCost,
    estimatedDays: "2-3 business days"
  });

  return rates;
};
