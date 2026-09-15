import React, { useState } from 'react';
import { ChevronDown, ChevronRight, PenTool } from 'lucide-react';
import { SCALE_STEPS } from '../../constants/ratios';
import { getActiveScaleSteps } from '../../utils/cssGenerator';
import { LanguageTypographyConfig, ScaleStepKey, TextDecorationSetting } from '../../types/typography';

interface StylingOverridesCollapsibleProps {
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const StylingOverridesCollapsible: React.FC<StylingOverridesCollapsibleProps> = ({
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateStep = (step: ScaleStepKey, partial: Partial<TextDecorationSetting>) => {
    onChange({
      decorations: {
        ...config.decorations,
        [step]: {
          ...(config.decorations[step] || { transform: 'none', decoration: 'none' }),
          ...partial
        }
      }
    });
  };

  return (
    <div className="bg-[#1c1c1f] rounded-xl border border-white/5 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-white hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-white" />
          <span>Styling Overrides</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-4 border-t border-white/5 bg-[#17171a]/50">
          <div className="flex items-center justify-between p-2.5 bg-[#1f1f23] rounded-lg border border-white/5">
            <span className="text-xs font-medium text-neutral-200">
              Enable Styling Overrides
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.decorActive}
                onChange={(e) => onChange({ decorActive: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-8 h-4.5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black" />
            </label>
          </div>

          {config.decorActive && (
            <div className="flex flex-col gap-2.5">
              {getActiveScaleSteps(config).map((step) => {
                const setting = config.decorations[step.name] || {
                  transform: 'none',
                  decoration: 'none'
                };

                return (
                  <div
                    key={step.name}
                    className="p-2.5 bg-[#202024] rounded-lg border border-white/5 flex flex-col gap-2"
                  >
                    <span className="text-xs font-semibold text-white uppercase">
                      {step.label} ({step.tag})
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-neutral-400 uppercase">
                          Transform
                        </label>
                        <select
                          value={setting.transform}
                          onChange={(e) =>
                            handleUpdateStep(step.name, {
                              transform: e.target.value as TextDecorationSetting['transform']
                            })
                          }
                          className="bg-[#18181b] border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-white/30"
                        >
                          <option value="none">None</option>
                          <option value="uppercase">Uppercase</option>
                          <option value="lowercase">Lowercase</option>
                          <option value="capitalize">Capitalize</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-medium text-neutral-400 uppercase">
                          Decoration
                        </label>
                        <select
                          value={setting.decoration}
                          onChange={(e) =>
                            handleUpdateStep(step.name, {
                              decoration: e.target.value as TextDecorationSetting['decoration']
                            })
                          }
                          className="bg-[#18181b] border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-white/30"
                        >
                          <option value="none">None</option>
                          <option value="underline">Underline</option>
                          <option value="line-through">Line-through</option>
                        </select>
                      </div>
                    </div>
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
