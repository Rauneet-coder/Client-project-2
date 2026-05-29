"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Menu, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
}

const TABS = [
  { id: "home", label: "Home" },
  { id: "animated-illustrations", label: "Animated Illustrations" },
  { id: "personal-vfx", label: "Personal VFX" },
  { id: "vtuber-model-vfx", label: "VTuber Model VFX" },
];

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const drawerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export default function Sidebar({ activeTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Sticky Header Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#111]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-[2px] shadow-lg shadow-purple-500/10">
            <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden relative">
              <Image 
                src="/dp.jpg" 
                alt="Mezrex" 
                fill 
                className="object-cover"
                sizes="40px"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Mezrex</h1>
            <p className="text-xs text-zinc-400">2D Animator / VFX Artist</p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 transition-colors"
          aria-label="Toggle navigation menu"
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[73px] z-20 bg-[#0c0c0c]/98 backdrop-blur-xl flex flex-col md:hidden"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {TABS.map((tab, i) => (
                <motion.div key={tab.id} variants={mobileLinkVariants}>
                  <Link
                    href={`/?tab=${tab.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-left px-5 py-3.5 rounded-xl transition-all duration-200 font-medium text-base relative border-l-2 ${
                      activeTab === tab.id
                        ? "bg-white/10 text-white shadow-sm border-purple-500"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white border-transparent"
                    }`}
                  >
                    {tab.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div
              className="p-6 border-t border-white/5 flex items-center gap-5 bg-white/[0.01]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a 
                href="https://www.youtube.com/@Mezrexvfx1" 
                target="_blank" 
                rel="noreferrer" 
                className="text-zinc-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <Youtube size={22} />
              </a>
              <a 
                href="https://www.instagram.com/mezrexvfx/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-zinc-400 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <Instagram size={22} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-80 bg-[#111] border-r border-white/10 flex-col h-screen sticky top-0 z-20">
        {/* Header Profile Area */}
        <div className="p-8 pb-6 border-b border-white/5">
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 mb-5 shadow-lg shadow-purple-500/20 p-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden relative">
              <Image 
                src="/dp.jpg" 
                alt="Mezrex" 
                fill 
                className="object-cover"
                sizes="96px"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Mezrex
          </motion.h1>
          <motion.p
            className="text-sm text-zinc-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            2D Animator / VFX Artist
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {TABS.map((tab, i) => (
            <motion.div
              key={tab.id}
              variants={linkVariants}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={`/?tab=${tab.id}`}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm border-l-2 relative ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white shadow-sm border-purple-500"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white border-transparent"
                }`}
              >
                {/* Animated active indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/[0.07] rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Links Footer */}
        <motion.div
          className="p-6 border-t border-white/5 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.a 
            href="https://www.youtube.com/@Mezrexvfx1" 
            target="_blank" 
            rel="noreferrer" 
            className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Youtube size={20} />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/mezrexvfx/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-zinc-400 hover:text-pink-500 transition-colors p-1.5 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={20} />
          </motion.a>
        </motion.div>
      </aside>
    </>
  );
}
