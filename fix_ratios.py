import re

with open('src/constants/ratios.ts', 'r') as f:
    content = f.read()

content = content.replace("extraTop: 0,\n  extraBottom: 0,\n  fontFamilies: {},", "maxPower: 5,\n  minPower: -1,\n  hiddenPowers: [],")

with open('src/constants/ratios.ts', 'w') as f:
    f.write(content)
