import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    lines = f.readlines()

new_lines = lines[:144] + [
    '      const ls = calculateStepTracking(step.name, step.power, en);\n',
    '      tw += `  --text-${step.name}: ${clampVal};\\n`;\n',
    '      tw += `  --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-heading)" : "var(--font-body)"};\\n`;\n',
    '      tw += `  --text-${step.name}--line-height: ${lh};\\n`;\n',
    '      tw += `  --text-${step.name}--letter-spacing: ${ls}em;\\n`;\n',
    '    });\n',
    '\n',
    '    tw += `}\\n`;\n'
] + lines[155:]

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.writelines(new_lines)
