import React, { useState, useEffect } from 'react';
import { AppConfig, LanguageTypographyConfig } from './types/typography';
import { DEFAULT_EN_CONFIG, DEFAULT_FA_CONFIG } from './constants/ratios';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Workspace } from './components/Workspace/Workspace';
import { loadGoogleFont } from './utils/fontLoader';
import { Loader2 } from 'lucide-react';

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


  const [fontLoading, setFontLoading] = useState(false);

  useEffect(() => {
    let loadingCount = 0;
    const handleFontLoading = (e: any) => {
      if (e.detail.isLoading) {
        loadingCount++;
        setFontLoading(true);
      } else {
        loadingCount = Math.max(0, loadingCount - 1);
        if (loadingCount === 0) setFontLoading(false);
      }
    };
    window.addEventListener('font-loading', handleFontLoading);
    return () => window.removeEventListener('font-loading', handleFontLoading);
  }, []);

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
    setAppConfig((prev) => {
      const next = { ...prev, ...partial };
      // Sync maxPower and minPower across both configs to ensure H and P counts match
      if (partial.en && partial.en.maxPower !== undefined) next.fa.maxPower = partial.en.maxPower;
      if (partial.en && partial.en.minPower !== undefined) next.fa.minPower = partial.en.minPower;
      if (partial.fa && partial.fa.maxPower !== undefined) next.en.maxPower = partial.fa.maxPower;
      if (partial.fa && partial.fa.minPower !== undefined) next.en.minPower = partial.fa.minPower;
      return next;
    });
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

      const next = {
        ...prev,
        [lang]: updatedLangConfig
      };
      
      // Sync maxPower and minPower across both configs to ensure H and P counts match
      if (partial.maxPower !== undefined) {
        next.en.maxPower = partial.maxPower;
        next.fa.maxPower = partial.maxPower;
      }
      if (partial.minPower !== undefined) {
        next.en.minPower = partial.minPower;
        next.fa.minPower = partial.minPower;
      }

      return next;
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
      
      {fontLoading && (
        <div className="fixed bottom-4 right-4 bg-neutral-900 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-3 text-sm font-medium z-50 animate-in fade-in slide-in-from-bottom-4">
          <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
          Loading Google Font...
        </div>
      )}

    </div>
  );
}