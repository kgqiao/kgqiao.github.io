/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: PORTFOLIO CONTENT & DATA
 * ============================================================================
 */

import { PROFILE } from './profile.js';

// Bundle images directly through Vite so paths work in all deployments
import mountainsImg from '../content/art/Chinese Painting/Mountains After Rain_Watermark.png';
import mountainsPreview from '../content/art/Chinese Painting/Mountains After Rain_Watermark_preview.webp';
import fallColorsImg from '../content/art/Chinese Painting/Fall Colors_Watermark.png';
import fallColorsPreview from '../content/art/Chinese Painting/Fall Colors_Watermark_preview.webp';
import forestsImg from '../content/art/Chinese Painting/Forests_Watermark.jpg';
import forestsPreview from '../content/art/Chinese Painting/Forests_Watermark_preview.webp';
import berryDrinkImg from '../../public/art/2026/berry_drink.png';
import berryDrinkPreview from '../../public/art/2026/berry_drink_preview.webp';

// ============================================================================
// 1. VISUAL ART & DESIGN GALLERY DATA (ARTWORKS_DATA)
// Categorized by: Chinese Painting, Digital Painting, Illustration
// ============================================================================
export const ARTWORKS_DATA = [
  // --- Chinese Painting (水墨画) ---
  {
    id: 'mountains-after-rain',
    title: 'Mountains After Rain',
    imageUrl: mountainsImg,
    previewUrl: mountainsPreview,
    category: 'Chinese Painting',
    year: '2024',
    medium: 'Traditional Chinese Ink & Mineral Pigments on Xuan Paper',
    description: 'Layered monochrome mountain ridges dissolving into valley mist, exploring the Daoist philosophy of liúbái (留白).',
    featured: true,
  },
  {
    id: 'fall-colors',
    title: 'Fall Colors',
    imageUrl: fallColorsImg,
    previewUrl: fallColorsPreview,
    category: 'Chinese Painting',
    year: '2024',
    medium: 'Traditional Chinese Ink & Mineral Pigments on Xuan Paper',
    description: 'Atmospheric autumn landscape with vibrant mineral ochre and cinnabar washes across misty crags.',
    featured: true,
  },
  {
    id: 'forests',
    title: 'Forests',
    imageUrl: forestsImg,
    previewUrl: forestsPreview,
    category: 'Chinese Painting',
    year: '2023',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'Textured brushwork depicting dense ancient forest groves and winding valley pathways.',
    featured: true,
  },
  {
    id: 'after-rain',
    title: 'After Rain',
    category: 'Chinese Painting',
    year: '2023',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'Moist ink wash study capturing the tranquil atmosphere of damp earth and clearing fog.',
    featured: false,
  },
  {
    id: 'black-and-white-mountains',
    title: 'Black and White Mountains',
    category: 'Chinese Painting',
    year: '2023',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'High-contrast monochrome landscape emphasizing structural mountain contours and negative space.',
    featured: false,
  },
  {
    id: 'dusks-land-after-rain',
    title: "Dusk's Land After Rain",
    category: 'Chinese Painting',
    year: '2023',
    medium: 'Traditional Chinese Ink & Mineral Wash on Xuan Paper',
    description: 'Twilight settling over rain-swept wetlands with delicate ink tonalities.',
    featured: false,
  },
  {
    id: 'shanting-district',
    title: 'Shanting District',
    category: 'Chinese Painting',
    year: '2023',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'Architectural pavilions and cliffside dwellings interwoven with mountain scenery.',
    featured: false,
  },
  {
    id: 'shuixiang',
    title: 'Shuixiang (Waterside Village)',
    category: 'Chinese Painting',
    year: '2022',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'Jiangnan-style whitewashed canal homes, stone bridges, and tranquil reflective waterways.',
    featured: false,
  },
  {
    id: 'spring-in-a-waterside-village',
    title: 'Spring in a Waterside Village',
    category: 'Chinese Painting',
    year: '2022',
    medium: 'Traditional Chinese Ink & Light Color on Xuan Paper',
    description: 'Seasonal awakening in a riverside town with delicate willow branches and gentle canal ripples.',
    featured: false,
  },
  {
    id: 'trees-in-bloom',
    title: 'Trees in Bloom',
    category: 'Chinese Painting',
    year: '2022',
    medium: 'Traditional Chinese Ink & Mineral Pigments on Xuan Paper',
    description: 'Springtime blossoms rendered with expressive calligraphic brushwork.',
    featured: false,
  },
  {
    id: 'winter-village',
    title: 'Winter Village',
    category: 'Chinese Painting',
    year: '2022',
    medium: 'Traditional Chinese Ink on Xuan Paper',
    description: 'Quiet snow-covered rooftops and secluded winter pathways rendered through preserved white paper.',
    featured: false,
  },

  // --- Digital Painting ---
  {
    id: 'berry-drink',
    title: 'Berry Drink',
    imageUrl: berryDrinkImg,
    previewUrl: berryDrinkPreview,
    category: 'Digital Painting',
    year: '2026',
    medium: 'Digital Painting',
    description: 'Layered iced berry beverage study with delicate fruit textures, condensation, and color gradients.',
    featured: true,
  },
  {
    id: 'citrus',
    title: 'Citrus',
    category: 'Digital Painting',
    year: '2022',
    medium: 'Digital Painting',
    description: 'Vibrant still-life study of sliced citrus fruits exploring light translucency and pulp texture.',
    featured: false,
  },
  {
    id: 'citrus-edited',
    title: 'Citrus (Refined)',
    category: 'Digital Painting',
    year: '2022',
    medium: 'Digital Painting',
    description: 'Color-calibrated digital painting exploring specular highlights and warm tonal balance.',
    featured: false,
  },
  {
    id: 'penguins',
    title: 'Penguins',
    category: 'Digital Painting',
    year: '2021',
    medium: 'Digital Painting',
    description: 'Whimsical character study of antarctic wildlife in cold ambient atmospheric light.',
    featured: false,
  },
  {
    id: 'hand-sketch-01042022',
    title: 'Hand Sketch (01.04.2022)',
    category: 'Digital Painting',
    year: '2022',
    medium: 'Digital Sketch & Study',
    description: 'Anatomical study focusing on planar hand perspective, gestural articulation, and volume.',
    featured: false,
  },
  {
    id: 'hand-sketch-01182022',
    title: 'Hand Sketch (01.18.2022)',
    category: 'Digital Painting',
    year: '2022',
    medium: 'Digital Sketch & Study',
    description: 'Fingertip articulation and foreshortened perspective analysis in charcoal brush simulation.',
    featured: false,
  },
  {
    id: 'hand-sketch-11132021',
    title: 'Hand Sketch (11.13.2021)',
    category: 'Digital Painting',
    year: '2021',
    medium: 'Digital Sketch & Study',
    description: 'Gestural line work and structural anatomy exercise.',
    featured: false,
  },
  {
    id: 'watermelon',
    title: 'Watermelon',
    category: 'Digital Painting',
    year: '2022',
    medium: 'Digital Painting',
    description: 'Refreshing fruit slice study capturing crisp texture, seed patterns, and summer palette.',
    featured: false,
  },
  {
    id: 'eye-study',
    title: 'Eye Study',
    category: 'Digital Painting',
    year: '2021',
    medium: 'Digital Painting',
    description: 'Detailed iris rendering and specular reflections examining realism in digital brushwork.',
    featured: false,
  },
  {
    id: 'bubbly',
    title: 'Bubbly',
    category: 'Digital Painting',
    year: '2021',
    medium: 'Digital Painting',
    description: 'Dynamic effervescent bubble formations and fluid refractive light patterns.',
    featured: false,
  },

  // --- Illustration ---
  {
    id: 'at-my-fingertips',
    title: 'At My Fingertips',
    category: 'Illustration',
    year: '2022',
    medium: 'Illustration & Graphic Art',
    description: 'Expressive illustration exploring tactile human interaction with the surrounding world.',
    featured: false,
  },
  {
    id: 'classics',
    title: 'Classics',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Editorial',
    description: 'Reflective tribute celebrating classical literature, timeless forms, and storytelling.',
    featured: false,
  },
  {
    id: 'dark-humor',
    title: 'Dark Humor',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Satire',
    description: 'Conceptual satirical visual narrative balancing witty motifs with moody graphic pacing.',
    featured: false,
  },
  {
    id: 'dizzy',
    title: 'Dizzy',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Graphic Art',
    description: 'Whirling kinetic composition exploring disorientation, dynamic rhythm, and vertigo.',
    featured: false,
  },
  {
    id: 'dreams',
    title: 'Dreams',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Surrealism',
    description: 'Surrealist dreamscape navigating subconscious imagery, weightlessness, and nocturnal motifs.',
    featured: false,
  },
  {
    id: 'elements',
    title: 'Elements',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Visual Design',
    description: 'Stylized compositional study balancing fundamental natural forces and harmony.',
    featured: false,
  },
  {
    id: 'expose',
    title: 'Expose',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Graphic Art',
    description: 'Graphic exploration of transparency, hidden layers, and emotional vulnerability.',
    featured: false,
  },
  {
    id: 'faeries-night',
    title: "Faerie's Night",
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Fantasy',
    description: 'Enchanted nighttime forest scene illuminated by bioluminescent flora and magical creatures.',
    featured: false,
  },
  {
    id: 'fight-me',
    title: 'Fight Me!',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Character Design',
    description: 'Playful character design radiating bold energy, kinetic poses, and vibrant attitude.',
    featured: false,
  },
  {
    id: 'genes',
    title: 'Genes',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Concept Art',
    description: 'Visual metaphor intertwining biological heritage, genetic threads, and personal identity.',
    featured: false,
  },
  {
    id: 'gift-to-you',
    title: 'Gift to You',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Greeting',
    description: 'Heartfelt visual offering conveying warmth, gratitude, and delicate sentiment.',
    featured: false,
  },
  {
    id: 'grow',
    title: 'Grow',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Editorial',
    description: 'Organic botanical motif celebrating gradual personal development and resilience.',
    featured: false,
  },
  {
    id: 'harmony',
    title: 'Harmony',
    category: 'Illustration',
    year: '2021',
    medium: 'Illustration & Fine Art',
    description: 'Balanced visual arrangement pairing organic curves with peaceful negative space.',
    featured: false,
  },
  {
    id: 'hindsight-is',
    title: 'HINDSIGHT IS _____',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Conceptual Art',
    description: 'Reflective 2020 conceptual piece questioning clarity, memory, and retrospective perception.',
    featured: false,
  },
  {
    id: 'hold-together',
    title: 'Hold ___ Together',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Narrative Art',
    description: 'Tender visual commentary on endurance, mutual care, and holding fractured moments whole.',
    featured: false,
  },
  {
    id: 'home',
    title: 'Home',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Narrative Art',
    description: 'Intimate exploration of sanctuary, comforting corners, and emotional grounding.',
    featured: false,
  },
  {
    id: 'its-been-a-long-year',
    title: "It's Been A Long Year",
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Editorial',
    description: 'A poignant, evocative portrait documenting collective fatigue and quiet perseverance.',
    featured: false,
  },
  {
    id: 'koi-fish-mooncakes',
    title: 'Koi Fish & Mooncakes',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Cultural Design',
    description: 'Celebration of Mid-Autumn festival imagery uniting auspicious koi and golden pastries.',
    featured: false,
  },
  {
    id: 'living-a-tiny-life',
    title: 'Living A Tiny Life',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Whimsical Design',
    description: 'Miniature diorama concept imagining a gentle, unhurried everyday existence.',
    featured: false,
  },
  {
    id: 'musical-van-shoes',
    title: 'Musical Van Shoes (Front)',
    category: 'Illustration',
    year: '2020',
    medium: 'Apparel Design & Illustration',
    description: 'Custom sneaker canvas artwork featuring melodic notation and rhythm-driven graphics.',
    featured: false,
  },
  {
    id: 'old-grandpa-pumpkin',
    title: 'Old Grandpa Pumpkin',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Character Design',
    description: 'Whimsical autumnal character portrait with warm weathered textures.',
    featured: false,
  },
  {
    id: 'overflow',
    title: 'Overflow',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Graphic Art',
    description: 'Surging emotional tides depicted through cascading graphic currents.',
    featured: false,
  },
  {
    id: 'puppy',
    title: 'Puppy',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Character Art',
    description: 'Playful animal study with soft expressive gaze and loyal presence.',
    featured: false,
  },
  {
    id: 'say-something',
    title: 'SAY SOMETHING',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Poster Art',
    description: 'High-contrast activist poster emphasizing the imperative of speaking truth to power.',
    featured: false,
  },
  {
    id: 'silence',
    title: 'Silence',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Fine Art',
    description: 'Contemplative minimalist composition centering quiet stillness and pause.',
    featured: false,
  },
  {
    id: 'souvenir',
    title: 'Souvenir',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Narrative Art',
    description: 'Keepsakes and nostalgic mementos arranged into a memory tapestry.',
    featured: false,
  },
  {
    id: 'things-that-connect-us',
    title: 'Things That Connect Us',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Editorial',
    description: 'Interwoven graphic threads demonstrating unseen bonds across human experiences.',
    featured: false,
  },
  {
    id: 'through-my-lenses',
    title: 'Through My Lenses',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Concept Design',
    description: 'Framed perspective study meditating on subjectivity and how optics shape empathy.',
    featured: false,
  },
  {
    id: 'timeless',
    title: 'Timeless',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Fine Art',
    description: 'Enduring visual motifs that transcend seasonal trends and transient moments.',
    featured: false,
  },
  {
    id: 'tornado',
    title: 'Tornado',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Dynamic Composition',
    description: 'Vortex composition capturing atmospheric turbulence and kinetic whirlwind force.',
    featured: false,
  },
  {
    id: 'vote-2020',
    title: 'Vote 2020',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Civic Design',
    description: 'Civic engagement artwork inspiring collective participation and democratic voice.',
    featured: false,
  },
  {
    id: 'wisps-of-imagination',
    title: 'Wisps of Imagination',
    category: 'Illustration',
    year: '2020',
    medium: 'Illustration & Fantasy Art',
    description: 'Ethereal ribbon-like thoughts unfurling into fanciful dream landscapes.',
    featured: false,
  },
];

// ============================================================================
// 2. CODING & SOFTWARE PROJECTS (PROJECTS_DATA) — Currently Commented Out
// Note: Per user request, individual project submissions are commented out.
// Visitors are directed to GitHub @kgqiao.
// ============================================================================
/*
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
*/
export const PROJECTS_DATA = [];

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
// 4. WRITING GALLERY (WRITING_POSTS_DATA) — Currently Commented Out
// Note: Per user request, current writing submissions are commented out.
// Displays "Coming soon!" in the portfolio.
// ============================================================================
/*
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
*/
export const WRITING_POSTS_DATA = [];

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
