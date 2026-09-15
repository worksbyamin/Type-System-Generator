import re

with open('src/components/Workspace/Workspace.tsx', 'r') as f:
    content = f.read()

content = content.replace("<SpecimenView\n                    config={langConfig}\n                    base={langConfig.dtBase}\n                    ratio={dtRatio}\n                    isRtl={isFa}\n                  />",
"<SpecimenView\n                    config={langConfig}\n                    base={langConfig.dtBase}\n                    ratio={dtRatio}\n                    isRtl={isFa}\n                    onConfigChange={(updated) => updateConfig(isFa ? 'fa' : 'en', updated)}\n                  />")

content = content.replace("<SpecimenView\n                    config={langConfig}\n                    base={mbBase}\n                    ratio={mbRatio}\n                    isRtl={isFa}\n                  />",
"<SpecimenView\n                    config={langConfig}\n                    base={mbBase}\n                    ratio={mbRatio}\n                    isRtl={isFa}\n                    onConfigChange={(updated) => updateConfig(isFa ? 'fa' : 'en', updated)}\n                  />")

with open('src/components/Workspace/Workspace.tsx', 'w') as f:
    f.write(content)
