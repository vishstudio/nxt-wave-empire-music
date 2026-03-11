'use client';

import Reveal from '../ui/Reveal';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-8 lg:px-12 border-t border-white/10 bg-black/95">
      <div className="max-w-screen-2xl mx-auto w-full">
        <Reveal direction="none">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-40">
                <Image src="/logo-white.PNG" alt="Wave Empire" fill className="object-contain object-left" priority />
              </div>
            </div>
            <div className="flex flex-col md:items-end items-center text-white/40 text-sm">
              <span>© {new Date().getFullYear()} <a href="https://vish.studio" target="_blank" rel="noopener noreferrer" className="text-white hover:underline hover:text-white/80 transition-colors">VISH studio</a>. All rights reserved.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
