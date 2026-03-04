"use client";

import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-[200px] md:h-[300px] relative flex items-center justify-center overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.jpg"
          alt="FCAO Banner"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-brand-dark/20 dark:bg-black/40" />
      </div>

      {/* Logo Container */}
      <Link href="/" className="relative z-10 transition-transform duration-500 hover:scale-105">
        <Image 
          src="/images/First-Christians-logo-header.png" 
          alt="FCAO Logo" 
          width={320} height={109} 
          className="object-contain"
          priority
        />
      </Link>
    </header>
  );
};
