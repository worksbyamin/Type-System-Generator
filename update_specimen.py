import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { SCALE_STEPS } from '../../constants/ratios';", "import { SCALE_STEPS } from '../../constants/ratios';\nimport { getActiveScaleSteps } from '../../utils/cssGenerator';")

content = content.replace("SCALE_STEPS.map((step)", "getActiveScaleSteps(config).map((step)")

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
