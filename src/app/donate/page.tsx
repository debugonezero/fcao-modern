"use client";

import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [25, 50, 100, 250, 500];

  const handleDonate = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCustomAmount: true,
          amount: amount === 'custom' ? null : amount, // If custom UI were built, we'd pass the custom number here
          mode: isRecurring ? 'subscription' : 'payment'
        })
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.assign(data.url); // Redirect to Stripe Checkout
      } else if (data.error && data.error.includes("missing")) {
        alert("SIMULATION: In production, you would be redirected to Stripe to donate $" + amount);
        setIsProcessing(false);
      } else {
        alert("Error: " + data.error);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
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

          <button 
            onClick={handleDonate}
            disabled={isProcessing}
            className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-5 rounded-xl text-lg mt-6 shadow-xl shadow-brand-gold/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : `Give ${amount === 'custom' ? 'Any Amount' : '$' + amount}`}
          </button>
          <p className="text-center text-xs text-neutral-500 mt-4 font-medium flex items-center justify-center gap-1">
            Secure processing by Stripe.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
