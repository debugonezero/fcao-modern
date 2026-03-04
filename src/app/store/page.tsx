"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Check } from "lucide-react";

export default function Shop() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const handleVariationChange = (productId: number, index: number) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: index }));
  };

  const handleAddToCart = (product: any, variationIndex: number) => {
    setIsProcessing(product.id);
    
    // Determine the correct Stripe Price ID and name
    const selectedVariation = product.variations ? product.variations[variationIndex] : null;
    const priceId = selectedVariation ? selectedVariation.stripePriceId : product.stripePriceId;
    const price = selectedVariation ? selectedVariation.price : product.price;
    const name = selectedVariation ? `${product.name} - ${selectedVariation.name}` : product.name;
    const id = selectedVariation ? `${product.id}-${selectedVariation.id}` : product.id.toString();

    const quantity = quantities[product.id] ?? 1;

    addToCart({
      id,
      productId: product.id,
      name,
      price,
      image: product.image,
      quantity,
      variationName: selectedVariation?.name,
      stripePriceId: priceId,
      category: product.category,
      shipping: product.shipping || selectedVariation?.shipping
    });

    // Visual feedback
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
      setIsProcessing(null);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
          <span className="text-brand-gold relative inline-block">Store<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Support our mission. All net proceeds go toward advancing global outreach and community care initiatives.
        </p>
      </motion.div>

      <section className="w-full max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const hasVariations = product.variations !== null;
            const selectedVariationIndex = selectedOptions[product.id] ?? 0;
            const currentPrice = hasVariations ? product.variations![selectedVariationIndex].price : product.price;

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="glass-card flex flex-col overflow-hidden group hover:border-brand-gold/50 transition-colors"
              >
                <div className="relative h-64 w-full bg-white/5 dark:bg-black/20 rounded-xl mb-6 overflow-hidden flex items-center justify-center p-4">
                  <Image 
                    src={product.image} alt={product.name} width={300} height={300} 
                    className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-end items-start mb-2">
                    <span className="font-bold text-xl text-neutral-900 dark:text-white transition-all">{currentPrice}</span>
                  </div>
                  <h3 className="text-3xl font-heading font-extrabold mb-3 text-neutral-900 dark:text-white">{product.name}</h3>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 flex-1 text-left">
                    <div className="space-y-4">
                      <p className="font-bold text-brand-blue dark:text-brand-blue-glow tracking-wider text-xs first-letter:capitalize">{product.shortDescription.toLowerCase()}</p>
                      {product.authors && (
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {product.authors.map((author, i) => (
                            <li key={i}>{author}</li>
                          ))}
                        </ul>
                      )}
                      <p className="transition-all">
                        {product.longDescription}
                      </p>
                    </div>
                  </div>
                  
                  {hasVariations && (
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Select Size</label>
                      <select 
                        className="w-full bg-neutral-100 dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer appearance-none transition-all font-medium"
                        value={selectedVariationIndex}
                        onChange={(e) => handleVariationChange(product.id, parseInt(e.target.value))}
                      >
                        {product.variations!.map((variation, vIndex) => (
                          <option key={vIndex} value={vIndex}>{variation.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Qty</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantities[product.id] ?? 1}
                      onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                      className="w-24 bg-neutral-100 dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-center font-medium"
                    />
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product, selectedVariationIndex)}
                    disabled={isProcessing === product.id}
                    className={`w-full font-bold py-4 rounded-xl shadow-xl border border-white/10 active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 disabled:scale-100 disabled:opacity-80 tracking-wide ${
                      addedItems[product.id] 
                        ? "bg-green-500 text-white shadow-green-500/20" 
                        : "bg-gradient-to-r from-brand-gold to-brand-gold-glow text-white shadow-brand-gold/20 hover:shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1"
                    }`}
                  >
                    {isProcessing === product.id ? (
                      addedItems[product.id] ? <Check className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
