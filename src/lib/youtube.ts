export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

// Next.js will cache this fetch and revalidate it every hour (3600 seconds).
// This is how we achieve "Auto-sync" without destroying your performance or API limits!
export async function getPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    // Return mock data if no API key is provided yet
    console.warn("No YOUTUBE_API_KEY found. Returning mock data.");
    return generateMockVideos();
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

    return data.items
      .filter((item: any) => item.snippet.title !== "Private video" && item.snippet.title !== "Deleted video")
      .map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: 
          item.snippet.thumbnails?.maxres?.url || 
          item.snippet.thumbnails?.high?.url || 
          item.snippet.thumbnails?.medium?.url || 
          "",
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
      }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    return generateMockVideos();
  }
}

// Fallback data so the UI looks good while we wait for the real API key
function generateMockVideos(): YouTubeVideo[] {
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `mock-${i}`,
    title: `Cinematic VFX Breakdown 0${i + 1}`,
    thumbnail: `https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80&auto=format&fit=crop`,
    url: "#"
  }));
}
