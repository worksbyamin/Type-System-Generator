import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("interface SpecimenViewProps {\n  config: LanguageTypographyConfig;\n  base: number;\n  ratio: number;\n  isRtl?: boolean;\n}", 
"interface SpecimenViewProps {\n  config: LanguageTypographyConfig;\n  base: number;\n  ratio: number;\n  isRtl?: boolean;\n  onConfigChange?: (updated: Partial<LanguageTypographyConfig>) => void;\n}")

content = content.replace("export const SpecimenView: React.FC<SpecimenViewProps> = ({\n  config,\n  base,\n  ratio,\n  isRtl = false\n}) => {",
"export const SpecimenView: React.FC<SpecimenViewProps> = ({\n  config,\n  base,\n  ratio,\n  isRtl = false,\n  onConfigChange\n}) => {")

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
