/**
 * ============================================================================
 * DISCIPLINE 03: WRITER & ESSAYS SECTION
 * ============================================================================
 * 
 * Displays essays, publications, and short fiction with:
 * - Category filter pills (All, Essays, Short Fiction)
 * - Real-time keyword search
 * - Distraction-free full-screen reader modal with custom typography controls
 *   (Serif / Sans / Mono and Text Size adjustments)
 * 
 * Clean UX: Social metrics (likes, claps, bookmarks, min read) removed for a
 * pure, sophisticated literary reading experience.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  PenTool,
  BookOpen,
  Search,
  X,
  Type,
  ArrowRight
} from 'lucide-react';
import { WritingPost, WritingCategory, ReaderSettings } from '../types';
import { PROFILE } from '../data/profile';

interface WriterSectionProps {
  posts: WritingPost[];
}

export const WriterSection: React.FC<WriterSectionProps> = ({ posts }) => {
  // ---------------------------------------------------------------------------
  // State: Filter, Search, and Active Post
  // ---------------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<WritingCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReadingPost, setActiveReadingPost] = useState<WritingPost | null>(null);

  // ---------------------------------------------------------------------------
  // State: Reader Typography Controls
  // ---------------------------------------------------------------------------
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    fontSize: 'base',
    fontFamily: 'serif',
    lineHeight: 'relaxed'
  });
  const [showReaderSettings, setShowReaderSettings] = useState<boolean>(false);

  // Dynamically discover all unique categories across writing posts
  const categories: WritingCategory[] = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [posts]);

  // ---------------------------------------------------------------------------
  // Escape key to close reader modal
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeReadingPost) {
        setActiveReadingPost(null);
        setShowReaderSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReadingPost]);

  // Lock body scroll when reader modal is open
  useEffect(() => {
    if (activeReadingPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeReadingPost]);

  // ---------------------------------------------------------------------------
  // Filter and Search logic
  // ---------------------------------------------------------------------------
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.subtitle.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="writer-publications-section" className="py-12 md:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-writing text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <PenTool className="w-3.5 h-3.5" />
            <span>Discipline 03 · Writing & Essays</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Writing, Essays & Publications
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Critical reflections on computational aesthetics, literary worldbuilding, art criticism, and technical treatises. Click any publication to read in distraction-free mode.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-neutral-900/60 p-3 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'btn-pill-writing-active'
                  : 'text-neutral-400 hover-text-writing hover:bg-neutral-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search titles, tags, or excerpts..."
            className="w-full pl-9 pr-4 py-1.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-500 focus-border-writing transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Writing Post Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            id={`writing-card-${post.id}`}
            onClick={() => setActiveReadingPost(post)}
            className="group relative bento-card bento-card-writer rounded-3xl p-7 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Meta Header */}
              <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md font-semibold badge-writing text-[11px]">
                    {post.category}
                  </span>
                  {post.readingTime && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 text-neutral-400 border border-neutral-800">
                      {post.readingTime}
                    </span>
                  )}
                  {post.wordCount && (
                    <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                      {post.wordCount.toLocaleString()} words
                    </span>
                  )}
                </div>
                <span className="text-neutral-400 text-[11px] font-mono">
                  {post.date}
                </span>
              </div>

              {/* Title and Subtitle */}
              <h3 className="text-xl font-serif font-bold text-neutral-100 group-hover:text-writing transition-colors mb-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-400 font-serif italic mb-4 line-clamp-2">
                {post.subtitle}
              </p>

              {/* Excerpt */}
              <p className="text-sm text-neutral-300 leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            {/* Card Footer */}
            <div>
              {/* Keyword Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] bg-neutral-950 text-neutral-400 rounded-md border border-neutral-800/80"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs">
                <span className="text-neutral-400 text-[11px] font-mono">
                  By {PROFILE.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-writing font-semibold group-hover:translate-x-1 transition-transform text-xs font-mono">
                  <span>Read Piece</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-neutral-900/30 rounded-2xl border border-neutral-800 shadow-sm">
          <BookOpen className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 text-sm">No writing pieces match your filter.</p>
        </div>
      )}

      {/* =====================================================================
          IMMERSIVE WRITING READER MODAL
         ===================================================================== */}
      {activeReadingPost && (
        <div
          id="writing-reader-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/98 text-neutral-100 backdrop-blur-xl animate-fade-in"
        >
          {/* Top Sticky Navigation Bar */}
          <div className="sticky top-0 z-30 px-4 sm:px-8 py-3 border-b backdrop-blur-md flex items-center justify-between bg-neutral-950/90 border-neutral-800">
            {/* Back Button */}
            <button
              onClick={() => {
                setActiveReadingPost(null);
                setShowReaderSettings(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover-text-writing transition-colors"
            >
              <span>← Back to Portfolio</span>
            </button>

            {/* Center: Title Snippet */}
            <div className="hidden md:block max-w-md truncate text-xs font-serif font-semibold text-neutral-300">
              {activeReadingPost.title}
            </div>

            {/* Right Controls: Appearance & Close */}
            <div className="flex items-center gap-2">
              {/* Typography / Reading Preferences Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowReaderSettings(!showReaderSettings)}
                  className="p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800 hover-text-writing"
                  title="Typography Settings"
                >
                  <Type className="w-4 h-4" />
                  <span className="hidden sm:inline">Typography</span>
                </button>

                {/* Dropdown Menu for Reader Settings */}
                {showReaderSettings && (
                  <div
                    className="absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl text-neutral-200 z-50"
                    onClick={e => e.stopPropagation()}
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                      Reader Settings
                    </h4>

                    {/* Font Family */}
                    <div className="mb-4">
                      <label className="text-[11px] text-neutral-400 block mb-1.5">
                        Typography Style
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => setReaderSettings(s => ({ ...s, fontFamily: 'serif' }))}
                          className={`py-1.5 px-2 rounded-lg text-xs font-serif ${
                            readerSettings.fontFamily === 'serif'
                              ? 'btn-pill-writing-active'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setReaderSettings(s => ({ ...s, fontFamily: 'sans' }))}
                          className={`py-1.5 px-2 rounded-lg text-xs font-sans ${
                            readerSettings.fontFamily === 'sans'
                              ? 'btn-pill-writing-active'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          Sans
                        </button>
                        <button
                          onClick={() => setReaderSettings(s => ({ ...s, fontFamily: 'mono' }))}
                          className={`py-1.5 px-2 rounded-lg text-xs font-mono ${
                            readerSettings.fontFamily === 'mono'
                              ? 'btn-pill-writing-active'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          Mono
                        </button>
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1.5">
                        Text Size
                      </label>
                      <div className="grid grid-cols-4 gap-1">
                        {(['sm', 'base', 'lg', 'xl'] as const).map(sz => (
                          <button
                            key={sz}
                            onClick={() => setReaderSettings(s => ({ ...s, fontSize: sz }))}
                            className={`py-1 text-xs uppercase font-mono rounded-lg ${
                              readerSettings.fontSize === sz
                                ? 'btn-pill-writing-active'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveReadingPost(null);
                  setShowReaderSettings(false);
                }}
                className="p-2 rounded-xl border transition-colors bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
                title="Close Reader (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Article Body */}
          <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 md:py-20">
            
            {/* Meta Header */}
            <div className="mb-10 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono uppercase tracking-wider mb-4 badge-writing">
                {activeReadingPost.category}
              </span>
              
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight ${
                  readerSettings.fontFamily === 'serif'
                    ? 'font-serif'
                    : readerSettings.fontFamily === 'mono'
                    ? 'font-mono'
                    : 'font-sans'
                }`}
              >
                {activeReadingPost.title}
              </h1>

              <p className="text-lg font-serif italic mb-6 max-w-xl mx-auto text-neutral-300">
                {activeReadingPost.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-neutral-400">
                <span>By {PROFILE.name}</span>
                <span>•</span>
                <span>{activeReadingPost.date}</span>
                {activeReadingPost.readingTime && (
                  <>
                    <span>•</span>
                    <span className="text-writing font-medium">{activeReadingPost.readingTime}</span>
                  </>
                )}
                {activeReadingPost.wordCount && (
                  <>
                    <span>•</span>
                    <span>{activeReadingPost.wordCount.toLocaleString()} words</span>
                  </>
                )}
              </div>
            </div>

            {/* Featured Pull Quote if present */}
            {activeReadingPost.quote && (
              <blockquote className="my-8 p-6 rounded-2xl border-l-4 border-writing italic text-lg leading-relaxed bg-neutral-900/70 text-neutral-200">
                "{activeReadingPost.quote}"
              </blockquote>
            )}

            {/* Content Body with Typography Controls */}
            <div
              className={`prose max-w-none leading-relaxed space-y-6 text-neutral-200 ${
                readerSettings.fontSize === 'sm'
                  ? 'text-sm'
                  : readerSettings.fontSize === 'base'
                  ? 'text-base'
                  : readerSettings.fontSize === 'lg'
                  ? 'text-lg'
                  : 'text-xl'
              } ${
                readerSettings.fontFamily === 'serif'
                  ? 'font-serif'
                  : readerSettings.fontFamily === 'mono'
                  ? 'font-mono'
                  : 'font-sans'
              }`}
            >
              {activeReadingPost.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={pIdx}
                      className="text-2xl font-bold tracking-tight mt-10 mb-4 pt-4 border-t border-neutral-800 text-neutral-100"
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-xl font-semibold mt-6 mb-3 text-neutral-200">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('```')) {
                  const cleanedCode = paragraph.replace(/```[a-z]*\n?/g, '');
                  return (
                    <pre
                      key={pIdx}
                      className="p-4 rounded-xl font-mono text-xs overflow-x-auto bg-neutral-950 text-neutral-200 border border-neutral-800"
                    >
                      <code>{cleanedCode}</code>
                    </pre>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed text-neutral-300">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Reader Footer */}
            <div className="mt-16 pt-8 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                End of publication
              </span>

              <button
                onClick={() => {
                  setActiveReadingPost(null);
                  setShowReaderSettings(false);
                }}
                className="text-xs font-semibold underline underline-offset-4 text-neutral-400 hover:text-amber-400 transition-colors"
              >
                Back to all publications ↑
              </button>
            </div>

          </main>
        </div>
      )}

    </section>
  );
};
