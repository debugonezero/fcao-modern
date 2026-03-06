"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2, CheckCircle2, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Failed to send");
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
          Get In <span className="text-brand-gold relative inline-block">Touch<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          We would love to hear from you. Whether you have questions about our existing or upcoming projects or simply want to connect, please reach out.
        </p>
      </motion.div>

      <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 space-y-6"
          >
            <div className="glass-card flex items-start gap-4 hover:border-brand-gold/50 transition-colors group">
              <div className="mt-1 p-3 bg-brand-gold/10 rounded-full group-hover:bg-brand-gold/20 transition-colors">
                <User className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Contact Person</h4>
                <p className="text-base text-neutral-900 font-bold">Armen Simonian</p>
              </div>
            </div>

            <div className="glass-card flex items-start gap-4 hover:border-brand-gold/50 transition-colors group">
              <div className="mt-1 p-3 bg-brand-gold/10 rounded-full group-hover:bg-brand-gold/20 transition-colors">
                <Mail className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Email Us</h4>
                <a 
                  href="mailto:info@Firstchristiansallianceoutreach.org" 
                  className="text-base text-neutral-900 font-bold hover:text-brand-gold transition-colors break-all"
                >
                  info@Firstchristiansallianceoutreach.org
                </a>
              </div>
            </div>

            <div className="glass-card flex items-start gap-4 hover:border-brand-gold/50 transition-colors group">
              <div className="mt-1 p-3 bg-brand-gold/10 rounded-full group-hover:bg-brand-gold/20 transition-colors">
                <Phone className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">Call Us</h4>
                <a 
                  href="tel:8553333547" 
                  className="text-base text-neutral-900 font-bold hover:text-brand-gold transition-colors"
                >
                  855-333-3547
                </a>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-l-brand-gold bg-brand-gold/5">
              <h4 className="font-bold text-neutral-900 mb-2">Response Time</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We typically respond to all inquiries within 2 or 3 business days. Thank you for your patience and for supporting our mission.
              </p>
            </div>

            <div className="hidden lg:block glass-card p-6 overflow-hidden relative group">
              <h4 className="font-bold text-neutral-900 mb-2 italic">Looking for the Store?</h4>
              <p className="text-sm text-neutral-600 mb-4">
                All net proceeds from the sale of our books and portrait reproductions directly support the FCAO mission.
              </p>
              <Link 
                href="/store" 
                className="text-sm font-bold text-brand-gold hover:opacity-80 transition-colors"
              >
                Go to Store →
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-2/3 glass-card !p-8 border-t-4 border-t-brand-gold"
          >
            <h3 className="text-2xl font-bold mb-6 text-neutral-900 font-serif">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-4 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-sm font-medium">Your message has been sent successfully. We will get back to you soon!</p>
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-lg">
                  <p className="text-sm font-medium">Failed to send message. Please ensure your environment API keys are configured correctly.</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2 font-serif">First Name</label>
                  <input required
                    type="text" 
                    className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-neutral-900 transition-all disabled:opacity-50 font-serif" 
                    placeholder="" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2 font-serif">Last Name</label>
                  <input required
                    type="text" 
                    className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-neutral-900 transition-all disabled:opacity-50 font-serif" 
                    placeholder="" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 font-serif">Email Address</label>
                <input required
                  type="email" 
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-neutral-900 transition-all disabled:opacity-50 font-serif" 
                  placeholder="" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 font-serif">Message</label>
                <textarea required
                  rows={5} 
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-neutral-900 transition-all resize-none disabled:opacity-50 font-serif" 
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-gold text-white font-bold py-4 px-8 rounded-xl shadow-xl shadow-brand-gold/20 border border-white/10 hover:shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto tracking-wide disabled:hover:-translate-y-0 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
