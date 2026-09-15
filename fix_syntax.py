import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = content.replace("tw += `  --text-${step.name}: ${clampVal};`;`;", "tw += `  --text-${step.name}: ${clampVal};\\n`;")
content = content.replace("tw += `    --text-${step.name}: ${clampVal};`;`;", "tw += `    --text-${step.name}: ${clampVal};\\n`;")

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
