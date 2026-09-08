import React, { useState, useMemo } from 'react';
import { Layers, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { InterdisciplinaryItem, AppView } from '../types';
import { INTERDISCIPLINARY_DATA } from '../data/initialData';

interface IntersectionSectionProps {
  items?: InterdisciplinaryItem[];
  onSelectView: (view: AppView) => void;
  onSelectProject: (projectId: string) => void;
}

export const IntersectionSection: React.FC<IntersectionSectionProps> = ({
  items = INTERDISCIPLINARY_DATA,
  onSelectView,
  onSelectProject,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');

  // Dynamically collect all disciplines across items
  const disciplineFilters = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      item.disciplines.forEach((d) => set.add(d.trim()));
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  const filteredItems = selectedDiscipline === 'All'
    ? items
    : items.filter((item) => item.disciplines.includes(selectedDiscipline));

  return (
    <section id="interdisciplinary-work-section" className="py-12 md:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-md shadow-indigo-500/10">
            <Layers className="w-3.5 h-3.5" />
            <span>Discipline 04 · Interdisciplinary Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-neutral-100 tracking-tight">
            Cross-Disciplinary Projects & Workflows
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
            Real-world applications where software engineering, visual arts, and longform writing intersect—such as real-time GPU fluid shaders, annual print anthologies, and illustrated technical essays.
          </p>
        </div>

        {/* Action Quick Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectView('code')}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-cyan-400 transition-colors"
          >
            01 Code
          </button>
          <button
            onClick={() => onSelectView('art')}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-purple-400 transition-colors"
          >
            02 Art
          </button>
          <button
            onClick={() => onSelectView('writing')}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-orange-400 transition-colors"
          >
            03 Writing
          </button>
        </div>
      </div>

      {/* Dynamic Filter Pills */}
      {disciplineFilters.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Filter by Domain:</span>
          </span>
          {disciplineFilters.map((disc) => (
            <button
              key={disc}
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                selectedDiscipline === disc
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>
      )}

      {/* Interdisciplinary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`interdisciplinary-card-${item.id}`}
            className="bento-card rounded-3xl p-7 flex flex-col justify-between group transition-all duration-300 hover:border-indigo-500/40"
          >
            <div className="space-y-4">
              {/* Header Badges & Discipline Intersection */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-neutral-950/80 border border-neutral-800 text-indigo-300">
                    {item.disciplines.join(' × ')}
                  </span>
                  {item.category && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/40 truncate max-w-[160px]">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Role / Credential Tracking Badge */}
                {item.role && (
                  <div className="text-[11px] font-mono text-indigo-400/90 font-medium">
                    ↳ {item.role}
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold font-mono text-neutral-100 group-hover:text-indigo-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1.5 font-mono leading-relaxed">
                  {item.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {item.description}
              </p>

              {/* Key Technical & Editorial Highlights */}
              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  <span>Curated Focus & Highlights</span>
                  <span>{item.keyHighlights.length} areas</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {item.keyHighlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology & Tooling Tags */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-neutral-950 text-neutral-400 border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
              {item.projectId ? (
                <button
                  onClick={() => onSelectProject(item.projectId!)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Open Project Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectView('writing')}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>View Writing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-neutral-600">·</span>
                  <button
                    onClick={() => onSelectView('art')}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>View Art</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

