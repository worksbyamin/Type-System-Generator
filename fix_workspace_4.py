import re

with open('src/components/Workspace/Workspace.tsx', 'r') as f:
    content = f.read()

content = content.replace("onUpdate(isFa ? 'fa' : 'en', updated)", "onUpdateAppConfig({ [isFa ? 'fa' : 'en']: { ...langConfig, ...updated } })")

with open('src/components/Workspace/Workspace.tsx', 'w') as f:
    f.write(content)
