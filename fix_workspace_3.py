import re

with open('src/components/Workspace/Workspace.tsx', 'r') as f:
    content = f.read()

content = content.replace("updateConfig", "onUpdate")

with open('src/components/Workspace/Workspace.tsx', 'w') as f:
    f.write(content)
