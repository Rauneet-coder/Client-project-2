"use client";

/**
 * AnimatedText — reveals text word-by-word or character-by-character
 * using Framer Motion for premium cinematic text entrances.
 */

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** "words" | "chars" — split mode */
  split?: "words" | "chars";
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
};

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  once = true,
  split = "words",
  tag: Tag = "p",
}: AnimatedTextProps) {
  const text = typeof children === "string" ? children : "";
  const tokens = split === "words" ? text.split(" ") : text.split("");

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      <Tag className="flex flex-wrap gap-x-[0.28em]">
        {tokens.map((token, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              variants={wordVariants}
            >
              {token}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
