import React from 'react';

/**
 * ============================================================================
 * LOADING SKELETON COMPONENTS
 * ============================================================================
 * 
 * Provides smooth, shimmering placeholder skeletons across the portfolio:
 * - CardSkeleton: Bento card loading placeholder
 * - ArtGridSkeleton: Grid of artwork image skeletons
 * - DetailModalSkeleton: Lightbox loading placeholder
 * - TextSkeleton: Shimmering typography lines
 */

export const ShimmerEffect: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative overflow-hidden bg-neutral-900/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

export const CardSkeleton: React.FC<{
  discipline?: 'code' | 'art' | 'writing' | 'multi';
  aspectRatio?: 'video' | 'square' | 'portrait';
}> = ({ discipline = 'code', aspectRatio = 'video' }) => {
  const borderClass =
    discipline === 'code'
      ? 'border-cyan-500/20'
      : discipline === 'art'
      ? 'border-purple-500/20'
      : discipline === 'writing'
      ? 'border-amber-500/20'
      : 'border-white/10';

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-[16/10]';

  return (
    <div
      className={`bento-card rounded-3xl overflow-hidden p-6 flex flex-col justify-between border ${borderClass} animate-pulse`}
    >
      <div className="space-y-4">
        {/* Thumbnail skeleton */}
        <div className={`w-full ${aspectClass} rounded-2xl bg-neutral-900/90 relative overflow-hidden`}>
          <ShimmerEffect className="w-full h-full" />
        </div>

        {/* Category & Date badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="h-5 w-24 rounded-full bg-neutral-800 relative overflow-hidden">
            <ShimmerEffect className="w-full h-full" />
          </div>
          <div className="h-4 w-16 rounded-md bg-neutral-800/60 relative overflow-hidden">
            <ShimmerEffect className="w-full h-full" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-6 w-3/4 rounded-lg bg-neutral-800 relative overflow-hidden">
          <ShimmerEffect className="w-full h-full" />
        </div>

        {/* Body lines */}
        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full rounded bg-neutral-800/80 relative overflow-hidden">
            <ShimmerEffect className="w-full h-full" />
          </div>
          <div className="h-3.5 w-5/6 rounded bg-neutral-800/70 relative overflow-hidden">
            <ShimmerEffect className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Footer tags */}
      <div className="pt-6 mt-4 border-t border-neutral-800/60 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-md bg-neutral-800/60" />
          <div className="h-5 w-14 rounded-md bg-neutral-800/60" />
        </div>
        <div className="h-4 w-20 rounded bg-neutral-800/80" />
      </div>
    </div>
  );
};

export const ArtGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bento-card bento-card-artist rounded-3xl overflow-hidden flex flex-col border border-purple-500/20"
        >
          <div className="aspect-[4/3] w-full bg-neutral-900 relative overflow-hidden">
            <ShimmerEffect className="w-full h-full" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-4 w-1/2 rounded bg-neutral-800">
              <ShimmerEffect className="w-full h-full" />
            </div>
            <div className="h-3 w-1/3 rounded bg-neutral-800/60">
              <ShimmerEffect className="w-full h-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ImageWithSkeleton: React.FC<{
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  onClick?: () => void;
}> = ({ src, alt, className = '', aspectClass = 'aspect-auto', onClick }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-neutral-900 ${aspectClass} ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <ShimmerEffect className="w-full h-full" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};
