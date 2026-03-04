import productsData from '../data/products.json';

export interface ShippingInfo {
  weight: string;
  packagingWeight: string;
  dimensions: string;
  notes?: string;
  packaging?: string;
}

export interface Variation {
  id: string;
  name: string;
  price: string;
  stripePriceId: string;
  shipping: ShippingInfo;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string | null;
  image: string;
  shortDescription: string;
  longDescription: string;
  authors?: string[];
  stripePriceId: string | null;
  variations: Variation[] | null;
  shipping?: ShippingInfo;
}

export const products = productsData.map(p => ({
  ...p,
  // Map env variable placeholder to actual value if it exists
  stripePriceId: p.stripePriceId && process.env[p.stripePriceId] ? process.env[p.stripePriceId] : p.stripePriceId,
  variations: p.variations ? p.variations.map(v => ({
    ...v,
    stripePriceId: process.env[v.stripePriceId] || v.stripePriceId
  })) : null
})) as Product[];

export function getProductById(id: number) {
  return products.find(p => p.id === id);
}

export function getAllProducts() {
  return products;
}

export function getProductWeight(productId: string | number) {
  const idStr = String(productId);
  const baseId = parseInt(idStr.replace(/[^\d]/g, ''));
  const product = products.find(p => p.id === baseId);
  
  if (!product) return null;

  // If it's a variation (e.g., id "2-v1"), find the variation weight
  if (idStr.includes('-')) {
    const varId = idStr.split('-')[1];
    const variation = product.variations?.find(v => v.id === varId);
    if (variation) return variation.shipping;
  }

  return product.shipping;
}
