"use client";

/**
 * HomeContent — premium animated home page with 3D crystal hero,
 * Framer Motion text reveals, and staggered rate card entrances.
 */

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, Wand2, MessageSquare } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedPage } from "@/components/ui/AnimatedPage";

// Lazy load the 3D crystal to avoid SSR issues and keep initial bundle light
const FloatingCrystal = dynamic(
  () => import("@/components/ui/FloatingCrystal"),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] md:min-h-[400px]" /> }
);

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export default function HomeContent() {
  return (
    <AnimatedPage className="max-w-5xl mt-6 md:mt-10 space-y-16">
      {/* ── Hero Section: Text + 3D Crystal ── */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
        {/* Left — Text */}
        <div className="flex-1 space-y-6">
          <AnimatedText
            tag="h1"
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight"
          >
            {"Hi, I am Mezrex."}
          </AnimatedText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              I am a motion designer. I mainly animate illustrations and create{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent font-medium">
                visual effects
              </span>
              .
            </h2>
          </motion.div>

          {/* Animated status pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium">Available for commissions</span>
          </motion.div>
        </div>

        {/* Right — 3D Crystal */}
        <motion.div
          className="flex-1 w-full max-w-[380px] md:max-w-none aspect-square hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <FloatingCrystal />
        </motion.div>
      </div>

      {/* ── Services & Rates ── */}
      <SectionReveal delay={0.1}>
        <div className="space-y-8">
          <motion.h3
            className="text-sm font-semibold tracking-wider text-zinc-500 uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Services & Rates
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Animation Rates Card */}
            <motion.section
              className="group bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
              variants={cardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(168,85,247,0.08)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="p-3 bg-purple-500/10 rounded-xl text-purple-400"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <span className="text-xs font-semibold text-purple-400/80 bg-purple-500/5 px-2.5 py-1 rounded-full border border-purple-500/10">
                  Illustration VFX
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Animation Rates</h4>
              <p className="text-3xl font-extrabold text-white mb-4">
                $350 <span className="text-base font-normal text-zinc-500">to</span> $1000+
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Depends on the complexity of art and if you have a PSD with prepared layers.
              </p>
            </motion.section>

            {/* VFX Rates Card */}
            <motion.section
              className="group bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
              variants={cardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(59,130,246,0.08)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="p-3 bg-blue-500/10 rounded-xl text-blue-400"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Wand2 size={24} />
                </motion.div>
                <span className="text-xs font-semibold text-blue-400/80 bg-blue-500/5 px-2.5 py-1 rounded-full border border-blue-500/10">
                  General VFX
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">VFX Rates</h4>
              <p className="text-3xl font-extrabold text-white mb-4">
                $50 <span className="text-base font-normal text-zinc-500">to</span> $350+
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Depends on the complexity of the effect, if you already have a reference, and how it should look.
              </p>
            </motion.section>
          </div>
        </div>
      </SectionReveal>

      {/* ── Custom Quote Banner ── */}
      <SectionReveal delay={0.2} direction="left">
        <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-white/[0.03] to-transparent border border-white/5 rounded-2xl max-w-xl">
          <motion.div
            className="p-2.5 bg-zinc-500/10 rounded-xl text-zinc-400 mt-0.5"
            whileHover={{ scale: 1.1 }}
          >
            <MessageSquare size={18} />
          </motion.div>
          <div>
            <h5 className="text-sm font-semibold text-white mb-1">Looking for a custom quote?</h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              For more specific prices, timelines, or custom animation requests, feel free to DM me on any of my social media.
            </p>
          </div>
        </div>
      </SectionReveal>
    </AnimatedPage>
  );
}
