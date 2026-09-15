import React, { useState, useEffect } from 'react';
import { AppConfig, LanguageTypographyConfig } from './types/typography';
import { DEFAULT_EN_CONFIG, DEFAULT_FA_CONFIG } from './constants/ratios';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Workspace } from './components/Workspace/Workspace';
import { loadGoogleFont } from './utils/fontLoader';

export default function App() {
  const [appConfig, setAppConfig] = useState<AppConfig>({
    activeLang: 'en',
    farsiEnabled: false,
    previewMode: 'type',
    viewLayout: 'split',
    simScenario: 'landing',
    exportFormat: 'css',
    uiTheme: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    sidebarCollapsed: false,
    en: DEFAULT_EN_CONFIG,
    fa: DEFAULT_FA_CONFIG
  });

  useEffect(() => {
    loadGoogleFont(appConfig.en.fontHeading);
    loadGoogleFont(appConfig.en.fontBody);
    loadGoogleFont(appConfig.fa.fontHeading);
    loadGoogleFont(appConfig.fa.fontBody);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAppConfig((prev) => ({
          ...prev,
          viewLayout: 'mobile',
          sidebarCollapsed: true
        }));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleUpdateAppConfig = (partial: Partial<AppConfig>) => {
    setAppConfig((prev) => ({
      ...prev,
      ...partial
    }));
  };

  const handleUpdateLangConfig = (
    lang: 'en' | 'fa',
    partial: Partial<LanguageTypographyConfig>
  ) => {
    setAppConfig((prev) => {
      const currentLangConfig = prev[lang];

      const updatedLangConfig = {
        ...currentLangConfig,
        ...partial
      };

      let updatedFaConfig = prev.fa;

      if (lang === 'en' && prev.fa.linkScaleToEn) {
        updatedFaConfig = {
          ...prev.fa,
          dtBase: updatedLangConfig.dtBase,
          dtRatioIdx: updatedLangConfig.dtRatioIdx,
          mbBase: updatedLangConfig.mbBase,
          mbRatioIdx: updatedLangConfig.mbRatioIdx,
          mbScaleEnabled: updatedLangConfig.mbScaleEnabled
        };
      }

      return {
        ...prev,
        [lang]: updatedLangConfig,
        ...(lang === 'en' ? { fa: updatedFaConfig } : {})
      };
    });
  };

  useEffect(() => {
    if (appConfig.uiTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appConfig.uiTheme]);

  return (
    <div
      className="
        w-full
        h-full
        min-h-0
        max-h-screen
        flex
        flex-row
        overflow-hidden
        bg-white dark:bg-[#0e0e10]
        text-neutral-900 dark:text-[#f2f2f4]
        transition-colors
      "
    >
      <Sidebar
        appConfig={appConfig}
        onUpdateAppConfig={handleUpdateAppConfig}
        onUpdateLangConfig={handleUpdateLangConfig}
      />

      <Workspace
        appConfig={appConfig}
        onUpdateAppConfig={handleUpdateAppConfig}
      />
    </div>
  );
}