const fs = require('fs');

let content = fs.readFileSync('src/constants/ratios.ts', 'utf8');

content = content.replace(/linkBodyToHeading: true,/g, "linkBodyToHeading: true,\n  hasDisplay: false,\n  hasXSmall: false,");

content = content.replace(/lhIndividual: {/g, "lhIndividual: {\n    display: 1.1,");
content = content.replace(/small: 1\.4\n  }/g, "small: 1.4,\n    xsmall: 1.4\n  }");
content = content.replace(/small: 1\.65\n  }/g, "small: 1.65,\n    xsmall: 1.65\n  }"); // FA

content = content.replace(/trackingIndividual: {/g, "trackingIndividual: {\n    display: -0.04,");
content = content.replace(/small: 0\.01\n  }/g, "small: 0.01,\n    xsmall: 0.02\n  }");
content = content.replace(/small: 0\n  }/g, "small: 0,\n    xsmall: 0\n  }"); // FA

content = content.replace(/indWeights: {/g, "indWeights: {\n    display: 900,");
content = content.replace(/small: 400\n  }/g, "small: 400,\n    xsmall: 400\n  }");

content = content.replace(/decorations: {/g, "decorations: {\n    display: { transform: 'none', decoration: 'none' },");
content = content.replace(/small: \{ transform: 'none', decoration: 'none' \}\n  }/g, "small: { transform: 'none', decoration: 'none' },\n    xsmall: { transform: 'none', decoration: 'none' }\n  }");

fs.writeFileSync('src/constants/ratios.ts', content);
