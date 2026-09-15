import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = re.sub(r'tw \+= `  --text-\$\{step\.name\}--font-family: "\$\{fontFam\}", sans-serif;`;', 'tw += `  --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-heading)" : "var(--font-body)"};`;', content)
content = re.sub(r'tw \+= `    --text-\$\{step\.name\}--font-family: "\$\{fontFam\}", sans-serif;`;', 'tw += `    --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-farsi-heading)" : "var(--font-farsi-body)"};`;', content)

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
