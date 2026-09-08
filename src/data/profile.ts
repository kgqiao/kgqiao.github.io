/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: PROFILE, SOCIAL & PALETTE CONFIGURATION
 * ============================================================================
 * 
 * Edit this file to customize your personal information, bio, headline,
 * social links, active trio color palette, and discipline landing highlights.
 * All changes here will automatically propagate across the entire portfolio!
 */

import { PaletteId } from './palettes';

export interface ProfileSocialLink {
  url: string;      // Full URL to profile (e.g., https://github.com/yourhandle)
  handle: string;   // Username or handle (e.g., yourhandle)
  display: string;  // Formatted display text (e.g., github.com/yourhandle)
}

export interface DisciplineHeroHighlight {
  label?: string;
  value?: string;
}

export interface DisciplineHeroConfig {
  badge?: string;
  title?: string;
  role?: string;
  tagline?: string;
  overview?: string;
  highlights?: DisciplineHeroHighlight[];
}

export interface ProfileConfig {
  name: string;        // Full name (updating this updates the entire site, browser title, metadata, etc.)
  initials?: string;   // Optional initials (if omitted, automatically derived from name)
  palette: PaletteId;  // Active trio color palette key (see options below)
  tagline: string;     // Short professional tagline shown on top pill
  headline: string;    // Main hero headline description
  bio: string;         // Biography paragraph for About section
  avatarUrl: string;   // Profile photo or avatar image URL
  location?: string;   // Optional location (left empty by default)
  email?: string;      // Optional email (left empty by default)
  social: {
    github: ProfileSocialLink;
    linkedin: ProfileSocialLink;
  };
  disciplineLandings: {
    code: DisciplineHeroConfig;
    art: DisciplineHeroConfig;
    writing: DisciplineHeroConfig;
    interdisciplinary?: DisciplineHeroConfig;
  };
}

/**
 * Automatically derives 2-letter monogram initials from any full name string.
 * Example: "Katherine Qiao" -> "KQ", "Ada Lovelace" -> "AL"
 */
export function deriveInitials(name: string): string {
  if (!name || typeof name !== 'string') return 'KQ';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const RAW_PROFILE_DATA: ProfileConfig = {
  // --------------------------------------------------------------------------
  // 1. BRAND IDENTITY & NAME
  // --------------------------------------------------------------------------
  // Updating 'name' here automatically propagates to:
  // - Top navbar logo monogram and display name
  // - Hero section header and greeting
  // - About section philosophy card
  // - All discipline landing pages
  // - Browser tab <title> and OpenGraph metadata
  // - Footer copyright text
  name: 'Katherine Qiao',
  initials: 'KQ', // Optional: remove or leave empty to auto-derive from name (e.g. "Katherine Qiao" -> "KQ")

  // --------------------------------------------------------------------------
  // 2. ACTIVE COLOR PALETTE (1-LINE EASY SWITCHER)
  // --------------------------------------------------------------------------
  // Change this ONE line to immediately change all site colors!
  // Options:
  //   • 'studio-triad'        : Emerald Jade (Code), Cinnabar Rose (Art), Honey Amber (Writing) [DEFAULT]
  //   • 'celestial-atelier'   : Electric Sapphire (Code), Imperial Violet (Art), Coral-Gold (Writing)
  //   • 'cybernetic-noir'     : Glacial Cyan (Code), Neon Fuchsia (Art), Sunburst Tangerine (Writing)
  //   • 'nordic-terracotta'   : Nordic Pine Teal (Code), Terracotta Ruby (Art), Tuscan Sandstone (Writing)
  //   • 'indigo-vermilion'    : Prussian Indigo (Code), Vermilion Flame (Art), Solar Amber (Writing)
  palette: 'studio-triad',

  // --------------------------------------------------------------------------
  // 3. HERO & HEADER COPY
  // --------------------------------------------------------------------------
  tagline: 'Software Engineer • Artist • Writer',
  headline: 'Software engineering, visual art, and essays & short fiction.',
  bio: 'Software engineer, visual artist, and writer. Crafting high-performance web systems, traditional Chinese ink & digital art, and critical essays.',

  // --------------------------------------------------------------------------
  // 4. PROFILE AVATAR
  // --------------------------------------------------------------------------
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',

  // --------------------------------------------------------------------------
  // 5. SOCIAL PROFILES (DIRECT LINKS)
  // --------------------------------------------------------------------------
  social: {
    github: {
      url: 'https://github.com/kgqiao',
      handle: 'kgqiao',
      display: 'github.com/kgqiao',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/katherine-qiao/',
      handle: 'katherine-qiao',
      display: 'linkedin.com/in/katherine-qiao',
    },
  },

  // --------------------------------------------------------------------------
  // 6. DISCIPLINE LANDING PAGES (ALL FIELDS 100% OPTIONAL)
  // --------------------------------------------------------------------------
  disciplineLandings: {
    code: {
      badge: 'Discipline 01 · Software & Systems',
      title: 'Software Systems & Engineering',
      role: 'Full-Stack Software Engineer & Systems Architect',
      tagline: 'Building high-performance local-first web applications, graphics pipelines, and machine learning models.',
      overview: 'Specializing in reactive user interfaces, browser-native file storage (OPFS), peer-to-peer CRDT state synchronization, WebGL shaders, and high-throughput developer tools.',
      highlights: [
        { label: 'Specialization', value: 'Local-First Apps & Systems' },
        { label: 'Primary Languages', value: 'TypeScript, Rust, Python' },
        { label: 'Frontend & Graphics', value: 'React, WebGL 2.0, Tailwind' },
        { label: 'Systems & Architecture', value: 'Distributed & Reactive' },
      ],
    },
    art: {
      badge: 'Discipline 02 · Visual Art & Design',
      title: 'Visual Art & Design Portfolio',
      role: 'Visual Artist & Designer',
      tagline: 'Bridging 1,000-year-old traditional Chinese ink on Xuan paper with modern digital painting and design systems.',
      overview: 'Curated gallery of traditional monochrome ink landscapes (水墨山水), digital illustrations, book typography, and minimalist digital aesthetics guided by the philosophy of 留白 (liúbái).',
      highlights: [
        { label: 'Primary Mediums', value: 'Traditional Ink & Xuan Paper, Digital' },
        { label: 'Aesthetic Philosophy', value: 'Daoist Liúbái (Empty Space)' },
        { label: 'Gallery Status', value: 'Curated Exhibition Works' },
        { label: 'Focus Disciplines', value: 'Ink Painting, Digital Art & Design' },
      ],
    },
    writing: {
      badge: 'Discipline 03 · Writing & Essays',
      title: 'Essays & Literary Publications',
      role: 'Essayist & Fiction Writer',
      tagline: 'Critical essays on art history and interface philosophy alongside speculative short fiction.',
      overview: 'A collection of longform essays investigating negative space in software, Chinese aesthetics, visual culture, and narrative worldbuilding with distraction-free typography.',
      highlights: [
        { label: 'Core Themes', value: 'Design Philosophy, Aesthetics' },
        { label: 'Publishing Formats', value: 'Critical Essays & Short Fiction' },
        { label: 'Reader Experience', value: 'Distraction-Free Reading Mode' },
        { label: 'Specialization', value: 'Longform & Systems Essays' },
      ],
    },
  },
};

export const PROFILE: ProfileConfig & { initials: string } = {
  ...RAW_PROFILE_DATA,
  initials: RAW_PROFILE_DATA.initials?.trim() || deriveInitials(RAW_PROFILE_DATA.name),
};


