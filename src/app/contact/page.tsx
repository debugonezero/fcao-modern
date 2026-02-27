"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Background Blurs */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">
          Get In <span className="text-brand-blue relative inline-block">Touch<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-blue/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          We would love to hear from you. Whether you have questions about our upcoming projects, want to support our mission, or simply want to connect, please reach out.
        </p>
      </motion.div>

      <section className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 space-y-4"
          >
            <div className="glass-card flex items-start gap-4">
              <div className="mt-1 p-3 bg-brand-blue/10 rounded-full">
                <MapPin className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Mailing Address</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  First Christians Alliance Outreach<br />
                  P.O. Box 1234<br />
                  Los Angeles, CA 90001
                </p>
              </div>
            </div>

            <div className="glass-card flex items-start gap-4">
              <div className="mt-1 p-3 bg-brand-gold/10 rounded-full">
                <Mail className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Email Us</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  info@firstchristiansalliance.org<br />
                  support@firstchristiansalliance.org
                </p>
              </div>
            </div>

            <div className="glass-card flex items-start gap-4">
              <div className="mt-1 p-3 bg-emerald-500/10 rounded-full">
                <Phone className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Phone</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  (555) 123-4567<br />
                  Mon-Fri, 9am - 5pm PST
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-2/3 glass-card !p-8 border-t-4 border-t-brand-blue"
          >
            <h3 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">First Name</label>
                  <input type="text" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-neutral-900 dark:text-white transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-neutral-900 dark:text-white transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Email Address</label>
                <input type="email" className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-neutral-900 dark:text-white transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Message</label>
                <textarea rows={5} className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-neutral-900 dark:text-white transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 px-8 rounded-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 w-full md:w-auto shadow-lg shadow-brand-blue/20">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
