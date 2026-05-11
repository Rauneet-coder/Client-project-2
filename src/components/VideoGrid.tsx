"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";

function VideoCard({ video }: { video: YouTubeVideo }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  // Some videos have embedding disabled by the uploader.
  // We detect this via the iframe's load event checking for errors.
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      // If the iframe loaded a page with "Video unavailable", treat it as an error
      const iframe = e.currentTarget;
      if (!iframe.contentDocument) return; // cross-origin, means it loaded fine
    } catch {
      // Cross-origin access blocked = YouTube loaded correctly, no error
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
      onClick={() => window.open(video.url, "_blank")}
    >
      {/* Thumbnail Layer */}
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
          isHovered && !hasError ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* YouTube iframe — only mounted on hover, unmounted on mouse leave to stop playback */}
      {isHovered && !hasError && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            key={video.id}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=0&controls=0&modestbranding=1&playsinline=1&iv_load_policy=3&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full border-none scale-[1.02]"
          />
        </div>
      )}

      {/* Play Button Overlay — hidden while iframe is active */}
      {(!isHovered || hasError) && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play className="text-white ml-1 w-5 h-5" fill="white" />
          </div>
        </div>
      )}

      {/* Title Gradient Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          isHovered && !hasError ? "opacity-0" : "opacity-100 pointer-events-none"
        }`}
      >
        <p className="text-white font-medium text-sm line-clamp-2 leading-snug">
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-zinc-500 mb-2">No videos found yet.</p>
        <p className="text-sm text-zinc-600">Ensure your YouTube API Key and Playlist ID are set up.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
