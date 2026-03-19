"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const NAV_ITEMS = ['About', 'Music', 'Videos', 'Social', 'Contact'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Hide topbar when menu is open */}
      {!isMenuOpen && (
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`fixed top-0 w-full z-50 px-6 md:px-8 lg:px-12 transition-[background-color,padding,border-color] duration-500 ease-in-out ${scrolled
            ? 'bg-black border-b border-white/10 py-4'
            : 'bg-transparent mix-blend-difference py-8'
            }`}
        >
          <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center">
            <div className="relative h-10 w-38 md:h-14 md:w-42">
              <Image src={`${basePath}/logo-white.PNG`} alt="Wave Empire" fill className="object-contain object-left" priority />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </motion.nav>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black via-[#111] to-black flex flex-col justify-between"
          >
            {/* Top row: logo left, close right (match topbar) */}
            <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center px-6 md:px-8 lg:px-12 pt-8">
              <div className="relative h-10 w-38">
                <Image src={`${basePath}/logo-white.PNG`} alt="Wave Empire" fill className="object-contain object-left" priority />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Close
              </button>
            </div>
            {/* Centered nav */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-10 md:gap-14">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.08 }}
                    className="cursor-pointer text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white hover:text-white/60 transition-colors relative group"
                  >
                    <span className="text-base md:text-2xl font-mono text-white/40 group-hover:text-white transition-colors mr-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                    <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-white/40 mt-2 mx-auto" />
                  </motion.a>
                ))}
              </nav>
            </div>
            {/* Copyright bottom center */}
            <div className="flex justify-center pb-8">
              <span className="text-white/40 text-sm text-center">
                © {new Date().getFullYear()} <a href="https://vish.studio" target="_blank" rel="noopener noreferrer" className="text-white hover:underline hover:text-white/80 transition-colors">VISH studio</a>. All rights reserved.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
