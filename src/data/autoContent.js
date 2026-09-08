/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: AUTOMATIC CONTENT DETECTION & ENRICHMENT
 * ============================================================================
 * 
 * Centralized automatic scanning for:
 * 1. Artworks (from /src/content/art/ and /public/art/)
 * 2. Writing & Essays (from /src/content/writing/)
 * 3. Software Projects (from /src/content/projects/)
 * 4. Interdisciplinary Work (from /src/content/interdisciplinary/)
 */

// ============================================================================
// 1. AUTOMATIC ARTWORK DETECTION
// ============================================================================
export function getAllArtworks(explicitArtworks = []) {
  // Vite compile-time scanner for images in /src/content/art/ and /public/art/
  const srcArtModules = import.meta.glob('/src/content/art/**/*.{png,jpg,jpeg,webp,avif,svg,gif}', {
    eager: true,
    import: 'default',
  });

  const publicArtModules = import.meta.glob('/public/art/**/*.{png,jpg,jpeg,webp,avif,svg,gif}', {
    eager: true,
    import: 'default',
  });

  const existingIds = new Set(explicitArtworks.map(a => a.id));
  const autoArtworks = [];

  const combinedModules = { ...publicArtModules, ...srcArtModules };

  for (const [path, assetUrl] of Object.entries(combinedModules)) {
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'artwork';
    const id = filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;
    existingIds.add(id);

    // Derive readable title
    const title = filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    // Auto-detect year from path or filename
    const yearMatch = path.match(/\/(\d{4})\//) || filename.match(/\b(19\d\d|20\d\d)\b/);
    const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();

    // Auto-detect category
    let category = 'Digital Painting';
    const lowerPath = path.toLowerCase();
    if (lowerPath.includes('chinese') || lowerPath.includes('shuimo') || lowerPath.includes('ink')) {
      category = 'Chinese Painting';
    } else if (lowerPath.includes('mixed') || lowerPath.includes('media')) {
      category = 'Ink & Mixed Media';
    } else if (lowerPath.includes('book') || lowerPath.includes('print')) {
      category = 'Book Design';
    } else if (lowerPath.includes('web') || lowerPath.includes('ui')) {
      category = 'Website Design';
    }

    // Standardize public URL for serving
    let finalUrl = typeof assetUrl === 'string' ? assetUrl : path;
    if (finalUrl.startsWith('/public/')) {
      finalUrl = finalUrl.replace('/public/', '/');
    }

    autoArtworks.push({
      id,
      title,
      imageUrl: finalUrl,
      category,
      year,
      medium: category,
      featured: false,
    });
  }

  return [...explicitArtworks, ...autoArtworks];
}

// ============================================================================
// 2. AUTOMATIC WRITING DETECTION & TRACKING
// ============================================================================
export function calculateTextMetrics(content = '') {
  const cleanText = content.replace(/[#*`_~\[\]()>-]/g, ' ').trim();
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    wordCount: words,
    readingTime: `${minutes} min read`,
  };
}

export function getAllWritingPosts(explicitPosts = []) {
  const writingModules = import.meta.glob('/src/content/writing/**/*.{md,txt,json}', {
    eager: true,
    query: '?raw',
    import: 'default',
  });

  const existingIds = new Set(explicitPosts.map(p => p.id));
  const autoPosts = [];

  for (const [path, rawContent] of Object.entries(writingModules)) {
    if (typeof rawContent !== 'string') continue;

    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'untitled';
    const id = 'auto-writing-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;
    existingIds.add(id);

    const titleMatch = rawContent.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].trim()
      : filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const bodyContent = titleMatch ? rawContent.replace(titleMatch[0], '').trim() : rawContent.trim();

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

    const paragraphs = bodyContent.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const excerpt = paragraphs.length > 0
      ? paragraphs[0].replace(/^[#*`_~>-]+\s*/, '').slice(0, 220) + (paragraphs[0].length > 220 ? '...' : '')
      : 'Read the complete piece...';

    const { wordCount, readingTime } = calculateTextMetrics(bodyContent);

    const autoTags = [category];
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
// 3. AUTOMATIC CODE & PROJECT DETECTION
// ============================================================================
export function getAllProjects(explicitProjects = []) {
  const projectModules = import.meta.glob('/src/content/projects/**/*.{json,md}', {
    eager: true,
    query: '?raw',
    import: 'default',
  });

  const existingIds = new Set(explicitProjects.map(p => p.id));
  const autoProjects = [];

  for (const [path, rawContent] of Object.entries(projectModules)) {
    if (typeof rawContent !== 'string') continue;
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'project';
    const id = 'auto-proj-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;
    existingIds.add(id);

    try {
      if (path.endsWith('.json')) {
        const parsed = JSON.parse(rawContent);
        autoProjects.push({
          id: parsed.id || id,
          title: parsed.title || filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          tagline: parsed.tagline || 'Autonomous software architecture & tooling.',
          category: parsed.category || 'Web Applications',
          year: parsed.year || new Date().getFullYear().toString(),
          role: parsed.role || 'Lead Engineer',
          thumbnail: parsed.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          overview: parsed.overview || 'Engineered responsive full-stack system with modular architecture.',
          techStack: parsed.techStack || [{ name: 'JavaScript', category: 'Language' }],
          keyFeatures: parsed.keyFeatures || ['Modular reactive state', 'Optimized bundle size'],
          status: parsed.status || 'Active',
          ...parsed,
        });
      }
    } catch {
      // Ignore parse errors
    }
  }

  return [...explicitProjects, ...autoProjects];
}

// ============================================================================
// 4. AUTOMATIC INTERDISCIPLINARY WORK DETECTION
// ============================================================================
export function getAllInterdisciplinary(explicitItems = []) {
  const interModules = import.meta.glob('/src/content/interdisciplinary/**/*.{json,md}', {
    eager: true,
    query: '?raw',
    import: 'default',
  });

  const existingIds = new Set(explicitItems.map(i => i.id));
  const autoItems = [];

  for (const [path, rawContent] of Object.entries(interModules)) {
    if (typeof rawContent !== 'string') continue;
    const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'interdisciplinary';
    const id = 'auto-inter-' + filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (existingIds.has(id)) continue;
    existingIds.add(id);

    try {
      if (path.endsWith('.json')) {
        const parsed = JSON.parse(rawContent);
        autoItems.push({
          id: parsed.id || id,
          title: parsed.title || filename.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          disciplines: parsed.disciplines || ['Software Engineering', 'Fine Art'],
          tagline: parsed.tagline || 'Cross-disciplinary research and design.',
          description: parsed.description || 'Exploring intersections between disciplines.',
          technologies: parsed.technologies || ['JavaScript', 'Design Systems'],
          keyHighlights: parsed.keyHighlights || ['Cross-disciplinary synthesis'],
          badgeColor: parsed.badgeColor || 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40',
          ...parsed,
        });
      }
    } catch {
      // Ignore parse errors
    }
  }

  return [...explicitItems, ...autoItems];
}
