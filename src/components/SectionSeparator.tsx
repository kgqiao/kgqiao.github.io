import React from 'react';

interface SectionSeparatorProps {
  /**
   * The transition type to determine the subtle gradient coloration:
   * - 'neutral': soft neutral fade (e.g. Hero to About)
   * - 'code': emerald/jade tinted subtle transition (About to Code)
   * - 'art': rose/crimson tinted subtle transition (Code to Art)
   * - 'writing': amber/golden tinted subtle transition (Art to Writing)
   * - 'trio': full triad spectrum
   */
  variant?: 'neutral' | 'code' | 'art' | 'writing' | 'trio';
  className?: string;
}

export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  variant = 'neutral',
  className = '',
}) => {
  const getGradientClasses = () => {
    switch (variant) {
      case 'code':
        return 'from-transparent via-emerald-500/25 to-transparent';
      case 'art':
        return 'from-transparent via-rose-500/25 to-transparent';
      case 'writing':
        return 'from-transparent via-amber-500/25 to-transparent';
      case 'trio':
        return 'from-emerald-500/20 via-rose-500/20 to-amber-500/20';
      case 'neutral':
      default:
        return 'from-transparent via-neutral-700/40 to-transparent';
    }
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center py-4 sm:py-6 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer ambient blur glow */}
      <div
        className={`absolute inset-x-8 sm:inset-x-24 h-[3px] bg-gradient-to-r ${getGradientClasses()} blur-[3px] opacity-60`}
      />
      
      {/* Sharp 1px separator line */}
      <div
        className={`relative w-full max-w-5xl h-[1px] bg-gradient-to-r ${getGradientClasses()}`}
      />
    </div>
  );
};
