import Link from "next/link";
import Image from "next/image";
import { Youtube, Instagram } from "lucide-react";

interface SidebarProps {
  activeTab: string;
}

const TABS = [
  { id: "home", label: "Home" },
  { id: "animated-illustrations", label: "Animated Illustrations" },
  { id: "personal-vfx", label: "Personal VFX" },
  { id: "vtuber-model-vfx", label: "VTuber Model VFX" },
];

export default function Sidebar({ activeTab }: SidebarProps) {
  return (
    <aside className="w-full md:w-80 bg-[#111] border-r border-white/10 flex flex-col md:h-screen md:sticky top-0 z-20">
      {/* Header Profile Area */}
      <div className="p-8 pb-6 border-b border-white/5">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 mb-5 shadow-lg shadow-purple-500/20 p-1">
          <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden relative">
            <Image 
              src="/dp.jpg" 
              alt="Mezrex" 
              fill 
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Mezrex</h1>
        <p className="text-sm text-zinc-400 mt-1">2D Animator / VFX Artist</p>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            href={`/?tab=${tab.id}`}
            className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
              activeTab === tab.id
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {/* Social Links Footer */}
      <div className="p-6 border-t border-white/5 flex items-center gap-4">
        <a href="https://www.youtube.com/@Mezrexvfx1" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-red-500 transition-colors">
          <Youtube size={20} />
        </a>
        <a href="https://www.instagram.com/mezrexvfx/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-pink-500 transition-colors">
          <Instagram size={20} />
        </a>
      </div>
    </aside>
  );
}
