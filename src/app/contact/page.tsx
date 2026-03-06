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
        className="w-full max-w-6xl mx-auto px-6 mb-16 relative z-10"
      >
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Get In <span className="text-brand-gold relative inline-block">Touch<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We would love to hear from you. Whether you have questions about our existing or upcoming projects or simply want to connect, please reach out.
          </p>
        </div>

      </motion.div>

      <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start h-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[40%] space-y-6"
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

          {/* Image Showcase Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-[60%] space-y-8"
          >
            {/* Book Mockup Container */}
            <div className="group flex justify-center items-center py-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
              <div className="relative">
                <motion.img 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  src="/images/contact/book_mockup.png" 
                  alt="Faithful Saints of Christ Book Mockup" 
                  className="w-[320px] h-auto drop-shadow-[0_20px_50px_rgba(184,148,82,0.3)] transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Painting Container */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl border border-brand-gold/10">
              <img 
                src="/images/contact/avarayr_painting.jpg" 
                alt="Battle of Avarayr Painting" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-white text-sm font-medium tracking-wide">The Battle of Avarayr Painting by Mathieu Nozieres</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
