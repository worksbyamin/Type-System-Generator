import re

with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()

content = content.replace("import { AppConfig, LanguageTypographyConfig, ScaleStepKey } from '../types/typography';", "import { AppConfig, LanguageTypographyConfig, ScaleStepKey, ScaleStep } from '../types/typography';")

content = content.replace("const fontFam = en.fontFamilies[step.name] || (isHeading ? en.fontHeading : en.fontBody);", "const fontFam = en.fontFamilies[step.name] || (step.power > 0 ? en.fontHeading : en.fontBody);")
content = content.replace("const fontFam = fa.fontFamilies[step.name] || (isHeading ? fa.fontHeading : fa.fontBody);", "const fontFam = fa.fontFamilies[step.name] || (step.power > 0 ? fa.fontHeading : fa.fontBody);")

with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)
