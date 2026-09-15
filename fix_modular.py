import re

with open('src/components/Sidebar/ModularScaleCollapsible.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'<div className="h-px bg-white/5 my-1" />\s*\{/\* EXTENDED SCALE \*/\}.*?(?=</div>\s*</div>\s*\)\s*</div>\s*\);\s*};)', '', content, flags=re.DOTALL)

with open('src/components/Sidebar/ModularScaleCollapsible.tsx', 'w') as f:
    f.write(content)
