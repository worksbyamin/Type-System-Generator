import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { SCALE_STEPS } from '../../constants/ratios';
import { getAllScaleSteps } from '../../utils/cssGenerator';
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





export const SpecimenView: React.FC<SpecimenViewProps> = ({
  config,
  base,
  ratio,
  isRtl = false,
  onConfigChange
}) => {
  
  const variationSettings = buildFontVariationSettings(config.variableAxesValues);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex flex-col gap-0 w-full pb-16 group/specimen"
    >

      {/* Add Larger Step Button */}
      {onConfigChange && (
        <div className="flex justify-center -mb-2 mt-2 opacity-0 group-hover/specimen:opacity-100 transition-opacity z-20 relative">
          <button 
            onClick={() => onConfigChange({ maxPower: (config.maxPower || 5) + 1 })} 
            className="flex items-center p-1.5 bg-white border border-neutral-200 shadow-sm rounded-full text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all cursor-pointer"
            title="Add larger step"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {getAllScaleSteps(config).map((step, idx, arr) => {
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
            className="pb-1.5 border-b border-neutral-100 last:border-0 flex items-baseline gap-2 sm:gap-3 group relative pt-1.5 mt-1"
          >
            {/* Inline Add Step Button (Appears on hover at the top edge, if not the first step) */}
            {onConfigChange && idx > 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button 
                  onClick={() => {
                    if (step.power >= 0) {
                      onConfigChange({ maxPower: config.maxPower + 1 });
                    } else {
                      onConfigChange({ minPower: config.minPower - 1 });
                    }
                  }}
                  className="flex items-center p-1 bg-white border border-neutral-200 shadow-sm rounded-full text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all cursor-pointer"
                  title="Add step"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
            {/* Step Name & Remove (Margin Column) */}
            <div className="w-10 sm:w-12 shrink-0 flex items-center justify-start relative h-full">
              <span className="text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-500 group-hover:opacity-0 transition-opacity uppercase text-start">
                {step.name}
              </span>
              {onConfigChange && step.power !== 0 && (
                <button 
                  onClick={() => {
                    if (step.power > 0) {
                      onConfigChange({ maxPower: config.maxPower - 1 });
                    } else if (step.power < 0) {
                      onConfigChange({ minPower: config.minPower + 1 });
                    }
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-red-500 bg-red-50 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  title="Remove this step"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Detailed Specimen Metadata (Floating on Hover) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end text-[10px] font-mono text-neutral-500 select-none opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <div className="flex items-center gap-2 bg-white backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-neutral-200">
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
              className="flex-1 min-w-0 text-neutral-900 outline-none focus:ring-1 focus:ring-neutral-400 rounded px-1 -mx-1 transition-all whitespace-nowrap overflow-hidden"
            >
              {isRtl ? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
            </div>
          </div>
        );
      })}

      {/* Add Smaller Step Button */}
      {onConfigChange && (
        <div className="flex justify-center mt-2 -mb-2 opacity-0 group-hover/specimen:opacity-100 transition-opacity z-20 relative">
          <button 
            onClick={() => onConfigChange({ minPower: (config.minPower ?? -1) - 1 })} 
            className="flex items-center p-1.5 bg-white border border-neutral-200 shadow-sm rounded-full text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-all cursor-pointer"
            title="Add smaller step"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
