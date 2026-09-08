import { WritingPost, Project, InterdisciplinaryItem } from '../types';

// ============================================================================
// 1. AUTOMATIC WRITING DETECTION & TRACKING
// ============================================================================

/**
 * Calculates reading time and word count automatically from text/markdown.
 */
export function calculateTextMetrics(content: string): { wordCount: number; readingTime: string } {
  const cleanText = content.replace(/[#*`_~\[\]()>-]/g, ' ').trim();
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    wordCount: words,
    readingTime: `${minutes} min read`,
  };
}

/**
 * Auto-discovers writing articles from /src/content/writing/ and enhances all posts
 * with live word counts and reading times.
 */
export function getAllWritingPosts(explicitPosts: WritingPost[]): WritingPost[] {
  // Vite compile-time scanner for markdown/text/json content
  const writingModules = import.meta.glob('/src/content/writing/**/*.{md,txt,json}', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const existingIds = new Set(explicitPosts.map(p => p.id));
  const autoPosts: WritingPost[] = [];

  for (const [path, rawContent] of Object.entries(writingModules)) {
    if (typeof rawContent !== 'string') continue;

    // Extract filename and title
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'untitled';
    const id = 'auto-writing-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;

    // Derive title from first markdown header '# Title' or filename
    const titleMatch = rawContent.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].trim()
      : filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    // Clean body text (remove the first header if matched)
    const bodyContent = titleMatch ? rawContent.replace(titleMatch[0], '').trim() : rawContent.trim();

    // Auto-detect category from folder or content
    let category = 'Essays';
    const lowerPath = path.toLowerCase();
    if (lowerPath.includes('fiction') || lowerPath.includes('story')) {
      category = 'Short Fiction';
    } else if (lowerPath.includes('poetry') || lowerPath.includes('poem')) {
      category = 'Poetry';
    } else if (lowerPath.includes('critique') || lowerPath.includes('review')) {
      category = 'Criticism & Reviews';
    } else if (lowerPath.includes('note') || lowerPath.includes('journal')) {
      category = 'Field Notes';
    }

    // Auto-extract first paragraph as excerpt
    const paragraphs = bodyContent.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const excerpt = paragraphs.length > 0
      ? paragraphs[0].replace(/^[#*`_~>-]+\s*/, '').slice(0, 220) + (paragraphs[0].length > 220 ? '...' : '')
      : 'Read the complete piece...';

    // Auto-calculate word count & reading time
    const { wordCount, readingTime } = calculateTextMetrics(bodyContent);

    // Auto-detect tags from content keywords
    const autoTags: string[] = [category];
    if (/design|ui|interface/i.test(bodyContent)) autoTags.push('Design');
    if (/philosophy|thought|mind/i.test(bodyContent)) autoTags.push('Philosophy');
    if (/code|software|algorithm/i.test(bodyContent)) autoTags.push('Technology');
    if (/art|painting|visual/i.test(bodyContent)) autoTags.push('Visual Art');

    autoPosts.push({
      id,
      title,
      subtitle: `${readingTime} · ${wordCount.toLocaleString()} words`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      category,
      excerpt,
      content: bodyContent,
      tags: Array.from(new Set(autoTags)),
      readingTime,
      wordCount,
    });
  }

  // Enhance explicit posts with auto-computed reading metrics if missing
  const enhancedExplicitPosts = explicitPosts.map(post => {
    const metrics = calculateTextMetrics(post.content || '');
    return {
      ...post,
      readingTime: post.readingTime || metrics.readingTime,
      wordCount: post.wordCount !== undefined ? post.wordCount : metrics.wordCount,
    };
  });

  return [...enhancedExplicitPosts, ...autoPosts];
}

// ============================================================================
// 2. AUTOMATIC CODE & PROJECT DETECTION & TRACKING
// ============================================================================

/**
 * Auto-discovers project specifications from /src/content/projects/
 */
export function getAllProjects(explicitProjects: Project[]): Project[] {
  const projectModules = import.meta.glob('/src/content/projects/**/*.{json,md}', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const existingIds = new Set(explicitProjects.map(p => p.id));
  const autoProjects: Project[] = [];

  for (const [path, rawContent] of Object.entries(projectModules)) {
    if (typeof rawContent !== 'string') continue;
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'project';
    const id = 'auto-proj-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;

    try {
      if (path.endsWith('.json')) {
        const parsed = JSON.parse(rawContent) as Partial<Project>;
        autoProjects.push({
          id: parsed.id || id,
          title: parsed.title || filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          tagline: parsed.tagline || 'Autonomous software architecture & tooling.',
          category: parsed.category || 'Web Applications',
          year: parsed.year || new Date().getFullYear().toString(),
          role: parsed.role || 'Lead Engineer',
          thumbnail: parsed.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          overview: parsed.overview || 'Engineered responsive full-stack system with modular architecture.',
          techStack: parsed.techStack || [{ name: 'TypeScript', category: 'Language' }, { name: 'React', category: 'Frontend' }],
          keyFeatures: parsed.keyFeatures || ['Modular reactive state', 'Optimized bundle size'],
          status: parsed.status || 'Active',
          ...parsed,
        } as Project);
      }
    } catch {
      // Graceful fallback for non-json
    }
  }

  return [...explicitProjects, ...autoProjects];
}

// ============================================================================
// 3. AUTOMATIC INTERDISCIPLINARY WORK DETECTION & TRACKING
// ============================================================================

/**
 * Auto-discovers cross-disciplinary entries from /src/content/interdisciplinary/
 */
export function getAllInterdisciplinary(explicitItems: InterdisciplinaryItem[]): InterdisciplinaryItem[] {
  const interModules = import.meta.glob('/src/content/interdisciplinary/**/*.{json,md}', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const existingIds = new Set(explicitItems.map(i => i.id));
  const autoItems: InterdisciplinaryItem[] = [];

  for (const [path, rawContent] of Object.entries(interModules)) {
    if (typeof rawContent !== 'string') continue;
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'interdisciplinary';
    const id = 'auto-inter-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;

    try {
      if (path.endsWith('.json')) {
        const parsed = JSON.parse(rawContent) as Partial<InterdisciplinaryItem>;
        autoItems.push({
          id: parsed.id || id,
          title: parsed.title || filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          disciplines: parsed.disciplines || ['Software Engineering', 'Fine Art'],
          tagline: parsed.tagline || 'Cross-disciplinary research and design.',
          description: parsed.description || 'Exploring intersections between disciplines.',
          technologies: parsed.technologies || ['TypeScript', 'Design Systems'],
          keyHighlights: parsed.keyHighlights || ['Cross-disciplinary synthesis'],
          badgeColor: parsed.badgeColor || 'from-indigo-500 to-purple-500',
          ...parsed,
        } as InterdisciplinaryItem);
      }
    } catch {
      // Graceful fallback
    }
  }

  return [...explicitItems, ...autoItems];
}
