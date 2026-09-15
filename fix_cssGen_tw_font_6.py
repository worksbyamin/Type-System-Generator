import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = content.replace('tw += `  --text-${step.name}--font-family: "${fontFam}", sans-serif;`;', 'tw += `  --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-heading)" : "var(--font-body)"};\\n`;')
content = content.replace('tw += `    --text-${step.name}--font-family: "${fontFam}", sans-serif;`;', 'tw += `    --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-farsi-heading)" : "var(--font-farsi-body)"};\\n`;')

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
