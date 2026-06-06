"use client";

import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,0,110,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(123,44,191,0.12)_0%,transparent_50%)]" />
      </div>
      <Navbar />
      <main className="relative z-10 pt-20">{children}</main>
      <Footer />
    </Providers>
  );
}