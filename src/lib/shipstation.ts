import { calculateSmartRates } from '@/lib/shipping';

export const getShipStationRates = async (toAddress: any, items: any[]) => {
  // Calculate total weight
  const totalWeight = items.reduce((acc, item) => {
    const weightValue = parseFloat(item.weight?.toString().replace(/[^\d.]/g, '') || "1");
    return acc + (weightValue * item.quantity);
  }, 0);

  // Use the destination zip code to calculate Zone surcharges
  const destinationZip = toAddress.postalCode;

  console.log(`Calculating Zone-Aware Smart Rates for: ${destinationZip} (${totalWeight} lbs)`);

  // Calculate rates locally using our Smart Rules
  const rates = calculateSmartRates(totalWeight, destinationZip);

  return rates;
};
