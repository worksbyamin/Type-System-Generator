import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = content.replace("css += `  font-family: ${isHeading ? 'var(--font-heading)' : 'var(--font-body)'};\\n`;", 
"const fontFam = en.fontFamilies[step.name] || (isHeading ? en.fontHeading : en.fontBody);\n    css += `  font-family: '${fontFam}', sans-serif;\\n`;")

content = content.replace("css += `  font-family: ${isHeading ? 'var(--font-heading)' : 'var(--font-body)'};\\n`;", 
"const fontFam = en.fontFamilies[step.name] || (isHeading ? en.fontHeading : en.fontBody);\n    css += `  font-family: '${fontFam}', sans-serif;\\n`;")

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
