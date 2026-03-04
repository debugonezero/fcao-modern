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
        {/* Desktop Banner - Using two images side-by-side (2x1) to prevent pixelation */}
        <div className="hidden md:flex absolute inset-0 w-full h-full">
          <div className="relative w-1/2 h-full">
            <Image
              src="/images/banner.jpg"
              alt="FCAO Banner Left"
              fill
              className="object-cover opacity-90"
              priority
            />
          </div>
          <div className="relative w-1/2 h-full">
            <Image
              src="/images/banner.jpg"
              alt="FCAO Banner Right"
              fill
              className="object-cover opacity-90"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-brand-dark/20" />
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
