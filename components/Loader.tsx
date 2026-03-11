'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const BAR_COUNT = 12;
const BAR_DELAYS = Array.from({ length: BAR_COUNT }, (_, i) => (i * 0.08) % 0.96);
const BAR_HEIGHTS = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.95, 0.65, 0.75, 0.5];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.2s
    const exitTimer = setTimeout(() => setExiting(true), 2200);
    // Remove from DOM and call onComplete after exit animation finishes (700ms)
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >


          {/* Waveform bars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-end gap-[3px] h-10"
          >
            {BAR_HEIGHTS.map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-white"
                animate={{ height: [`${h * 12}px`, `${h * 40}px`, `${h * 12}px`] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: 'easeInOut',
                  delay: BAR_DELAYS[i],
                }}
              />
            ))}
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-48 md:w-68 h-12 md:h-20 mb-10"
          >
            <Image
              src="/logo-white.PNG"
              alt="Wave Empire"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Sweep line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}

