import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Sliders } from 'lucide-react';
import { PREDEFINED_RATIOS } from '../../constants/ratios';
import { LanguageTypographyConfig } from '../../types/typography';

interface ModularScaleCollapsibleProps {
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const ModularScaleCollapsible: React.FC<ModularScaleCollapsibleProps> = ({
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const dtRatio = PREDEFINED_RATIOS[config.dtRatioIdx] || PREDEFINED_RATIOS[3];
  const mbRatio = PREDEFINED_RATIOS[config.mbRatioIdx] || PREDEFINED_RATIOS[1];

  return (
    <div className="bg-white dark:bg-[#1c1c1f] rounded-xl border border-black/10 dark:border-white/5 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Modular Scale Ratios</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-4 border-t border-black/10 dark:border-white/5 bg-neutral-50 dark:bg-[#17171a]/50">
          {/* DESKTOP SCALE */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
              Desktop Scale
            </span>

            {/* Desktop Base */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="text-neutral-600 dark:text-neutral-300 font-medium">Desktop Base</label>
                <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                  {config.dtBase}px
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="32"
                value={config.dtBase}
                onChange={(e) => onChange({ dtBase: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Desktop Ratio */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="text-neutral-600 dark:text-neutral-300 font-medium">Desktop Ratio</label>
                <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                  {dtRatio.value.toFixed(3)} ({dtRatio.name})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={PREDEFINED_RATIOS.length - 1}
                step="1"
                value={config.dtRatioIdx}
                onChange={(e) => onChange({ dtRatioIdx: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="h-px bg-black/5 dark:bg-white/5 my-1" />

          {/* MOBILE SCALE */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                Mobile Scale
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.mbScaleEnabled}
                  onChange={(e) => onChange({ mbScaleEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-8 h-4.5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black" />
              </label>
            </div>

            {config.mbScaleEnabled ? (
              <>
                {/* Mobile Base */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-neutral-600 dark:text-neutral-300 font-medium">Mobile Base</label>
                    <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                      {config.mbBase}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="28"
                    value={config.mbBase}
                    onChange={(e) => onChange({ mbBase: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Mobile Ratio */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-neutral-600 dark:text-neutral-300 font-medium">Mobile Ratio</label>
                    <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                      {mbRatio.value.toFixed(3)} ({mbRatio.name})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={PREDEFINED_RATIOS.length - 1}
                    step="1"
                    value={config.mbRatioIdx}
                    onChange={(e) => onChange({ mbRatioIdx: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <p className="text-[11px] text-neutral-600 italic">
                Inheriting desktop base & scale ratio.
              </p>
            )}
          </div>
          
          <div className="h-px bg-black/5 dark:bg-white/5 my-1" />

          {/* EXTENDED SCALE */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
              Extended Steps
            </span>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">Include Display (Above H1)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.hasDisplay}
                    onChange={(e) => onChange({ hasDisplay: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black" />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">Include X-Small (Below Small)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.hasXSmall}
                    onChange={(e) => onChange({ hasXSmall: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
