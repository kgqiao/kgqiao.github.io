/**
 * ============================================================================
 * GLOBAL TYPES & INTERFACES (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * 
 * Defines all TypeScript contracts across the portfolio:
 * - App views and navigation
 * - Artwork entries for the Visual Art gallery (all fields optional except image & category)
 * - Project entries for Coding & Systems
 * - Writing post entries for Essays & Fiction (clean: no likes, bookmarks, or min read)
 * - Interdisciplinary project items
 * - Engineering skills
 */

// Top-level navigation views
export type AppView = 'main' | 'code' | 'art' | 'writing' | 'interdisciplinary';

export type Discipline = 'all' | 'programmer' | 'artist' | 'writer' | 'interdisciplinary';

// ----------------------------------------------------------------------------
// 1. ART GALLERY TYPES
// ----------------------------------------------------------------------------
export type ArtCategory =
  | 'All'
  | 'Digital Painting'
  | 'Ink & Mixed Media'
  | 'Chinese Painting'
  | 'Book Design'
  | 'Website Design'
  | (string & {});

export interface Artwork {
  id: string;
  imageUrl: string;            // REQUIRED: Main artwork image source URL
  category: ArtCategory;       // REQUIRED: Art discipline / category
  title?: string;              // OPTIONAL: Title of the artwork
  year?: string;               // OPTIONAL: Year of creation
  medium?: string;             // OPTIONAL: Materials used (e.g., Ink on Xuan paper)
  dimensions?: string;         // OPTIONAL: Physical dimensions
  description?: string;        // OPTIONAL: Short summary
  story?: string;              // OPTIONAL: Artistic concept or story behind the piece
  hiResUrl?: string;           // OPTIONAL: High resolution zoom URL
  aspectRatio?: 'square' | 'portrait' | 'landscape'; // Layout aspect ratio hint
  tags?: string[];             // OPTIONAL: Keyword tags
  featured?: boolean;          // OPTIONAL: Highlight on featured views
  exhibition?: string;         // OPTIONAL: Exhibition history
  palette?: string[];          // OPTIONAL: Dominant color swatches
}

// ----------------------------------------------------------------------------
// 2. CODING & SOFTWARE TYPES
// ----------------------------------------------------------------------------
export type ProjectCategory =
  | 'All'
  | 'Web Applications'
  | 'Creative Coding'
  | 'Developer Tools'
  | 'ML Models'
  | (string & {});

export interface ProjectMilestone {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;                                // Project title
  tagline: string;                              // Short subtitle / elevator pitch
  category: ProjectCategory;                    // Category tag
  year?: string;                                // Year built
  role?: string;                                // Your role (e.g. Lead Engineer)
  thumbnail: string;                            // Card thumbnail image
  coverImage?: string;                          // Modal banner image
  liveDemoUrl?: string;                         // Link to live production demo
  githubUrl?: string;                           // Link to GitHub repository
  overview: string;                             // Detailed project overview
  problem?: string;                             // Problem statement
  solution?: string;                            // Engineering solution
  architecture?: string[];                      // Architecture bullet points
  techStack: Array<{ name: string; category?: string }>; // Technologies used
  keyFeatures: string[];                        // Core feature highlights
  codeSnippet?: {                               // Representative code sample
    language: string;
    filename: string;
    code: string;
  };
  milestones?: ProjectMilestone[];              // Key development milestones
  interactiveDemoType?: 'particles' | 'shader-canvas' | 'terminal-sim' | 'markdown-live';
  featured?: boolean;
  status?: string;                              // e.g. "Production", "Active", "Shipped", "Research"
}

export interface EngineeringSkill {
  category: string;
  name: string;
  level: string;
  focus: string;
  tags: string[];
}

// ----------------------------------------------------------------------------
// 3. WRITING GALLERY TYPES
// ----------------------------------------------------------------------------
export type WritingCategory = 'All' | 'Essays' | 'Short Fiction' | (string & {});

export interface WritingPost {
  id: string;
  title: string;               // Essay or Story Title
  subtitle: string;            // Descriptive subtitle
  date: string;                // Date published / written
  category: WritingCategory;   // Category
  excerpt: string;             // Short teaser paragraph for the preview card
  content: string;             // Full markdown article text
  tags: string[];              // Keyword tags
  coverImage?: string;         // Optional cover image for the article
  quote?: string;              // Highlight pull quote
  readingTime?: string;        // Auto-calculated or manual reading time (e.g. "4 min read")
  wordCount?: number;          // Auto-calculated or manual word count
}

// ----------------------------------------------------------------------------
// 4. INTERDISCIPLINARY WORK TYPES
// ----------------------------------------------------------------------------
export interface InterdisciplinaryItem {
  id: string;
  title: string;
  role?: string;               // e.g. "Editor-in-Chief & Lead Publication Designer"
  category?: string;           // e.g. "Editorial Direction · Print & Publishing"
  disciplines: string[];       // e.g. ['Writing', 'Visual Art', 'Publishing']
  tagline: string;
  description: string;
  projectId?: string;
  badgeColor?: string;
  pillClass?: string;
  technologies: string[];
  keyHighlights: string[];
  status?: string;
}

// ----------------------------------------------------------------------------
// 5. READER SETTINGS (Clean Typography Controls)
// ----------------------------------------------------------------------------
export interface ReaderSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'serif' | 'sans' | 'mono';
  lineHeight: 'normal' | 'relaxed' | 'loose';
}
