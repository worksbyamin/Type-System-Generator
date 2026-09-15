import React from 'react';
import { AppConfig, LanguageTypographyConfig } from '../../types/typography';
import { SidebarHeader } from './SidebarHeader';
import { LanguageTabs } from './LanguageTabs';
import { TypographyCollapsible } from './TypographyCollapsible';
import { ModularScaleCollapsible } from './ModularScaleCollapsible';
import { LeadingTrackingCollapsible } from './LeadingTrackingCollapsible';
import { FontWeightsCollapsible } from './FontWeightsCollapsible';
import { VariableFontCollapsible } from './VariableFontCollapsible';
import { StylingOverridesCollapsible } from './StylingOverridesCollapsible';
import { GeneratedCodeCollapsible } from './GeneratedCodeCollapsible';
import { Languages } from 'lucide-react';

interface SidebarProps {
  appConfig: AppConfig;
  onUpdateAppConfig: (partial: Partial<AppConfig>) => void;
  onUpdateLangConfig: (
    lang: 'en' | 'fa',
    partial: Partial<LanguageTypographyConfig>
  ) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  appConfig,
  onUpdateAppConfig,
  onUpdateLangConfig
}) => {
  const { sidebarCollapsed, activeLang, farsiEnabled } = appConfig;
  const currentLangConfig = appConfig[activeLang];

  const handleLangConfigChange = (
    partial: Partial<LanguageTypographyConfig>
  ) => {
    onUpdateLangConfig(activeLang, partial);
  };

  const showFarsiOffState =
    activeLang === 'fa' && !farsiEnabled;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
        onClick={() => onUpdateAppConfig({ sidebarCollapsed: true })}
      />

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full bg-[#131315] border-r border-white/10 flex flex-col z-50 md:z-20
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0 shadow-2xl md:shadow-none
          ${sidebarCollapsed 
            ? '-translate-x-full md:translate-x-0 w-[85vw] sm:w-[360px] md:w-16' 
            : 'translate-x-0 w-[85vw] sm:w-[360px] md:w-[360px] lg:w-[380px]'
          }
        `}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Desktop Collapsed View */}
          <div
            className={`absolute inset-0 w-16 flex flex-col items-center transition-opacity duration-200 ${
              sidebarCollapsed ? 'opacity-100 delay-150 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <div className="hidden md:flex flex-col w-full h-full">
              <SidebarHeader
                collapsed={true}
                onToggleCollapse={() =>
                  onUpdateAppConfig({ sidebarCollapsed: false })
                }
              />
            </div>
          </div>

          {/* Expanded View */}
          <div
            className={`absolute top-0 left-0 h-full w-[85vw] sm:w-[360px] md:w-[360px] lg:w-[380px] flex flex-col transition-opacity duration-200 ${
              sidebarCollapsed ? 'opacity-0 pointer-events-none z-0' : 'opacity-100 delay-150 z-10'
            }`}
          >
            {/* Header */}
            <div className="shrink-0">
              <SidebarHeader
                collapsed={false}
                onToggleCollapse={() =>
                  onUpdateAppConfig({ sidebarCollapsed: true })
                }
              />
            </div>

            {/* Language tabs */}
            <div className="shrink-0">
              <LanguageTabs
                activeLang={activeLang}
                farsiEnabled={farsiEnabled}
                onSelectLang={(lang) =>
                  onUpdateAppConfig({ activeLang: lang })
                }
                onToggleFarsi={(enabled) =>
                  onUpdateAppConfig({ farsiEnabled: enabled })
                }
              />
            </div>

            {/* Actual scrolling viewport */}
            <div className="sidebar-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <div className="p-3 sm:p-3.5 flex flex-col gap-3">
          {showFarsiOffState ? (
            <div className="p-5 rounded-xl bg-[#1c1c1f] border border-white/5 flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Languages className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Farsi (RTL) Disabled
                </h3>

                <p className="text-xs text-neutral-400 mt-1">
                  Enable Farsi in the toggle above to configure bilingual
                  Arabic / Persian modular scales, fonts, and tracking.
                </p>
              </div>

              <button
                onClick={() =>
                  onUpdateAppConfig({ farsiEnabled: true })
                }
                className="
                  px-4
                  py-2
                  bg-white
                  text-black
                  text-xs
                  font-semibold
                  rounded-lg
                  hover:bg-neutral-200
                  transition-colors
                "
              >
                Enable Farsi Now
              </button>
            </div>
          ) : (
            <>
              <div className="shrink-0">
                <TypographyCollapsible
                  lang={activeLang}
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <ModularScaleCollapsible
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <LeadingTrackingCollapsible
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <FontWeightsCollapsible
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <VariableFontCollapsible
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <StylingOverridesCollapsible
                  config={currentLangConfig}
                  onChange={handleLangConfigChange}
                />
              </div>

              <div className="shrink-0">
                <GeneratedCodeCollapsible
                  appConfig={appConfig}
                  onChangeFormat={(fmt) =>
                    onUpdateAppConfig({ exportFormat: fmt })
                  }
                />
              </div>
            </>
          )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};