/**
 * ============================================================================
 * PALETTE THEME CONFIGURATION (EASY 1-LINE SWITCHER)
 * ============================================================================
 * 
 * To switch the entire portfolio's color palette, simply change the value of
 * ACTIVE_PALETTE_ID below to any of the supported palette keys:
 * 
 * Available Palettes:
 * - 'studio-triad'        : Emerald Jade, Cinnabar Rose, Warm Honey Amber (Default)
 * - 'celestial-atelier'   : Sapphire Cobalt, Imperial Amethyst, Burnished Coral-Gold
 * - 'cybernetic-noir'     : Glacial Cyan, Neon Fuchsia, Sunburst Tangerine
 * - 'nordic-terracotta'   : Nordic Pine Teal, Terracotta Ruby, Tuscan Sandstone
 * - 'indigo-vermilion'    : Prussian Indigo, Vermilion Flame, Solar Amber
 * 
 * All CSS custom properties, ombre gradients, bento borders, and ambient
 * background glows across the whole site will dynamically update!
 */

export type PaletteId =
  | 'studio-triad'
  | 'celestial-atelier'
  | 'cybernetic-noir'
  | 'nordic-terracotta'
  | 'indigo-vermilion';

export interface TrioPaletteDefinition {
  id: PaletteId;
  name: string;
  description: string;
  code: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    rgb: string;
  };
  art: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    rgb: string;
  };
  writing: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    rgb: string;
  };
}

export const PALETTES: Record<PaletteId, TrioPaletteDefinition> = {
  // --------------------------------------------------------------------------
  // 1. STUDIO TRIAD (Default / Studio Balanced)
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // 2. CELESTIAL ATELIER (Cobalt, Imperial Violet, Burnished Coral-Gold)
  // --------------------------------------------------------------------------
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
      primary: '#9333ea',
      secondary: '#a855f7',
      accent: '#c084fc',
      rgb: '147, 51, 234',
    },
    writing: {
      name: 'Burnished Coral',
      primary: '#ea580c',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      rgb: '234, 88, 12',
    },
  },

  // --------------------------------------------------------------------------
  // 3. CYBERNETIC NOIR (Glacial Cyan, Neon Fuchsia, Sunburst Tangerine)
  // --------------------------------------------------------------------------
  'cybernetic-noir': {
    id: 'cybernetic-noir',
    name: 'Cybernetic Noir',
    description: 'Glacial Cyan, Neon Fuchsia, and Sunburst Tangerine.',
    code: {
      name: 'Glacial Cyan',
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#67e8f9',
      rgb: '6, 182, 212',
    },
    art: {
      name: 'Neon Fuchsia',
      primary: '#c026d3',
      secondary: '#d946ef',
      accent: '#f0abfc',
      rgb: '192, 38, 211',
    },
    writing: {
      name: 'Sunburst Tangerine',
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fde047',
      rgb: '217, 119, 6',
    },
  },

  // --------------------------------------------------------------------------
  // 4. NORDIC PINE & TERRACOTTA (Nordic Teal, Terracotta Ruby, Tuscan Sand)
  // --------------------------------------------------------------------------
  'nordic-terracotta': {
    id: 'nordic-terracotta',
    name: 'Nordic Pine & Terracotta',
    description: 'Nordic Pine Teal, Terracotta Ruby, and Tuscan Sandstone.',
    code: {
      name: 'Nordic Pine',
      primary: '#0f766e',
      secondary: '#14b8a6',
      accent: '#5eead4',
      rgb: '20, 184, 166',
    },
    art: {
      name: 'Terracotta Ruby',
      primary: '#be123c',
      secondary: '#e11d48',
      accent: '#fda4af',
      rgb: '190, 18, 60',
    },
    writing: {
      name: 'Tuscan Sandstone',
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#fcd34d',
      rgb: '180, 83, 9',
    },
  },

  // --------------------------------------------------------------------------
  // 5. INDIGO HORIZON & VERMILION (Prussian Indigo, Vermilion Flame, Solar Amber)
  // --------------------------------------------------------------------------
  'indigo-vermilion': {
    id: 'indigo-vermilion',
    name: 'Indigo Horizon & Vermilion',
    description: 'Prussian Indigo, Vermilion Flame, and Solar Golden Amber.',
    code: {
      name: 'Prussian Indigo',
      primary: '#4f46e5',
      secondary: '#6366f1',
      accent: '#a5b4fc',
      rgb: '79, 70, 229',
    },
    art: {
      name: 'Vermilion Flame',
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#fca5a5',
      rgb: '220, 38, 38',
    },
    writing: {
      name: 'Solar Amber',
      primary: '#ca8a04',
      secondary: '#eab308',
      accent: '#fef08a',
      rgb: '202, 138, 4',
    },
  },
};
