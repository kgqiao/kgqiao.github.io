/**
 * ============================================================================
 * PALETTE THEME CONFIGURATION (EASY 1-LINE SWITCHER)
 * ============================================================================
 * 
 * Available Palettes:
 * - 'studio-triad'        : Emerald Jade, Cinnabar Rose, Warm Honey Amber (Default)
 * - 'celestial-atelier'   : Sapphire Cobalt, Imperial Amethyst, Burnished Coral-Gold
 * - 'cybernetic-noir'     : Glacial Cyan, Neon Fuchsia, Sunburst Tangerine
 * - 'nordic-terracotta'   : Nordic Pine Teal, Terracotta Ruby, Tuscan Sandstone
 * - 'indigo-vermilion'    : Prussian Indigo, Vermilion Flame, Solar Amber
 */

export const PALETTES = {
  // 1. STUDIO TRIAD (Default / Studio Balanced)
  'studio-triad': {
    id: 'studio-triad',
    name: 'Studio Triad',
    description: 'Emerald Jade, Cinnabar Rose, and Warm Honey Amber.',
    code: {
      name: 'Emerald Jade',
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      rgb: '16, 185, 129',
    },
    art: {
      name: 'Cinnabar Rose',
      primary: '#e11d48',
      secondary: '#f43f5e',
      accent: '#fb7185',
      rgb: '225, 29, 72',
    },
    writing: {
      name: 'Honey Amber',
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      rgb: '217, 119, 6',
    },
  },

  // 2. CELESTIAL ATELIER (Cobalt, Imperial Violet, Burnished Coral-Gold)
  'celestial-atelier': {
    id: 'celestial-atelier',
    name: 'Celestial Atelier',
    description: 'Electric Sapphire, Imperial Amethyst, and Burnished Coral-Gold.',
    code: {
      name: 'Electric Cobalt',
      primary: '#0284c7',
      secondary: '#0ea5e9',
      accent: '#38bdf8',
      rgb: '2, 132, 199',
    },
    art: {
      name: 'Imperial Amethyst',
      primary: '#7c3aed',
      secondary: '#9333ea',
      accent: '#c084fc',
      rgb: '147, 51, 234',
    },
    writing: {
      name: 'Burnished Gold',
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fb923c',
      rgb: '249, 115, 22',
    },
  },

  // 3. CYBERNETIC NOIR (Glacial Cyan, Neon Fuchsia, Sunburst Tangerine)
  'cybernetic-noir': {
    id: 'cybernetic-noir',
    name: 'Cybernetic Noir',
    description: 'Glacial Cyan, Neon Fuchsia, and Sunburst Tangerine.',
    code: {
      name: 'Glacial Cyan',
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      rgb: '6, 182, 212',
    },
    art: {
      name: 'Neon Fuchsia',
      primary: '#c026d3',
      secondary: '#d946ef',
      accent: '#e879f9',
      rgb: '217, 70, 239',
    },
    writing: {
      name: 'Sunburst Tangerine',
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fde047',
      rgb: '245, 158, 11',
    },
  },

  // 4. NORDIC TERRACOTTA (Nordic Pine Teal, Terracotta Ruby, Tuscan Sandstone)
  'nordic-terracotta': {
    id: 'nordic-terracotta',
    name: 'Nordic Terracotta',
    description: 'Nordic Pine Teal, Terracotta Ruby, and Tuscan Sandstone.',
    code: {
      name: 'Nordic Teal',
      primary: '#0f766e',
      secondary: '#14b8a6',
      accent: '#2dd4bf',
      rgb: '20, 184, 166',
    },
    art: {
      name: 'Terracotta Ruby',
      primary: '#be123c',
      secondary: '#e11d48',
      accent: '#fda4af',
      rgb: '225, 29, 72',
    },
    writing: {
      name: 'Tuscan Sandstone',
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#fcd34d',
      rgb: '217, 119, 6',
    },
  },

  // 5. INDIGO VERMILION (Prussian Indigo, Vermilion Flame, Solar Amber)
  'indigo-vermilion': {
    id: 'indigo-vermilion',
    name: 'Indigo Vermilion',
    description: 'Prussian Indigo, Vermilion Flame, and Solar Amber.',
    code: {
      name: 'Prussian Indigo',
      primary: '#4338ca',
      secondary: '#6366f1',
      accent: '#818cf8',
      rgb: '99, 102, 241',
    },
    art: {
      name: 'Vermilion Flame',
      primary: '#c2410c',
      secondary: '#ea580c',
      accent: '#fb923c',
      rgb: '234, 88, 12',
    },
    writing: {
      name: 'Solar Amber',
      primary: '#b45309',
      secondary: '#f59e0b',
      accent: '#fef08a',
      rgb: '245, 158, 11',
    },
  },
};
