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
          width={320} height={109} 
          className="object-contain transition-all duration-300 opacity-100"
        />
        <div className="flex gap-6 mt-8">
          {/* Footer links */}
          {['About', 'Projects', 'Store', 'Contact', 'Donate', 'Privacy Policy'].map((link) => (
            <Link key={link} href={link === 'About' ? '/about' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-gold dark:hover:text-brand-gold-glow uppercase tracking-wider transition-colors">
              {link}
            </Link>
          ))}
        </div>
        
        <div className="w-full h-px bg-black/5 dark:bg-white/5 my-8 max-w-3xl" />
        <p className="text-neutral-500 dark:text-neutral-600 text-xs font-serif">&copy; {new Date().getFullYear()} First Christians Alliance Outreach.</p>
      </div>
    </footer>
  );
}
