import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlignVerticalSpaceAround } from 'lucide-react';
import { SCALE_STEPS } from '../../constants/ratios';
import { getActiveScaleSteps } from '../../utils/cssGenerator';
import { LanguageTypographyConfig, ScaleStepKey } from '../../types/typography';

interface LeadingTrackingCollapsibleProps {
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const LeadingTrackingCollapsible: React.FC<LeadingTrackingCollapsibleProps> = ({
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isGlobal = config.leadingMode === 'global';

  const handleModeChange = (mode: 'global' | 'individual') => {
    onChange({ leadingMode: mode, trackingMode: mode });
  };

  const handleIndividualLh = (step: ScaleStepKey, val: number) => {
    onChange({
      lhIndividual: {
        ...config.lhIndividual,
        [step]: val
      }
    });
  };

  const handleIndividualTracking = (step: ScaleStepKey, val: number) => {
    onChange({
      trackingIndividual: {
        ...config.trackingIndividual,
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
          <AlignVerticalSpaceAround className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Leading & Tracking</span>
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
              onClick={() => handleModeChange('global')}
              className={`flex-1 py-1.5 px-2 text-xs rounded font-medium transition-all ${
                isGlobal
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => handleModeChange('individual')}
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
            /* GLOBAL CONTROLS */
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                Line Height (Leading)
              </span>

              {/* Heading LH */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">Heading Line-Height</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.lhHeadingGlobal.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="1.7"
                  step="0.05"
                  value={config.lhHeadingGlobal}
                  onChange={(e) => onChange({ lhHeadingGlobal: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Body LH */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">Body Line-Height</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.lhBodyGlobal.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1.1"
                  max="2.2"
                  step="0.05"
                  value={config.lhBodyGlobal}
                  onChange={(e) => onChange({ lhBodyGlobal: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="h-px bg-black/5 dark:bg-white/5 my-1" />

              <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                Letter Spacing (Tracking)
              </span>

              {/* Heading Tracking */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">Heading Tracking</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.trackingHeadingGlobal > 0 ? `+${config.trackingHeadingGlobal.toFixed(3)}` : config.trackingHeadingGlobal.toFixed(3)}em
                  </span>
                </div>
                <input
                  type="range"
                  min="-0.05"
                  max="0.1"
                  step="0.005"
                  value={config.trackingHeadingGlobal}
                  onChange={(e) => onChange({ trackingHeadingGlobal: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Body Tracking */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-600 dark:text-neutral-300 font-medium">Body Tracking</label>
                  <span className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-[#252529] px-2 py-0.5 rounded text-[11px]">
                    {config.trackingBodyGlobal > 0 ? `+${config.trackingBodyGlobal.toFixed(3)}` : config.trackingBodyGlobal.toFixed(3)}em
                  </span>
                </div>
                <input
                  type="range"
                  min="-0.03"
                  max="0.08"
                  step="0.005"
                  value={config.trackingBodyGlobal}
                  onChange={(e) => onChange({ trackingBodyGlobal: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-[#2a2a2e] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          ) : (
            /* INDIVIDUAL CONTROLS */
            <div className="flex flex-col gap-3">
              {getActiveScaleSteps(config).map((step) => {
                const currentLh = config.lhIndividual[step.name] ?? (step.power > 0 ? 1.2 : 1.5);
                const currentTracking = config.trackingIndividual[step.name] ?? 0;

                return (
                  <div key={step.name} className="p-2.5 bg-neutral-100 dark:bg-[#202024] rounded-lg border border-black/10 dark:border-white/5 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white uppercase">
                        {step.label} ({step.tag})
                      </span>
                    </div>

                    {/* Step Line Height */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
                        <span>Line Height</span>
                        <span className="font-mono text-neutral-200">{currentLh.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.9"
                        max="2.2"
                        step="0.05"
                        value={currentLh}
                        onChange={(e) => handleIndividualLh(step.name, parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-300 dark:bg-[#2e2e33] rounded appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Step Tracking */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
                        <span>Tracking</span>
                        <span className="font-mono text-neutral-200">
                          {currentTracking > 0 ? `+${currentTracking.toFixed(3)}` : currentTracking.toFixed(3)}em
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-0.05"
                        max="0.1"
                        step="0.005"
                        value={currentTracking}
                        onChange={(e) => handleIndividualTracking(step.name, parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-300 dark:bg-[#2e2e33] rounded appearance-none cursor-pointer"
                      />
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
