/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: PORTFOLIO CONTENT & DATA
 * ============================================================================
 */

import { PROFILE } from './profile.js';

// ============================================================================
// 1. VISUAL ART & DESIGN GALLERY DATA (ARTWORKS_DATA)
// ============================================================================
export const ARTWORKS_DATA = [
  {
    id: 'berry-drink',
    imageUrl: '/art/2026/berry_drink.png',
    category: 'Digital Painting',
    title: 'Berry Drink',
    year: '2026',
    medium: 'Digital Painting',
    description: 'Refreshing layered berry beverage illustration with delicate fruit textures.',
    featured: true,
  },
  {
    id: 'art-01',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    category: 'Chinese Painting',
    title: 'Ink Mist Mountain Peak',
    year: '2024',
    medium: 'Traditional Ink & Mineral Pigments on Xuan Paper',
    dimensions: '68 x 138 cm',
    aspectRatio: 'portrait',
    description: 'Layered monochrome mountain ridges dissolving into early morning valley fog.',
    story: 'Exploring the Daoist concept of empty space (留白, liúbái) where untouched paper evokes mist, water, and infinite atmospheric depth.',
    tags: ['Shuimo', 'Landscape', 'Xuan Paper', 'Traditional'],
    featured: true,
  },
];

// ============================================================================
// 2. CODING & SOFTWARE PROJECTS (PROJECTS_DATA)
// ============================================================================
export const PROJECTS_DATA = [
  {
    id: 'proj-01',
    title: 'Chronosync Workspace',
    tagline: 'High-performance local-first notes and infinite canvas engine with offline CRDT sync.',
    category: 'Web Applications',
    year: '2024',
    role: 'Full-Stack Software Engineer',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80',
    liveDemoUrl: PROFILE.social.github.url,
    githubUrl: PROFILE.social.github.url,
    overview: 'A local-first, zero-latency knowledge workspace combining rich markdown notes, an infinite vector canvas, and peer-to-peer CRDT state replication.',
    problem: 'Cloud-dependent document editors introduce network latency, vendor lock-in, and unpredictable data availability when offline.',
    solution: 'Engineered an in-browser storage layer using Origin Private File System (OPFS) and Web Workers, achieving sub-5ms commit times with real-time peer sync.',
    architecture: [
      'Origin Private File System (OPFS) storage pipeline with binary block indexing',
      'Conflict-free Replicated Data Types (Yjs/CRDT) state layer for conflict-free merging',
      'Web Workers background thread for non-blocking document indexing and full-text search',
      'Fast modern web frontend interface with smooth virtualization',
    ],
    techStack: [
      { name: 'JavaScript', category: 'Language' },
      { name: 'OPFS', category: 'Storage' },
      { name: 'Web Workers', category: 'Performance' },
      { name: 'Tailwind CSS', category: 'Styling' },
    ],
    keyFeatures: [
      'Sub-5ms local write latency with zero server dependency',
      'Bi-directional document linking and interactive knowledge graph',
      'Real-time peer-to-peer collaboration over WebRTC data channels',
      'End-to-end client-side encryption for sensitive user notes',
    ],
    codeSnippet: {
      language: 'javascript',
      filename: 'storageEngine.js',
      code: `// OPFS High-Throughput Storage Access
export async function writeDocumentBlock(docId, payload) {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle(\`doc_\${docId}.bin\`, { create: true });
  const syncHandle = await fileHandle.createSyncAccessHandle();
  
  const bytesWritten = syncHandle.write(payload, { at: 0 });
  syncHandle.flush();
  syncHandle.close();
  return bytesWritten;
}`,
    },
    milestones: [
      { title: 'Core Architecture', description: 'Implemented OPFS byte stream reader and CRDT state engine.' },
      { title: 'Performance Tuning', description: 'Virtual renderer handling 10,000+ notes at 60 FPS.' },
      { title: 'Public Release', description: 'Deployed open-source beta client and desktop wrapper.' },
    ],
    interactiveDemoType: 'terminal-sim',
    featured: true,
  },
];

// ============================================================================
// 3. TECHNICAL SKILLS MATRIX (ENGINEERING_SKILLS)
// ============================================================================
export const ENGINEERING_SKILLS = [
  {
    category: 'Languages & Core',
    name: 'Python, C++ & JavaScript',
    level: 'Advanced',
    focus: 'Modern Standards, Systems Programming, Web APIs, Event Loop, Performance Profiling',
    tags: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frontend & Architecture',
    name: 'Modern Web & Systems',
    level: 'Advanced',
    focus: 'Vite, Tailwind CSS, State Management, Responsive Design, OPFS, Web Workers',
    tags: ['Vite', 'Tailwind CSS', 'Web Workers', 'OPFS'],
  },
  {
    category: 'Graphics & Visual Computing',
    name: 'Computer Vision & Creative Graphics',
    level: 'Advanced',
    focus: 'WebGL 2.0, GLSL Shaders, 2D & 3D Vision, Canvas 2D API, Raymarching',
    tags: ['WebGL', 'GLSL', 'Computer Vision', 'Canvas API'],
  },
  {
    category: 'Backend & Infrastructure',
    name: 'Distributed Infrastructure & ML Pipelines',
    level: 'Proficient',
    focus: 'Distributed Systems, Cloud Native, ML Pipelines, REST & GraphQL APIs, Docker',
    tags: ['ML Pipelines', 'Distributed', 'Docker', 'Cloud Native'],
  },
];

// ============================================================================
// 4. WRITING GALLERY (WRITING_POSTS_DATA)
// ============================================================================
export const WRITING_POSTS_DATA = [
  {
    id: 'essay-01',
    title: 'The Philosophy of Emptiness: Liubai in Modern Interface Design',
    subtitle: 'What classical Song Dynasty landscape painters can teach us about digital typography and visual hierarchy.',
    date: 'March 2024',
    category: 'Essays',
    excerpt: 'In classical Chinese painting, white space is not merely empty space — it is the active ground from which form emerges. Applying this philosophy to software UI unlocks breathing room and mental clarity.',
    tags: ['Design Theory', 'Art History', 'UI/UX', 'Aesthetics'],
    coverImage: 'https://images.unsplash.com/photo-1507842229451-79b1be886a29?auto=format&fit=crop&w=1200&q=80',
    quote: 'Emptiness is not the absence of content, but the condition that allows content to resonate.',
    content: `## The Untouched Xuan Paper

In classical Chinese landscape painting (*shanshui*), master painters of the Song and Yuan dynasties rarely covered the entire surface of the paper with ink. Large swaths of the absorbent Xuan paper were left untouched. This technique is known as **留白 (*liúbái*)** — literally, "preserving the white."

Yet to regard this untouched space as a void is to misunderstand the medium. The empty paper is not nothingness; it is mountain mist drifting through valleys, boundless rivers reflecting the morning sky, or infinite atmospheric depth.

### Negative Space in Digital Software

Modern user interfaces are often choked by visual noise:
- Redundant borders and nested container cards
- Unnecessary gradient fills and glowing shadows
- Excessive badges, counters, and decorative widgets

When every pixel clamors for attention, the human eye finds no sanctuary. By contrast, embracing *liúbái* in digital systems means:

1. **Hierarchy Through Proximity**: Using generous padding and mathematical spacing scales rather than physical boxes to separate concepts.
2. **Typographic Rhythm**: Allowing high-contrast headers to breathe against expansive dark canvases.
3. **Intentional Restraint**: Every visual element must justify its presence.

> "A room is useful because of the empty space within its walls; a wheel turns because of the hub that holds nothing." — Dao De Jing

### Designing for Clarity

As builders of software and creators of art, our highest duty is not to fill every corner with stimuli, but to construct clear, spacious environments where human thought and creative intention can thrive.`,
  },
];

// ============================================================================
// 5. INTERDISCIPLINARY WORK (INTERDISCIPLINARY_DATA)
// ============================================================================
export const INTERDISCIPLINARY_DATA = [
  {
    id: 'anthology-obsidian-review',
    title: 'The Obsidian Review — Annual Anthology',
    role: 'Editor-in-Chief & Lead Publication Designer',
    category: 'Editorial Direction · Print & Publishing',
    disciplines: ['Editorial Direction', 'Print & Layout Design', 'Publication Leadership'],
    tagline: 'Annual print anthology uniting literary curation, editorial leadership, and bespoke publication design.',
    description:
      'Directed the end-to-end production of an annual literary publication. Curated submissions, copy-edited poetry/prose, and structured thematic arcs while leading an editorial staff and managing production schedules from call-for-submissions to print delivery. Engineered the complete physical publication layout, establishing typography pairings, InDesign grid systems, cover art curation, and prepress proofing.',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
    pillClass: 'bubbly-pill-writer',
    technologies: ['Adobe InDesign', 'Typography & Grids', 'Prepress Production', 'Copy Editing', 'Staff Leadership'],
    keyHighlights: [
      'Editorial Direction: Curating submissions, copy-editing poetry/prose, and theme structuring.',
      'Print & Layout Design: Typesetting, typography pairings, grid systems (InDesign), cover art curation, and prepress production.',
      'Leadership: Directing an editorial staff and managing production schedules from call-for-submissions to print delivery.',
    ],
  },
  {
    id: 'inter-01',
    title: 'InkDiffusion: Generative AI & Asian Aesthetics',
    disciplines: ['Software Engineering', 'Fine Art', 'ML Research'],
    tagline: 'Bridging 1,000-year-old traditional ink painting principles with modern diffusion models and interactive shaders.',
    description: 'A comprehensive creative and technical project combining custom machine learning model training (LoRA/PyTorch), real-time WebGL brush simulation, and art historical analysis of Song Dynasty painting treatises.',
    projectId: 'proj-01',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
    pillClass: 'bubbly-pill-artist',
    technologies: ['PyTorch', 'WebGL', 'FastAPI', 'Traditional Ink', 'Art History'],
    keyHighlights: [
      'Trained diffusion models to understand classical aesthetic principles like 留白 (liúbái)',
      'Built interactive WebGL canvas allowing artists to paint with AI guidance',
      'Published companion essay examining the ethics and philosophy of synthetic brushwork',
    ],
  },
];
