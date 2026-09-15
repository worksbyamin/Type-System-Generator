import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    lines = f.readlines()

new_lines = lines[:170] + [
    '        tw += `    --text-${step.name}: ${clampVal};\\n`;\n',
    '        tw += `    --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-farsi-heading)" : "var(--font-farsi-body)"};\\n`;\n',
    '        tw += `    --text-${step.name}--line-height: ${lh};\\n`;\n',
    '        tw += `    --text-${step.name}--letter-spacing: ${ls}em;\\n`;\n',
    '        tw += `    --text-${step.name}--font-weight: ${weight};\\n`;\n',
    '      });\n'
] + lines[178:]

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.writelines(new_lines)
