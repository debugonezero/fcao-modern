import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';

export async function GET() {
  try {
    const products = getAllProducts();
    
    // Transform to a clean format for external services like ShipStation
    const registry = products.map(product => {
      if (product.variations) {
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          variations: product.variations.map(v => ({
            name: v.name,
            price: v.price,
            shipping: v.shipping
          }))
        };
      }
      
      return {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        shipping: product.shipping
      };
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      products: registry
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch product registry' 
    }, { status: 500 });
  }
}
