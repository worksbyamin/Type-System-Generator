import { PREDEFINED_RATIOS, SCALE_STEPS } from '../constants/ratios';
import { AppConfig, LanguageTypographyConfig, ScaleStepKey, ScaleStep } from '../types/typography';
import { buildFontVariationSettings } from './fontLoader';

/**
 * Calculates font size in px based on base and ratio with power step.
 */
export function calculatePxSize(base: number, ratio: number, power: number): number {
  return base * Math.pow(ratio, power);
}

/**
 * Calculates weight for a specific step based on config.
 */
export function calculateStepWeight(
  stepKey: ScaleStepKey,
  power: number,
  config: LanguageTypographyConfig
): number {
  if (config.weightMode === 'global') {
    if (power <= 0) return config.globalBodyWeight;
    const t = (power - 1) / 4;
    const rawW = config.h5MinWeight + t * (config.h1MaxWeight - config.h5MinWeight);
    return Math.round(rawW / 100) * 100;
  }
  return config.indWeights[stepKey] ?? 400;
}

/**
 * Calculates line-height for a specific step based on config.
 */
export function calculateStepLineHeight(
  stepKey: ScaleStepKey,
  power: number,
  config: LanguageTypographyConfig
): number {
  if (config.leadingMode === 'global') {
    return power > 0 ? config.lhHeadingGlobal : config.lhBodyGlobal;
  }
  return config.lhIndividual[stepKey] ?? (power > 0 ? 1.2 : 1.5);
}

/**
 * Calculates letter-spacing (in em) for a specific step based on config.
 */
export function calculateStepTracking(
  stepKey: ScaleStepKey,
  power: number,
  config: LanguageTypographyConfig
): number {
  if (config.trackingMode === 'global') {
    return power > 0 ? config.trackingHeadingGlobal : config.trackingBodyGlobal;
  }
  return config.trackingIndividual[stepKey] ?? 0;
}

/**
 * Computes fluid clamp value between min and max viewports (375px to 1440px).
 */
export function calculateFluidClamp(minPx: number, maxPx: number): string {
  const minVp = 375;
  const maxVp = 1440;
  const slope = (maxPx - minPx) / (maxVp - minVp);
  const yIntercept = minPx - slope * minVp;
  const yInterceptRem = (yIntercept / 16).toFixed(4);
  const slopeVw = (slope * 100).toFixed(4);
  const minRem = (minPx / 16).toFixed(4);
  const maxRem = (maxPx / 16).toFixed(4);

  return `clamp(${minRem}rem, ${yInterceptRem}rem + ${slopeVw}vw, ${maxRem}rem)`;
}

/**
 * Generates full CSS stylesheet code or Tailwind configuration.
 */


export function getActiveScaleSteps(config: LanguageTypographyConfig): ScaleStep[] {
  const steps: ScaleStep[] = [];
  
  for (let p = config.maxPower; p >= config.minPower; p--) {
    if (config.hiddenPowers?.includes(p)) continue;
    
    let name = '';
    let label = '';
    let tag: 'h1'|'h2'|'h3'|'h4'|'h5'|'p'|'small' = 'p';
    
    if (p > 5) {
      name = p === 6 ? 'display' : `display${p - 5}`;
      label = p === 6 ? 'Display / Hero' : `Display ${p - 5}`;
      tag = 'h1';
    } else if (p > 0) {
      name = `h${6 - p}`;
      label = `Heading ${6 - p}`;
      tag = `h${6 - p}` as any;
    } else if (p === 0) {
      name = 'base';
      label = 'Base Body';
      tag = 'p';
    } else if (p === -1) {
      name = 'small';
      label = 'Small / Caption';
      tag = 'small';
    } else {
      name = p === -2 ? 'xsmall' : `xsmall${Math.abs(p) - 1}`;
      label = p === -2 ? 'X-Small / Legal' : `X-Small ${Math.abs(p) - 1}`;
      tag = 'small';
    }
    
    steps.push({
      name: name,
      tag,
      power: p,
      label
    });
  }
  
  return steps;
}

export function generateCodeOutput(appConfig: AppConfig): string {
  const en = appConfig.en;
  const fa = appConfig.fa;
  const enDtRatio = PREDEFINED_RATIOS[en.dtRatioIdx].value;
  const enMbRatio = en.mbScaleEnabled ? PREDEFINED_RATIOS[en.mbRatioIdx].value : enDtRatio;
  const enMbBase = en.mbScaleEnabled ? en.mbBase : en.dtBase;

  if (appConfig.exportFormat === 'tailwind') {
    let tw = `/* Tailwind v4 PostCSS Configuration */\n`;
    tw += `@import "tailwindcss";\n\n`;
    tw += `@theme {\n`;
    tw += `  --font-heading: "${en.fontHeading}", sans-serif;\n`;
    tw += `  --font-body: "${en.fontBody}", sans-serif;\n`;
    
    if (appConfig.farsiEnabled) {
      tw += `  --font-farsi-heading: "${fa.fontHeading}", sans-serif;\n`;
      tw += `  --font-farsi-body: "${fa.fontBody}", sans-serif;\n`;
    }

    getActiveScaleSteps(en).forEach(step => {
      const minPx = calculatePxSize(enMbBase, enMbRatio, step.power);
      const maxPx = calculatePxSize(en.dtBase, enDtRatio, step.power);
      const clampVal = calculateFluidClamp(minPx, maxPx);
      const lh = calculateStepLineHeight(step.name, step.power, en);
      const ls = calculateStepTracking(step.name, step.power, en);
      tw += `  --text-${step.name}: ${clampVal};\n`;
      tw += `  --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-heading)" : "var(--font-body)"};\n`;
      tw += `  --text-${step.name}--line-height: ${lh};\n`;
      tw += `  --text-${step.name}--letter-spacing: ${ls}em;\n`;
    });

    tw += `}\n`;

    if (appConfig.farsiEnabled) {
      tw += `\n/* Dynamic RTL Support (Utility overrides) */\n`;
      tw += `@layer base {\n`;
      tw += `  :root:dir(rtl) {\n`;
      
      const faDtRatio = PREDEFINED_RATIOS[fa.dtRatioIdx].value;
      const faMbRatio = fa.mbScaleEnabled ? PREDEFINED_RATIOS[fa.mbRatioIdx].value : faDtRatio;
      const faMbBase = fa.mbScaleEnabled ? fa.mbBase : fa.dtBase;

      getActiveScaleSteps(fa).forEach(step => {
        const minPx = calculatePxSize(faMbBase, faMbRatio, step.power);
        const maxPx = calculatePxSize(fa.dtBase, faDtRatio, step.power);
        const clampVal = calculateFluidClamp(minPx, maxPx);
        const lh = calculateStepLineHeight(step.name, step.power, fa);
        const ls = calculateStepTracking(step.name, step.power, fa);
        const weight = calculateStepWeight(step.name, step.power, fa);
        
        tw += `    --text-${step.name}: ${clampVal};\n`;
        tw += `    --text-${step.name}--font-family: ${step.power > 0 ? "var(--font-farsi-heading)" : "var(--font-farsi-body)"};\n`;
        tw += `    --text-${step.name}--line-height: ${lh};\n`;
        tw += `    --text-${step.name}--letter-spacing: ${ls}em;\n`;
        tw += `    --text-${step.name}--font-weight: ${weight};\n`;
      });
      tw += `  }\n`;
      tw += `}\n\n`;

      tw += `@utility font-heading {\n`;
      tw += `  font-family: var(--font-heading);\n`;
      tw += `  &:dir(rtl) {\n`;
      tw += `    font-family: var(--font-farsi-heading);\n`;
      tw += `  }\n`;
      tw += `}\n\n`;
      tw += `@utility font-body {\n`;
      tw += `  font-family: var(--font-body);\n`;
      tw += `  &:dir(rtl) {\n`;
      tw += `    font-family: var(--font-farsi-body);\n`;
      tw += `  }\n`;
      tw += `}\n`;
    }

    return tw;
  }

  // CSS Variables Export
  let css = `/* ==========================================================================\n`;
  css += `   Type System Generator Stylesheet\n`;
  css += `   Generated with Fluid Modular Scales & Variable Typographic Tokens\n`;
  css += `   ========================================================================== */\n\n`;

  // Root variables
  css += `:root {\n`;
  css += `  /* Font Families */\n`;
  css += `  --font-heading: '${en.fontHeading}', sans-serif;\n`;
  css += `  --font-body: '${en.fontBody}', sans-serif;\n\n`;

  const enVariation = buildFontVariationSettings(en.variableAxesValues);
  if (enVariation !== 'normal') {
    css += `  /* Variable Font Axes */\n`;
    css += `  --font-variations: ${enVariation};\n\n`;
  }

  css += `  /* Line Heights */\n`;
  css += `  --lh-heading: ${en.lhHeadingGlobal};\n`;
  css += `  --lh-body: ${en.lhBodyGlobal};\n\n`;

  css += `  /* Letter Spacing (Tracking) */\n`;
  css += `  --tracking-heading: ${en.trackingHeadingGlobal}em;\n`;
  css += `  --tracking-body: ${en.trackingBodyGlobal}em;\n\n`;

  css += `  /* Fluid Typography Clamps (Mobile 375px -> Desktop 1440px) */\n`;
  getActiveScaleSteps(en).forEach(step => {
    const minPx = calculatePxSize(enMbBase, enMbRatio, step.power);
    const maxPx = calculatePxSize(en.dtBase, enDtRatio, step.power);
    css += `  --fs-${step.name}: ${calculateFluidClamp(minPx, maxPx)};\n`;
  });
  css += `}\n\n`;

  // Farsi RTL variables if enabled
  if (appConfig.farsiEnabled) {
    const faDtRatio = PREDEFINED_RATIOS[fa.dtRatioIdx].value;
    const faMbRatio = fa.mbScaleEnabled ? PREDEFINED_RATIOS[fa.mbRatioIdx].value : faDtRatio;
    const faMbBase = fa.mbScaleEnabled ? fa.mbBase : fa.dtBase;

    css += `/* RTL / Farsi Typography Overrides */\n`;
    css += `[dir="rtl"] {\n`;
    css += `  --font-heading: '${fa.fontHeading}', sans-serif;\n`;
    css += `  --font-body: '${fa.fontBody}', sans-serif;\n`;

    const faVariation = buildFontVariationSettings(fa.variableAxesValues);
    if (faVariation !== 'normal') {
      css += `  --font-variations: ${faVariation};\n`;
    }

    css += `  --lh-heading: ${fa.lhHeadingGlobal};\n`;
    css += `  --lh-body: ${fa.lhBodyGlobal};\n`;
    css += `  --tracking-heading: ${fa.trackingHeadingGlobal}em;\n`;
    css += `  --tracking-body: ${fa.trackingBodyGlobal}em;\n`;

    getActiveScaleSteps(fa).forEach(step => {
      const minPx = calculatePxSize(faMbBase, faMbRatio, step.power);
      const maxPx = calculatePxSize(fa.dtBase, faDtRatio, step.power);
      css += `  --fs-${step.name}: ${calculateFluidClamp(minPx, maxPx)};\n`;
    });
    css += `}\n\n`;
  }

  // Base tag typography rules
  css += `/* Semantic HTML Typography Rules */\n`;
  getActiveScaleSteps(en).forEach(step => {
    const isHeading = step.power > 0;
    const weight = calculateStepWeight(step.name, step.power, en);
    const lh = calculateStepLineHeight(step.name, step.power, en);
    const ls = calculateStepTracking(step.name, step.power, en);
    const decor = en.decorActive ? en.decorations[step.name] : null;

    let selector: string = step.tag;
    if (step.tag === 'p') selector = 'p, .text-base';
    if (step.name === 'display') selector = '.text-display';
    if (step.name === 'xsmall') selector = '.text-xsmall';
    css += `${selector} {\n`;
    css += `  font-family: ${step.power > 0 ? 'var(--font-heading)' : 'var(--font-body)'};
`;
    css += `  font-size: var(--fs-${step.name});\n`;
    css += `  line-height: ${lh};\n`;
    css += `  letter-spacing: ${ls}em;\n`;
    css += `  font-weight: ${weight};\n`;
    if (decor?.transform && decor.transform !== 'none') {
      css += `  text-transform: ${decor.transform};\n`;
    }
    if (decor?.decoration && decor.decoration !== 'none') {
      css += `  text-decoration: ${decor.decoration};\n`;
    }
    css += `}\n\n`;
  });

  return css;
}
