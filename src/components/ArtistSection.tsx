import React, { useState, useEffect, useMemo } from 'react';
import {
  Palette,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Artwork, ArtCategory } from '../types';
import { ShimmerEffect } from './LoadingSkeleton';

interface ArtistSectionProps {
  artworks: Artwork[];
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ artworks }) => {
  const [selectedCategory, setSelectedCategory] = useState<ArtCategory>('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Dynamically detect all unique categories present in the artworks list
  const categories: ArtCategory[] = useMemo(() => {
    const unique = new Set<string>();
    artworks.forEach((art) => {
      if (art.category && art.category.trim()) {
        unique.add(art.category.trim());
      }
    });
    return ['All', ...Array.from(unique)];
  }, [artworks]);

  const filteredArtworks = selectedCategory === 'All'
    ? artworks
    : artworks.filter(art => art.category === selectedCategory);

  const currentIndex = selectedArtwork
    ? filteredArtworks.findIndex(art => art.id === selectedArtwork.id)
    : -1;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedArtwork) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtwork(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, currentIndex, filteredArtworks]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex >= 0 && currentIndex < filteredArtworks.length - 1) {
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
      setIsZoomed(false);
    } else if (filteredArtworks.length > 0) {
      setSelectedArtwork(filteredArtworks[0]);
      setIsZoomed(false);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
      setIsZoomed(false);
    } else if (filteredArtworks.length > 0) {
      setSelectedArtwork(filteredArtworks[filteredArtworks.length - 1]);
      setIsZoomed(false);
    }
  };

  return (
    <section id="artist-gallery-section" className="py-10 md:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-art text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Palette className="w-3.5 h-3.5" />
            <span>Discipline 02 · Visual Art & Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Curated Visual Art & Design Gallery
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Selected works traversing traditional Chinese painting on Xuan paper, digital painting, ink & mixed media, and design systems.
          </p>
        </div>

        {/* Category Filter Pills (View Only) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-white/10 rounded-2xl shadow-sm backdrop-blur-md">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'btn-pill-art-active'
                  : 'text-neutral-400 hover-text-art hover:bg-neutral-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid Gallery - Optimized for fast loading with shimmer skeleton & flexible metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => {
          const hasTitle = Boolean(artwork.title && artwork.title.trim());
          const hasFooterMeta = Boolean(
            hasTitle || artwork.description || artwork.medium /* || artwork.year */
          );

          return (
            <ArtworkGridCard
              key={artwork.id}
              artwork={artwork}
              hasTitle={hasTitle}
              hasFooterMeta={hasFooterMeta}
              onSelect={() => {
                setSelectedArtwork(artwork);
                setIsZoomed(false);
              }}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <div className="py-20 text-center rounded-3xl bg-neutral-900/40 border border-dashed border-neutral-800 p-8">
          <Palette className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 text-sm font-mono">
            No artworks found in category "{selectedCategory}".
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-4 py-2 rounded-xl badge-art text-xs font-mono font-bold hover:brightness-110 transition-all"
          >
            Show All Works
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* INTERACTIVE LIGHTBOX MODAL (Full Resolution View & Curatorial Notes)*/}
      {/* =================================================================== */}
      {selectedArtwork && (
        <div
          id="artwork-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setSelectedArtwork(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            onClick={e => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              id="lightbox-close-btn"
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-white flex items-center justify-center hover:scale-105 transition-all"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left/Main: Full Image View Area with Zoom */}
            <div className="relative flex-1 bg-neutral-950 flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-[580px] p-4">
              <div
                className={`relative transition-all duration-300 cursor-zoom-${isZoomed ? 'out' : 'in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={selectedArtwork.hiResUrl || selectedArtwork.imageUrl}
                  alt={selectedArtwork.title || selectedArtwork.category}
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className={`max-h-[72vh] w-auto object-contain rounded-lg transition-transform duration-300 shadow-2xl select-none pointer-events-none ${
                    isZoomed ? 'scale-150 cursor-grab active:cursor-grabbing' : 'scale-100'
                  }`}
                />
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-1 text-xs">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="px-2.5 py-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span>{isZoomed ? 'Reset View' : 'Zoom 150%'}</span>
                </button>
              </div>

              {/* Prev / Next Buttons */}
              <button
                id="lightbox-prev-btn"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors"
                title="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                id="lightbox-next-btn"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors"
                title="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Sidebar Info */}
            <div className="w-full lg:w-80 xl:w-96 bg-neutral-900 border-t lg:border-t-0 lg:border-l border-neutral-800 p-6 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
              <div className="space-y-4">
                
                {/* Category & Year Header */}
                <div className="flex items-center gap-2 text-xs text-art font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-art-muted border border-art-subtle font-bold">
                    {selectedArtwork.category}
                  </span>
                  {/* Year display temporarily commented out
                  {selectedArtwork.year && (
                    <>
                      <span>·</span>
                      <span>{selectedArtwork.year}</span>
                    </>
                  )}
                  */}
                </div>

                {/* Title (Only if present) */}
                {selectedArtwork.title ? (
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-100">
                    {selectedArtwork.title}
                  </h2>
                ) : (
                  <h2 className="text-lg font-serif italic text-neutral-400">
                    {selectedArtwork.category} Piece
                  </h2>
                )}

                {/* Medium & Dimensions */}
                {(selectedArtwork.medium || selectedArtwork.dimensions) && (
                  <p className="text-xs text-neutral-400 font-mono pb-3 border-b border-neutral-800">
                    {[selectedArtwork.medium, selectedArtwork.dimensions].filter(Boolean).join(' — ')}
                  </p>
                )}

                {/* Description */}
                {selectedArtwork.description && (
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                )}

                {/* Curatorial Story */}
                {selectedArtwork.story && (
                  <div>
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-art" /> Curatorial Notes
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed italic bg-neutral-950/50 p-3.5 rounded-xl border border-neutral-800/80">
                      "{selectedArtwork.story}"
                    </p>
                  </div>
                )}

                {/* Exhibition Record */}
                {selectedArtwork.exhibition && (
                  <div>
                    <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                      Exhibition Record
                    </h4>
                    <p className="text-xs text-art font-mono font-semibold">
                      {selectedArtwork.exhibition}
                    </p>
                  </div>
                )}

                {/* Color Palette Swatches */}
                {selectedArtwork.palette && selectedArtwork.palette.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Extracted Palette
                    </h4>
                    <div className="flex items-center gap-2">
                      {selectedArtwork.palette.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-6 h-6 rounded-md border border-neutral-700 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedArtwork.tags && selectedArtwork.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedArtwork.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-neutral-800/80 text-neutral-400 border border-neutral-700/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-neutral-800 mt-6 space-y-3">
                <a
                  href={selectedArtwork.hiResUrl || selectedArtwork.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-art-primary hover:opacity-90 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-black/40 hover:scale-[1.02]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Original Resolution
                </a>

                <div className="text-center">
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Use ← and → arrow keys to navigate
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};

/**
 * Subcomponent for individual artwork cards with image loaded skeleton state
 */
const ArtworkGridCard: React.FC<{
  artwork: Artwork;
  hasTitle: boolean;
  hasFooterMeta: boolean;
  onSelect: () => void;
}> = ({ artwork, hasTitle, hasFooterMeta, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      id={`artwork-card-${artwork.id}`}
      onClick={onSelect}
      className="group relative bento-card bento-card-artist rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 bg-neutral-950"
    >
      {/* Image Container with native lazy loading, async decoding, and shimmering skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        {!imageLoaded && (
          <div className="absolute inset-0 z-10">
            <ShimmerEffect className="w-full h-full" />
          </div>
        )}
        <img
          src={artwork.imageUrl}
          alt={artwork.title || artwork.category}
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out select-none ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Top Badge: Category (Always available) + Featured tag if present */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-art">
            {artwork.category}
          </span>
          {artwork.featured && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold badge-art">
              ★ Featured
            </span>
          )}
        </div>

        {/* Zoom Icon Hover Trigger */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-neutral-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Maximize2 className="w-4 h-4 text-art" />
        </div>

        {/* Bottom Overlay Info (Title / Dimensions if available; Year commented out) */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          {/* Year display temporarily commented out
          {(artwork.year || artwork.dimensions) && (
            <div className="flex items-center justify-between text-[11px] text-neutral-300 mb-0.5 font-mono">
              <span>{artwork.year || ''}</span>
              <span>{artwork.dimensions || ''}</span>
            </div>
          )}
          */}
          {artwork.dimensions && (
            <div className="text-[11px] text-neutral-300 mb-0.5 font-mono">
              <span>{artwork.dimensions}</span>
            </div>
          )}
          {hasTitle && (
            <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-art transition-colors truncate">
              {artwork.title}
            </h3>
          )}
        </div>
      </div>

      {/* Minimal Card Footer Details (Rendered if optional meta is present) */}
      {hasFooterMeta ? (
        <div className="p-3.5 bg-neutral-900/80 flex flex-col justify-between flex-1 border-t border-neutral-800/80">
          {artwork.description && (
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-2">
              {artwork.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-1.5 border-t border-neutral-800/50 text-[11px]">
            <span className="text-neutral-500 font-mono truncate max-w-[70%]">
              {artwork.medium || artwork.category}
            </span>
            <span className="text-art font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>
      ) : (
        /* Ultra-clean minimal bar when title/details are omitted */
        <div className="px-3.5 py-2 bg-neutral-900/40 flex items-center justify-between border-t border-neutral-800/50 text-[11px]">
          <span className="text-neutral-500 font-mono">
            {artwork.category}
          </span>
          <span className="text-art text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
            Expand Full Image →
          </span>
        </div>
      )}
    </div>
  );
};
