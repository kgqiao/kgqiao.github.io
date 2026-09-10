/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: PROFILE, SOCIAL & PALETTE CONFIGURATION
 * ============================================================================
 */

export function deriveInitials(name) {
  if (!name || typeof name !== 'string') return 'KQ';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const RAW_PROFILE_DATA = {
  name: 'Katherine Qiao',
  initials: 'KQ',
  palette: 'studio-triad',
  tagline: 'Software Engineer • Artist • Writer',
  headline: 'Software engineering, visual art, and essays & short fiction.',
  bio: 'Software engineer, visual artist, and writer. Crafting high-performance systems, traditional Chinese ink & digital art, and critical essays.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  location: '',
  email: '',
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
  disciplineLandings: {
    code: {
      badge: 'Discipline 01 · Software & Systems',
      title: 'Software Systems & Engineering',
      role: 'Software Engineer & Systems Architect',
      tagline: 'Building scalable and efficient software, data infrastructure, and ML pipelines.',
      overview: 'Specialized in Python, C++, Computer Vision, Machine Learning, Spatial AI and enterprise data infrastructure.',
      highlights: [
        { label: 'Core Stack', value: 'Python · C++ · SQL · R' },
        { label: 'Architecture', value: 'Distributed · Cloud Native' },
        { label: 'Specialties', value: 'Machine Learning · 2D & 3D Vision · Backend' },
        { label: 'Methodology', value: 'Scalability · Zero Latency' },
      ],
    },
    art: {
      badge: 'Discipline 02 · Visual Art & Design',
      title: 'Visual Art & Design Portfolio',
      role: 'Illustrator & Visual Artist',
      tagline: 'Traditional Chinese ink on Xuan paper meets digital abstraction and visual brand systems.',
      overview: 'Curated gallery of traditional monochrome ink landscapes (水墨山水), digital illustrations, book typography, and minimalist digital aesthetics guided by the philosophy of 留白 (liúbái).',
      highlights: [
        { label: 'Primary Mediums', value: 'Traditional Ink & Xuan Paper, Digital' },
        { label: 'Aesthetic Philosophy', value: 'Daoist Liúbái (Empty Space)' },
        { label: 'Gallery Status', value: 'Curated Exhibition Works' },
        { label: 'Focus Disciplines', value: 'Ink Painting, Digital Art & Design' },
      ],
    },
    writing: {
      badge: 'Discipline 03 · Essays & Fiction',
      title: 'Essays & Fiction',
      role: 'Writer',
      tagline: 'Various writing works.',
      overview: 'Various writing works.',
      highlights: [
        { label: 'Core Themes', value: 'Design Philosophy, Aesthetics' },
        { label: 'Publishing Formats', value: 'Critical Essays & Short Fiction' },
        { label: 'Reader Experience', value: 'Distraction-Free Reading Mode' },
        { label: 'Specialization', value: 'Longform & Systems Essays' },
      ],
    },
  },
};

export const PROFILE = {
  ...RAW_PROFILE_DATA,
  initials: RAW_PROFILE_DATA.initials?.trim() || deriveInitials(RAW_PROFILE_DATA.name),
};
