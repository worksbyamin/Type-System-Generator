import { VARIABLE_FONTS_DATABASE } from '../constants/ratios';
import { VariableAxis } from '../types/typography';

const loadedFonts = new Set<string>();

/**
 * Dynamically loads a Google font by injecting an HTML link element into document head.
 */
export async function loadGoogleFont(fontFamily: string): Promise<void> {
  if (!fontFamily || loadedFonts.has(fontFamily)) return;

  // Mark as loaded so we don't spam duplicate link tags
  loadedFonts.add(fontFamily);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('font-loading', { detail: { isLoading: true } }));
  }

  try {
    const linkId = `google-font-${fontFamily.toLowerCase().replace(/\s+/g, '-')}`;
    if (document.getElementById(linkId)) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('font-loading', { detail: { isLoading: false } }));
      }
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';

    const axes = detectVariableFontAxes(fontFamily);
    
    if (axes.length > 0) {
      const sortedAxes = [...axes].sort((a, b) => a.tag.localeCompare(b.tag));
      const axisTags = sortedAxes.map(a => a.tag).join(',');
      const axisRanges = sortedAxes.map(a => `${a.min}..${a.max}`).join(',');
      
      const primaryUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:${axisTags}@${axisRanges}&display=swap`;
      const fallbackUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@100..900&display=swap`;
      
      try {
        const res = await fetch(primaryUrl, { method: 'HEAD' });
        if (res.ok) {
          link.href = primaryUrl;
        } else {
          link.href = fallbackUrl;
        }
      } catch (e) {
        link.href = fallbackUrl;
      }
    } else {
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap`;
    }

    // Wait for the stylesheet to load to remove the loader
    link.onload = () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('font-loading', { detail: { isLoading: false } }));
      }
    };
    link.onerror = () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('font-loading', { detail: { isLoading: false } }));
      }
    };

    document.head.appendChild(link);
  } catch (err) {
    console.error(`Failed to load Google Font: ${fontFamily}`, err);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('font-loading', { detail: { isLoading: false } }));
    }
  }
}

/**
 * Queries local system fonts using the experimental Local Font Access API if available.
 */
export async function queryLocalSystemFonts(): Promise<{ fonts: string[], error?: string }> {
  if (typeof window !== 'undefined' && 'queryLocalFonts' in window) {
    try {
      // @ts-expect-error queryLocalFonts is an experimental browser API
      const availableFonts = await window.queryLocalFonts();
      const families = Array.from(
        new Set(availableFonts.map((f: { family: string }) => f.family))
      ) as string[];
      return { fonts: families.sort() };
    } catch (err: any) {
      console.warn('Local Font Access API denied or not permitted:', err);
      return { fonts: [], error: 'Local Font Access is blocked in this preview (iframe). Please open the app in a new tab to select local fonts.' };
    }
  }
  return { fonts: [], error: 'Local Font Access API is not supported in this browser.' };
}

/**
 * Detects if a font has variable axes.
 * Returns the list of available variable axes.
 */
export function detectVariableFontAxes(fontFamily: string): VariableAxis[] {
  if (!fontFamily) return [];

  // Check if it's in our curated variable fonts database
  if (VARIABLE_FONTS_DATABASE[fontFamily]) {
    return VARIABLE_FONTS_DATABASE[fontFamily];
  }

  // Case-insensitive match check
  const matchedKey = Object.keys(VARIABLE_FONTS_DATABASE).find(
    k => k.toLowerCase() === fontFamily.toLowerCase()
  );
  if (matchedKey) {
    return VARIABLE_FONTS_DATABASE[matchedKey];
  }

  // Generic variable detection heuristics (e.g. font names containing 'Variable', 'Flex', 'VF')
  const isVariableByName = /variable|flex|vf/i.test(fontFamily);
  if (isVariableByName) {
    return [
      { tag: 'wght', name: 'Weight (wght)', min: 100, max: 900, defaultVal: 400, step: 10 },
      { tag: 'wdth', name: 'Width (wdth)', min: 75, max: 125, defaultVal: 100, step: 1, unit: '%' }
    ];
  }

  return [];
}

/**
 * Builds CSS font-variation-settings string from axes values.
 */
export function buildFontVariationSettings(axes: Record<string, number>): string {
  const entries = Object.entries(axes);
  if (entries.length === 0) return 'normal';
  return entries.map(([tag, val]) => `"${tag}" ${val}`).join(', ');
}
