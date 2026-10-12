'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  stagger = 0,
  direction = 'up',
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const calculatedDelay = delay + (stagger ? stagger * 0.1 : 0);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 24, opacity: 0 };
      case 'down':
        return { y: -24, opacity: 0 };
      case 'left':
        return { x: 24, opacity: 0 };
      case 'right':
        return { x: -24, opacity: 0 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: 0.6,
        delay: calculatedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
