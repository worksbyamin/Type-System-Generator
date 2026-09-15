import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

tw_replace = """      const fontFam = en.fontFamilies[step.name] || (isHeading ? en.fontHeading : en.fontBody);
      tw += `\\n  --text-${step.name}: ${clampVal};\\n`;
      tw += `  --text-${step.name}--font-family: "${fontFam}", sans-serif;\\n`;"""
content = re.sub(r'      tw \+= `\\n  --text-\$\{step\.name\}: \$\{clampVal\};\\n`;', tw_replace, content, count=1)

tw_replace_fa = """        const fontFam = fa.fontFamilies[step.name] || (isHeading ? fa.fontHeading : fa.fontBody);
        tw += `    --text-${step.name}: ${clampVal};\\n`;
        tw += `    --text-${step.name}--font-family: "${fontFam}", sans-serif;\\n`;"""
content = re.sub(r'        tw \+= `    --text-\$\{step\.name\}: \$\{clampVal\};\\n`;', tw_replace_fa, content, count=1)

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
