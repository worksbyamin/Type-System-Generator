import re

# Fix cssGenerator.ts
with open('src/utils/cssGenerator.ts', 'r') as f:
    content = f.read()
content = content.replace("let selector = step.tag;", "let selector: string = step.tag;")
with open('src/utils/cssGenerator.ts', 'w') as f:
    f.write(content)

# Fix SimulationBlog.tsx
with open('src/components/Workspace/SimulationBlog.tsx', 'r') as f:
    content = f.read()
content = content.replace("const powerMap: Record<ScaleStepKey, number> = {", "const powerMap: Record<ScaleStepKey, number> = {\n      display: 6,")
content = content.replace("small: -1\n    };", "small: -1,\n      xsmall: -2\n    };")
with open('src/components/Workspace/SimulationBlog.tsx', 'w') as f:
    f.write(content)

# Fix SimulationLanding.tsx
with open('src/components/Workspace/SimulationLanding.tsx', 'r') as f:
    content = f.read()
content = content.replace("const powerMap: Record<ScaleStepKey, number> = {", "const powerMap: Record<ScaleStepKey, number> = {\n      display: 6,")
content = content.replace("small: -1\n    };", "small: -1,\n      xsmall: -2\n    };")
with open('src/components/Workspace/SimulationLanding.tsx', 'w') as f:
    f.write(content)

