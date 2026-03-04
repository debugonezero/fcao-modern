import { NextResponse } from 'next/server';
import { getShipStationRates } from '@/lib/shipstation';

export async function POST(request: Request) {
  try {
    const { address, items } = await request.json();

    if (!address || !items) {
      return NextResponse.json({ error: "Missing address or items" }, { status: 400 });
    }

    const rates = await getShipStationRates(address, items);

    return NextResponse.json({ rates });
  } catch (err: any) {
    console.error("Rates API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
