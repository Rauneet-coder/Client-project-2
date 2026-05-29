"use client";

/**
 * AnimatedPage — wraps children with a cinematic Framer Motion entrance.
 * Use around main content areas for page-level transitions.
 */

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

export function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
