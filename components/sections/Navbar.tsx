'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

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
          <div className="relative h-10 w-38">
            <Image src="/logo-white.PNG" alt="Wave Empire" fill className="object-contain object-left" priority />
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-6 md:px-12"
          >
            <div className="max-w-screen-2xl mx-auto w-full flex flex-col gap-6 md:gap-10 text-5xl md:text-8xl font-bold tracking-tighter uppercase">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
                  className="cursor-pointer hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group"
                >
                  <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>{' '}
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
