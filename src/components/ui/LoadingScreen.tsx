"use client";

/**
 * LoadingScreen — cinematic loading intro with Mezrex branding
 * and a purple gradient progress bar that fades out on load.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 22;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 350);
      }
      setProgress(Math.min(p, 100));
    }, 60);

    // Also exit on window load
    const onLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 400);
    };
    window.addEventListener("load", onLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10 text-center"
          >
            <span className="text-4xl font-extrabold tracking-[0.15em] bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              MEZREX
            </span>
            <p className="mt-2 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
              VFX & Motion Design
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            className="mt-4 font-mono text-xs text-white/20 tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
