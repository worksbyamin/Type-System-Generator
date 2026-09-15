import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Bold } from 'lucide-react';
import { SCALE_STEPS } from '../../constants/ratios';
import { getActiveScaleSteps } from '../../utils/cssGenerator';
import { LanguageTypographyConfig, ScaleStepKey } from '../../types/typography';

interface FontWeightsCollapsibleProps {
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const FontWeightsCollapsible: React.FC<FontWeightsCollapsibleProps> = ({
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isGlobal = config.weightMode === 'global';

  const handleIndWeight = (step: ScaleStepKey, val: number) => {
    onChange({
      indWeights: {
        ...config.indWeights,
        [step]: val
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1f] rounded-xl border border-black/10 dark:border-white/5 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <Bold className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Font Weights & Hierarchy</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-4 border-t border-black/10 dark:border-white/5 bg-neutral-50 dark:bg-[#17171a]/50">
          {/* Mode Switcher */}
          <div className="flex bg-neutral-200 dark:bg-[#232326] p-1 rounded-lg gap-1">
            <button
              onClick={() => onChange({ weightMode: 'global' })}
              className={`flex-1 py-1.5 px-2 text-xs rounded font-medium transition-all ${
                isGlobal
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Global Curve
            </button>
            <button
              onClick={() => onChange({ weightMode: 'individual' })}
              className={`flex-1 py-1.5 px-2 text-xs rounded font-medium transition-all ${
                !isGlobal
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Individual
            </button>
          </div>

          {isGlobal ? (
            <div className="flex flex-col gap-3">
              {/* H1 Max */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">H1 Max Weight</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.h1MaxWeight}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={config.h1MaxWeight}
                  onChange={(e) => onChange({ h1MaxWeight: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* H5 Min */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">H5 Min Weight</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.h5MinWeight}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={config.h5MinWeight}
                  onChange={(e) => onChange({ h5MinWeight: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Body Weight */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">Body / Small Weight</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.globalBodyWeight}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="100"
                  value={config.globalBodyWeight}
                  onChange={(e) => onChange({ globalBodyWeight: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {getActiveScaleSteps(config).map((step) => {
                const w = config.indWeights[step.name] ?? 400;
                return (
                  <div key={step.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-neutral-600 dark:text-neutral-300 uppercase font-medium">
                        {step.label} ({step.tag})
                      </label>
                      <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                        {w}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="900"
                      step="100"
                      value={w}
                      onChange={(e) => handleIndWeight(step.name, parseInt(e.target.value, 10))}
                      className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
