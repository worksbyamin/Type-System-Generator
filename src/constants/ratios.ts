import { ModularRatio, ScaleStep, VariableAxis, LanguageTypographyConfig } from '../types/typography';

export const PREDEFINED_RATIOS: ModularRatio[] = [
  { name: 'Minor 2nd', value: 1.067 },
  { name: 'Major 2nd', value: 1.125 },
  { name: 'Minor 3rd', value: 1.200 },
  { name: 'Major 3rd', value: 1.250 },
  { name: 'Perfect 4th', value: 1.333 },
  { name: 'Augmented 4th', value: 1.414 },
  { name: 'Perfect 5th', value: 1.500 },
  { name: 'Golden Ratio', value: 1.618 },
  { name: 'Major 6th', value: 1.667 },
  { name: 'Minor 7th', value: 1.778 },
  { name: 'Major 7th', value: 1.875 },
  { name: 'Octave', value: 2.000 }
];

export const SCALE_STEPS: ScaleStep[] = [
  { name: 'display', tag: 'h1', power: 6, label: 'Display / Hero' },
  { name: 'h1', tag: 'h1', power: 5, label: 'Heading 1' },
  { name: 'h2', tag: 'h2', power: 4, label: 'Heading 2' },
  { name: 'h3', tag: 'h3', power: 3, label: 'Heading 3' },
  { name: 'h4', tag: 'h4', power: 2, label: 'Heading 4' },
  { name: 'h5', tag: 'h5', power: 1, label: 'Heading 5' },
  { name: 'base', tag: 'p', power: 0, label: 'Base Body' },
  { name: 'small', tag: 'small', power: -1, label: 'Small / Caption' },
  { name: 'xsmall', tag: 'small', power: -2, label: 'X-Small / Legal' }
];

export const POPULAR_GOOGLE_FONTS_EN = [
  'Inter',
  'Roboto',
  'Plus Jakarta Sans',
  'DM Sans',
  'Outfit',
  'Space Grotesk',
  'Syne',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Oswald',
  'Raleway',
  'Playfair Display',
  'Merriweather',
  'Work Sans',
  'Lora',
  'Cinzel',
  'Fira Code',
  'JetBrains Mono'
];

export const POPULAR_GOOGLE_FONTS_FA = [
  'Vazirmatn',
  'Noto Sans Arabic',
  'Rubik',
  'Amiri',
  'Cairo',
  'Lalezar',
  'Harmattan',
  'Markazi Text',
  'Mada',
  'El Messiri'
];

export const FALLBACK_SYSTEM_FONTS = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'SF Pro Display',
  'Segoe UI',
  'Helvetica Neue',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana'
];

export const VARIABLE_FONTS_DATABASE: Record<string, VariableAxis[]> = {
  'Inter': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 },
    { tag: 'slnt', name: 'Slant', min: -10, max: 0, defaultVal: 0, step: 1, unit: '°' }
  ],
  'Roboto Flex': [
    { tag: 'wght', name: 'Weight', min: 100, max: 1000, defaultVal: 400, step: 10 },
    { tag: 'wdth', name: 'Width', min: 25, max: 151, defaultVal: 100, step: 1, unit: '%' },
    { tag: 'opsz', name: 'Optical Size', min: 8, max: 144, defaultVal: 14, step: 1, unit: 'pt' },
    { tag: 'slnt', name: 'Slant', min: -10, max: 0, defaultVal: 0, step: 1, unit: '°' }
  ],
  'Plus Jakarta Sans': [
    { tag: 'wght', name: 'Weight', min: 200, max: 800, defaultVal: 400, step: 10 }
  ],
  'DM Sans': [
    { tag: 'wght', name: 'Weight', min: 100, max: 1000, defaultVal: 400, step: 10 },
    { tag: 'opsz', name: 'Optical Size', min: 9, max: 40, defaultVal: 18, step: 1, unit: 'pt' }
  ],
  'Outfit': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 }
  ],
  'Montserrat': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 }
  ],
  'Oswald': [
    { tag: 'wght', name: 'Weight', min: 200, max: 700, defaultVal: 400, step: 10 }
  ],
  'Raleway': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 }
  ],
  'Playfair Display': [
    { tag: 'wght', name: 'Weight', min: 400, max: 900, defaultVal: 400, step: 10 }
  ],
  'Vazirmatn': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 }
  ],
  'Cairo': [
    { tag: 'wght', name: 'Weight', min: 200, max: 1000, defaultVal: 400, step: 10 },
    { tag: 'slnt', name: 'Slant', min: -11, max: 0, defaultVal: 0, step: 1, unit: '°' }
  ],
  'Rubik': [
    { tag: 'wght', name: 'Weight', min: 300, max: 900, defaultVal: 400, step: 10 }
  ],
  'Work Sans': [
    { tag: 'wght', name: 'Weight', min: 100, max: 900, defaultVal: 400, step: 10 }
  ]
};

export const DEFAULT_EN_CONFIG: LanguageTypographyConfig = {
  fontHeading: 'Inter',
  fontBody: 'Inter',
  fontHeadingSource: 'google',
  fontBodySource: 'google',
  linkBodyToHeading: true,
  maxPower: 5,
  minPower: -1,
  hiddenPowers: [],
  dtBase: 16,
  dtRatioIdx: 3, // Major 3rd (1.250)
  mbScaleEnabled: true,
  mbBase: 15,
  mbRatioIdx: 1, // Major 2nd (1.125)

  leadingMode: 'global',
  lhHeadingGlobal: 1.2,
  lhBodyGlobal: 1.5,
  lhIndividual: {
    display: 1.1,
    h1: 1.15,
    h2: 1.2,
    h3: 1.25,
    h4: 1.3,
    h5: 1.35,
    base: 1.5,
    small: 1.4,
    xsmall: 1.4
  },

  trackingMode: 'global',
  trackingHeadingGlobal: -0.02,
  trackingBodyGlobal: 0,
  trackingIndividual: {
    display: -0.04,
    h1: -0.03,
    h2: -0.02,
    h3: -0.01,
    h4: 0,
    h5: 0.01,
    base: 0,
    small: 0.01,
    xsmall: 0.02
  },

  weightMode: 'global',
  h1MaxWeight: 800,
  h5MinWeight: 600,
  globalBodyWeight: 400,
  indWeights: {
    display: 900,
    h1: 800,
    h2: 700,
    h3: 600,
    h4: 500,
    h5: 500,
    base: 400,
    small: 400,
    xsmall: 400
  },

  variableAxesValues: {
    wght: 400
  },

  decorActive: false,
  decorations: {
    display: { transform: 'none', decoration: 'none' },
    h1: { transform: 'none', decoration: 'none' },
    h2: { transform: 'none', decoration: 'none' },
    h3: { transform: 'none', decoration: 'none' },
    h4: { transform: 'none', decoration: 'none' },
    h5: { transform: 'none', decoration: 'none' },
    base: { transform: 'none', decoration: 'none' },
    small: { transform: 'none', decoration: 'none' },
    xsmall: { transform: 'none', decoration: 'none' }
  }
};

export const DEFAULT_FA_CONFIG: LanguageTypographyConfig = {
  fontHeading: 'Vazirmatn',
  fontBody: 'Vazirmatn',
  fontHeadingSource: 'google',
  fontBodySource: 'google',
  linkBodyToHeading: true,
  maxPower: 5,
  minPower: -1,
  hiddenPowers: [],
  linkScaleToEn: true,
  dtBase: 16,
  dtRatioIdx: 3,
  mbScaleEnabled: true,
  mbBase: 15,
  mbRatioIdx: 1,

  leadingMode: 'global',
  lhHeadingGlobal: 1.45,
  lhBodyGlobal: 1.8,
  lhIndividual: {
    display: 1.1,
    h1: 1.35,
    h2: 1.4,
    h3: 1.45,
    h4: 1.5,
    h5: 1.6,
    base: 1.8,
    small: 1.65,
    xsmall: 1.65
  },

  trackingMode: 'global',
  trackingHeadingGlobal: 0,
  trackingBodyGlobal: 0,
  trackingIndividual: {
    display: -0.04,
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    base: 0,
    small: 0,
    xsmall: 0
  },

  weightMode: 'global',
  h1MaxWeight: 800,
  h5MinWeight: 600,
  globalBodyWeight: 400,
  indWeights: {
    display: 900,
    h1: 800,
    h2: 700,
    h3: 600,
    h4: 500,
    h5: 500,
    base: 400,
    small: 400,
    xsmall: 400
  },

  variableAxesValues: {
    wght: 400
  },

  decorActive: false,
  decorations: {
    display: { transform: 'none', decoration: 'none' },
    h1: { transform: 'none', decoration: 'none' },
    h2: { transform: 'none', decoration: 'none' },
    h3: { transform: 'none', decoration: 'none' },
    h4: { transform: 'none', decoration: 'none' },
    h5: { transform: 'none', decoration: 'none' },
    base: { transform: 'none', decoration: 'none' },
    small: { transform: 'none', decoration: 'none' },
    xsmall: { transform: 'none', decoration: 'none' }
  }
};
