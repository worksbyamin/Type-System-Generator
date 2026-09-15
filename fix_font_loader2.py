with open('src/utils/fontLoader.ts', 'r') as f:
    content = f.read()

start_idx = content.find('export function loadGoogleFont')
end_idx = content.find('/**', start_idx)

new_logic = """export async function loadGoogleFont(fontFamily: string): Promise<void> {
  if (!fontFamily || loadedFonts.has(fontFamily)) return;

  // Mark as loaded so we don't spam duplicate link tags
  loadedFonts.add(fontFamily);

  try {
    const linkId = `google-font-${fontFamily.toLowerCase().replace(/\\s+/g, '-')}`;
    if (document.getElementById(linkId)) return;

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';

    // We'll try to determine if it's a known variable font to request specific axes
    const axes = detectVariableFontAxes(fontFamily);
    
    if (axes.length > 0) {
      // Sort axes tags alphabetically (required by Google Fonts API)
      const sortedAxes = [...axes].sort((a, b) => a.tag.localeCompare(b.tag));
      const axisTags = sortedAxes.map(a => a.tag).join(',');
      
      // Build range strings. For Google Fonts, min..max
      const axisRanges = sortedAxes.map(a => `${a.min}..${a.max}`).join(',');
      
      const primaryUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:${axisTags}@${axisRanges}&display=swap`;
      const fallbackUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@100..900&display=swap`;
      
      // Fetch to check if Google Fonts supports this exact axis combo without 400
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
      // For non-variable fonts, explicitly request discrete weights
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap`;
    }

    document.head.appendChild(link);
  } catch (err) {
    console.error(`Failed to load Google Font: ${fontFamily}`, err);
  }
}

"""

content = content[:start_idx] + new_logic + content[end_idx:]

with open('src/utils/fontLoader.ts', 'w') as f:
    f.write(content)
