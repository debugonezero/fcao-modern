"use client";

import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-[200px] md:h-[300px] relative flex items-center justify-center overflow-hidden">
      {/* Banner Background */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Banner */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="FCAO Banner Mobile"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        {/* Desktop Banner - Using object-fit: contain/cover with better scaling or a dedicated desktop image */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/banner.jpg" // User requested two images, but I only see one. I will use this as a placeholder for the desktop version.
            alt="FCAO Banner Desktop"
            fill
            className="object-cover opacity-90 scale-105" // Slight scale to fill space better without extreme stretching
            priority
          />
        </div>
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
