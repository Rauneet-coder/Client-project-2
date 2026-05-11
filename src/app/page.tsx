import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { getPlaylistVideos } from "@/lib/youtube";

// Placeholder Playlist IDs - You will replace these once you have them.
// If you want to use the main channel uploads, you can use the Uploads playlist ID.
const PLAYLISTS: Record<string, string> = {
  "animated-illustrations": "UUZos9ijvsqTg8D8_9gO-YhQ", // Using channel uploads as fallback
  "personal-vfx": "UUZos9ijvsqTg8D8_9gO-YhQ",
  "vtuber-model-vfx": "UUZos9ijvsqTg8D8_9gO-YhQ",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || "home";

  let videos: any[] = [];
  if (activeTab !== "home" && PLAYLISTS[activeTab]) {
    videos = await getPlaylistVideos(PLAYLISTS[activeTab]);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500 selection:text-white">
      <Sidebar activeTab={activeTab} />
      
      <main className="flex-1 md:h-screen md:overflow-y-auto p-6 md:p-12 lg:p-20 scroll-smooth">
        {activeTab === "home" ? (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-8 md:mt-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Hi, I am Mezrex.
            </h1>
            <h2 className="text-xl md:text-2xl text-zinc-400 font-light mb-12 leading-relaxed">
              I am a motion designer. I mainly animate illustrations and create visual effects.
            </h2>
            
            <div className="space-y-6 text-zinc-300 leading-relaxed">
              <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 transition-colors">
                <h3 className="text-2xl font-semibold text-white mb-2">Animation Rates</h3>
                <p className="text-xl text-purple-400 mb-4">$350 - $1000+</p>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                  Depends on the complexity of art and if you have a PSD with prepared layers.
                </p>
              </section>

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-white/20 transition-colors">
                <h3 className="text-2xl font-semibold text-white mb-2">VFX Rates</h3>
                <p className="text-xl text-blue-400 mb-4">$50 - $350+</p>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                  Depends on the complexity of the effect, if you already have a reference, and how it should look.
                </p>
              </section>
              
              <div className="pt-6">
                <p className="text-sm text-zinc-500 italic bg-white/5 inline-block px-5 py-3 rounded-xl">
                  For more specific prices and timeframes, DM me on any of my social media.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 capitalize">
              {activeTab.replace(/-/g, " ")}
            </h2>
            <Suspense fallback={<div className="text-zinc-500 animate-pulse py-10">Loading videos...</div>}>
              <VideoGrid videos={videos} />
            </Suspense>
          </div>
        )}
      </main>
    </div>
  );
}
