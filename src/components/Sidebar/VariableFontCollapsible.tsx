import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { detectVariableFontAxes } from '../../utils/fontLoader';
import { LanguageTypographyConfig } from '../../types/typography';

interface VariableFontCollapsibleProps {
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const VariableFontCollapsible: React.FC<VariableFontCollapsibleProps> = ({
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Detect variable axes for heading font
  const headingAxes = detectVariableFontAxes(config.fontHeading).filter(a => a.tag !== 'wght');
  // Detect variable axes for body font if different
  const bodyAxes = config.linkBodyToHeading
    ? []
    : detectVariableFontAxes(config.fontBody).filter(a => a.tag !== 'wght');

  const hasVariableFont = headingAxes.length > 0 || bodyAxes.length > 0;

  const handleAxisChange = (tag: string, val: number) => {
    onChange({
      variableAxesValues: {
        ...config.variableAxesValues,
        [tag]: val
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
          <Activity className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Variable Font Axes</span>
          {hasVariableFont && (
            <span className="text-[10px] bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-neutral-200 px-1.5 py-0.2 rounded font-mono">
              Active
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-4 border-t border-black/10 dark:border-white/5 bg-neutral-50 dark:bg-[#17171a]/50">
          {hasVariableFont ? (
            <div className="flex flex-col gap-4">
              {/* Heading Variable Axes */}
              {headingAxes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {config.fontHeading} Axes
                  </span>
                  {headingAxes.map((axis) => {
                    const currentVal = config.variableAxesValues[axis.tag] ?? axis.defaultVal;
                    return (
                      <div key={axis.tag} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-neutral-600 dark:text-neutral-300 font-medium">
                            {axis.name} ({axis.tag})
                          </label>
                          <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                            {currentVal}
                            {axis.unit ?? ''}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={axis.min}
                          max={axis.max}
                          step={axis.step}
                          value={currentVal}
                          onChange={(e) =>
                            handleAxisChange(axis.tag, parseFloat(e.target.value))
                          }
                          className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Body Variable Axes (if distinct) */}
              {bodyAxes.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-black/10 dark:border-white/5 pt-3">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {config.fontBody} (Body) Axes
                  </span>
                  {bodyAxes.map((axis) => {
                    const currentVal = config.variableAxesValues[axis.tag] ?? axis.defaultVal;
                    return (
                      <div key={axis.tag} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-neutral-600 dark:text-neutral-300 font-medium">
                            {axis.name} ({axis.tag})
                          </label>
                          <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                            {currentVal}
                            {axis.unit ?? ''}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={axis.min}
                          max={axis.max}
                          step={axis.step}
                          value={currentVal}
                          onChange={(e) =>
                            handleAxisChange(axis.tag, parseFloat(e.target.value))
                          }
                          className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <p>
                The selected font (<strong className="text-neutral-900 dark:text-white">{config.fontHeading}</strong>) does not declare custom variable axes.
              </p>
              <div className="p-2.5 bg-neutral-100 dark:bg-[#202024] rounded-lg border border-black/10 dark:border-white/5 flex flex-col gap-1.5">
                <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">
                  Try a variable font:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Inter', 'Roboto Flex', 'Vazirmatn', 'Plus Jakarta Sans', 'DM Sans'].map(
                    (vf) => (
                      <button
                        key={vf}
                        onClick={() =>
                          onChange({
                            fontHeading: vf,
                            fontBody: config.linkBodyToHeading ? vf : config.fontBody
                          })
                        }
                        className="px-2 py-1 bg-black/10 dark:bg-white/10 hover:bg-white text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:text-white rounded text-[11px] transition-colors"
                      >
                        {vf}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
