"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-md pt-20 pb-10 z-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <Image 
          src="/images/First-Christians-logo-header.png" 
          alt="FCAO Logo" 
          width={200} height={68} 
          className="mb-6 object-contain dark:invert-0 invert opacity-80 hover:opacity-100 transition-opacity"
        />
        <p className="text-neutral-500 text-sm max-w-md">The modernized, high-performance platform for extending global outreach and community support.</p>
        
        <div className="flex gap-6 mt-8">
          {/* Footer links */}
          {['About', 'Projects', 'Shop', 'Contact', 'Cart', 'Donate', 'Privacy Policy'].map((link) => (
            <Link key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-gold dark:hover:text-brand-gold-glow uppercase tracking-wider transition-colors">
              {link}
            </Link>
          ))}
        </div>
        
        <div className="w-full h-px bg-black/5 dark:bg-white/5 my-8 max-w-3xl" />
        <p className="text-neutral-500 dark:text-neutral-600 text-xs">&copy; {new Date().getFullYear()} First Christians Alliance Outreach. Modernization Prototype.</p>
      </div>
    </footer>
  );
}
