"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Globe, Shield, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Globe className="w-6 h-6 text-brand-gold" />,
      title: "Global Outreach",
      description: "Extending the Christian faith across borders through media, literature, and community support."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-gold" />,
      title: "Biblical Truth",
      description: "Remaining steadfast in the infallible Word of God and the testimonies of the early Saints."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-gold" />,
      title: "Perseverance",
      description: "Standing strong with persecuted Christians worldwide, honoring the legacy of those who defended the faith."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Community Action",
      description: "Partnering with mission-based organizations to alleviate suffering and spread hope."
    }
  ];

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center pt-32 pb-20">
      {/* Dynamic Background Blurs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-6 text-center mb-16 relative z-10"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white">
          About <span className="text-brand-gold relative inline-block">FCAO<div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-gold/30 rounded-full"/></span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          First Christians Alliance Outreach is dedicated to preserving the history of early Christianity, supporting persecuted believers today, and fulfilling the Great Commission through media and technology.
        </p>
      </motion.div>

      {/* OUR STORY / FOUNDATION */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 relative z-10">
        <div className="glass-card flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase text-brand-gold mb-2">Our Foundation</h3>
            <h2 className="text-3xl font-heading font-extrabold mb-6 text-neutral-900 dark:text-white">
              A Legacy of Faith
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              <p>
                Founded by Armen Simonian, First Christians Alliance Outreach (FCAO) was established to shine a light on the incredible perseverance of early Christians—specifically the Armenian people, who were the first nation to adopt Christianity as a state religion in 301 AD.
              </p>
              <p>
                From the legendary Battle of Avarayr led by St. Vartan, where believers chose death over renouncing Christ, to the modern-day persecutions in the Middle East, our organization exists to ensure their stories are never forgotten.
              </p>
              <p>
                Today, FCAO operates as a registered non-profit producing literature, commissioning historical artwork, and laying the groundwork for major motion pictures that will bring these powerful testimonies of faith to a global audience.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/Meet-the-Authors.png" 
                alt="FCAO Founders and Authors" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES GRID */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-20 relative z-10">
        <h2 className="text-3xl font-heading font-extrabold mb-10 text-center text-neutral-900 dark:text-white">
          Our Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-gold/30 transition-colors"
            >
              <div className="mb-4 bg-white dark:bg-black/20 w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
