/**
 * ============================================================================
 * MAIN JAVASCRIPT CONTROLLER (VANILLA JAVASCRIPT)
 * ============================================================================
 * 
 * High-performance, zero-virtual-DOM modular portfolio engine.
 * Pure HTML, CSS, and Vanilla JavaScript with Lucide icons.
 */

import { icons, createIcons } from 'lucide';
import './index.css';
import { PROFILE } from './data/profile.js';
import { PALETTES } from './data/palettes.js';
import {
  ARTWORKS_DATA,
  PROJECTS_DATA,
  WRITING_POSTS_DATA,
  ENGINEERING_SKILLS,
  INTERDISCIPLINARY_DATA,
} from './data/initialData.js';
import {
  getAllArtworks,
  getAllProjects,
  getAllWritingPosts,
  getAllInterdisciplinary,
} from './data/autoContent.js';

// ----------------------------------------------------------------------------
// 1. Data Store Initialization (Single Source of Truth)
// ----------------------------------------------------------------------------
const artworks = getAllArtworks(ARTWORKS_DATA);
const projects = getAllProjects(PROJECTS_DATA);
const writings = getAllWritingPosts(WRITING_POSTS_DATA);
const interdisciplinary = getAllInterdisciplinary(INTERDISCIPLINARY_DATA);

// App State
const state = {
  activeView: 'main', // 'main' | 'code' | 'art' | 'writing'
  codeCategory: 'All',
  artCategory: 'All',
  writingCategory: 'All',
  writingSearch: '',
  activeProject: null,
  activeArtwork: null,
  isArtZoomed: false,
  activeWriting: null,
  writingFontSize: 'base', // 'sm' | 'base' | 'lg' | 'xl'
  writingFontFamily: 'serif', // 'serif' | 'sans' | 'mono'
  isResumeOpen: false,
  activeSkillCategory: 'All',
  copiedCode: false,
  copiedResume: false,
  terminalLogs: [
    'System Engine v2.4.0 [x86_64-avx512]',
    'Type "help", "bench", "search <term>", or "stats" to test.'
  ],
};

// ----------------------------------------------------------------------------
// 2. Dynamic Palette Injection
// ----------------------------------------------------------------------------
function initPalette() {
  const paletteKey = PROFILE.palette || 'studio-triad';
  const palette = PALETTES[paletteKey] || PALETTES['studio-triad'];
  const root = document.documentElement;

  // Code palette
  root.style.setProperty('--code-primary', palette.code.primary);
  root.style.setProperty('--code-secondary', palette.code.secondary);
  root.style.setProperty('--code-accent', palette.code.accent);
  root.style.setProperty('--code-rgb', palette.code.rgb);

  // Art palette
  root.style.setProperty('--art-primary', palette.art.primary);
  root.style.setProperty('--art-secondary', palette.art.secondary);
  root.style.setProperty('--art-accent', palette.art.accent);
  root.style.setProperty('--art-rgb', palette.art.rgb);

  // Writing palette
  root.style.setProperty('--writing-primary', palette.writing.primary);
  root.style.setProperty('--writing-secondary', palette.writing.secondary);
  root.style.setProperty('--writing-accent', palette.writing.accent);
  root.style.setProperty('--writing-rgb', palette.writing.rgb);
}

// ----------------------------------------------------------------------------
// 3. Document Title & Meta Synchronization
// ----------------------------------------------------------------------------
function updateMetaTitle() {
  const viewTitles = {
    main: `${PROFILE.name} · ${PROFILE.tagline}`,
    code: `${PROFILE.name} · Software & Systems`,
    art: `${PROFILE.name} · Visual Art & Design`,
    writing: `${PROFILE.name} · Writing & Essays`,
  };
  const currentTitle = viewTitles[state.activeView] || `${PROFILE.name} · Portfolio`;
  document.title = currentTitle;

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', currentTitle);

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', PROFILE.headline || PROFILE.bio);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', PROFILE.headline || PROFILE.bio);
}

// ----------------------------------------------------------------------------
// 4. View Switching & Navigation
// ----------------------------------------------------------------------------
export function navigateTo(view) {
  state.activeView = view;
  state.activeProject = null;
  window.location.hash = view === 'main' ? '#main' : `#${view}`;
  updateMetaTitle();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim();
  const validViews = ['main', 'code', 'art', 'writing'];
  const newView = validViews.includes(hash) ? hash : 'main';
  if (newView !== state.activeView) {
    state.activeView = newView;
    updateMetaTitle();
    renderApp();
  }
}

// ----------------------------------------------------------------------------
// 5. Template Helpers
// ----------------------------------------------------------------------------
function icon(name, className = 'w-4 h-4') {
  return `<i data-lucide="${name}" class="${className} inline-block"></i>`;
}

function renderNavbar() {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-neutral-950/80 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Logo / Monogram -->
          <button id="nav-brand-btn" class="flex items-center gap-3 group text-left cursor-pointer">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 via-rose-400 to-amber-400 p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
              <div class="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center font-serif font-bold text-xs sm:text-sm text-neutral-200">
                ${PROFILE.initials}
              </div>
            </div>
            <div>
              <span class="font-serif font-bold text-base sm:text-lg text-neutral-100 group-hover:text-white block tracking-tight">
                ${PROFILE.name}
              </span>
              <span class="text-[10px] sm:text-xs text-neutral-400 font-mono block -mt-0.5">
                ${PROFILE.tagline}
              </span>
            </div>
          </button>

          <!-- Desktop Navigation Tabs -->
          <div class="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/80 border border-white/10">
            <button
              data-nav="main"
              class="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                state.activeView === 'main'
                  ? 'bg-neutral-800 text-white font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }"
            >
              All Overview
            </button>
            <button
              data-nav="code"
              class="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                state.activeView === 'code'
                  ? 'btn-pill-code-active'
                  : 'text-neutral-400 hover:text-code hover:bg-code-muted'
              }"
            >
              ${icon('terminal', 'w-3.5 h-3.5 mr-1.5')} Software & Systems
            </button>
            <button
              data-nav="art"
              class="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                state.activeView === 'art'
                  ? 'btn-pill-art-active'
                  : 'text-neutral-400 hover:text-art hover:bg-art-muted'
              }"
            >
              ${icon('palette', 'w-3.5 h-3.5 mr-1.5')} Visual Art
            </button>
            <button
              data-nav="writing"
              class="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                state.activeView === 'writing'
                  ? 'btn-pill-writing-active'
                  : 'text-neutral-400 hover:text-writing hover:bg-writing-muted'
              }"
            >
              ${icon('pen-tool', 'w-3.5 h-3.5 mr-1.5')} Writing & Essays
            </button>
          </div>

          <!-- Actions: Resume Modal Button -->
          <div class="flex items-center gap-2.5">
            <button
              id="open-resume-btn"
              class="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-mono font-medium transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              ${icon('sparkles', 'w-3.5 h-3.5 text-amber-400')}
              <span>Resume / CV</span>
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button
              id="mobile-menu-toggle"
              class="md:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              ${icon('menu', 'w-5 h-5')}
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu-drawer" class="hidden md:hidden border-t border-neutral-800/80 bg-neutral-950 px-4 py-4 space-y-2">
        <button data-nav="main" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono ${state.activeView === 'main' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-300'}">All Overview</button>
        <button data-nav="code" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono ${state.activeView === 'code' ? 'btn-pill-code-active' : 'text-neutral-300'}">01 · Software & Systems</button>
        <button data-nav="art" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono ${state.activeView === 'art' ? 'btn-pill-art-active' : 'text-neutral-300'}">02 · Visual Art & Design</button>
        <button data-nav="writing" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono ${state.activeView === 'writing' ? 'btn-pill-writing-active' : 'text-neutral-300'}">03 · Writing & Essays</button>
        <button id="mobile-open-resume" class="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono text-amber-300 bg-amber-950/30 border border-amber-500/30 flex items-center gap-2">
          ${icon('sparkles', 'w-3.5 h-3.5')} View Resume / CV
        </button>
      </div>
    </nav>
  `;
}

function renderHeroSection() {
  return `
    <section class="relative overflow-hidden pt-4 pb-8 sm:pt-8 sm:pb-12 md:pt-14 md:pb-14">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Top Badge -->
        <div class="flex flex-wrap items-center justify-center gap-2.5 mb-4 sm:mb-6">
          <div class="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900/90 border border-emerald-500/30 text-neutral-200 text-[11px] sm:text-xs font-medium backdrop-blur-md shadow-lg shadow-emerald-500/10">
            ${icon('sparkles', 'w-3.5 h-3.5 text-emerald-400')}
            <span class="bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-400 bg-clip-text text-transparent font-bold">
              ${PROFILE.tagline}
            </span>
          </div>
        </div>

        <!-- Main Headline -->
        <div class="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 mb-3 sm:mb-4 leading-tight font-serif">
            Portfolio of <span class="ombre-text-brand font-serif font-bold">${PROFILE.name}</span>
          </h1>
          <p class="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed px-2">
            ${PROFILE.headline}
          </p>
        </div>

        <!-- Three Disciplines Interactive Hero Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          <!-- Card 1: Discipline 01 - Code -->
          <div
            data-nav="code"
            class="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-programmer hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-code flex items-center justify-center text-code group-hover:scale-110 transition-all">
                  ${icon('terminal', 'w-5 h-5 sm:w-6 sm:h-6')}
                </div>
                <span class="bubbly-pill-prog text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  01 · ${projects.length} Systems
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-code transition-colors mb-2 font-mono">
                Software & Systems
              </h3>
              <p class="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Full-stack web applications, WebGL fluid shaders, developer tools, and machine learning models.
              </p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-code text-xs text-code font-bold font-mono">
              <span class="flex items-center gap-1.5">
                ${icon('code', 'w-4 h-4')} View Code & Systems
              </span>
              ${icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1.5 transition-transform')}
            </div>
          </div>

          <!-- Card 2: Discipline 02 - Art -->
          <div
            data-nav="art"
            class="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-artist hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-art flex items-center justify-center text-art group-hover:scale-110 transition-all">
                  ${icon('palette', 'w-5 h-5 sm:w-6 sm:h-6')}
                </div>
                <span class="bubbly-pill-artist text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  02 · ${artworks.length} Works
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-art transition-colors mb-2 font-serif">
                Visual Art & Design
              </h3>
              <p class="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Chinese ink paintings on Xuan paper, digital paintings, ink & mixed media, and design systems.
              </p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-art text-xs text-art font-bold font-mono">
              <span class="flex items-center gap-1.5">
                ${icon('image', 'w-4 h-4')} View Art Gallery
              </span>
              ${icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1.5 transition-transform')}
            </div>
          </div>

          <!-- Card 3: Discipline 03 - Writing -->
          <div
            data-nav="writing"
            class="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-writer hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-writing flex items-center justify-center text-writing group-hover:scale-110 transition-all">
                  ${icon('pen-tool', 'w-5 h-5 sm:w-6 sm:h-6')}
                </div>
                <span class="bubbly-pill-writer text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  03 · ${writings.length} Essays
                </span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-writing transition-colors mb-2 font-serif">
                Writing & Essays
              </h3>
              <p class="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Critical essays, technical treatises, and short speculative fiction exploring aesthetics and systems.
              </p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-writing text-xs text-writing font-bold font-mono">
              <span class="flex items-center gap-1.5">
                ${icon('book-open', 'w-4 h-4')} View Essays & Fiction
              </span>
              ${icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1.5 transition-transform')}
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}

function renderSectionSeparator(variant = 'neutral') {
  const gradientMap = {
    code: 'from-transparent via-emerald-500/30 to-transparent',
    art: 'from-transparent via-rose-500/30 to-transparent',
    writing: 'from-transparent via-amber-500/30 to-transparent',
    neutral: 'from-transparent via-neutral-800 to-transparent',
  };
  const gradient = gradientMap[variant] || gradientMap.neutral;
  return `
    <div class="relative py-6 my-2 flex items-center justify-center">
      <div class="w-full max-w-5xl h-[1px] bg-gradient-to-r ${gradient}"></div>
    </div>
  `;
}

function renderAboutSection() {
  return `
    <section id="about" class="py-10 md:py-16">
      <div class="max-w-7xl mx-auto space-y-12">
        
        <!-- Header -->
        <div class="pb-6 border-b border-neutral-800/60">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-emerald-500/30 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            ${icon('user', 'w-3.5 h-3.5 text-emerald-400')}
            <span class="bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-400 bg-clip-text text-transparent font-bold">
              About & Background
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
            ${PROFILE.name}
          </h2>
          <p class="text-base sm:text-lg text-neutral-300 mt-2 max-w-2xl font-sans">
            ${PROFILE.tagline}
          </p>
        </div>

        <!-- 50/50 Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          <!-- Left: Profile & Photo -->
          <div class="bento-card spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-art uppercase tracking-wider font-bold">Profile & Connect</span>
            </div>

            <div class="flex-1 flex items-center justify-center py-2 relative">
              <div class="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-rose-500/30 to-amber-500/30 blur-xl opacity-60 animate-breathing-halo pointer-events-none"></div>
              <div class="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl p-[2px] bg-gradient-to-tr from-emerald-500/40 via-rose-500/40 to-amber-500/40 group z-10">
                <div class="relative w-full h-full rounded-[22px] overflow-hidden">
                  <img
                    src="${PROFILE.avatarUrl}"
                    alt="${PROFILE.name}"
                    draggable="false"
                    class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="space-y-3 pt-2">
              <a
                href="${PROFILE.social.github.url}"
                target="_blank"
                rel="noreferrer"
                class="flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700 text-neutral-200 hover:text-white transition-all group shadow-sm"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl badge-code flex items-center justify-center text-code group-hover:scale-105 transition-transform">
                    ${icon('github', 'w-4 h-4')}
                  </div>
                  <div class="text-left">
                    <span class="text-xs font-mono font-bold block">GitHub</span>
                    <span class="text-[11px] font-mono text-neutral-400">${PROFILE.social.github.display}</span>
                  </div>
                </div>
                ${icon('external-link', 'w-4 h-4 text-neutral-400 group-hover:text-code transition-colors')}
              </a>

              <a
                href="${PROFILE.social.linkedin.url}"
                target="_blank"
                rel="noreferrer"
                class="flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700 text-neutral-200 hover:text-white transition-all group shadow-sm"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl badge-art flex items-center justify-center text-art group-hover:scale-105 transition-transform">
                    ${icon('linkedin', 'w-4 h-4')}
                  </div>
                  <div class="text-left">
                    <span class="text-xs font-mono font-bold block">LinkedIn</span>
                    <span class="text-[11px] font-mono text-neutral-400">${PROFILE.social.linkedin.display}</span>
                  </div>
                </div>
                ${icon('external-link', 'w-4 h-4 text-neutral-400 group-hover:text-art transition-colors')}
              </a>
            </div>
          </div>

          <!-- Right: Bio & Three Disciplines Overview -->
          <div class="bento-card spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div class="space-y-4">
              <span class="text-xs font-mono text-code uppercase tracking-wider font-bold">Disciplinary Practice</span>
              <h3 class="text-xl sm:text-2xl font-serif font-bold text-neutral-100">
                Crafting software systems, traditional Chinese ink on Xuan paper, and critical essays.
              </h3>
              <p class="text-sm sm:text-base text-neutral-300 leading-relaxed">
                ${PROFILE.bio}
              </p>
            </div>

            <!-- Trio highlights list -->
            <div class="space-y-3 pt-2">
              <div class="p-3.5 rounded-2xl bg-neutral-900/80 border border-emerald-500/20 flex items-start gap-3">
                <div class="w-7 h-7 rounded-xl badge-code flex items-center justify-center text-code flex-shrink-0 mt-0.5">
                  ${icon('terminal', 'w-3.5 h-3.5')}
                </div>
                <div>
                  <div class="text-xs font-mono font-bold text-neutral-200">Software & Systems</div>
                  <div class="text-xs text-neutral-400 mt-0.5">Scalable backends, machine learning pipelines, and local-first architecture.</div>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-neutral-900/80 border border-rose-500/20 flex items-start gap-3">
                <div class="w-7 h-7 rounded-xl badge-art flex items-center justify-center text-art flex-shrink-0 mt-0.5">
                  ${icon('palette', 'w-3.5 h-3.5')}
                </div>
                <div>
                  <div class="text-xs font-mono font-bold text-neutral-200">Visual Art & Design</div>
                  <div class="text-xs text-neutral-400 mt-0.5">Chinese painting (水墨), digital illustration, and minimalist design systems.</div>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-neutral-900/80 border border-amber-500/20 flex items-start gap-3">
                <div class="w-7 h-7 rounded-xl badge-writing flex items-center justify-center text-writing flex-shrink-0 mt-0.5">
                  ${icon('pen-tool', 'w-3.5 h-3.5')}
                </div>
                <div>
                  <div class="text-xs font-mono font-bold text-neutral-200">Writing & Literary Work</div>
                  <div class="text-xs text-neutral-400 mt-0.5">Critical essays on interface philosophy, art treatises, and speculative fiction.</div>
                </div>
              </div>
            </div>

            <!-- Resume Button -->
            <div class="pt-2">
              <button
                id="about-resume-btn"
                class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-rose-500/20 to-amber-500/20 hover:from-emerald-500/30 hover:to-amber-500/30 border border-white/20 text-neutral-100 font-mono text-xs font-bold transition-all shadow-md hover:scale-[1.01]"
              >
                ${icon('sparkles', 'w-4 h-4 text-amber-300')}
                <span>View Full Curriculum Vitae / Resume</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}

function renderProgrammerSection() {
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = state.codeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === state.codeCategory);

  const skillCats = ['All', 'Languages & Core', 'Frontend & Architecture', 'Graphics & Visual Computing', 'Backend & Infrastructure'];
  const filteredSkills = state.activeSkillCategory === 'All'
    ? ENGINEERING_SKILLS
    : ENGINEERING_SKILLS.filter(s => s.category === state.activeSkillCategory);

  return `
    <section id="programmer-section" class="py-10 md:py-16">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-code text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            ${icon('terminal', 'w-3.5 h-3.5')}
            <span>Discipline 01 · Software & Systems</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-mono font-bold text-neutral-100 tracking-tight">
            Software Systems & Architecture
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl font-sans">
            Engineered systems, distributed pipelines, graphics shaders, and developer tools.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap gap-2">
          ${categories.map(cat => `
            <button
              data-code-cat="${cat}"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                state.codeCategory === cat
                  ? 'btn-pill-code-active'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800'
              }"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        ${filteredProjects.map(p => `
          <div
            data-open-project="${p.id}"
            class="bento-card spotlight-card bento-card-programmer rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer group hover:scale-[1.01] hover:shadow-2xl transition-all"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono font-bold text-code px-3 py-1 rounded-full bg-code-muted border border-code">
                  ${p.category}
                </span>
                <span class="text-xs font-mono text-neutral-400">${p.year}</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-bold font-mono text-neutral-100 group-hover:text-code transition-colors mb-2">
                ${p.title}
              </h3>
              <p class="text-sm text-neutral-300 leading-relaxed mb-6">
                ${p.tagline}
              </p>

              <!-- Tech Stack Tags -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${(p.techStack || []).map(t => `
                  <span class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                    ${t.name}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-code font-bold">
              <span class="flex items-center gap-1.5">
                ${icon('code', 'w-4 h-4')} Inspect Architecture & Code
              </span>
              ${icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1.5 transition-transform')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Technical Skills Matrix -->
      <div class="mt-14 bento-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
          <div>
            <h3 class="text-lg sm:text-xl font-mono font-bold text-neutral-100 flex items-center gap-2">
              ${icon('cpu', 'w-5 h-5 text-code')} Core Technical Competencies
            </h3>
            <p class="text-xs text-neutral-400 font-mono mt-1">Systems, pipelines, graphics, and performance profiling</p>
          </div>

          <div class="flex flex-wrap gap-1.5">
            ${skillCats.map(cat => `
              <button
                data-skill-cat="${cat}"
                class="px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  state.activeSkillCategory === cat
                    ? 'btn-pill-code-active'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }"
              >
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${filteredSkills.map(s => `
            <div class="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-neutral-200">${s.name}</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  ${s.level}
                </span>
              </div>
              <p class="text-xs text-neutral-400 leading-relaxed">${s.focus}</p>
              <div class="flex flex-wrap gap-1 pt-1">
                ${s.tags.map(tag => `
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                    ${tag}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- In-Browser Interactive Terminal Simulator -->
      <div class="mt-8 bento-card rounded-3xl p-5 sm:p-6 bg-neutral-950 border border-neutral-800 space-y-4">
        <div class="flex items-center justify-between border-b border-neutral-800/80 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span class="text-xs font-mono text-neutral-400 ml-2">sandbox-terminal — bash</span>
          </div>
          <span class="text-[11px] font-mono text-neutral-500">Interactive Shell</span>
        </div>

        <div id="terminal-screen" class="font-mono text-xs text-emerald-400 space-y-1.5 h-36 overflow-y-auto pr-2">
          ${state.terminalLogs.map(log => `<div>${log}</div>`).join('')}
        </div>

        <form id="terminal-form" class="flex items-center gap-2 pt-2 border-t border-neutral-800">
          <span class="font-mono text-xs text-neutral-400">$</span>
          <input
            id="terminal-input"
            type="text"
            placeholder="Type 'help', 'bench', or 'stats'..."
            class="flex-1 bg-transparent text-xs font-mono text-neutral-200 outline-none placeholder:text-neutral-600"
          />
          <button type="submit" class="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white">
            Run
          </button>
        </form>
      </div>

    </section>
  `;
}

function renderArtistSection() {
  const categories = ['All', ...new Set(artworks.map(a => a.category).filter(Boolean))];
  const filteredArtworks = state.artCategory === 'All'
    ? artworks
    : artworks.filter(a => a.category === state.artCategory);

  return `
    <section id="artist-gallery-section" class="py-10 md:py-16">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-art text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            ${icon('palette', 'w-3.5 h-3.5')}
            <span>Discipline 02 · Visual Art & Design</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Curated Visual Art & Design Gallery
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Selected works traversing traditional Chinese painting on Xuan paper, digital painting, ink & mixed media, and design systems.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap gap-2">
          ${categories.map(cat => `
            <button
              data-art-cat="${cat}"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                state.artCategory === cat
                  ? 'btn-pill-art-active'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800'
              }"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Artwork Masonry / Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        ${filteredArtworks.map(art => `
          <div
            data-open-art="${art.id}"
            class="group relative rounded-3xl overflow-hidden bento-card spotlight-card bento-card-artist cursor-pointer bg-neutral-950 border border-neutral-800/80 hover:border-art transition-all duration-300 hover:shadow-2xl flex flex-col"
          >
            <!-- Image Frame -->
            <div class="relative w-full aspect-square overflow-hidden bg-neutral-900">
              <img
                src="${art.imageUrl}"
                alt="${art.title}"
                loading="lazy"
                draggable="false"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  ${icon('zoom-in', 'w-3.5 h-3.5 text-rose-400')} View Fullscreen Lightbox
                </span>
              </div>
            </div>

            <!-- Details -->
            <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
                  <span class="text-art font-bold">${art.category}</span>
                  <span>${art.year}</span>
                </div>
                <h3 class="text-lg sm:text-xl font-serif font-bold text-neutral-100 group-hover:text-art transition-colors">
                  ${art.title}
                </h3>
                ${art.description ? `<p class="text-xs text-neutral-400 mt-1.5 line-clamp-2">${art.description}</p>` : ''}
              </div>

              ${art.medium ? `
                <div class="pt-3 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>${art.medium}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

    </section>
  `;
}

function renderWriterSection() {
  const categories = ['All', ...new Set(writings.map(w => w.category).filter(Boolean))];
  const filteredWritings = writings.filter(post => {
    const matchesCat = state.writingCategory === 'All' || post.category === state.writingCategory;
    const q = state.writingSearch.toLowerCase();
    const matchesQuery = !q ||
      post.title.toLowerCase().includes(q) ||
      (post.subtitle && post.subtitle.toLowerCase().includes(q)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return `
    <section id="writer-section" class="py-10 md:py-16">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-writing text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            ${icon('pen-tool', 'w-3.5 h-3.5')}
            <span>Discipline 03 · Writing & Essays</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Essays & Literary Publications
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Critical essays on art history, interface philosophy, and speculative short fiction.
          </p>
        </div>

        <!-- Filter Pills & Search -->
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative">
            <input
              id="writing-search-input"
              type="text"
              placeholder="Search essays..."
              value="${state.writingSearch}"
              class="w-full sm:w-48 px-3 py-1.5 pl-8 rounded-xl bg-neutral-900 text-xs text-neutral-200 border border-neutral-800 outline-none focus:border-amber-500"
            />
            <span class="absolute left-2.5 top-2 text-neutral-500">
              ${icon('search', 'w-3.5 h-3.5')}
            </span>
          </div>

          <div class="flex flex-wrap gap-2">
            ${categories.map(cat => `
              <button
                data-writing-cat="${cat}"
                class="px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  state.writingCategory === cat
                    ? 'btn-pill-writing-active'
                    : 'bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800'
                }"
              >
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Essay Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        ${filteredWritings.map(post => `
          <div
            data-open-writing="${post.id}"
            class="bento-card spotlight-card bento-card-writer rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:scale-[1.01] hover:shadow-2xl transition-all"
          >
            <div>
              <div class="flex items-center justify-between mb-4 text-xs font-mono">
                <span class="px-3 py-1 rounded-full badge-writing text-writing font-bold">
                  ${post.category}
                </span>
                <span class="text-neutral-400">${post.subtitle || post.readingTime || 'Essay'}</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-serif font-bold text-neutral-100 group-hover:text-writing transition-colors mb-3">
                ${post.title}
              </h3>
              <p class="text-sm text-neutral-300 leading-relaxed mb-6 font-serif">
                ${post.excerpt}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${(post.tags || []).map(t => `
                  <span class="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                    ${t}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-writing font-bold">
              <span class="flex items-center gap-1.5">
                ${icon('book-open', 'w-4 h-4')} Open Distraction-Free Reader
              </span>
              ${icon('arrow-right', 'w-4 h-4 group-hover:translate-x-1.5 transition-transform')}
            </div>
          </div>
        `).join('')}
      </div>

    </section>
  `;
}

function renderDisciplineHero(discipline) {
  const config = PROFILE.disciplineLandings?.[discipline] || {};
  const badgeMap = {
    code: 'badge-code text-code',
    art: 'badge-art text-art',
    writing: 'badge-writing text-writing',
  };
  const iconMap = {
    code: 'terminal',
    art: 'palette',
    writing: 'pen-tool',
  };

  return `
    <div class="relative bento-card rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden">
      <div class="relative z-10 max-w-4xl space-y-6">
        
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${badgeMap[discipline]} text-xs font-mono font-bold uppercase tracking-wider">
          ${icon(iconMap[discipline], 'w-3.5 h-3.5')}
          <span>${config.badge || discipline.toUpperCase()}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-100 ${discipline === 'code' ? 'font-mono' : 'font-serif'}">
          ${config.title || PROFILE.name}
        </h1>

        <p class="text-base sm:text-xl text-neutral-200 font-medium">
          ${config.role} · <span class="text-neutral-400">${config.tagline}</span>
        </p>

        <p class="text-sm sm:text-base text-neutral-300 leading-relaxed">
          ${config.overview}
        </p>

        <!-- Highlights Grid -->
        ${config.highlights ? `
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800/80">
            ${config.highlights.map(h => `
              <div class="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <span class="text-[11px] font-mono text-neutral-400 block">${h.label}</span>
                <span class="text-xs font-mono font-bold text-neutral-200 block mt-0.5">${h.value}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button data-nav="main" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5">
            ${icon('arrow-left', 'w-3.5 h-3.5')} Return to All Overview
          </button>
          <button id="discipline-resume-btn" class="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-200 hover:text-white flex items-center gap-1.5">
            ${icon('sparkles', 'w-3.5 h-3.5 text-amber-400')} View Full Resume
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="relative z-10 mt-16 border-t border-neutral-800/80 bg-neutral-950/90 py-12 text-xs text-neutral-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex items-center gap-3">
          <button data-nav="main" class="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 via-rose-400 to-amber-400 p-[1px] hover:scale-105 transition-transform">
            <div class="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center font-serif font-bold text-xs text-neutral-200">
              ${PROFILE.initials}
            </div>
          </button>
          <div>
            <span class="font-semibold text-neutral-200">${PROFILE.name}</span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <a
            href="${PROFILE.social.github.url}"
            target="_blank"
            rel="noreferrer"
            class="hover-text-code transition-colors flex items-center gap-1.5 font-mono"
          >
            ${icon('github', 'w-4 h-4')}
            <span>GitHub</span>
          </a>
          <a
            href="${PROFILE.social.linkedin.url}"
            target="_blank"
            rel="noreferrer"
            class="hover-text-art transition-colors flex items-center gap-1.5 font-mono"
          >
            ${icon('linkedin', 'w-4 h-4')}
            <span>LinkedIn</span>
          </a>
        </div>

        <div class="font-mono text-neutral-500">
          © ${new Date().getFullYear()} ${PROFILE.name}. All rights reserved.
        </div>

      </div>
    </footer>
  `;
}

// ----------------------------------------------------------------------------
// 6. Modals
// ----------------------------------------------------------------------------
function renderResumeModal() {
  if (!state.isResumeOpen) return '';
  return `
    <div id="resume-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:static">
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60 print:hidden">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              CV
            </div>
            <div>
              <h3 class="text-sm font-mono font-bold text-neutral-100 flex items-center gap-2">
                Tech Recruiter & Hiring Manager Resume
                <span class="bubbly-pill-prog text-[10px] px-2 py-0.5 rounded-full font-bold">Software Engineering</span>
              </h3>
              <p class="text-xs text-neutral-400 font-mono">
                ${PROFILE.name} · Full-Stack, WebGL & ML Systems
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              id="copy-resume-btn"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors border border-neutral-700"
            >
              ${icon(state.copiedResume ? 'check' : 'copy', 'w-3.5 h-3.5')}
              <span>${state.copiedResume ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              id="print-resume-btn"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors border border-neutral-700"
            >
              ${icon('printer', 'w-3.5 h-3.5')}
              <span>Print / PDF</span>
            </button>
            <button
              id="close-resume-btn"
              class="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              ${icon('x', 'w-5 h-5')}
            </button>
          </div>
        </div>

        <!-- Scrollable Resume Body -->
        <div class="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 font-sans text-neutral-300 print:text-black">
          
          <!-- Header block -->
          <div class="border-b border-neutral-800 pb-6">
            <h1 class="text-3xl font-bold text-neutral-100 tracking-tight font-serif print:text-black">
              ${PROFILE.name.toUpperCase()}
            </h1>
            <p class="text-sm font-mono text-emerald-400 mt-1 font-bold">
              Software Engineer · Systems Architect · Artist & Writer
            </p>
            <div class="flex flex-wrap gap-4 mt-3 text-xs font-mono text-neutral-400">
              <a href="${PROFILE.social.github.url}" target="_blank" class="hover:underline text-neutral-300">GitHub: ${PROFILE.social.github.url}</a>
              <span>·</span>
              <a href="${PROFILE.social.linkedin.url}" target="_blank" class="hover:underline text-neutral-300">LinkedIn: ${PROFILE.social.linkedin.url}</a>
            </div>
          </div>

          <!-- Summary -->
          <div>
            <h2 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">Summary</h2>
            <p class="text-sm leading-relaxed text-neutral-300 print:text-black">
              Interdisciplinary Software Engineer specializing in scalable full-stack web applications, interactive WebGL/WebGPU graphics, developer tools, and machine learning models. Combines strong computer science fundamentals with aesthetic precision from visual arts and architectural systems theory.
            </p>
          </div>

          <!-- Skills -->
          <div>
            <h2 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">Core Technical Skills</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div class="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-neutral-400 block mb-1 font-bold">Languages & Core:</span>
                <span class="text-neutral-200">Python, C++, TypeScript, JavaScript, SQL, GLSL, HTML5/CSS3</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-neutral-400 block mb-1 font-bold">Web & Graphics:</span>
                <span class="text-neutral-200">Vite, Web Workers, Canvas 2D, WebGL 2.0, OPFS, Tailwind CSS</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-neutral-400 block mb-1 font-bold">Backend & Systems:</span>
                <span class="text-neutral-200">Node.js, Express, PostgreSQL, SQLite, Redis, REST & GraphQL, Docker</span>
              </div>
              <div class="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-neutral-400 block mb-1 font-bold">ML & Vision:</span>
                <span class="text-neutral-200">Computer Vision, PyTorch, Diffusers, OpenCV, SIMD Vectorization</span>
              </div>
            </div>
          </div>

          <!-- Featured Projects -->
          <div>
            <h2 class="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">Featured Software Projects</h2>
            <div class="space-y-4">
              ${projects.map(p => `
                <div class="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold font-mono text-neutral-100">${p.title}</span>
                    <span class="text-xs font-mono text-neutral-500">${p.year}</span>
                  </div>
                  <p class="text-xs text-neutral-300">${p.tagline}</p>
                  <p class="text-xs text-neutral-400 leading-relaxed">${p.overview}</p>
                  ${p.keyFeatures ? `
                    <ul class="list-disc list-inside text-xs text-neutral-400 pt-1 space-y-0.5">
                      ${p.keyFeatures.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderProjectModal() {
  const p = state.activeProject;
  if (!p) return '';

  return `
    <div id="project-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div class="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full badge-code text-code text-xs font-mono font-bold">${p.category}</span>
            <span class="text-xs font-mono text-neutral-400">${p.year}</span>
          </div>
          <button id="close-project-btn" class="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800">
            ${icon('x', 'w-5 h-5')}
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-mono font-bold text-neutral-100">${p.title}</h2>
            <p class="text-sm sm:text-base text-neutral-300 mt-2 font-mono">${p.tagline}</p>
          </div>

          <!-- Problem & Solution -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${p.problem ? `
              <div class="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">Challenge</span>
                <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${p.problem}</p>
              </div>
            ` : ''}
            ${p.solution ? `
              <div class="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">Engineered Solution</span>
                <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${p.solution}</p>
              </div>
            ` : ''}
          </div>

          <!-- Architecture Highlights -->
          ${p.architecture ? `
            <div>
              <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-code mb-3">Architectural Highlights</h3>
              <ul class="space-y-2">
                ${p.architecture.map(a => `
                  <li class="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                    <span class="text-code mt-0.5">${icon('corner-down-right', 'w-3.5 h-3.5')}</span>
                    <span>${a}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Code Snippet Viewer -->
          ${p.codeSnippet ? `
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>${p.codeSnippet.filename} (${p.codeSnippet.language})</span>
                <button id="copy-code-btn" class="flex items-center gap-1.5 text-code hover:underline">
                  ${icon(state.copiedCode ? 'check' : 'copy', 'w-3.5 h-3.5')}
                  <span>${state.copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre class="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed"><code>${p.codeSnippet.code}</code></pre>
            </div>
          ` : ''}

        </div>

      </div>
    </div>
  `;
}

function renderArtLightbox() {
  const art = state.activeArtwork;
  if (!art) return '';

  return `
    <div id="art-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div class="relative w-full max-w-5xl max-h-[95vh] flex flex-col items-center justify-between">
        
        <!-- Top Toolbar -->
        <div class="w-full flex items-center justify-between py-3 px-4 text-xs font-mono text-neutral-300 z-10">
          <div>
            <span class="font-bold text-neutral-100">${art.title}</span> · <span class="text-rose-400">${art.category}</span> (${art.year})
          </div>
          <div class="flex items-center gap-3">
            <button id="toggle-art-zoom" class="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white">
              ${icon(state.isArtZoomed ? 'zoom-out' : 'zoom-in', 'w-4 h-4')}
            </button>
            <button id="close-art-btn" class="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white">
              ${icon('x', 'w-4 h-4')}
            </button>
          </div>
        </div>

        <!-- Center Image Stage with Protection Shield -->
        <div class="relative flex-1 w-full flex items-center justify-center overflow-hidden py-4 select-none">
          <img
            id="lightbox-art-img"
            src="${art.imageUrl}"
            alt="${art.title}"
            draggable="false"
            class="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 select-none pointer-events-none ${
              state.isArtZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
            }"
          />
        </div>

        <!-- Bottom Description Bar -->
        ${art.medium || art.description ? `
          <div class="w-full text-center py-2 px-4 text-xs font-mono text-neutral-400 bg-neutral-950/60 rounded-2xl border border-neutral-800/60">
            ${art.medium ? `<span>Medium: ${art.medium}</span>` : ''}
            ${art.dimensions ? ` · <span>Dimensions: ${art.dimensions}</span>` : ''}
            ${art.description ? `<p class="text-neutral-300 mt-1 font-sans text-xs">${art.description}</p>` : ''}
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function renderWritingReader() {
  const post = state.activeWriting;
  if (!post) return '';

  const fontClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  }[state.writingFontFamily];

  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  }[state.writingFontSize];

  // Simple Markdown to HTML converter
  const formattedHtml = post.content
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return `<h2 class="text-2xl sm:text-3xl font-bold text-neutral-100 mt-8 mb-4">${trimmed.slice(3)}</h2>`;
      }
      if (trimmed.startsWith('### ')) {
        return `<h3 class="text-xl sm:text-2xl font-bold text-neutral-100 mt-6 mb-3">${trimmed.slice(4)}</h3>`;
      }
      if (trimmed.startsWith('> ')) {
        return `<blockquote class="pl-4 py-2 border-l-2 border-amber-500 text-amber-200/90 italic my-6 bg-amber-950/20 rounded-r-xl">${trimmed.slice(2)}</blockquote>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n').map(l => `<li>${l.replace(/^[-*\d.]+\s*/, '')}</li>`).join('');
        return `<ul class="list-disc list-inside space-y-1.5 my-4 text-neutral-300">${items}</ul>`;
      }
      return `<p class="mb-5 text-neutral-300 leading-relaxed">${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-100 font-semibold">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-neutral-200">$1</em>')}</p>`;
    })
    .join('');

  return `
    <div id="writing-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div class="relative w-full max-w-3xl min-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col my-auto">
        
        <!-- Reader Toolbar -->
        <div class="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md rounded-t-3xl">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full badge-writing text-writing text-xs font-mono font-bold">${post.category}</span>
            <span class="text-xs font-mono text-neutral-400">${post.readingTime || '5 min read'}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Font Size Toggle -->
            <button id="reader-decrease-font" class="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white" title="Decrease font size">
              A-
            </button>
            <button id="reader-increase-font" class="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white" title="Increase font size">
              A+
            </button>
            <button id="close-writing-btn" class="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 ml-2">
              ${icon('x', 'w-5 h-5')}
            </button>
          </div>
        </div>

        <!-- Reader Article Content -->
        <div class="flex-1 px-6 sm:px-16 py-10 max-w-2xl mx-auto w-full">
          <header class="border-b border-neutral-800 pb-8 mb-8">
            <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
              ${post.title}
            </h1>
            ${post.subtitle ? `<p class="text-sm sm:text-base font-serif text-neutral-400 mt-3 leading-relaxed">${post.subtitle}</p>` : ''}
            <div class="flex items-center gap-3 mt-4 text-xs font-mono text-neutral-500">
              <span>By ${PROFILE.name}</span> · <span>${post.date}</span>
            </div>
          </header>

          <article class="${fontClasses} ${sizeClasses}">
            ${formattedHtml}
          </article>
        </div>

      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 7. Full App Renderer
// ----------------------------------------------------------------------------
export function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  let mainContent = '';

  if (state.activeView === 'main') {
    mainContent = `
      <div class="space-y-16 animate-fadeIn">
        ${renderHeroSection()}
        ${renderSectionSeparator('neutral')}
        ${renderAboutSection()}
        ${renderSectionSeparator('code')}
        ${renderProgrammerSection()}
        ${renderSectionSeparator('art')}
        ${renderArtistSection()}
        ${renderSectionSeparator('writing')}
        ${renderWriterSection()}
      </div>
    `;
  } else if (state.activeView === 'code') {
    mainContent = `
      <div class="space-y-8 animate-fadeIn">
        ${renderDisciplineHero('code')}
        ${renderProgrammerSection()}
      </div>
    `;
  } else if (state.activeView === 'art') {
    mainContent = `
      <div class="space-y-8 animate-fadeIn">
        ${renderDisciplineHero('art')}
        ${renderArtistSection()}
      </div>
    `;
  } else if (state.activeView === 'writing') {
    mainContent = `
      <div class="space-y-8 animate-fadeIn">
        ${renderDisciplineHero('writing')}
        ${renderWriterSection()}
      </div>
    `;
  }

  root.innerHTML = `
    <div class="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col overflow-x-hidden">
      
      <!-- Top Scroll Progress Bar -->
      <div id="scroll-progress-bar" class="fixed top-0 left-0 h-[2.5px] z-[60] pointer-events-none transition-all duration-75" style="width: 0%;"></div>

      <!-- Ambient Background Glows -->
      <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-teal-400/8 via-cyan-500/5 to-transparent blur-[130px] opacity-70"></div>
        <div class="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-400/8 via-fuchsia-500/5 to-transparent blur-[140px] opacity-60"></div>
        <div class="absolute top-2/3 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-400/8 via-yellow-500/5 to-transparent blur-[130px] opacity-60"></div>
      </div>

      <!-- Subtle Film Grain Overlay -->
      <div class="bg-grain-overlay" aria-hidden="true"></div>

      <!-- Navbar -->
      ${renderNavbar()}

      <!-- Main Content -->
      <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-24 pb-16">
        ${mainContent}
      </main>

      <!-- Footer -->
      ${renderFooter()}

      <!-- Scroll to top button -->
      <button id="scroll-top-btn" class="hidden fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white shadow-2xl hover:scale-110 active:scale-95 transition-all backdrop-blur-md">
        ${icon('arrow-up', 'w-4 h-4')}
      </button>

      <!-- Modals Container -->
      <div id="modals-root">
        ${renderResumeModal()}
        ${renderProjectModal()}
        ${renderArtLightbox()}
        ${renderWritingReader()}
      </div>

    </div>
  `;

  // Transform all <i data-lucide="..."> to official Lucide SVGs
  createIcons({ icons });

  // Attach interactive DOM event listeners
  attachEventListeners();
}

// ----------------------------------------------------------------------------
// 8. Event Listener Registrations
// ----------------------------------------------------------------------------
function attachEventListeners() {
  // Navigation buttons
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const view = el.getAttribute('data-nav');
      navigateTo(view);
    });
  });

  const brandBtn = document.getElementById('nav-brand-btn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => navigateTo('main'));
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  const mobileResumeBtn = document.getElementById('mobile-open-resume');
  if (mobileResumeBtn) {
    mobileResumeBtn.addEventListener('click', () => {
      state.isResumeOpen = true;
      if (mobileDrawer) mobileDrawer.classList.add('hidden');
      renderApp();
    });
  }

  // Resume modal triggers
  const resumeBtn = document.getElementById('open-resume-btn');
  const aboutResumeBtn = document.getElementById('about-resume-btn');
  const disciplineResumeBtn = document.getElementById('discipline-resume-btn');
  [resumeBtn, aboutResumeBtn, disciplineResumeBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        state.isResumeOpen = true;
        renderApp();
      });
    }
  });

  const closeResumeBtn = document.getElementById('close-resume-btn');
  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => {
      state.isResumeOpen = false;
      renderApp();
    });
  }

  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const copyResumeBtn = document.getElementById('copy-resume-btn');
  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const text = `${PROFILE.name}\n${PROFILE.tagline}\nGitHub: ${PROFILE.social.github.url}\nLinkedIn: ${PROFILE.social.linkedin.url}`;
      navigator.clipboard.writeText(text);
      state.copiedResume = true;
      renderApp();
      setTimeout(() => {
        state.copiedResume = false;
        renderApp();
      }, 2000);
    });
  }

  // Code Category Filter Pills
  document.querySelectorAll('[data-code-cat]').forEach(el => {
    el.addEventListener('click', () => {
      state.codeCategory = el.getAttribute('data-code-cat');
      renderApp();
    });
  });

  // Skills Matrix Category
  document.querySelectorAll('[data-skill-cat]').forEach(el => {
    el.addEventListener('click', () => {
      state.activeSkillCategory = el.getAttribute('data-skill-cat');
      renderApp();
    });
  });

  // Open Project Modal
  document.querySelectorAll('[data-open-project]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-open-project');
      const found = projects.find(p => p.id === id);
      if (found) {
        state.activeProject = found;
        renderApp();
      }
    });
  });

  const closeProjectBtn = document.getElementById('close-project-btn');
  if (closeProjectBtn) {
    closeProjectBtn.addEventListener('click', () => {
      state.activeProject = null;
      renderApp();
    });
  }

  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn && state.activeProject?.codeSnippet) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(state.activeProject.codeSnippet.code);
      state.copiedCode = true;
      renderApp();
      setTimeout(() => {
        state.copiedCode = false;
        renderApp();
      }, 2000);
    });
  }

  // Terminal Simulator
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value.trim().toLowerCase();
      if (!val) return;

      const newLogs = [...state.terminalLogs, `$ ${val}`];
      if (val === 'help') {
        newLogs.push('Available commands: help, bench, stats, whoami, clear');
      } else if (val === 'bench') {
        newLogs.push('Running micro-benchmark...');
        newLogs.push('OPFS commit latency: 1.84ms | WebGL fps: 60.0 | Memory: 42.1MB');
      } else if (val === 'stats') {
        newLogs.push(`Systems: ${projects.length} | Artworks: ${artworks.length} | Essays: ${writings.length}`);
      } else if (val === 'whoami') {
        newLogs.push(`${PROFILE.name} — ${PROFILE.tagline}`);
      } else if (val === 'clear') {
        state.terminalLogs = ['Terminal reset. Type "help" for options.'];
        renderApp();
        return;
      } else {
        newLogs.push(`Command not recognized: "${val}". Type "help".`);
      }
      state.terminalLogs = newLogs;
      renderApp();
      const screen = document.getElementById('terminal-screen');
      if (screen) screen.scrollTop = screen.scrollHeight;
    });
  }

  // Art Category Filter Pills
  document.querySelectorAll('[data-art-cat]').forEach(el => {
    el.addEventListener('click', () => {
      state.artCategory = el.getAttribute('data-art-cat');
      renderApp();
    });
  });

  // Open Art Lightbox
  document.querySelectorAll('[data-open-art]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-open-art');
      const found = artworks.find(a => a.id === id);
      if (found) {
        state.activeArtwork = found;
        state.isArtZoomed = false;
        renderApp();
      }
    });
  });

  const closeArtBtn = document.getElementById('close-art-btn');
  if (closeArtBtn) {
    closeArtBtn.addEventListener('click', () => {
      state.activeArtwork = null;
      renderApp();
    });
  }

  const toggleArtZoom = document.getElementById('toggle-art-zoom');
  if (toggleArtZoom) {
    toggleArtZoom.addEventListener('click', () => {
      state.isArtZoomed = !state.isArtZoomed;
      renderApp();
    });
  }

  // Writing Category Filter Pills
  document.querySelectorAll('[data-writing-cat]').forEach(el => {
    el.addEventListener('click', () => {
      state.writingCategory = el.getAttribute('data-writing-cat');
      renderApp();
    });
  });

  // Writing Search Input
  const writingSearch = document.getElementById('writing-search-input');
  if (writingSearch) {
    writingSearch.addEventListener('input', (e) => {
      state.writingSearch = e.target.value;
      renderApp();
      const inputAgain = document.getElementById('writing-search-input');
      if (inputAgain) {
        inputAgain.focus();
        inputAgain.setSelectionRange(inputAgain.value.length, inputAgain.value.length);
      }
    });
  }

  // Open Writing Reader
  document.querySelectorAll('[data-open-writing]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-open-writing');
      const found = writings.find(w => w.id === id);
      if (found) {
        state.activeWriting = found;
        renderApp();
      }
    });
  });

  const closeWritingBtn = document.getElementById('close-writing-btn');
  if (closeWritingBtn) {
    closeWritingBtn.addEventListener('click', () => {
      state.activeWriting = null;
      renderApp();
    });
  }

  const decFontBtn = document.getElementById('reader-decrease-font');
  if (decFontBtn) {
    decFontBtn.addEventListener('click', () => {
      const sizes = ['sm', 'base', 'lg', 'xl'];
      const idx = sizes.indexOf(state.writingFontSize);
      if (idx > 0) {
        state.writingFontSize = sizes[idx - 1];
        renderApp();
      }
    });
  }

  const incFontBtn = document.getElementById('reader-increase-font');
  if (incFontBtn) {
    incFontBtn.addEventListener('click', () => {
      const sizes = ['sm', 'base', 'lg', 'xl'];
      const idx = sizes.indexOf(state.writingFontSize);
      if (idx < sizes.length - 1) {
        state.writingFontSize = sizes[idx + 1];
        renderApp();
      }
    });
  }

  // Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Backdrop clicks to close modals
  const resumeBackdrop = document.getElementById('resume-modal-backdrop');
  if (resumeBackdrop) {
    resumeBackdrop.addEventListener('click', (e) => {
      if (e.target === resumeBackdrop) {
        state.isResumeOpen = false;
        renderApp();
      }
    });
  }

  const projectBackdrop = document.getElementById('project-modal-backdrop');
  if (projectBackdrop) {
    projectBackdrop.addEventListener('click', (e) => {
      if (e.target === projectBackdrop) {
        state.activeProject = null;
        renderApp();
      }
    });
  }

  const artBackdrop = document.getElementById('art-modal-backdrop');
  if (artBackdrop) {
    artBackdrop.addEventListener('click', (e) => {
      if (e.target === artBackdrop) {
        state.activeArtwork = null;
        renderApp();
      }
    });
  }

  const writingBackdrop = document.getElementById('writing-modal-backdrop');
  if (writingBackdrop) {
    writingBackdrop.addEventListener('click', (e) => {
      if (e.target === writingBackdrop) {
        state.activeWriting = null;
        renderApp();
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 9. Global Window Listeners (Scroll, Keys, Mouse Tracking, Protection)
// ----------------------------------------------------------------------------
window.addEventListener('scroll', () => {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('hidden');
    } else {
      scrollTopBtn.classList.add('hidden');
    }
  }

  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    progressBar.style.background = 'linear-gradient(90deg, var(--code-secondary) 0%, var(--art-secondary) 50%, var(--writing-secondary) 100%)';
    progressBar.style.boxShadow = '0 0 10px rgba(var(--art-rgb), 0.65)';
  }
}, { passive: true });

// Spotlight Card GPU Tracking
window.addEventListener('pointermove', (e) => {
  const target = e.target?.closest?.('.spotlight-card');
  if (target) {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }
}, { passive: true });

// Escape key to dismiss active modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.activeArtwork || state.activeProject || state.activeWriting || state.isResumeOpen) {
      state.activeArtwork = null;
      state.activeProject = null;
      state.activeWriting = null;
      state.isResumeOpen = false;
      renderApp();
    }
  }
});

// Content Protection: Prevent right-click context menu on images
window.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG' || e.target.closest('#lightbox-art-img')) {
    e.preventDefault();
  }
});

// Hash routing
window.addEventListener('hashchange', handleHashChange);

// ----------------------------------------------------------------------------
// 10. Bootstrap Application
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initPalette();
  const hash = window.location.hash.replace('#', '').trim();
  if (['code', 'art', 'writing'].includes(hash)) {
    state.activeView = hash;
  }
  updateMetaTitle();
  renderApp();
});
