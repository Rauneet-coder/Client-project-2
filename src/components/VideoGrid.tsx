"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

function VideoCard({ video, index }: { video: YouTubeVideo; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
      setIsIframeLoaded(false);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
    setIsIframeLoaded(false);
  };

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    setIsIframeLoaded(true);
    try {
      const iframe = e.currentTarget;
      if (!iframe.contentDocument) return;
    } catch {
      // Cross-origin access blocked = YouTube loaded correctly
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-video rounded-xl overflow-hidden bg-[#121212] border border-white/10 hover:border-purple-500/30 hover:shadow-[0_12px_30px_rgba(168,85,247,0.15)] transition-colors duration-300 ease-out cursor-pointer"
      onClick={() => window.open(video.url, "_blank")}
    >
      {/* Thumbnail Layer */}
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${
          isHovered && isIframeLoaded && !hasError ? "opacity-0 scale-100" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* YouTube iframe — only mounted on hover, unmounted on mouse leave to stop playback */}
      {isHovered && !hasError && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            key={video.id}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&iv_load_policy=3&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={() => setHasError(true)}
            className={`absolute inset-0 w-full h-full border-none scale-[1.02] transition-opacity duration-500 ${
              isIframeLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      {/* Subtle Loading Spinner while iframe is buffering in background */}
      {isHovered && !isIframeLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-purple-500 animate-spin" />
        </div>
      )}

      {/* Play Button Overlay — hidden on hover */}
      {(!isHovered || hasError) && (
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Play className="text-white ml-0.5 w-5 h-5" fill="white" />
          </motion.div>
        </div>
      )}

      {/* Title Gradient Overlay — stays visible during buffering, fades on playback */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          isHovered && isIframeLoaded && !hasError ? "opacity-0" : "opacity-100 pointer-events-none"
        }`}
      >
        <p className="text-white font-medium text-sm line-clamp-2 leading-snug">
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-zinc-500 mb-2">No videos found yet.</p>
        <p className="text-sm text-zinc-600">Ensure your YouTube API Key and Playlist ID are set up.</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {videos.map((video, i) => (
        <VideoCard key={video.id} video={video} index={i} />
      ))}
    </div>
  );
}
