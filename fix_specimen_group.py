import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="flex flex-col gap-0 max-w-4xl mx-auto pb-16"', 'className="flex flex-col gap-0 max-w-4xl mx-auto pb-16 group/specimen"')
content = content.replace('opacity-0 hover:opacity-100 transition-opacity z-20 relative"', 'opacity-0 group-hover/specimen:opacity-100 transition-opacity z-20 relative"')

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
