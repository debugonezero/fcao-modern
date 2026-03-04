"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({ city: '', state: '', postalCode: '', country: 'US' });
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const calculateShipping = async () => {
    if (!shippingAddress.postalCode) return alert("Please enter a postal code");
    setIsCalculating(true);
    try {
      const res = await fetch('/api/shipstation/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: shippingAddress,
          items: cart.map(item => ({ 
            quantity: item.quantity, 
            weight: item.shipping?.weight || "1" 
          }))
        })
      });
      const data = await res.json();
      if (data.rates) {
        setShippingRates(data.rates);
        setSelectedRate(data.rates[0]);
      }
    } catch (err) {
      console.error("Shipping calculation failed:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    if (!selectedRate) {
      alert("Please calculate and select a shipping rate before proceeding.");
      // Scroll to shipping section
      document.getElementById('shipping-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart.map(item => ({
            priceId: item.stripePriceId,
            quantity: item.quantity,
            name: item.name,
            productId: item.productId
          })),
          shipping: {
            name: selectedRate.name,
            cost: selectedRate.cost
          }
        })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Checkout Error: " + (data.error || "Unknown issue"));
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Checkout issue:", err);
      setIsProcessing(false);
    }
  };

  const actualTotalPrice = totalPrice + (selectedRate ? selectedRate.cost / 100 : 0);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/store" className="text-neutral-500 hover:text-brand-gold transition-all hover:-translate-x-1">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-heading font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-left">Your Cart</h1>
          </div>
          <p className="text-neutral-500 font-medium">{totalItems} Items</p>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="glass-card flex flex-col md:flex-row items-center gap-6 p-6 border border-neutral-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20"
                >
                  <div className="w-24 h-24 bg-neutral-100 dark:bg-white/5 rounded-xl overflow-hidden flex-shrink-0 relative flex items-center justify-center p-2">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-heading text-neutral-900 dark:text-white mb-1 font-bold">{item.name}</h3>
                    <p className="text-neutral-500 text-sm mb-2">{item.category}</p>
                    <p className="text-brand-gold font-bold text-lg font-sans">{item.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-neutral-100 dark:bg-black/40 rounded-lg px-4 py-2 border border-neutral-200 dark:border-white/5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-neutral-500 hover:text-brand-gold transition-colors p-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-neutral-900 dark:text-white w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-neutral-500 hover:text-brand-gold transition-colors p-1"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors p-3 rounded-xl hover:bg-red-500/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}

              {/* SHIPPING CALCULATOR */}
              <motion.div id="shipping-section" variants={itemVariants} className="glass-card p-8 border border-neutral-200/50 dark:border-white/5 bg-white/10 mt-8">
                <h3 className="text-xl font-heading font-bold text-neutral-900 dark:text-white mb-6 uppercase tracking-widest">Shipping Estimate</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <input 
                    placeholder="City" 
                    className="bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-gold outline-none"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  />
                  <input 
                    placeholder="State (e.g. CA)" 
                    className="bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-gold outline-none"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  />
                  <input 
                    placeholder="Zip Code" 
                    className="bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg p-3 text-sm focus:border-brand-gold outline-none"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                  />
                  <button 
                    onClick={calculateShipping}
                    disabled={isCalculating}
                    className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-gold dark:hover:bg-brand-gold transition-all disabled:opacity-50"
                  >
                    {isCalculating ? "..." : "Get Rates"}
                  </button>
                </div>

                {shippingRates.length > 0 && (
                  <div className="space-y-3">
                    {shippingRates.map((rate, idx) => (
                      <label key={idx} className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-white/10 cursor-pointer hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="shippingRate"
                            className="accent-brand-gold"
                            checked={selectedRate?.name === rate.name}
                            onChange={() => setSelectedRate(rate)}
                          />
                          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{rate.name}</span>
                        </div>
                        <span className="font-bold text-brand-gold">${(rate.cost / 100).toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* SUMMARY */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="glass-card p-8 sticky top-32 border border-neutral-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20">
                <h2 className="text-2xl font-heading text-neutral-900 dark:text-white mb-8 border-b border-neutral-200 dark:border-white/10 pb-4 uppercase tracking-wide font-bold">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {selectedRate ? `$${(selectedRate.cost / 100).toFixed(2)}` : "Calculated above"}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-heading text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-white/10 pt-4 font-bold">
                    <span>Total</span>
                    <span className="text-brand-gold">${actualTotalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-glow text-white py-4 rounded-xl font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-brand-gold/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Checkout"}
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-6 uppercase tracking-tighter">Secure 256-bit SSL Encrypted Payment via Stripe</p>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 glass-card border-dashed">
            <ShoppingCart className="w-20 h-20 text-neutral-200 dark:text-neutral-800 mb-6 animate-pulse" />
            <p className="text-2xl text-neutral-500 font-heading mb-8 uppercase tracking-widest font-bold">Your cart is empty</p>
            <Link href="/store" className="bg-brand-gold hover:bg-brand-gold-glow text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1">
              Start Shopping
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
