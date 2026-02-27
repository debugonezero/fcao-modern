"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 current">
          <Image 
            src="/images/First-Christians-logo-header.png" 
            alt="FCAO Logo" 
            width={160} height={55} 
            className="object-contain dark:invert-0 invert"
            priority
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="/about" className="hover:text-brand-gold dark:hover:text-brand-gold-glow transition-colors">About</Link>
          <Link href="/projects" className="hover:text-brand-gold dark:hover:text-brand-gold-glow transition-colors">Projects</Link>
          <Link href="/shop" className="hover:text-brand-gold dark:hover:text-brand-gold-glow transition-colors">Shop</Link>
          <Link href="/contact" className="hover:text-brand-gold dark:hover:text-brand-gold-glow transition-colors">Contact</Link>
          <Link href="/cart" className="hover:text-brand-gold dark:hover:text-brand-gold-glow transition-colors flex items-center gap-2">
            Cart <span className="bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center -ml-1">0</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/donate" className="bg-gradient-to-r from-brand-gold to-brand-gold hover:from-brand-gold-glow hover:to-brand-gold text-white dark:text-neutral-950 font-bold px-6 py-2 rounded-full shadow-lg shadow-brand-gold/30 transition-all hover:scale-105 active:scale-95 text-sm">
            Donate Now
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
