import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { SCALE_STEPS } from '../../constants/ratios';
import { getActiveScaleSteps } from '../../utils/cssGenerator';
import { LanguageTypographyConfig } from '../../types/typography';
import {
  calculatePxSize,
  calculateStepWeight,
  calculateStepLineHeight,
  calculateStepTracking
} from '../../utils/cssGenerator';
import { buildFontVariationSettings } from '../../utils/fontLoader';

interface SpecimenViewProps {
  config: LanguageTypographyConfig;
  base: number;
  ratio: number;
  isRtl?: boolean;
  onConfigChange?: (updated: Partial<LanguageTypographyConfig>) => void;
}

const DEFAULT_SAMPLE_TEXTS_EN: Record<string, string> = {
  display: 'Extraordinary Typographic Presence',
  h1: 'Fluid & Modern Web Typography',
  h2: 'Harmonic Interface Design Systems',
  h3: 'Structured Text Grid for Digital Apps',
  h4: 'Complete Ratio & Line-height Control',
  h5: 'Visual Balance for Sub-headings',
  base: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed in modern digital interfaces.',
  small: 'Note: This is a small caption line for testing typography scale hierarchy and footnote legibility.',
  xsmall: 'DISCLAIMER: This extra small legal text is used for copyright notices and minor details.'
};

const DEFAULT_SAMPLE_TEXTS_FA: Record<string, string> = {
  display: 'حضور خارق‌العاده تایپوگرافی',
  h1: 'تایپوگرافی زیبا و مدرن وب',
  h2: 'طراحی رابط‌های کاربری هماهنگ',
  h3: 'ساختار متون در شبکه‌های هوشمند',
  h4: 'کنترل کامل بر نسبت‌ها و فواصل',
  h5: 'توازن دیداری در عناوین فرعی',
  base: 'تایپوگرافی هنر و تکنیک چیدمان حروف برای دستیابی به زبانی خوانا، زیبا و موثر در رابط‌های دیجیتال است.',
  small: 'یادداشت: این یک متن توضیحی کوچک برای تست مقیاس تایپوگرافی و زیرنویس‌ها است.',
  xsmall: 'سلب مسئولیت: این متن حقوقی بسیار کوچک برای اعلامیه‌های کپی‌رایت و جزئیات جزئی استفاده می‌شود.'
};

export const SpecimenView: React.FC<SpecimenViewProps> = ({
  config,
  base,
  ratio,
  isRtl = false,
  onConfigChange
}) => {
  const sampleTexts = isRtl ? DEFAULT_SAMPLE_TEXTS_FA : DEFAULT_SAMPLE_TEXTS_EN;
  const variationSettings = buildFontVariationSettings(config.variableAxesValues);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex flex-col gap-0 max-w-4xl mx-auto pb-16 group/specimen"
    >

      {/* Add Larger Step Button */}
      {onConfigChange && (
        <div className="flex justify-center -mb-2 mt-2 opacity-0 group-hover/specimen:opacity-100 transition-opacity z-20 relative">
          <button 
            onClick={() => onConfigChange({ maxPower: (config.maxPower || 5) + 1 })} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 shadow-sm rounded-full text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add larger step
          </button>
        </div>
      )}

      {getActiveScaleSteps(config).map((step, idx, arr) => {
        const isHeading = step.power > 0;
        const font = isHeading ? config.fontHeading : config.fontBody;
        const px = calculatePxSize(base, ratio, step.power);
        const rem = (px / 16).toFixed(3);
        const weight = calculateStepWeight(step.name, step.power, config);
        const lh = calculateStepLineHeight(step.name, step.power, config);
        const tracking = calculateStepTracking(step.name, step.power, config);
        const decor = config.decorActive ? config.decorations[step.name] : null;

        return (
          <div
            key={step.name}
            className="pb-3 border-b border-neutral-100 last:border-0 flex items-baseline gap-2 sm:gap-3 group relative pt-3 sm:-ml-4"
          >
            {/* Remove Button (Left side) */}
            {onConfigChange && (
              <button 
                onClick={() => {
                  const hidden = config.hiddenPowers || [];
                  onConfigChange({ hiddenPowers: [...hidden, step.power] });
                }}
                className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 p-1 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                title="Remove this step"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}

            {/* Step Name (Margin Column) */}
            <div className="w-6 sm:w-8 shrink-0 text-[9px] font-mono font-bold text-neutral-300 group-hover:text-neutral-500 transition-colors uppercase text-right">
              {step.name}
            </div>

            {/* Detailed Specimen Metadata (Floating on Hover) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end text-[10px] font-mono text-neutral-500 select-none opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-neutral-200/60">
                 <div className="flex flex-col items-end">
                    <span className="font-semibold text-neutral-800 mb-0.5 max-w-[140px] truncate">{font}</span>
                    <span className="whitespace-nowrap">{px.toFixed(1)}px ({rem}rem)</span>
                    <span className="whitespace-nowrap">LH: {lh.toFixed(2)} • W: {weight}</span>
                    <span className="whitespace-nowrap">LS: {tracking > 0 ? `+${tracking.toFixed(3)}` : tracking.toFixed(3)}em</span>
                 </div>
              </div>
            </div>

            {/* Specimen Editable Text */}
            <div
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: `"${font}", sans-serif`,
                fontSize: `${px}px`,
                lineHeight: lh,
                letterSpacing: `${tracking}em`,
                fontWeight: weight,
                textTransform: decor?.transform ?? 'none',
                textDecoration: decor?.decoration ?? 'none',
                fontVariationSettings: variationSettings !== 'normal' ? variationSettings : undefined
              }}
              className="flex-1 min-w-0 text-neutral-900 outline-none focus:ring-1 focus:ring-neutral-400 rounded px-1 -mx-1 transition-all"
            >
              {sampleTexts[step.name] ?? sampleTexts.base}
            </div>
          </div>
        );
      })}

      {/* Add Smaller Step Button */}
      {onConfigChange && (
        <div className="flex justify-center mt-2 -mb-2 opacity-0 group-hover/specimen:opacity-100 transition-opacity z-20 relative">
          <button 
            onClick={() => onConfigChange({ minPower: (config.minPower ?? -1) - 1 })} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 shadow-sm rounded-full text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add smaller step
          </button>
        </div>
      )}

    </div>
  );
};
