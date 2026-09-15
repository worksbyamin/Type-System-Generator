import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageTabsProps {
  activeLang: 'en' | 'fa';
  farsiEnabled: boolean;
  onSelectLang: (lang: 'en' | 'fa') => void;
  onToggleFarsi: (enabled: boolean) => void;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({
  activeLang,
  farsiEnabled,
  onSelectLang,
  onToggleFarsi
}) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-[#17171a] border-b border-white/5 shrink-0">
      <div className="flex bg-[#232326] p-1 rounded-xl gap-1">
        <button
          onClick={() => onSelectLang('en')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeLang === 'en'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>English</span>
        </button>

        <button
          onClick={() => onSelectLang('fa')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
            activeLang === 'fa'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>Farsi (RTL)</span>
          {!farsiEnabled && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400">
              Off
            </span>
          )}
        </button>
      </div>

      {/* When on Farsi tab, show master enable toggle if not enabled */}
      {activeLang === 'fa' && (
        <div className="flex items-center justify-between px-3 py-2 bg-[#1c1c1f] rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <Languages className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs font-medium text-white">Enable Farsi (RTL)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={farsiEnabled}
              onChange={(e) => onToggleFarsi(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4.5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white peer-checked:after:bg-black" />
          </label>
        </div>
      )}
    </div>
  );
};
