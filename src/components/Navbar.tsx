import React from 'react';
import { Palette, PenTool, Terminal, Layers, Github, Linkedin } from 'lucide-react';
import { AppView } from '../types';
import { PROFILE } from '../data/profile';

interface NavbarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
}) => {
  const handleNav = (view: AppView) => {
    setActiveView(view);
    const hash = view === 'main' ? '#main' : `#${view}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-2 sm:top-4 inset-x-0 z-50 flex justify-center px-2 sm:px-6 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-md sm:max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-2 sm:px-4 sm:py-2 rounded-2xl sm:rounded-full bg-neutral-950/95 sm:bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-2xl shadow-2xl shadow-black/90 transition-all duration-300">
        
        {/* Top Tier (Mobile) / Left Side (Desktop): Brand Logo + Socials on Mobile */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-4 px-1 sm:px-0">
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('main')}
            className="flex items-center gap-2.5 text-left group focus:outline-none flex-shrink-0"
            title="Return to Main Page"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-400 via-rose-500 to-amber-400 p-[1.5px] shadow-sm group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-neutral-950 rounded-[9px] flex items-center justify-center">
                <span className="font-serif font-bold text-[11px] sm:text-xs bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                  {PROFILE.initials}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:block">
              <span className="font-sans font-bold text-xs sm:text-sm text-neutral-100 tracking-tight group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                {PROFILE.name}
              </span>
            </div>
          </button>

          {/* Social Links on Mobile (Aligned to top right on mobile) */}
          <div className="flex sm:hidden items-center gap-1">
            <a
              id="top-github-link-mobile"
              href={PROFILE.social.github.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-neutral-400 hover-text-code hover:bg-neutral-900 transition-colors"
              title={`GitHub (${PROFILE.social.github.display})`}
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="top-linkedin-link-mobile"
              href={PROFILE.social.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-neutral-400 hover-text-art hover:bg-neutral-900 transition-colors"
              title={`LinkedIn (${PROFILE.social.linkedin.display})`}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs: Full Width Grid on Mobile, Centered Inline Pills on Desktop */}
        <nav className="grid grid-cols-4 sm:flex items-center gap-1 sm:gap-1.5 p-1 sm:p-0 bg-neutral-900/60 sm:bg-transparent rounded-xl sm:rounded-none border border-neutral-800/60 sm:border-none">
          {/* Main Page */}
          <button
            id="nav-tab-main"
            onClick={() => handleNav('main')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              activeView === 'main'
                ? 'bg-neutral-800 text-white border border-white/20 shadow-md font-bold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Main</span>
          </button>

          {/* 01 Code */}
          <button
            id="nav-tab-code"
            onClick={() => handleNav('code')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              activeView === 'code'
                ? 'btn-pill-code-active font-bold shadow-md'
                : 'text-neutral-400 hover-text-code hover:bg-neutral-900/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 flex-shrink-0 text-code" />
            <span>Code</span>
          </button>

          {/* 02 Art */}
          <button
            id="nav-tab-art"
            onClick={() => handleNav('art')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              activeView === 'art'
                ? 'btn-pill-art-active font-bold shadow-md'
                : 'text-neutral-400 hover-text-art hover:bg-neutral-900/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5 flex-shrink-0 text-art" />
            <span>Art</span>
          </button>

          {/* 03 Writing */}
          <button
            id="nav-tab-writing"
            onClick={() => handleNav('writing')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              activeView === 'writing'
                ? 'btn-pill-writing-active font-bold shadow-md'
                : 'text-neutral-400 hover-text-writing hover:bg-neutral-900/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 flex-shrink-0 text-writing" />
            <span>Writing</span>
          </button>
        </nav>

        {/* Right Side on Desktop: GitHub & LinkedIn */}
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <a
            id="top-github-link"
            href={PROFILE.social.github.url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:p-2 rounded-full text-neutral-400 hover-text-code hover:bg-neutral-900/80 transition-colors"
            title={`GitHub (${PROFILE.social.github.display})`}
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="top-linkedin-link"
            href={PROFILE.social.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:p-2 rounded-full text-neutral-400 hover-text-art hover:bg-neutral-900/80 transition-colors"
            title={`LinkedIn (${PROFILE.social.linkedin.display})`}
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

      </header>
    </div>
  );
};
