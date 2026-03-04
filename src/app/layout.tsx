import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "First Christians Alliance Outreach",
  description: "Revamping the FCAO presence with a modern experience.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="text-neutral-900 dark:text-neutral-50 antialiased selection:bg-brand-gold/30 transition-colors duration-300">
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
