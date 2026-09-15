import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = content.replace("export function generateCodeOutput", "export function getActiveScaleSteps(config: LanguageTypographyConfig) {\n  return SCALE_STEPS.filter(step => {\n    if (step.name === 'display' && !config.hasDisplay) return false;\n    if (step.name === 'xsmall' && !config.hasXSmall) return false;\n    return true;\n  });\n}\n\nexport function generateCodeOutput")

content = content.replace("SCALE_STEPS.forEach(step => {", "getActiveScaleSteps(en).forEach(step => {", 1)
content = content.replace("SCALE_STEPS.forEach(step => {", "getActiveScaleSteps(fa).forEach(step => {", 1)
content = content.replace("SCALE_STEPS.forEach(step => {", "getActiveScaleSteps(en).forEach(step => {", 1)
content = content.replace("SCALE_STEPS.forEach(step => {", "getActiveScaleSteps(fa).forEach(step => {", 1)
content = content.replace("SCALE_STEPS.forEach(step => {", "getActiveScaleSteps(en).forEach(step => {", 1)

content = content.replace("    css += `${step.tag === 'p' ? 'p, .text-base' : step.tag} {\\n`;", 
"    let selector = step.tag;\n    if (step.tag === 'p') selector = 'p, .text-base';\n    if (step.name === 'display') selector = '.text-display';\n    if (step.name === 'xsmall') selector = '.text-xsmall';\n    css += `${selector} {\\n`;")

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
