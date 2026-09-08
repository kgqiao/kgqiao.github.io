import React from 'react';
import {
  Terminal,
  Palette,
  PenTool,
  Layers,
  ArrowLeft,
  Github,
  Linkedin,
  FileText
} from 'lucide-react';
import { AppView } from '../types';
import { PROFILE } from '../data/profile';

interface DisciplineLandingHeroProps {
  view: 'code' | 'art' | 'writing' | 'interdisciplinary';
  onSelectView: (view: AppView) => void;
  onOpenResume?: () => void;
  itemCount: number;
}

export const DisciplineLandingHero: React.FC<DisciplineLandingHeroProps> = ({
  view,
  onSelectView,
  onOpenResume,
  itemCount
}) => {
  const config = PROFILE.disciplineLandings[view];

  // Visual Theme configurations driven dynamically by palette CSS variables
  const theme = {
    code: {
      cardClass: 'bento-card-programmer',
      pillClass: 'bubbly-pill-prog',
      accentColor: 'text-code',
      badgeBg: 'badge-code',
      gradientText: 'from-emerald-300 via-teal-300 to-cyan-300',
      activeTabClass: 'btn-pill-code-active',
      icon: Terminal,
      label: 'Software & Systems',
      countLabel: `${itemCount} Software Systems & Tools`,
    },
    art: {
      cardClass: 'bento-card-artist',
      pillClass: 'bubbly-pill-artist',
      accentColor: 'text-art',
      badgeBg: 'badge-art',
      gradientText: 'from-rose-300 via-pink-300 to-fuchsia-300',
      activeTabClass: 'btn-pill-art-active',
      icon: Palette,
      label: 'Visual Art & Design',
      countLabel: `${itemCount} Curated Artworks`,
    },
    writing: {
      cardClass: 'bento-card-writer',
      pillClass: 'bubbly-pill-writer',
      accentColor: 'text-writing',
      badgeBg: 'badge-writing',
      gradientText: 'from-amber-300 via-orange-300 to-yellow-300',
      activeTabClass: 'btn-pill-writing-active',
      icon: PenTool,
      label: 'Writing & Essays',
      countLabel: `${itemCount} Essays & Stories`,
    },
    interdisciplinary: {
      cardClass: 'bento-card',
      pillClass: 'bubbly-pill-multi',
      accentColor: 'text-neutral-200',
      badgeBg: 'bg-neutral-800 text-neutral-200 border border-white/20',
      gradientText: 'from-emerald-300 via-rose-300 to-amber-300',
      activeTabClass: 'bg-neutral-800 text-white font-bold',
      icon: Layers,
      label: 'Interdisciplinary Work',
      countLabel: `${itemCount} Convergent Works`,
    },
  }[view];

  const IconComponent = theme.icon;

  // Filter highlights to only non-empty labels and values
  const validHighlights = (config?.highlights || []).filter(
    (h) => h && h.label && h.label.trim() !== '' && h.value && h.value.trim() !== ''
  );

  return (
    <div className={`p-4 sm:p-8 md:p-10 rounded-3xl bento-card ${theme.cardClass} shadow-2xl relative overflow-hidden mb-8 sm:mb-10`}>
      
      {/* Top Bar: Return to Main & Discipline Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-white/10">
        
        {/* Return Button */}
        <button
          id={`back-to-main-from-${view}`}
          onClick={() => onSelectView('main')}
          className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-mono transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          <span className="sm:hidden">All Disciplines (Main)</span>
          <span className="hidden sm:inline">View All Disciplines (Continuous Scroll)</span>
        </button>

        {/* Quick Discipline Switcher Pills */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 p-1 bg-neutral-950/80 border border-white/10 rounded-2xl overflow-x-auto">
          <button
            onClick={() => onSelectView('code')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              view === 'code'
                ? 'btn-pill-code-active'
                : 'text-neutral-400 hover-text-code'
            }`}
          >
            01 Code
          </button>
          <button
            onClick={() => onSelectView('art')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              view === 'art'
                ? 'btn-pill-art-active'
                : 'text-neutral-400 hover-text-art'
            }`}
          >
            02 Art
          </button>
          <button
            onClick={() => onSelectView('writing')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              view === 'writing'
                ? 'btn-pill-writing-active'
                : 'text-neutral-400 hover-text-writing'
            }`}
          >
            03 Writing
          </button>
        </div>
      </div>

      {/* Hero Body */}
      <div className="pt-8 space-y-6">
        
        {/* Badges & Meta (Optional) */}
        <div className="flex flex-wrap items-center gap-3">
          {config?.badge && (
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${theme.badgeBg}`}>
              <IconComponent className="w-3.5 h-3.5" />
              <span>{config.badge}</span>
            </div>
          )}

          <span className={`${theme.pillClass} text-xs font-mono px-3.5 py-1.5 rounded-full font-bold`}>
            {theme.countLabel}
          </span>
        </div>

        {/* Hero Title & Identity */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
              {PROFILE.name}
            </h1>
            {config?.role && (
              <span className={`text-lg sm:text-xl font-mono font-semibold ${theme.accentColor}`}>
                / {config.role}
              </span>
            )}
          </div>

          {config?.tagline && (
            <p className="text-lg sm:text-xl text-neutral-200 font-sans max-w-3xl leading-relaxed">
              {config.tagline}
            </p>
          )}

          {config?.overview && (
            <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {config.overview}
            </p>
          )}
        </div>

        {/* Dynamic Highlights Grid (Only rendered if items exist) */}
        {validHighlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 pt-4">
            {validHighlights.map((h, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-neutral-950/70 border border-white/10 flex flex-col justify-between space-y-1 hover:border-white/20 transition-colors"
              >
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  {h.label}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-100 font-mono">
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Direct Social Links (No Inquiry Wording / Clean Profiles) */}
        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          
          <a
            href={PROFILE.social.github.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-mono transition-all hover:scale-105"
          >
            <Github className="w-4 h-4 text-code" />
            <span>GitHub</span>
          </a>

          <a
            href={PROFILE.social.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-mono transition-all hover:scale-105"
          >
            <Linkedin className="w-4 h-4 text-art" />
            <span>LinkedIn</span>
          </a>

          {/* 
            Resume Button (Commented out per user preference)
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-mono transition-all hover:scale-105"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resume</span>
            </button>
          )}
          */}

        </div>

      </div>

    </div>
  );
};
