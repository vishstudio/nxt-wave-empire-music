'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
import { useHeroReady } from '@/components/context/HeroReadyContext';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroReady = useHeroReady();

  // Track scroll progress from when the section top hits the viewport top
  // to when the section bottom leaves the viewport top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Image drifts DOWN slowly as user scrolls (classic parallax depth)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Content drifts UP faster and fades out
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Scroll indicator fades quickly
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black">

      {/* Parallax image layer — reveal on hero ready + parallax drift */}
      <motion.div
        className="absolute inset-x-0 -top-[15%] bottom-0"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={heroReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={`${basePath}/dj-hero.jpg`}
          alt="Wave Empire DJs"
          fill
          className="object-cover object-top"
          priority
        />
      </motion.div>

      {/* Gradient overlays (static — no parallax needed) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />

      {/* Hero content — parallax drift + fade */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-8 lg:px-12 pb-12 md:pb-16"
      >
        <div className="max-w-screen-2xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: heroReady ? 0.15 : 0 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Est. 2026 — Sound Architects</p>
              <h1 className="text-[15vw] md:text-[10vw] lg:text-[8vw] leading-none font-bold tracking-tighter uppercase text-white">
                Wave<br />Empire<br />Music
              </h1>
            </motion.div>

            {/* Right meta block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: heroReady ? 0.4 : 0 }}
              className="flex flex-col items-start md:items-end gap-6 md:pb-3"
            >
              <p className="text-sm md:text-base max-w-[260px] md:text-right text-white/60 leading-relaxed">
                Crafting the next generation of Mauritian and international hits.
              </p>
              <div className="flex items-center gap-4">
                <a href="#music" className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-white/90 transition-colors">
                  Explore Music
                </a>
                <a href="#about" className="px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-white/10 transition-colors">
                  Our Story
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — outer handles scroll-driven fade, inner handles loader reveal */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 right-6 md:right-8 lg:right-12 z-20 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: heroReady ? 0.75 : 0 }}
          className="flex flex-col items-end gap-4"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 -rotate-90 origin-bottom-right mb-8">Scroll</span>
          <div className="w-px h-16 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="w-full h-1/2 bg-white absolute top-0"
            />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
