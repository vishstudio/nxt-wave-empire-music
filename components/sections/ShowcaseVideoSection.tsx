'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ShowcaseVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Parallax: text drifts up and fades as you scroll through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full aspect-video max-w-screen-2xl mx-auto my-24 rounded-3xl overflow-hidden shadow-2xl">
      <video
        className="w-full h-full object-cover"
        src="/dj-live-event.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/djs.PNG"
      />
      {/* Stronger black overlay */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none" />
      {/* Caption overlay with parallax */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white text-center drop-shadow-lg mb-4">
          LIVE SHOWCASE
        </h2>
        <p className="text-lg md:text-2xl text-white/80 text-center max-w-2xl">
          Relive the energy, lights, and sound of our biggest nights. Every moment, every beat, every crowd.
        </p>
      </motion.div>
    </section>
  );
}
