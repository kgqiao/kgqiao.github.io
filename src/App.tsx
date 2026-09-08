/**
 * Portfolio Web Application - Katherine Qiao
 * Software Engineer • Visual Artist • Writer
 * 
 * Clean, dynamic, high-performance portfolio application.
 * All profile details and social links are centrally configured in /src/data/profile.ts.
 * All project, art, writing, and interdisciplinary items are in /src/data/initialData.ts.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProgrammerSection } from './components/ProgrammerSection';
import { ArtistSection } from './components/ArtistSection';
import { WriterSection } from './components/WriterSection';
import { IntersectionSection } from './components/IntersectionSection';
import { DisciplineLandingHero } from './components/DisciplineLandingHero';
import { SectionSeparator } from './components/SectionSeparator';
import { ResumeModal } from './components/ResumeModal';
import { ContentProtectionShield } from './components/ContentProtectionShield';
import { ARTWORKS_DATA, WRITING_POSTS_DATA, PROJECTS_DATA, INTERDISCIPLINARY_DATA } from './data/initialData';
import { getAllArtworks } from './data/autoArtworks';
import { getAllWritingPosts, getAllProjects, getAllInterdisciplinary } from './data/autoContent';
import { PROFILE } from './data/profile';
import { PALETTES } from './data/palettes';
import { AppView, Artwork, WritingPost, Project, InterdisciplinaryItem } from './types';
import {
  ArrowUp,
  Github,
  Linkedin
} from 'lucide-react';

export default function App() {
  // ---------------------------------------------------------------------------
  // 1. Core Navigation State ('main' | 'code' | 'art' | 'writing' | 'interdisciplinary')
  // ---------------------------------------------------------------------------
  const [activeView, setActiveView] = useState<AppView>(() => {
    try {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#code' || hash === '#programmer') return 'code';
      if (hash === '#art' || hash === '#artist') return 'art';
      if (hash === '#writing' || hash === '#writer') return 'writing';
      if (hash === '#interdisciplinary' || hash === '#intersection') return 'interdisciplinary';
    } catch {
      // fallback
    }
    return 'main';
  });

  // ---------------------------------------------------------------------------
  // 2. Shared Dynamic Data Layer (Single Source of Truth: initialData.ts)
  // ---------------------------------------------------------------------------
  const [projects] = useState<Project[]>(() => getAllProjects(PROJECTS_DATA));
  const [artworks] = useState<Artwork[]>(() => getAllArtworks(ARTWORKS_DATA));
  const [writings] = useState<WritingPost[]>(() => getAllWritingPosts(WRITING_POSTS_DATA));
  const [interdisciplinaryItems] = useState<InterdisciplinaryItem[]>(() => getAllInterdisciplinary(INTERDISCIPLINARY_DATA));

  // Active Project subpage modal / inspector for Programmer section
  const [activeProjectSubpage, setActiveProjectSubpage] = useState<Project | null>(null);

  // Resume Modal
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Back to Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ---------------------------------------------------------------------------
  // 3. URL Hash Routing Listener
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#code' || hash === '#programmer') {
        setActiveView('code');
        setActiveProjectSubpage(null);
      } else if (hash === '#art' || hash === '#artist') {
        setActiveView('art');
        setActiveProjectSubpage(null);
      } else if (hash === '#writing' || hash === '#writer') {
        setActiveView('writing');
        setActiveProjectSubpage(null);
      } else if (hash === '#interdisciplinary' || hash === '#intersection') {
        setActiveView('interdisciplinary');
        setActiveProjectSubpage(null);
      } else if (hash === '#about') {
        setActiveView('main');
        setActiveProjectSubpage(null);
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else if (hash === '#main' || hash === '#all' || hash === '') {
        setActiveView('main');
        setActiveProjectSubpage(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ---------------------------------------------------------------------------
  // 4. Dynamic Trio Palette Theme Injection (Reads from PROFILE.palette)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const selectedPalette = PALETTES[PROFILE.palette] || PALETTES['studio-triad'];
    const root = document.documentElement;

    // Apply Code custom properties
    root.style.setProperty('--code-primary', selectedPalette.code.primary);
    root.style.setProperty('--code-secondary', selectedPalette.code.secondary);
    root.style.setProperty('--code-accent', selectedPalette.code.accent);
    root.style.setProperty('--code-rgb', selectedPalette.code.rgb);

    // Apply Art custom properties
    root.style.setProperty('--art-primary', selectedPalette.art.primary);
    root.style.setProperty('--art-secondary', selectedPalette.art.secondary);
    root.style.setProperty('--art-accent', selectedPalette.art.accent);
    root.style.setProperty('--art-rgb', selectedPalette.art.rgb);

    // Apply Writing custom properties
    root.style.setProperty('--writing-primary', selectedPalette.writing.primary);
    root.style.setProperty('--writing-secondary', selectedPalette.writing.secondary);
    root.style.setProperty('--writing-accent', selectedPalette.writing.accent);
    root.style.setProperty('--writing-rgb', selectedPalette.writing.rgb);
  }, []);

  // ---------------------------------------------------------------------------
  // 5. Dynamic Page Title & Meta Synchronization (Single Source of Truth: PROFILE)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const viewTitles: Record<AppView, string> = {
      main: `${PROFILE.name} · ${PROFILE.tagline}`,
      code: `${PROFILE.name} · Software & Systems`,
      art: `${PROFILE.name} · Visual Art & Design`,
      writing: `${PROFILE.name} · Writing & Essays`,
      interdisciplinary: `${PROFILE.name} · Interdisciplinary Work`,
    };
    const currentTitle = viewTitles[activeView] || `${PROFILE.name} · Portfolio`;
    document.title = currentTitle;

    // Update OpenGraph and Meta tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentTitle);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', PROFILE.headline || PROFILE.bio);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', PROFILE.headline || PROFILE.bio);
  }, [activeView]);

  // ---------------------------------------------------------------------------
  // 6. Scroll Visibility for Scroll-To-Top Button & Dynamic Top Scroll Progress
  // ---------------------------------------------------------------------------
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------------------------------------------------------------------------
  // 7. Interactive Spotlight Card Cursor Tracker (Zero Latency GPU Variable)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest('.spotlight-card') as HTMLElement | null;
      if (target) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // ---------------------------------------------------------------------------
  // 8. Action Handlers
  // ---------------------------------------------------------------------------
  const handleNavView = (view: AppView) => {
    setActiveView(view);
    setActiveProjectSubpage(null);
    const hash = view === 'main' ? '#main' : `#${view}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col overflow-x-hidden">
      {/* Anti-Copy and Anti-Screenshot Protection Shield */}
      <ContentProtectionShield />
      
      {/* 2. Dynamic Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--code-secondary) 0%, var(--art-secondary) 50%, var(--writing-secondary) 100%)',
          boxShadow: '0 0 10px rgba(var(--art-rgb), 0.65)',
        }}
      />

      {/* Background Ambient Glows (Vivid Pastel Tones) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-teal-400/8 via-cyan-500/5 to-transparent blur-[130px] opacity-70" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-400/8 via-fuchsia-500/5 to-transparent blur-[140px] opacity-60" />
        <div className="absolute top-2/3 -left-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-400/8 via-yellow-500/5 to-transparent blur-[130px] opacity-60" />
        <div className="absolute -bottom-40 right-1/4 w-[700px] h-[500px] rounded-full bg-gradient-to-t from-teal-400/8 via-purple-500/5 to-transparent blur-[150px] opacity-50" />
      </div>

      {/* 3. Subtle Organic Film Grain / Noise Overlay */}
      <div className="bg-grain-overlay" aria-hidden="true" />

      {/* Floating Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={handleNavView}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-20 md:pt-24 pb-16">
        
        {/* ================================================================= */}
        {/* 1. CONTINUOUS SCROLL MAIN PAGE                                    */}
        {/* ================================================================= */}
        {activeView === 'main' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Grand Hero Section */}
            <HeroSection
              onSelectView={handleNavView}
              artworksCount={artworks.length}
              writingsCount={writings.length}
              projectsCount={projects.length}
              interdisciplinaryCount={interdisciplinaryItems.length}
            />

            {/* Separator: Hero -> About */}
            <SectionSeparator variant="neutral" />

            {/* About & Bio Section */}
            <AboutSection />

            {/* Separator: About -> Discipline 01 (Code) */}
            <SectionSeparator variant="code" />

            {/* Discipline 01: Software & Systems (Gallery + Skills Matrix) */}
            <ProgrammerSection
              projects={projects}
              activeProjectSubpage={activeProjectSubpage}
              setActiveProjectSubpage={setActiveProjectSubpage}
            />

            {/* Separator: Discipline 01 (Code) -> Discipline 02 (Art) */}
            <SectionSeparator variant="art" />

            {/* Discipline 02: Visual Art & Design (View-Only Gallery) */}
            <ArtistSection artworks={artworks} />

            {/* Separator: Discipline 02 (Art) -> Discipline 03 (Writing) */}
            <SectionSeparator variant="writing" />

            {/* Discipline 03: Writing & Essays */}
            <WriterSection posts={writings} />

            {/* 
              Discipline 04: Interdisciplinary / Convergence (Commented out per user preference)
              Uncomment to restore:
            <IntersectionSection
              items={interdisciplinaryItems}
              onSelectView={handleNavView}
              onSelectProject={(projId) => {
                const found = projects.find((p) => p.id === projId);
                if (found) {
                  setActiveView('code');
                  setActiveProjectSubpage(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
            */}

          </div>
        )}

        {/* ================================================================= */}
        {/* 2. INDIVIDUAL DEDICATED VIEW: CODE & SYSTEMS (01)                 */}
        {/* ================================================================= */}
        {activeView === 'code' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dedicated Landing Page Hero for Engineering Recruiters & Tech Leads */}
            <DisciplineLandingHero
              view="code"
              itemCount={projects.length}
              onSelectView={handleNavView}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            {/* Programmer Section Component */}
            <ProgrammerSection
              projects={projects}
              activeProjectSubpage={activeProjectSubpage}
              setActiveProjectSubpage={setActiveProjectSubpage}
            />
          </div>
        )}

        {/* ================================================================= */}
        {/* 3. INDIVIDUAL DEDICATED VIEW: VISUAL ART & DESIGN (02)            */}
        {/* ================================================================= */}
        {activeView === 'art' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dedicated Landing Page Hero for Curators & Collectors */}
            <DisciplineLandingHero
              view="art"
              itemCount={artworks.length}
              onSelectView={handleNavView}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            {/* Artist Section Component (View-Only Gallery) */}
            <ArtistSection artworks={artworks} />
          </div>
        )}

        {/* ================================================================= */}
        {/* 4. INDIVIDUAL DEDICATED VIEW: WRITING & ESSAYS (03)               */}
        {/* ================================================================= */}
        {activeView === 'writing' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Dedicated Landing Page Hero for Editors & Readers */}
            <DisciplineLandingHero
              view="writing"
              itemCount={writings.length}
              onSelectView={handleNavView}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            {/* Writer Section Component */}
            <WriterSection posts={writings} />
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. INDIVIDUAL DEDICATED VIEW: INTERDISCIPLINARY WORK (04)         */}
        {/* (Commented out per user preference)                               */}
        {/* ================================================================= */}
        {/*
        {activeView === 'interdisciplinary' && (
          <div className="space-y-8 animate-fadeIn">
            <DisciplineLandingHero
              view="interdisciplinary"
              itemCount={interdisciplinaryItems.length}
              onSelectView={handleNavView}
              onOpenResume={() => setIsResumeOpen(true)}
            />

            <IntersectionSection
              items={interdisciplinaryItems}
              onSelectView={handleNavView}
              onSelectProject={(projId) => {
                const found = projects.find((p) => p.id === projId);
                if (found) {
                  setActiveView('code');
                  setActiveProjectSubpage(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </div>
        )}
        */}

      </main>

      {/* Modern High-End Footer with dynamic PROFILE variables */}
      <footer className="relative z-10 mt-16 border-t border-neutral-800/80 bg-neutral-950/90 py-12 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavView('main')}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 via-rose-400 to-amber-400 p-[1px] hover:scale-105 transition-transform"
              title="Return to Main Page"
            >
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center font-serif font-bold text-xs text-neutral-200">
                {PROFILE.initials}
              </div>
            </button>
            <div>
              <span className="font-semibold text-neutral-200">{PROFILE.name}</span>
            </div>
          </div>

          {/* Dynamic Social Links */}
          <div className="flex items-center gap-6">
            <a
              id="footer-github-link"
              href={PROFILE.social.github.url}
              target="_blank"
              rel="noreferrer"
              className="hover-text-code transition-colors flex items-center gap-1.5 font-mono"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              id="footer-linkedin-link"
              href={PROFILE.social.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="hover-text-art transition-colors flex items-center gap-1.5 font-mono"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="font-mono text-neutral-500">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white shadow-2xl hover:scale-110 active:scale-95 transition-all backdrop-blur-md"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
