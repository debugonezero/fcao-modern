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
      className="sticky top-0 left-0 right-0 z-50 w-full bg-white/40 backdrop-blur-lg border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-8 text-base font-bold text-neutral-800 uppercase tracking-widest">
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
          <Link href="/cart" className="hover:text-brand-gold transition-colors">Cart</Link>
          <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="p-2 text-neutral-600 hover:text-brand-gold transition-colors relative">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </Link>
          <Link href="/donate" className="bg-brand-gold text-white font-bold px-8 py-2 rounded-full shadow-lg shadow-brand-gold/20 border border-white/10 hover:bg-brand-gold-glow transition-all duration-300 text-sm tracking-widest uppercase">
            Donate
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
