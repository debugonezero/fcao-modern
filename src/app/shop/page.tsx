"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Faithful Saints of Christ",
      category: "Books",
      price: "$24.99",
      image: "/images/Faithful-Saints-of-Christ-Cover-enhanced.png",
      description: "A spiritual journey and a powerful historical testimony of early Armenian Christians.",
    },
    {
      id: 2,
      name: "Battle of Avarayr Replication",
      category: "Artwork",
      price: "$150.00",
      image: "/images/Battle-of-Avarayr-1000px.png",
      description: "High-quality reproduction print of the commissioned oil painting by Mathieu Nozieres.",
    }
  ];

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* HEADER */}
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

      {/* PRODUCT GRID */}
      <section className="w-full max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="glass-card flex flex-col overflow-hidden group hover:border-brand-gold/50 transition-colors"
            >
              <div className="relative h-64 w-full bg-white/5 dark:bg-black/20 rounded-xl mb-6 overflow-hidden flex items-center justify-center p-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={300} height={300} 
                  className="object-contain max-h-full group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" 
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{product.category}</span>
                  <span className="font-bold text-lg text-neutral-900 dark:text-white">{product.price}</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-neutral-900 dark:text-white">{product.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 flex-1">{product.description}</p>
                <button className="w-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
