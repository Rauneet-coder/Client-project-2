// ── Shared TypeScript types for the VFX portfolio ──────────

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDesc: string;
  thumbnail: string;
  previewVideo?: string; // short loop for card
  heroVideo?: string;    // full video embed URL (YouTube/Vimeo)
  tools: string[];
  client?: string;
  year: number;
  featured: boolean;
  tags: string[];
  gallery?: string[];
  credits?: Credit[];
}

export interface Credit {
  role: string;
  name: string;
}

export interface SocialPost {
  id: string;
  platform: "instagram" | "youtube" | "behance" | "linkedin";
  thumbnail: string;
  caption: string;
  url: string;
  views?: string;
  likes?: string;
}

export interface Client {
  name: string;
  logo?: string;
  logoText: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
