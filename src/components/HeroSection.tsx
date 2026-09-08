import React from 'react';
import { Palette, PenTool, Terminal, Sparkles, ArrowRight, Code, BookOpen, Image as ImageIcon, Layers } from 'lucide-react';
import { AppView } from '../types';
import { PROFILE } from '../data/profile';

interface HeroSectionProps {
  onSelectView: (view: AppView) => void;
  artworksCount: number;
  writingsCount: number;
  projectsCount: number;
  interdisciplinaryCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectView,
  artworksCount,
  writingsCount,
  projectsCount,
  interdisciplinaryCount = 0,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-8 sm:pb-12 md:pt-14 md:pb-14">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900/90 border border-emerald-500/30 text-neutral-200 text-[11px] sm:text-xs font-medium backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-400 bg-clip-text text-transparent font-bold">
              {PROFILE.tagline}
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 mb-3 sm:mb-4 leading-tight font-serif">
            Portfolio of{' '}
            <span className="ombre-text-brand font-serif font-bold">
              {PROFILE.name}
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed px-2">
            {PROFILE.headline}
          </p>
        </div>

        {/* Three Disciplines Interactive Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Discipline 01 - Code */}
          <div
            id="hero-card-code"
            onClick={() => onSelectView('code')}
            className="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-programmer hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-code flex items-center justify-center text-code group-hover:scale-110 transition-all">
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="bubbly-pill-prog text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  01 · {projectsCount} Systems
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-code transition-colors mb-2 font-mono">
                Software & Systems
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Full-stack web applications, WebGL fluid shaders, developer tools, and machine learning models.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-code text-xs text-code font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <Code className="w-4 h-4" /> View Code & Systems
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Discipline 02 - Art */}
          <div
            id="hero-card-art"
            onClick={() => onSelectView('art')}
            className="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-artist hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-art flex items-center justify-center text-art group-hover:scale-110 transition-all">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="bubbly-pill-artist text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  02 · {artworksCount} Works
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-art transition-colors mb-2 font-serif">
                Visual Art & Design
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Chinese ink paintings on Xuan paper, digital paintings, ink & mixed media, book design, and web design.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-art text-xs text-art font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" /> View Art Gallery
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Discipline 03 - Writing */}
          <div
            id="hero-card-writing"
            onClick={() => onSelectView('writing')}
            className="group relative rounded-3xl p-5 sm:p-7 cursor-pointer transition-all duration-300 bento-card spotlight-card bento-card-writer hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl badge-writing flex items-center justify-center text-writing group-hover:scale-110 transition-all">
                  <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="bubbly-pill-writer text-xs font-mono px-3 py-1 rounded-full font-bold shadow-sm">
                  03 · {writingsCount} Essays
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-writing transition-colors mb-2 font-serif">
                Writing & Essays
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Critical essays, technical treatises, and short speculative fiction exploring aesthetics and systems.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-writing text-xs text-writing font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> View Essays & Fiction
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* 
            Card 4: Discipline 04 - Interdisciplinary / Convergence (Commented out per user preference)
            Uncomment to restore:
          <div
            id="hero-card-interdisciplinary"
            onClick={() => onSelectView('interdisciplinary')}
            className="group relative rounded-3xl p-6 cursor-pointer transition-all duration-300 bento-card hover:border-indigo-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="bubbly-pill-multi text-xs font-mono px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                  04 · {interdisciplinaryCount} Cross-Work
                </span>
              </div>

              <h3 className="text-lg font-bold text-neutral-100 group-hover:text-indigo-400 transition-colors mb-2 font-mono">
                Interdisciplinary
              </h3>
              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                Work where engineering, visual design, and writing converge in real systems and workflows.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20 text-xs text-indigo-400 font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> View Interdisciplinary
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
          */}

        </div>

      </div>
    </section>
  );
};
