"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Shop() {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Faithful Saints of Christ",
      category: "Books",
      price: "$24.99",
      image: "/images/Faithful-Saints-of-Christ-Cover-enhanced.png",
      description: "A spiritual journey and a powerful historical testimony of early Armenian Christians.",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BOOK_PRICE_ID,
      variations: null
    },
    {
      id: 2,
      name: "Battle of Avarayr Replication",
      category: "Artwork",
      price: null,
      image: "/images/Battle-of-Avarayr-1000px.png",
      description: "High-quality reproduction print of the commissioned oil painting by Mathieu Nozieres.",
      stripePriceId: null, // Driven by variations
      variations: [
        { name: "18\" x 24\" Standard Poster", price: "$45.00", stripePriceId: process.env.NEXT_PUBLIC_STRIPE_POSTER_STANDARD_PRICE_ID },
        { name: "24\" x 36\" Large Canvas", price: "$150.00", stripePriceId: process.env.NEXT_PUBLIC_STRIPE_POSTER_LARGE_PRICE_ID }
      ]
    }
  ];

  const handleVariationChange = (productId: number, index: number) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: index }));
  };

  const handleCheckout = async (product: { id: number; stripePriceId: string | null | undefined; variations: { stripePriceId: string | null | undefined }[] | null }, variationIndex: number) => {
    setIsProcessing(product.id);
    
    // Determine the correct Stripe Price ID
    const priceId = product.variations ? product.variations[variationIndex].stripePriceId : product.stripePriceId;
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode: 'payment', quantity: 1 })
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.assign(data.url); // Trigger Stripe Redirect
      } else if (data.error && data.error.includes("missing")) {
        alert("SIMULATION: In production, you would be redirected to purchase this item via Stripe.");
        setIsProcessing(null);
      } else {
        alert("Error: " + data.error);
        setIsProcessing(null);
      }
    } catch (err) {
      console.error("Checkout issue:", err);
      setIsProcessing(null);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
          FCAO <span className="text-brand-gold relative inline-block">Store<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
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
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{product.category}</span>
                    <span className="font-bold text-xl text-neutral-900 dark:text-white transition-all">{currentPrice}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-neutral-900 dark:text-white">{product.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 flex-1">{product.description}</p>
                  
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

                  <button 
                    onClick={() => handleCheckout(product, selectedVariationIndex)}
                    disabled={isProcessing === product.id}
                    className="w-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl flex justify-center items-center gap-2 disabled:scale-100 disabled:opacity-80"
                  >
                    {isProcessing === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : "Buy Now"}
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
