export interface YouTubeVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  url: string;
}

// Next.js will cache this fetch and revalidate it every hour (3600 seconds).
// This is how we achieve "Auto-sync" without destroying your performance or API limits!
export async function getPlaylistVideos(playlistId: string, category: string): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    // Return custom mock data according to category if no API key is provided
    console.warn("No YOUTUBE_API_KEY found. Returning custom mock data.");
    return generateMockVideos(category);
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`,
      { next: { revalidate: 3600 } } 
    );

    if (!res.ok) {
      throw new Error("Failed to fetch YouTube data");
    }

    const data = await res.json();
    if (!data.items) return [];

    const allVideos = data.items
      .filter((item: any) => item.snippet.title !== "Private video" && item.snippet.title !== "Deleted video")
      .map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description || "",
        thumbnail: 
          item.snippet.thumbnails?.maxres?.url || 
          item.snippet.thumbnails?.high?.url || 
          item.snippet.thumbnails?.medium?.url || 
          "",
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      }));

    // If it's a custom playlist curated by the user (i.e. not the main channel uploads feed fallback),
    // return all videos directly as they are from the YouTube playlist!
    if (playlistId !== "UUZos9ijvsqTg8D8_9gO-YhQ") {
      return allVideos;
    }

    // Dynamic filtering according to category
    if (category === "animated-illustrations") {
      const filtered = allVideos.filter((video: any) => {
        const title = video.title.toLowerCase();
        const desc = video.description.toLowerCase();
        return (
          title.includes("animation") ||
          title.includes("animate") ||
          title.includes("illustrat") ||
          title.includes("saas") ||
          title.includes("blender") ||
          desc.includes("animation") ||
          desc.includes("animate") ||
          desc.includes("illustrat")
        );
      });
      // Fallback in case titles/descriptions have slight variations:
      return filtered.length > 0 ? filtered : allVideos.filter((video: any) => {
        const title = video.title.toLowerCase();
        return (
          title.includes("animation") || 
          title.includes("saas") || 
          title.includes("fool") || 
          title.includes("luffy")
        );
      });
    }

    if (category === "vtuber-model-vfx") {
      const filtered = allVideos.filter((video: any) => {
        const title = video.title.toLowerCase();
        const desc = video.description.toLowerCase();
        return (
          title.includes("vtuber") ||
          title.includes("avatar") ||
          title.includes("rig") ||
          title.includes("model") ||
          title.includes("live2d") ||
          desc.includes("vtuber") ||
          desc.includes("avatar") ||
          desc.includes("rig") ||
          desc.includes("model") ||
          desc.includes("live2d")
        );
      });
      // Fallback: Since VTuber is a highly specific niche, if there are no public videos explicitly tagged yet,
      // map character focus rigging/edits to avoid an empty tab (e.g. Maki, LOTM, Eren & Mikasa, Toji).
      if (filtered.length === 0) {
        return allVideos.filter((video: any) => {
          const title = video.title.toLowerCase();
          return (
            title.includes("maki") || 
            title.includes("lotm") || 
            title.includes("yuta") || 
            title.includes("eren") || 
            title.includes("toji")
          );
        });
      }
      return filtered;
    }

    if (category === "personal-vfx") {
      return allVideos.filter((video: any) => {
        const title = video.title.toLowerCase();
        const desc = video.description.toLowerCase();
        return (
          title.includes("vfx") ||
          title.includes("edit") ||
          title.includes("amv") ||
          title.includes("sfx") ||
          title.includes("aftereffects") ||
          title.includes("after effects") ||
          title.includes("panic") ||
          title.includes("golden brown") ||
          title.includes("running") ||
          title.includes("skyfall") ||
          title.includes("spider-man") ||
          desc.includes("vfx") ||
          desc.includes("edit") ||
          desc.includes("amv") ||
          desc.includes("sfx")
        );
      });
    }

    return allVideos;
  } catch (error) {
    console.error("YouTube API Error:", error);
    return generateMockVideos(category);
  }
}

// Fallback data so the UI looks good while we wait for the real API key
function generateMockVideos(category: string): YouTubeVideo[] {
  if (category === "animated-illustrations") {
    return [
      {
        id: "mock-anim-1",
        title: "Mitsuri & Obanai [Fan Animation]",
        description: "2D Fan Animation created in After Effects and Photoshop. Prepared layers and custom rigging.",
        thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-anim-2",
        title: "Just Tried SaaS Motion Design",
        description: "Modern UI/UX SaaS product animation showcase with clean vector layouts and keyframing.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-anim-3",
        title: "Praise The Fool || LOTM Animation",
        description: "Character illustration brought to life using custom Blender layers and 3D depth camera effects.",
        thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-anim-4",
        title: "Anime Fight Scene Illustration Animation",
        description: "Dynamic layered character animation with smooth parallax and custom particle FX.",
        thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80&auto=format&fit=crop",
        url: "#"
      }
    ];
  } else if (category === "vtuber-model-vfx") {
    return [
      {
        id: "mock-vtuber-1",
        title: "VTuber Model Rigging & Magic Circle VFX",
        description: "Showcasing toggleable spellcasting visual effects custom-rigged for a Live2D VTuber avatar.",
        thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-vtuber-2",
        title: "VTuber Custom Aura & Particle Showcase",
        description: "Interactive glowing elemental auras designed to follow character movements seamlessly.",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-vtuber-3",
        title: "Live2D Model Rigging Breakdown & FX",
        description: "Behind-the-scenes rigging showing physics controllers and custom transparency shader transitions.",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80&auto=format&fit=crop",
        url: "#"
      }
    ];
  } else {
    return [
      {
        id: "mock-vfx-1",
        title: "Panic - Yuta Okkotsu [Edit/AMV] 4K!",
        description: "High energy cinematic anime edit in 4K with custom sound effects and style transitions.",
        thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-vfx-2",
        title: "Eren and Mikasa - Golden Brown [Edit/AMV]",
        description: "Mood edit of Attack on Titan using After Effects compositing and vintage color grading.",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-vfx-3",
        title: "Sci-Fi Particle Compositing Breakdown",
        description: "Visual effects breakdown showcasing camera tracking, stock element compositing, and color matching.",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80&auto=format&fit=crop",
        url: "#"
      },
      {
        id: "mock-vfx-4",
        title: "Spider-Man Electro Fight VFX Recreation",
        description: "Recreating the electric lightning effects from Amazing Spider-Man 2 using Trapcode Particular.",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80&auto=format&fit=crop",
        url: "#"
      }
    ];
  }
}
