"use client";

/**
 * CustomCursor — replaces native cursor on desktop with
 * a dot + ring combination that reacts to hover states.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on pointer:fine (desktop)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsVisible(true);

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      // Ring lags behind dot for smooth trailing effect
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 6}px, ${dotY - 6}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-accent transition-transform duration-150"
        style={{
          transform: "translate(-100px,-100px)",
          mixBlendMode: "multiply",
          scale: isHovering ? "2" : "1",
        }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border border-accent"
        style={{ transform: "translate(-100px,-100px)" }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.5 : 0.9,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
