"use client";

/**
 * VideoSection — animated video grid tab content with
 * AnimatePresence cross-fade and staggered card entrances.
 */

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import VideoGrid from "@/components/VideoGrid";
import type { YouTubeVideo } from "@/lib/youtube";

interface VideoSectionProps {
  activeTab: string;
  videos: YouTubeVideo[];
}

export default function VideoSection({ activeTab, videos }: VideoSectionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <AnimatedText
          tag="h2"
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8 capitalize"
        >
          {activeTab.replace(/-/g, " ")}
        </AnimatedText>
        <VideoGrid videos={videos} />
      </motion.div>
    </AnimatePresence>
  );
}
