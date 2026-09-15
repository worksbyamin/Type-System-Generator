import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = re.sub(r'      const fontFam = en\.fontFamilies\[step\.name\] \|\| \(step\.power > 0 \? en\.fontHeading : en\.fontBody\);\n', '', content)
content = re.sub(r'        const fontFam = fa\.fontFamilies\[step\.name\] \|\| \(step\.power > 0 \? fa\.fontHeading : fa\.fontBody\);\n', '', content)

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
