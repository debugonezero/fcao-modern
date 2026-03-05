"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* INTRODUCTION SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-neutral-900 text-center">
          Introduction
        </h1>
        <div className="glass-card p-8 md:p-12 text-left">
          <p className="text-neutral-600 text-lg leading-relaxed">
            Founded in 2022, First Christian Alliance Outreach (FCAO) is a non-profit, non-denominational Christian organization which strives to: 1) promote Christian faith through the production of inspiring Christian books and films, and 2) support other Christian mission-based organizations. FCAO is governed by its board of directors and associates to ensure that its operations are conducted effectively and professionally with the utmost integrity.
          </p>
        </div>
      </motion.div>

      {/* OFFICIAL STATEMENTS SUMMARY */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card flex flex-col items-center justify-center text-center !p-12 border-t-4 border-t-brand-blue min-h-[200px]"
          >
            <Link 
              href="/mission-statement"
              className="px-10 py-4 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white rounded-full font-bold transition-all duration-300 border border-brand-blue/20 text-lg"
            >
              Mission Statement
            </Link>
          </motion.div>
 
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card flex flex-col items-center justify-center text-center !p-12 border-t-4 border-t-brand-blue min-h-[200px]"
          >
            <Link 
              href="/statement-of-faith"
              className="px-10 py-4 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white rounded-full font-bold transition-all duration-300 border border-brand-blue/20 text-lg"
            >
              Statement of Faith
            </Link>
          </motion.div>
 
        </div>
      </section>

    </div>
  );
}
