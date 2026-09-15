import re

with open('src/utils/fontLoader.ts', 'r') as f:
    content = f.read()

new_logic = """
    // We'll try to determine if it's a known variable font to request specific axes
    const axes = detectVariableFontAxes(fontFamily);
    
    if (axes.length > 0) {
      // Sort axes tags alphabetically (required by Google Fonts API)
      const sortedAxes = [...axes].sort((a, b) => a.tag.localeCompare(b.tag));
      const axisTags = sortedAxes.map(a => a.tag).join(',');
      
      // Build range strings. For Google Fonts, min..max
      const axisRanges = sortedAxes.map(a => `${a.min}..${a.max}`).join(',');
      
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:${axisTags}@${axisRanges}&display=swap`;
      
      link.onerror = () => {
        link.onerror = null;
        // Fallback to basic wght if the specific combo fails
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@100..900&display=swap`;
      };
    } else {
      // For non-variable fonts, explicitly request discrete weights
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap`;
    }
"""

content = re.sub(r'    // We\'ll try to determine if it\'s a known variable font.*?    \} else \{.*?    \}', new_logic, content, flags=re.DOTALL)

with open('src/utils/fontLoader.ts', 'w') as f:
    f.write(content)
