"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 left-0 right-0 z-50 w-full bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image 
              src="/images/First-Christians-logo-header.png" 
              alt="FCAO Logo" 
              width={180} height={61} 
              className="w-auto h-10 md:h-12 lg:h-14 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-sm lg:text-base font-bold text-neutral-800 uppercase tracking-widest">
          <div className="relative group">
            <Link href="/about" className="hover:text-brand-gold transition-colors flex items-center gap-1 py-4">
              About
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block pt-0">
              <div className="bg-white shadow-xl border border-black/5 rounded-2xl overflow-hidden min-w-[220px] mt-1 backdrop-blur-xl">
                <Link href="/about" className="block px-6 py-3 hover:bg-neutral-50 hover:text-brand-gold transition-colors border-b border-black/5 font-semibold text-brand-gold">Introduction</Link>
                <Link href="/mission-statement" className="block px-6 py-3 hover:bg-neutral-50 hover:text-brand-gold transition-colors border-b border-black/5">Mission Statement</Link>
                <Link href="/statement-of-faith" className="block px-6 py-3 hover:bg-neutral-50 hover:text-brand-gold transition-colors">Statement of Faith</Link>
              </div>
            </div>
          </div>
          <Link href="/projects" className="hover:text-brand-gold transition-colors">Projects</Link>
          <Link href="/store" className="hover:text-brand-gold transition-colors">Store</Link>
          <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-6">
          <Link href="/cart" className="p-2 text-neutral-600 hover:text-brand-gold transition-colors relative">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </Link>
          <Link href="/donate" className="hidden sm:inline-flex bg-brand-gold text-white font-bold px-6 md:px-8 py-2.5 rounded-xl shadow-lg shadow-brand-gold/20 border border-white/10 hover:shadow-xl hover:shadow-brand-gold/40 hover:-translate-y-0.5 transition-all duration-300 text-[10px] md:text-xs lg:text-sm tracking-widest uppercase">
            Donate
          </Link>
          
          {/* Hamburger Menu (Mobile/Tablet) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-800 hover:text-brand-gold transition-colors z-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-24 px-8 overflow-y-auto"
      >
        <div className="flex flex-col gap-6 text-xl font-bold text-neutral-800 tracking-wider uppercase">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors border-b border-neutral-100 pb-4">Home</Link>
          
          <div className="space-y-4">
            <div className="text-brand-gold text-sm tracking-[0.2em] mb-2">About Us</div>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-brand-gold transition-colors">Introduction</Link>
            <Link href="/mission-statement" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-brand-gold transition-colors">Mission Statement</Link>
            <Link href="/statement-of-faith" onClick={() => setIsOpen(false)} className="block pl-4 hover:text-brand-gold transition-colors">Statement of Faith</Link>
          </div>

          <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors border-b border-neutral-100 pb-4">Projects</Link>
          <Link href="/store" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors border-b border-neutral-100 pb-4">Store</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors border-b border-neutral-100 pb-4">Contact</Link>
          
          <div className="pt-8">
            <Link 
              href="/donate" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-gold text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-gold/20 tracking-widest uppercase"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
