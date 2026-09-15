import re

with open('src/types/typography.ts', 'r') as f:
    content = f.read()

content = content.replace("extraTop: number;\n  extraBottom: number;\n  fontFamilies: Record<string, string>;", "maxPower: number;\n  minPower: number;\n  hiddenPowers: number[];")

with open('src/types/typography.ts', 'w') as f:
    f.write(content)
