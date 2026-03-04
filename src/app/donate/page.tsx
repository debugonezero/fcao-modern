"use client";

import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [25, 50, 100, 250, 500];

  const handleDonate = async () => {
    const finalAmount = amount === 'custom' ? parseFloat(customAmount) : amount;
    
    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              isCustomAmount: true,
              amount: finalAmount,
              name: isRecurring ? 'Monthly FCAO Donation' : 'One-Time FCAO Donation'
            }
          ],
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
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900">
          Support Our <span className="text-brand-gold relative inline-block">Mission<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <div className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed flex flex-col gap-4">
          <p>Donations, large and small, are welcomed and may be made in one sum or on a periodic basis.</p>
          <p>First Christians Alliance Outreach (FCAO) is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.</p>
          <p>All donations will go toward the professional writing of the movie script and/or supporting various Christian mission-based organizations.</p>
        </div>
      </motion.div>

      <section className="w-full max-w-2xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card !p-8 md:!p-10 border-t-4 border-t-brand-gold shadow-2xl"
        >
          {/* Donation Type Toggle */}
          <div className="flex bg-neutral-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsRecurring(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${!isRecurring ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              One-Time Donation
            </button>
            <button
              onClick={() => setIsRecurring(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-md transition-all ${isRecurring ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Monthly Donation
            </button>
          </div>

          <h3 className="text-lg font-bold mb-4 text-neutral-900">Select Amount</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={`py-4 rounded-xl font-bold text-lg border-2 transition-all ${amount === amt ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-neutral-200 text-neutral-600 hover:border-brand-gold/50'}`}
              >
                ${amt}
              </button>
            ))}
            <button
              onClick={() => setAmount('custom')}
              className={`py-4 rounded-xl font-bold border-2 transition-all ${amount === 'custom' ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-neutral-200 text-neutral-600 hover:border-brand-gold/50'}`}
            >
              Custom
            </button>
          </div>

          {amount === 'custom' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <label className="block text-sm font-bold text-neutral-700 mb-2 font-serif">Enter Amount ($)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="250"
                className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-neutral-900 transition-all font-serif"
              />
            </motion.div>
          )}

          <button 
            onClick={handleDonate}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-glow text-white font-bold py-5 rounded-xl text-lg mt-6 shadow-xl shadow-brand-gold/20 border border-white/10 hover:shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide"
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
