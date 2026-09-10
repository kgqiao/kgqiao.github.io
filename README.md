# Katherine Qiao — Portfolio & Digital Exhibition

A high-performance, single-source-of-truth portfolio uniting **Software Engineering**, **Visual Art & Design**, and **Writing & Essays**.

Built with **pure HTML5, CSS3, and Vanilla JavaScript (ESNext)**, Tailwind CSS, Lucide icons, and modern responsive Bento-grid aesthetics powered by the **Studio Triad** palette (Emerald Jade, Cinnabar Rose, Warm Honey Amber).

---

## 📑 Table of Contents

1. [Quick Start & Architecture Overview](#1-quick-start--architecture-overview)
2. [Single Source of Truth: Customizing Your Information](#2-single-source-of-truth-customizing-your-information)
   - [Profile & Socials (`src/data/profile.js`)](#profile--socials-srcdataprofilejs)
   - [Dedicated Discipline Landing Pages & Optional Fields](#dedicated-discipline-landing-pages--optional-fields)
3. [Populating Your Portfolio Content (`src/data/initialData.js`)](#3-populating-your-portfolio-content-srcdatainitialdatajs)
   - [1. Software Projects (`PROJECTS_DATA`)](#1-software-projects-projects_data)
   - [2. Visual Artworks (`ARTWORKS_DATA`) — Curated & View-Only](#2-visual-artworks-artworks_data--curated--view-only)
   - [3. Writing & Essays (`WRITING_POSTS_DATA`)](#3-writing--essays-writing_posts_data)
   - [4. Engineering Skills Matrix (`ENGINEERING_SKILLS`)](#4-engineering-skills-matrix-engineering_skills)
4. [Color Palette: Studio Triad Guide](#4-color-palette-studio-triad-guide)
5. [Individual Landing Pages for Recruiters & Curators](#5-individual-landing-pages-for-recruiters--curators)
6. [Auto Content Detection (`src/data/autoContent.js`)](#6-auto-content-detection-srcdataautocontentjs)
7. [Performance, Latency & Optimization](#7-performance-latency--optimization)

---

## 1. Quick Start & Architecture Overview

The codebase is built with zero-virtual-DOM Vanilla JavaScript, separating data from presentation:

```
src/
├── data/
│   ├── profile.js            <-- 🌟 MAIN SOURCE OF TRUTH (Name, Bio, Socials, Landing configs)
│   ├── palettes.js           <-- 🎨 Color themes (Studio Triad, Celestial Atelier, etc.)
│   ├── initialData.js        <-- 📦 PORTFOLIO DATA (Your Projects, Artworks, Essays)
│   └── autoContent.js        <-- 🔍 Automatic file discovery & scanner for artworks/essays/projects
├── content/
│   ├── art/                  <-- Drop your artwork files here (organized by year or category)
│   ├── writing/              <-- Drop markdown or text essays here
│   ├── projects/             <-- Add json/markdown project specs here
│   └── interdisciplinary/   <-- Add cross-disciplinary project specs here
├── main.js                   <-- Fast, modular Vanilla JavaScript controller
└── index.css                 <-- Studio Triad CSS variables & glassmorphism styling
```

---

## 2. Single Source of Truth: Customizing Your Information

All personal details, social links, and discipline landing headers are centralized in **`src/data/profile.js`**. Edit this one file to update your personal branding across the entire site.

### 🌟 When You Update `name` in `src/data/profile.js`:
Updating `name` (e.g. from `"Katherine Qiao"` to `"Jane Doe"`):
- **Brand Monogram Initials**: Automatically recalculated (e.g. `"KQ"` -> `"JD"`) unless manually overridden.
- **Top Navigation Bar**: Brand logo & title update immediately.
- **Hero & Headline**: Main grand greeting and tagline update.
- **About & Philosophy**: Name badge, biography, and social links update.
- **All 3 Discipline Landing Pages**: Headers, breadcrumbs, and return buttons update.
- **Browser Tab & OpenGraph**: The HTML `<title>`, `<meta property="og:title">`, and descriptions dynamically sync.
- **Footer**: Copyright year & name update.

### Profile & Socials (`src/data/profile.js`)

```javascript
export const PROFILE = {
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

```javascript
disciplineLandings: {
  code: {
    badge: "01 Software & Systems",
    role: "Software Engineer & Systems Architect",
    tagline: "Building scalable and efficient software, data infrastructure, and ML pipelines.",
    overview: "Specialized in Python, C++, Computer Vision, Machine Learning, Spatial AI and enterprise data infrastructure.",
    highlights: [
      { label: "Core Stack", value: "Python · C++ · JavaScript · SQL" },
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

## 3. Populating Your Portfolio Content (`src/data/initialData.js`)

To add, edit, or remove software projects, artworks, or essays, open **`src/data/initialData.js`**:

### 1. Software Projects (`PROJECTS_DATA`)
Add an object with `id`, `title`, `tagline`, `overview`, `architecture`, `techStack`, `milestones`, and optional links (`githubUrl`, `liveDemoUrl`).

### 2. Visual Artworks (`ARTWORKS_DATA`) — Curated & View-Only
Add an artwork item with `id`, `title`, `medium`, `year`, `dimensions`, `description`, `imageUrl`, `featured`, and `category`. The artwork gallery is view-only for visitors with high-res zoomable lightboxes.

### 3. Writing & Essays (`WRITING_POSTS_DATA`)
Add an essay with `id`, `title`, `excerpt`, `readingTime`, `date`, `category`, and `content` (Markdown formatted with headers, quotes, and paragraphs).

---

## 4. Color Palette: 1-Line Easy Switcher & Guide

Swapping palettes is as simple as changing **one line of code** in **`src/data/profile.js`** — no need to highlight, uncomment, or edit multiple CSS blocks!

### How to Switch Palettes in `src/data/profile.js`:

Open **`src/data/profile.js`** and set `palette:` to any of the 5 keys below:

```javascript
export const PROFILE = {
  name: 'Katherine Qiao',
  
  // 🌟 1-Line Palette Switcher: choose studio-triad, celestial-atelier, cybernetic-noir, nordic-terracotta, or indigo-vermilion
  palette: 'studio-triad',
  
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

*(Custom color values and default fallbacks can also be inspected or customized in `src/data/palettes.js` and `src/index.css`)*

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

## 6. Auto Content Detection (`src/data/autoContent.js`)

The auto-discovery system automatically scans:
- **Artworks**: Automatically loads images dropped into `src/content/art/` or `public/art/`.
- **Writing**: Automatically parses Markdown or text files dropped into `src/content/writing/`.
- **Projects**: Automatically parses JSON or Markdown dropped into `src/content/projects/`.

---

## 7. Performance, Latency & Optimization

- **Pure HTML, CSS, and JavaScript**: Zero virtual-DOM overhead, executing directly on the browser's native DOM engine.
- **Fast First Paint**: Core styles and font stacks load instantly without heavy asset blocking.
- **Native Lazy Loading & Async Decoding**: All gallery images use `loading="lazy"` and `decoding="async"` to eliminate layout shifts.
- **Lightbox Keyboard Navigation**: Press `Esc` to close any modal, and `←` / `→` arrow keys to cycle through works seamlessly.
- **Zero Heavy Framework Overheads**: High-speed, responsive, accessible, and easily deployable anywhere.

---

## 8. Deploying to GitHub Pages

The project is pre-configured to run flawlessly on GitHub Pages right after exporting! You can use either of the two standard methods:

### Method A: Automated Deployment via GitHub Actions (Recommended)
1. Create a new repository on GitHub and push the unzipped code.
2. In your repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! The included `.github/workflows/deploy.yml` will automatically build the site and deploy it. Whenever you push new changes or artworks, GitHub will update the live site automatically.

### Method B: Direct Branch Deployment (via `/docs`)
1. Create a repository on GitHub and push/upload the files.
2. In your repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Select branch **`main`** (or `master`) and choose the folder **`/docs`**, then click **Save**.
5. Your live portfolio will be active in 1–2 minutes!

