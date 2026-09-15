import re

for filename in ['LeadingTrackingCollapsible.tsx', 'FontWeightsCollapsible.tsx', 'StylingOverridesCollapsible.tsx']:
    filepath = f'src/components/Sidebar/{filename}'
    with open(filepath, 'r') as f:
        content = f.read()

    content = content.replace("import { SCALE_STEPS } from '../../constants/ratios';", "import { SCALE_STEPS } from '../../constants/ratios';\nimport { getActiveScaleSteps } from '../../utils/cssGenerator';")
    content = content.replace("SCALE_STEPS.map((step)", "getActiveScaleSteps(config).map((step)")

    with open(filepath, 'w') as f:
        f.write(content)

