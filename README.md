# Katherine Qiao — Portfolio & Digital Exhibition

A high-performance, single-source-of-truth portfolio uniting **Software Engineering**, **Visual Art & Design**, and **Writing & Essays**.

Built with React 18, TypeScript, Tailwind CSS, Lucide icons, and modern responsive Bento-grid aesthetics powered by the **Studio Triad** palette (Emerald Jade, Cinnabar Rose, Warm Honey Amber).

---

## 📑 Table of Contents

1. [Quick Start & Architecture Overview](#1-quick-start--architecture-overview)
2. [Single Source of Truth: Customizing Your Information](#2-single-source-of-truth-customizing-your-information)
   - [Profile & Socials (`src/data/profile.ts`)](#profile--socials-srcdataprofilets)
   - [Dedicated Discipline Landing Pages & Optional Fields](#dedicated-discipline-landing-pages--optional-fields)
3. [Populating Your Portfolio Content (`src/data/initialData.ts`)](#3-populating-your-portfolio-content-srcdatainitialdatats)
   - [1. Software Projects (`PROJECTS_DATA`)](#1-software-projects-projects_data)
   - [2. Visual Artworks (`ARTWORKS_DATA`) — Curated & View-Only](#2-visual-artworks-artworks_data--curated--view-only)
   - [3. Writing & Essays (`WRITING_POSTS_DATA`)](#3-writing--essays-writing_posts_data)
   - [4. Engineering Skills Matrix (`ENGINEERING_SKILLS`)](#4-engineering-skills-matrix-engineering_skills)
4. [Color Palette: Studio Triad Guide](#4-color-palette-studio-triad-guide)
5. [Individual Landing Pages for Recruiters & Curators](#5-individual-landing-pages-for-recruiters--curators)
6. [Restoring the Convergence (4th) Section or Resume Later](#6-restoring-the-convergence-4th-section-or-resume-later)
7. [Performance, Latency & Optimization](#7-performance-latency--optimization)

---

## 1. Quick Start & Architecture Overview

The codebase is organized cleanly to separate data from presentation:

```
src/
├── data/
│   ├── profile.ts            <-- 🌟 MAIN SOURCE OF TRUTH (Name, Bio, Socials, Landing configs)
│   └── initialData.ts        <-- 📦 PORTFOLIO DATA (Your Projects, Artworks, Essays)
├── components/
│   ├── Navbar.tsx            <-- Top floating bar with discipline tabs (Code, Art, Writing)
│   ├── HeroSection.tsx       <-- Main page headline + 3 interactive discipline bento cards
│   ├── AboutSection.tsx      <-- Profile photo, bio, and social links (GitHub, LinkedIn)
│   ├── DisciplineLandingHero.tsx <-- Dedicated landing hero for #code, #art, #writing
│   ├── ProgrammerSection.tsx <-- Software engineering gallery + lightbox modal + live sandboxes
│   ├── ArtistSection.tsx     <-- Curated view-only art exhibition with zoomable lightbox
│   ├── WriterSection.tsx     <-- Essays & fiction gallery with distraction-free reading modal
│   ├── IntersectionSection.tsx <-- Cross-disciplinary convergence section (commented out, ready to use)
│   ├── ResumeModal.tsx       <-- Interactive resume popup (code preserved, commented out)
│   └── LoadingSkeleton.tsx   <-- Fast shimmering skeleton placeholders
├── types.ts                  <-- Complete TypeScript definitions
├── index.css                 <-- Studio Triad CSS variables & glassmorphism styling
└── App.tsx                   <-- Core application routing and state
```

---

## 2. Single Source of Truth: Customizing Your Information

All your personal details, social links, and discipline landing headers are centralized in **`src/data/profile.ts`**. You only need to edit this one file to update your personal branding across the entire site.

### 🌟 When You Update `name` in `src/data/profile.ts`:
Updating `name` (e.g. from `"Katherine Qiao"` to `"Jane Doe"`):
- **Brand Monogram Initials**: Automatically recalculated (e.g. `"KQ"` -> `"JD"`) unless manually overridden.
- **Top Navigation Bar**: Brand logo & title update immediately.
- **Hero & Headline**: Main grand greeting and tagline update.
- **About & Philosophy**: Name badge, biography, and social links update.
- **All 3 Discipline Landing Pages**: Headers, breadcrumbs, and return buttons update.
- **Browser Tab & OpenGraph**: The HTML `<title>`, `<meta property="og:title">`, and descriptions dynamically sync.
- **Footer**: Copyright year & name update.

### Profile & Socials (`src/data/profile.ts`)

```typescript
export const PROFILE: ProfileConfig = {
  // Update your name here:
  name: "Katherine Qiao",
  initials: "KQ", // Optional: leave empty or omit to auto-derive from name
  tagline: "Software Engineer · Visual Artist · Writer",
  headline: "Software engineering, visual art, and essays & short fiction.",
  bio: "Software engineer, visual artist, and writer. Crafting high-performance systems, traditional Chinese ink & digital art, and critical essays.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  
  social: {
    github: {
      url: "https://github.com/kgqiao",
      handle: "kgqiao",
      display: "github.com/kgqiao"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/katherine-qiao/",
      handle: "katherine-qiao",
      display: "linkedin.com/in/katherine-qiao"
    }
  },
  // ...
};
```

### Dedicated Discipline Landing Pages & Optional Fields

Every field in `PROFILE.disciplineLandings` is **completely optional** (`badge`, `role`, `tagline`, `overview`, `highlights`). If you leave any field undefined or empty, the UI cleanly adapts without showing blank spaces or breaking:

```typescript
disciplineLandings: {
  code: {
    badge: "01 Software & Systems",
    role: "Software Engineer & Systems Architect",
    tagline: "Building scalable and efficient software, data infrastructure, and ML pipelines.",
    overview: "Specialized in Python, C++, Computer Vision, Machine Learning, Spatial AI and enterprise data insfrastructure.",
    highlights: [
      { label: "Core Stack", value: "Python · C++ · SQL · R" },
      { label: "Architecture", value: "Distributed · Cloud Native" },
      { label: "Specialties", value: "Machine Learning · 2D & 3D Vision · Backend" },
      { label: "Methodology", value: "Scalability · Zero Latency" }
    ]
  },
  art: {
    badge: "02 Visual Art & Design",
    role: "Illustrator & Visual Artist",
    tagline: "Traditional Chinese ink on Xuan paper meets digital abstraction and visual brand systems.",
    overview: "Exploring the dialogue between traditional Eastern calligraphy strokes and contemporary visual form.",
    highlights: [
      { label: "Primary Medium", value: "Chinese Ink & Xuan Paper" },
      { label: "Digital Medium", value: "Digital Painting · Vector" },
      { label: "Philosophy", value: "Negative Space · Gestural Brushwork" },
      { label: "Exhibitions", value: "Solo & Group Showcases" }
    ]
  },
  writing: {
    badge: "03 Writing & Essays",
    role: "Essayist & Speculative Author",
    tagline: "Long-form treatises on computational aesthetics, visual culture, and speculative narratives.",
    overview: "Examining how computation transforms perception, art history, and human creative intent.",
    highlights: [
      { label: "Focus Areas", value: "Aesthetics · Tech Philosophy" },
      { label: "Forms", value: "Essays · Fiction · Criticism" },
      { label: "Themes", value: "Perception · Algorithmic Culture" },
      { label: "Style", value: "Analytical · Poetic Precision" }
    ]
  }
}
```

---

## 3. Populating Your Portfolio Content (`src/data/initialData.ts`)

To add, edit, or remove software projects, artworks, or essays, open **`src/data/initialData.ts`**:

### 1. Software Projects (`PROJECTS_DATA`)
Add an object with `id`, `title`, `tagline`, `description`, `tags`, `architectureOverview`, `highlights`, and optional links (`githubUrl`, `liveDemoUrl`, `interactiveSandboxType`).

### 2. Visual Artworks (`ARTWORKS_DATA`) — Curated & View-Only
Add an artwork item with `id`, `title`, `medium`, `year`, `dimensions`, `description`, `imageUrl`, `featured`, and `category`. The artwork gallery is strictly view-only for visitors with high-res zoomable lightboxes.

### 3. Writing & Essays (`WRITING_POSTS_DATA`)
Add an essay with `id`, `title`, `summary`, `readTime`, `publishedDate`, `category`, and `content` (Markdown formatted with headers, quotes, and paragraphs).

---

## 4. Color Palette: 1-Line Easy Switcher & Guide

Swapping palettes is now as simple as changing **one line of code** in **`src/data/profile.ts`** — no need to highlight, uncomment, or edit multiple CSS blocks!

### How to Switch Palettes in `src/data/profile.ts`:

Open **`src/data/profile.ts`** and set `palette:` to any of the 5 keys below:

```typescript
const RAW_PROFILE_DATA: ProfileConfig = {
  name: 'Katherine Qiao',
  
  // 🌟 1-Line Palette Switcher:
  palette: 'studio-triad', // 'studio-triad' | 'celestial-atelier' | 'cybernetic-noir' | 'nordic-terracotta' | 'indigo-vermilion'
  
  // ...
};
```

All CSS variables (`--code-*`, `--art-*`, `--writing-*`), ombre gradients, bento borders, and ambient background glows across the whole site update dynamically and instantly!

### Available Palette Themes

| Preset Key | 01 Software & Code | 02 Visual Art & Design | 03 Writing & Essays |
| :--- | :--- | :--- | :--- |
| **`'studio-triad'`** *(Default)* | Emerald Jade (`#059669`) | Cinnabar Rose (`#e11d48`) | Honey Amber (`#d97706`) |
| **`'celestial-atelier'`** | Electric Cobalt (`#0284c7`) | Imperial Violet (`#9333ea`) | Burnished Coral (`#ea580c`) |
| **`'cybernetic-noir'`** | Glacial Cyan (`#0891b2`) | Neon Fuchsia (`#c026d3`) | Sunburst Tangerine (`#d97706`) |
| **`'nordic-terracotta'`** | Nordic Pine (`#0f766e`) | Terracotta Ruby (`#be123c`) | Tuscan Sand (`#b45309`) |
| **`'indigo-vermilion'`** | Prussian Indigo (`#4f46e5`) | Vermilion Flame (`#dc2626`) | Solar Amber (`#ca8a04`) |

*(Custom color values and default fallbacks can also be inspected or customized in `src/data/palettes.ts` and `src/index.css`)*

---

## 5. Individual Landing Pages for Recruiters & Curators

The application supports direct URL hash navigation so you can send dedicated landing links to specific audiences:

- **All Disciplines (Continuous Scroll)**: `https://yourdomain.com/#main`
- **Engineering Recruiters & Tech Leads**: `https://yourdomain.com/#code`
- **Gallery Curators & Art Directors**: `https://yourdomain.com/#art`
- **Literary Editors & Publishers**: `https://yourdomain.com/#writing`

Each landing page features:
1. A tailored Hero banner with your role, specialized elevator pitch, and optional key highlight tiles.
2. Direct action buttons to your LinkedIn and GitHub profiles.
3. A 1-click **"View All Disciplines"** return button and quick switcher pills.

---

## 6. Restoring the Convergence (4th) Section or Resume Later

- **Convergence Section**: The code for the 4th discipline is fully maintained in `src/components/IntersectionSection.tsx` and `src/data/initialData.ts`. To reactivate it:
  1. **`src/components/Navbar.tsx`**: Uncomment the `04 Interdisciplinary` tab button.
  2. **`src/components/HeroSection.tsx`**: Uncomment Card 4 (Discipline 04) and switch the grid class from `md:grid-cols-3` to `lg:grid-cols-4`.
  3. **`src/App.tsx`**: Uncomment the `<IntersectionSection />` component call in the main view and the `activeView === 'interdisciplinary'` view.
  4. **`src/components/DisciplineLandingHero.tsx`**: Uncomment the `04 Convergence` button pill in the discipline switcher.
- **Interactive Resume Modal**: The full resume modal code is preserved in `src/components/ResumeModal.tsx`. To re-enable the Resume button, uncomment the resume button elements in `Navbar.tsx` and `DisciplineLandingHero.tsx`.

---

## 7. Performance, Latency & Optimization

- **Fast First Paint**: Core styles and font stacks are streamlined to load instantly without heavy asset blocking.
- **Native Lazy Loading & Async Decoding**: All gallery images use `loading="lazy"` and `decoding="async"` alongside shimmering SVG skeletons to eliminate layout shifts.
- **Lightbox Keyboard Navigation**: Press `Esc` to close any modal, and `←` / `→` arrow keys to cycle through works seamlessly.
- **Zero Heavy External SDKs**: The app runs entirely in client-side TypeScript with zero unnecessary runtime overhead.
