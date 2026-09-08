import { Artwork, ArtCategory } from '../types';

/**
 * Auto-discovery and merger for artwork images placed in /public/art/
 *
 * HOW IT WORKS FOR FUTURE IMAGES:
 * 1. Simply drop any image into `public/art/` (or subfolders like `public/art/2026/my_artwork.png`).
 * 2. It will AUTOMATICALLY appear in the Visual Art gallery without writing or repeating any code!
 * 3. Filenames are automatically formatted into titles (e.g., `sunlit_forest.png` -> "Sunlit Forest").
 * 4. Folders with 4-digit years (e.g. `public/art/2026/`) automatically set the artwork's year.
 * 5. Category defaults to "Digital Painting", or matches subfolder names if organized by category.
 * 6. If you later want to customize descriptions or dimensions, you can optionally add an entry
 *    in `src/data/initialData.ts`, and your custom metadata will automatically take precedence!
 */
export function getAllArtworks(explicitArtworks: Artwork[]): Artwork[] {
  // Vite compile-time glob for all image assets in public/art
  const imageModules = import.meta.glob(
    '/public/art/**/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP}',
    { eager: true }
  );

  const existingUrls = new Set<string>();
  for (const art of explicitArtworks) {
    existingUrls.add(art.imageUrl.replace(/^\/public/, ''));
    if (art.hiResUrl) existingUrls.add(art.hiResUrl.replace(/^\/public/, ''));
  }

  const autoArtworks: Artwork[] = [];

  for (const rawPath of Object.keys(imageModules)) {
    const webUrl = rawPath.replace(/^\/public/, '');
    
    // If the artwork was already explicitly defined in initialData.ts, skip auto-duplicating it
    if (existingUrls.has(webUrl)) {
      continue;
    }

    // Extract filename and directory structure
    const pathParts = webUrl.split('/');
    const filenameWithExt = pathParts[pathParts.length - 1] || '';
    const cleanFilename = filenameWithExt.replace(/\.[^/.]+$/, ''); // e.g. "berry_drink"
    
    // Auto-format title: "berry_drink" or "Berry-Drink-PNG" -> "Berry Drink"
    const autoTitle = cleanFilename
      .replace(/(?:_|\-)+/g, ' ')
      .replace(/\s+(png|jpg|jpeg|webp|avif|gif)$/i, '')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();

    // Auto-detect year if folder is a 4-digit year (e.g., /art/2026/...)
    const yearMatch = webUrl.match(/\/(\d{4})\//);
    const autoYear = yearMatch ? yearMatch[1] : undefined;

    // Detect category from folder path if organized by category, else default to 'Digital Painting'
    let category: ArtCategory = 'Digital Painting';
    const lowerPath = webUrl.toLowerCase();

    // Check intermediate folders (excluding 'art' and 4-digit year folders)
    const folderSegments = pathParts.slice(2, pathParts.length - 1); // segments between /art/ and filename
    const categoryFolder = folderSegments.find(seg => !/^\d{4}$/.test(seg));

    if (categoryFolder) {
      const lowerFolder = categoryFolder.toLowerCase();
      if (lowerFolder.includes('chinese') || lowerFolder.includes('traditional')) {
        category = 'Chinese Painting';
      } else if (lowerFolder.includes('ink') || lowerFolder.includes('mixed')) {
        category = 'Ink & Mixed Media';
      } else if (lowerFolder.includes('book')) {
        category = 'Book Design';
      } else if (lowerFolder.includes('website') || lowerFolder.includes('ui') || lowerFolder.includes('web')) {
        category = 'Website Design';
      } else if (lowerFolder.includes('digital') || lowerFolder.includes('painting')) {
        category = 'Digital Painting';
      } else {
        // Automatically convert folder name like "oil-paintings" or "concept_art" into "Oil Paintings" / "Concept Art"
        category = categoryFolder
          .replace(/[_-]+/g, ' ')
          .replace(/\b\w/g, char => char.toUpperCase())
          .trim();
      }
    } else if (lowerPath.includes('chinese-painting') || lowerPath.includes('chinese_painting')) {
      category = 'Chinese Painting';
    } else if (lowerPath.includes('ink') || lowerPath.includes('mixed-media')) {
      category = 'Ink & Mixed Media';
    } else if (lowerPath.includes('book-design') || lowerPath.includes('book')) {
      category = 'Book Design';
    } else if (lowerPath.includes('website-design') || lowerPath.includes('ui')) {
      category = 'Website Design';
    }

    const autoId = 'auto-' + cleanFilename.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    autoArtworks.push({
      id: autoId,
      imageUrl: webUrl,
      hiResUrl: webUrl,
      category,
      title: autoTitle,
      year: autoYear,
    });
  }

  // Auto-discovered artworks are seamlessly combined with explicit ones
  return [...explicitArtworks, ...autoArtworks];
}
