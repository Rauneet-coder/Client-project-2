import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import HomeContent from "@/components/HomeContent";
import VideoSection from "@/components/VideoSection";
import { getPlaylistVideos } from "@/lib/youtube";

// Playlist IDs configured via environment variables with the uploads feed as fallback.
// To use dedicated playlists for each category, add these keys to your .env.local:
// YOUTUBE_PLAYLIST_ANIMATED=your_playlist_id
// YOUTUBE_PLAYLIST_VFX=your_playlist_id
// YOUTUBE_PLAYLIST_VTUBER=your_playlist_id
const PLAYLISTS: Record<string, string> = {
  "animated-illustrations": process.env.YOUTUBE_PLAYLIST_ANIMATED || "UUZos9ijvsqTg8D8_9gO-YhQ",
  "personal-vfx": process.env.YOUTUBE_PLAYLIST_VFX || "UUZos9ijvsqTg8D8_9gO-YhQ",
  "vtuber-model-vfx": process.env.YOUTUBE_PLAYLIST_VTUBER || "UUZos9ijvsqTg8D8_9gO-YhQ",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || "home";

  let videos: any[] = [];
  if (activeTab !== "home" && PLAYLISTS[activeTab]) {
    videos = await getPlaylistVideos(PLAYLISTS[activeTab], activeTab);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#070707] text-white selection:bg-purple-500 selection:text-white">
      <Sidebar activeTab={activeTab} />
      
      <main className="flex-1 md:h-screen md:overflow-y-auto p-6 md:p-12 lg:p-16 scroll-smooth">
        {activeTab === "home" ? (
          <HomeContent />
        ) : (
          <Suspense fallback={<div className="text-zinc-500 animate-pulse py-10">Loading videos...</div>}>
            <VideoSection activeTab={activeTab} videos={videos} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
