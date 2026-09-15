export type ScaleStepKey = string;

export interface ModularRatio {
  name: string;
  value: number;
}

export interface ScaleStep {
  name: ScaleStepKey;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'small';
  power: number;
  label: string;
}

export interface VariableAxis {
  tag: string;
  name: string;
  min: number;
  max: number;
  defaultVal: number;
  step: number;
  unit?: string;
}

export interface TextDecorationSetting {
  transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration: 'none' | 'underline' | 'line-through';
}

export interface LanguageTypographyConfig {
  fontHeading: string;
  fontBody: string;
  fontHeadingSource: 'google' | 'system';
  fontBodySource: 'google' | 'system';
  linkBodyToHeading: boolean;

  // Extended Steps
  maxPower: number;
  minPower: number;
  hiddenPowers: number[];

  // Modular Scales
  dtBase: number;
  dtRatioIdx: number;
  mbScaleEnabled: boolean;
  mbBase: number;
  mbRatioIdx: number;

  // Leading (Line Height)
  leadingMode: 'global' | 'individual';
  lhHeadingGlobal: number;
  lhBodyGlobal: number;
  lhIndividual: Record<ScaleStepKey, number>;

  // Tracking (Letter Spacing in em)
  trackingMode: 'global' | 'individual';
  trackingHeadingGlobal: number;
  trackingBodyGlobal: number;
  trackingIndividual: Record<ScaleStepKey, number>;

  // Weights
  weightMode: 'global' | 'individual';
  h1MaxWeight: number;
  h5MinWeight: number;
  globalBodyWeight: number;
  indWeights: Record<ScaleStepKey, number>;

  // Variable Font Axes Values
  variableAxesValues: Record<string, number>;

  // Styling Overrides
  decorActive: boolean;
  decorations: Record<ScaleStepKey, TextDecorationSetting>;

  // Farsi specific link to english scale
  linkScaleToEn?: boolean;
}

export interface AppConfig {
  activeLang: 'en' | 'fa';
  farsiEnabled: boolean;
  previewMode: 'type' | 'simulation';
  viewLayout: 'split' | 'desktop' | 'mobile';
  simScenario: 'landing' | 'blog';
  exportFormat: 'css' | 'tailwind';
  sidebarCollapsed: boolean;
  en: LanguageTypographyConfig;
  fa: LanguageTypographyConfig;
}
