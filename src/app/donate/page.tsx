"use client";

import { motion } from "framer-motion";
import { Heart, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [isRecurring, setIsRecurring] = useState(false);

  const amounts = [25, 50, 100, 250, 500];

  const handleDonate = () => {
    // In production, this would route to a Stripe Checkout Session API endpoint
    alert(`Initiating Stripe Checkout for ${isRecurring ? 'Monthly' : 'One-Time'} donation of $${amount === 'custom' ? '...' : amount}`);
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Background Splashes */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-12 relative z-10"
      >
        <div className="inline-flex items-center justify-center p-3 glass rounded-full mb-6">
          <Heart className="w-8 h-8 text-brand-gold fill-brand-gold/20" />
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
          Support Our <span className="text-brand-gold relative inline-block">Mission<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Your generosity enables us to produce inspiring Christian media, support vital global missions, and care for persecuted communities worldwide.
        </p>
      </motion.div>

      <section className="w-full max-w-2xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card !p-8 md:!p-10 border-t-4 border-t-brand-gold shadow-2xl"
        >
          {/* Donation Type Toggle */}
          <div className="flex bg-neutral-100 dark:bg-white/5 rounded-lg p-1 mb-8">
            <button 
              onClick={() => setIsRecurring(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${!isRecurring ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
            >
              One-Time Gift
            </button>
            <button 
              onClick={() => setIsRecurring(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${isRecurring ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
            >
              Monthly Impact
            </button>
          </div>

          {/* Amount Selection */}
          <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Select Amount</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${amount === amt ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:border-brand-gold/50'}`}
              >
                ${amt}
              </button>
            ))}
            <button
              onClick={() => setAmount('custom')}
              className={`py-4 rounded-xl font-bold border-2 transition-all ${amount === 'custom' ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:border-brand-gold/50'}`}
            >
              Custom
            </button>
          </div>

          {amount === 'custom' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              className="mb-8"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xl font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl py-4 pl-8 pr-4 text-xl font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  min="5"
                />
              </div>
            </motion.div>
          )}

          {/* Stripe Checkout Button */}
          <div className="mt-10">
            <button 
              onClick={handleDonate}
              className="w-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-extrabold text-lg py-5 rounded-xl transition-transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 group"
            >
              <CreditCard className="w-6 h-6 group-hover:text-brand-gold transition-colors" />
              Complete {isRecurring ? 'Monthly' : ''} Donation
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure payments powered by <strong>Stripe</strong>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
