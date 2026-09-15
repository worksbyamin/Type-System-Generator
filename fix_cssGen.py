import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

replacement = """
export function getActiveScaleSteps(config: LanguageTypographyConfig): ScaleStep[] {
  const steps: ScaleStep[] = [];
  
  for (let p = config.maxPower; p >= config.minPower; p--) {
    if (config.hiddenPowers?.includes(p)) continue;
    
    let name = '';
    let label = '';
    let tag: 'h1'|'h2'|'h3'|'h4'|'h5'|'p'|'small' = 'p';
    
    if (p > 5) {
      name = p === 6 ? 'display' : `display${p - 5}`;
      label = p === 6 ? 'Display / Hero' : `Display ${p - 5}`;
      tag = 'h1';
    } else if (p > 0) {
      name = `h${6 - p}`;
      label = `Heading ${6 - p}`;
      tag = `h${6 - p}` as any;
    } else if (p === 0) {
      name = 'base';
      label = 'Base Body';
      tag = 'p';
    } else if (p === -1) {
      name = 'small';
      label = 'Small / Caption';
      tag = 'small';
    } else {
      name = p === -2 ? 'xsmall' : `xsmall${Math.abs(p) - 1}`;
      label = p === -2 ? 'X-Small / Legal' : `X-Small ${Math.abs(p) - 1}`;
      tag = 'small';
    }
    
    steps.push({
      name: name,
      tag,
      power: p,
      label
    });
  }
  
  return steps;
}
"""

content = re.sub(r'export function getActiveScaleSteps\(config: LanguageTypographyConfig\): ScaleStep\[\] \{.*?\n\}\n', replacement, content, flags=re.DOTALL)

# Fix Tailwind export font logic
tw_font_en = r'const fontFam = en\.fontFamilies\[step\.name\] \|\| \(step\.power > 0 \? en\.fontHeading : en\.fontBody\);\n      tw \+= `\\n  --text-\$\{step\.name\}: \$\{clampVal\};\\n`;\n      tw \+= `  --text-\$\{step\.name\}--font-family: "\$\{fontFam\}", sans-serif;\\n`;'
tw_font_en_replacement = "tw += `\\n  --text-${step.name}: ${clampVal};\\n`;\n      tw += `  --text-${step.name}--font-family: ${step.power > 0 ? 'var(--font-heading)' : 'var(--font-body)'};\\n`;"
content = re.sub(tw_font_en, tw_font_en_replacement, content)

tw_font_fa = r'const fontFam = fa\.fontFamilies\[step\.name\] \|\| \(step\.power > 0 \? fa\.fontHeading : fa\.fontBody\);\n        tw \+= `    --text-\$\{step\.name\}: \$\{clampVal\};\\n`;\n        tw \+= `    --text-\$\{step\.name\}--font-family: "\$\{fontFam\}", sans-serif;\\n`;'
tw_font_fa_replacement = "tw += `    --text-${step.name}: ${clampVal};\\n`;\n        tw += `    --text-${step.name}--font-family: ${step.power > 0 ? 'var(--font-farsi-heading)' : 'var(--font-farsi-body)'};\\n`;"
content = re.sub(tw_font_fa, tw_font_fa_replacement, content)

# Fix CSS export font logic
css_font = r"const fontFam = en\.fontFamilies\[step\.name\] \|\| \(step\.power > 0 \? en\.fontHeading : en\.fontBody\);\n    css \+= `  font-family: '\$\{fontFam\}', sans-serif;\\n`;"
css_font_replacement = "css += `  font-family: ${step.power > 0 ? 'var(--font-heading)' : 'var(--font-body)'};\\n`;"
content = re.sub(css_font, css_font_replacement, content)
content = re.sub(css_font, css_font_replacement, content) # Do it twice just in case

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
