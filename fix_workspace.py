import re

with open('src/components/Workspace/Workspace.tsx', 'r') as f:
    content = f.read()

content = content.replace("<SpecimenView\n                    config={enConfig}\n                    base={enConfig.dtBase}\n                    ratio={PREDEFINED_RATIOS[enConfig.dtRatioIdx]?.value || 1.25}\n                  />",
"<SpecimenView\n                    config={enConfig}\n                    base={enConfig.dtBase}\n                    ratio={PREDEFINED_RATIOS[enConfig.dtRatioIdx]?.value || 1.25}\n                    onConfigChange={(updated) => updateConfig('en', updated)}\n                  />")

content = content.replace("<SpecimenView\n                    config={faConfig}\n                    base={faConfig.dtBase}\n                    ratio={PREDEFINED_RATIOS[faConfig.dtRatioIdx]?.value || 1.25}\n                    isRtl\n                  />",
"<SpecimenView\n                    config={faConfig}\n                    base={faConfig.dtBase}\n                    ratio={PREDEFINED_RATIOS[faConfig.dtRatioIdx]?.value || 1.25}\n                    isRtl\n                    onConfigChange={(updated) => updateConfig('fa', updated)}\n                  />")

with open('src/components/Workspace/Workspace.tsx', 'w') as f:
    f.write(content)
