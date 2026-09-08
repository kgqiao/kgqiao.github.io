import React from 'react';
import {
  User,
  ExternalLink,
  Github,
  Linkedin
} from 'lucide-react';
import { PROFILE } from '../data/profile';

export const AboutSection: React.FC = () => {
  const avatarUrl = PROFILE.avatarUrl;

  return (
    <section id="about" className="py-10 md:py-16 border-t border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-emerald-500/30 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 via-rose-400 to-amber-400 bg-clip-text text-transparent font-bold">
                About & Background
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-100 tracking-tight">
              {PROFILE.name}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 mt-2 max-w-2xl font-sans">
              {PROFILE.tagline}
            </p>
          </div>
        </div>

        {/* 1. Symmetrical 50/50 Bento Overview: Profile & Connect vs Background & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Left: Compact Profile Photo & Social Connect Card */}
          <div className="flex flex-col h-full">
            <div className="bento-card spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              
              {/* Header Label */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-art uppercase tracking-wider font-bold">
                  Profile & Connect
                </span>
              </div>

              {/* Enlarged, Elegantly Framed Profile Picture with Breathing Gradient Halo */}
              <div className="flex-1 flex items-center justify-center py-2 relative">
                {/* 5. Breathing Ambient Halo */}
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-rose-500/30 to-amber-500/30 blur-xl opacity-60 animate-breathing-halo pointer-events-none" />
                
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl p-[2px] bg-gradient-to-tr from-emerald-500/40 via-rose-500/40 to-amber-500/40 group z-10">
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                    <img
                      src={avatarUrl}
                      alt={PROFILE.name}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links: LinkedIn, GitHub */}
              <div className="space-y-3 pt-2">
                <a
                  href={PROFILE.social.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700 text-neutral-200 hover:text-white transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl badge-code flex items-center justify-center text-code group-hover:scale-105 transition-transform">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-mono font-bold block">GitHub</span>
                      <span className="text-[11px] font-mono text-neutral-400">{PROFILE.social.github.display}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-code transition-colors" />
                </a>

                <a
                  href={PROFILE.social.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700 text-neutral-200 hover:text-white transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl badge-art flex items-center justify-center text-art group-hover:scale-105 transition-transform">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-mono font-bold block">LinkedIn</span>
                      <span className="text-[11px] font-mono text-neutral-400">{PROFILE.social.linkedin.display}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-art transition-colors" />
                </a>
              </div>

            </div>
          </div>

          {/* Right: Direct Biography & Disciplines */}
          <div className="flex flex-col h-full">
            <div className="bento-card spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-code uppercase tracking-wider font-bold">
                  Background & Philosophy
                </span>
              </div>

              <div className="space-y-4 text-neutral-200 font-sans text-sm sm:text-base leading-relaxed flex-1 flex flex-col justify-between">
                <p>
                  {PROFILE.bio}
                </p>
                <div className="space-y-3 pt-2">
                  {PROFILE.disciplineLandings.code?.overview && (
                    <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-code">
                      <span className="text-xs font-mono font-bold text-code block mb-1">
                        {PROFILE.disciplineLandings.code.badge || '01 Software & Systems'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {PROFILE.disciplineLandings.code.overview}
                      </p>
                    </div>
                  )}

                  {PROFILE.disciplineLandings.art?.overview && (
                    <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-art">
                      <span className="text-xs font-mono font-bold text-art block mb-1">
                        {PROFILE.disciplineLandings.art.badge || '02 Visual Art & Design'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {PROFILE.disciplineLandings.art.overview}
                      </p>
                    </div>
                  )}

                  {PROFILE.disciplineLandings.writing?.overview && (
                    <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-writing">
                      <span className="text-xs font-mono font-bold text-writing block mb-1">
                        {PROFILE.disciplineLandings.writing.badge || '03 Writing & Essays'}
                      </span>
                      <p className="text-xs text-neutral-300">
                        {PROFILE.disciplineLandings.writing.overview}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
