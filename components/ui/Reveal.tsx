'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function Reveal({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 36 : direction === 'down' ? -36 : 0,
    x: direction === 'left' ? 36 : direction === 'right' ? -36 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
