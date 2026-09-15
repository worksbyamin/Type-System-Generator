import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Type, Search } from 'lucide-react';
import { FALLBACK_SYSTEM_FONTS } from '../../constants/ratios';
import { ALL_GOOGLE_FONTS } from '../../constants/googleFonts';
import { LanguageTypographyConfig } from '../../types/typography';
import { loadGoogleFont, queryLocalSystemFonts } from '../../utils/fontLoader';

interface TypographyCollapsibleProps {
  lang: 'en' | 'fa';
  config: LanguageTypographyConfig;
  onChange: (updated: Partial<LanguageTypographyConfig>) => void;
}

export const TypographyCollapsible: React.FC<TypographyCollapsibleProps> = ({
  lang,
  config,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [localFonts, setLocalFonts] = useState<string[]>(FALLBACK_SYSTEM_FONTS);
  const [headingSearch, setHeadingSearch] = useState('');
  const [bodySearch, setBodySearch] = useState('');
  const [localFontsError, setLocalFontsError] = useState<string | null>(null);

  const fontList = ALL_GOOGLE_FONTS;

  // Load current fonts into document head
  useEffect(() => {
    if (config.fontHeading) loadGoogleFont(config.fontHeading);
    if (config.fontBody) loadGoogleFont(config.fontBody);
  }, [config.fontHeading, config.fontBody]);

  // Request local fonts if available
  const handleQueryLocalFonts = async () => {
    const result = await queryLocalSystemFonts();
    if (result.fonts.length > 0) {
      setLocalFonts(result.fonts);
      setLocalFontsError(null);
    } else if (result.error) {
      setLocalFontsError(result.error);
    }
  };

  const handleHeadingFontChange = (font: string) => {
    loadGoogleFont(font);
    if (config.linkBodyToHeading) {
      onChange({ fontHeading: font, fontBody: font });
    } else {
      onChange({ fontHeading: font });
    }
  };

  const handleBodyFontChange = (font: string) => {
    loadGoogleFont(font);
    onChange({ fontBody: font });
  };

  const handleToggleLinkBody = (checked: boolean) => {
    if (checked) {
      // Re-link body to heading font
      onChange({ linkBodyToHeading: true, fontBody: config.fontHeading });
    } else {
      // Unlock body font for independent choice
      onChange({ linkBodyToHeading: false });
    }
  };

  const filteredHeadingFonts = headingSearch.trim()
    ? fontList.filter((f) => f.toLowerCase().includes(headingSearch.toLowerCase()))
    : fontList;

  const filteredBodyFonts = bodySearch.trim()
    ? fontList.filter((f) => f.toLowerCase().includes(bodySearch.toLowerCase()))
    : fontList;

  return (
    <div className="bg-white dark:bg-[#1c1c1f] rounded-xl border border-black/10 dark:border-white/5 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-neutral-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Typography & Fonts</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-4 border-t border-black/10 dark:border-white/5 bg-neutral-50 dark:bg-[#17171a]/50">
          {/* Two-way Link Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-neutral-100 dark:bg-[#1f1f23] rounded-lg border border-black/10 dark:border-white/5">
            <span className="text-xs font-medium text-neutral-900 dark:text-neutral-200">
              Use Heading Font for Body
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.linkBodyToHeading}
                onChange={(e) => handleToggleLinkBody(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4.5 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-black peer-checked:after:bg-white dark:peer-checked:bg-white dark:peer-checked:after:bg-black" />
            </label>
          </div>

          {/* HEADING FONT SECTION */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                Heading Font
              </label>
              <div className="flex bg-neutral-200 dark:bg-[#252529] p-0.5 rounded-md text-[11px]">
                <button
                  onClick={() => onChange({ fontHeadingSource: 'google' })}
                  className={`px-2 py-0.5 rounded ${
                    config.fontHeadingSource === 'google'
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Google
                </button>
                <button
                  onClick={() => {
                    onChange({ fontHeadingSource: 'system' });
                    handleQueryLocalFonts();
                  }}
                  className={`px-2 py-0.5 rounded ${
                    config.fontHeadingSource === 'system'
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Local
                </button>
              </div>
            </div>

            {config.fontHeadingSource === 'google' ? (
              <div className="flex flex-col gap-1.5">
                {/* Custom Google Font Search / Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Google Fonts..."
                    value={headingSearch}
                    onChange={(e) => setHeadingSearch(e.target.value)}
                    className="w-full bg-white dark:bg-[#1c1c20] border border-black/10 dark:border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                  <Search className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
                </div>
                <select
                  value={config.fontHeading}
                  onChange={(e) => handleHeadingFontChange(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-[#202024] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white outline-none focus:border-black/40 dark:focus:border-white/40 cursor-pointer"
                >
                  {filteredHeadingFonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                  {!fontList.includes(config.fontHeading) && (
                    <option value={config.fontHeading}>{config.fontHeading} (Custom)</option>
                  )}
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <select
                  value={config.fontHeading}
                  onChange={(e) => handleHeadingFontChange(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-[#202024] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white outline-none focus:border-black/40 dark:focus:border-white/40 cursor-pointer"
                >
                  {localFonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                {localFontsError && (
                  <p className="text-[10px] text-red-400 mt-1 leading-relaxed">
                    {localFontsError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* BODY FONT SECTION */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                Body Font {config.linkBodyToHeading && <span className="text-neutral-600">(Linked)</span>}
              </label>
              <div className="flex bg-neutral-200 dark:bg-[#252529] p-0.5 rounded-md text-[11px]">
                <button
                  disabled={config.linkBodyToHeading}
                  onClick={() => onChange({ fontBodySource: 'google' })}
                  className={`px-2 py-0.5 rounded ${
                    config.fontBodySource === 'google'
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-40'
                  }`}
                >
                  Google
                </button>
                <button
                  disabled={config.linkBodyToHeading}
                  onClick={() => {
                    onChange({ fontBodySource: 'system' });
                    handleQueryLocalFonts();
                  }}
                  className={`px-2 py-0.5 rounded ${
                    config.fontBodySource === 'system'
                      ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white dark:text-white font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-40'
                  }`}
                >
                  Local
                </button>
              </div>
            </div>

            {config.fontBodySource === 'google' ? (
              <div className="flex flex-col gap-1.5">
                {!config.linkBodyToHeading && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Google Fonts..."
                      value={bodySearch}
                      onChange={(e) => setBodySearch(e.target.value)}
                      className="w-full bg-white dark:bg-[#1c1c20] border border-black/10 dark:border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    <Search className="w-3.5 h-3.5 text-neutral-600 absolute left-2.5 top-2.5" />
                  </div>
                )}
                <select
                  disabled={config.linkBodyToHeading}
                  value={config.fontBody}
                  onChange={(e) => handleBodyFontChange(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-[#202024] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white outline-none focus:border-black/40 dark:focus:border-white/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {filteredBodyFonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                  {!fontList.includes(config.fontBody) && (
                    <option value={config.fontBody}>{config.fontBody} (Custom)</option>
                  )}
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <select
                  disabled={config.linkBodyToHeading}
                  value={config.fontBody}
                  onChange={(e) => handleBodyFontChange(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-[#202024] border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white outline-none focus:border-black/40 dark:focus:border-white/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {localFonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                {localFontsError && (
                  <p className="text-[10px] text-red-400 mt-1 leading-relaxed">
                    {localFontsError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
