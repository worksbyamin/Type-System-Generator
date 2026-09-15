import React from 'react';
import { Columns2, Monitor, Smartphone, PanelLeftOpen, Menu, Type } from 'lucide-react';
import { AppConfig } from '../../types/typography';

interface WorkspaceToolbarProps {
  appConfig: AppConfig;
  onUpdateAppConfig: (partial: Partial<AppConfig>) => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({
  appConfig,
  onUpdateAppConfig
}) => {
  const { previewMode, viewLayout, simScenario, sidebarCollapsed } = appConfig;

  return (
    <div className="min-h-14 py-2 px-3 sm:px-4 md:px-6 bg-[#131315]/90 backdrop-blur border-b border-white/10 flex flex-wrap items-center justify-between shrink-0 gap-2 sm:gap-3">
      {/* LEFT: Mode Toggle (Type vs Simulation) & Sidebar Restore Button */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Toggle & Logo */}
        <div className="flex md:hidden items-center gap-2 pr-3 border-r border-white/10 mr-1">
          <button
            onClick={() => onUpdateAppConfig({ sidebarCollapsed: false })}
            className="p-1.5 -ml-1 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Open Menu"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shrink-0">
              <Type className="w-4 h-4" />
            </div>
          </div>
        </div>



        <div className="flex bg-[#232326] p-1 rounded-xl gap-1">
          <button
            onClick={() => onUpdateAppConfig({ previewMode: 'type' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              previewMode === 'type'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Type Specimen
          </button>
          <button
            onClick={() => onUpdateAppConfig({ previewMode: 'simulation' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              previewMode === 'simulation'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Simulation
          </button>
        </div>
      </div>

      {/* CENTER: Scenario Toggles (Landing Page vs Blog Article) */}
      <div className="flex justify-center order-3 sm:order-2 w-full sm:w-auto">
        {previewMode === 'simulation' && (
          <div className="flex bg-[#232326] p-1 rounded-xl gap-1 shadow-sm">
            <button
              onClick={() => onUpdateAppConfig({ simScenario: 'landing' })}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                simScenario === 'landing'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Landing Page
            </button>
            <button
              onClick={() => onUpdateAppConfig({ simScenario: 'blog' })}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                simScenario === 'blog'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Blog Article
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: View Layout Toggles (Split / Desktop / Mobile) */}
      <div className="hidden md:flex items-center gap-1.5 order-2 sm:order-3">
        <div className="flex bg-[#232326] p-1 rounded-xl gap-1">
          <button
            onClick={() => onUpdateAppConfig({ viewLayout: 'split' })}
            title="Split View (Desktop + Mobile)"
            aria-label="Split View"
            className={`p-1.5 rounded-lg text-xs transition-all flex items-center justify-center ${
              viewLayout === 'split'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Columns2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onUpdateAppConfig({ viewLayout: 'desktop' })}
            title="Desktop Only"
            aria-label="Desktop Only"
            className={`p-1.5 rounded-lg text-xs transition-all flex items-center justify-center ${
              viewLayout === 'desktop'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>

          <button
            onClick={() => onUpdateAppConfig({ viewLayout: 'mobile' })}
            title="Mobile Only"
            aria-label="Mobile Only"
            className={`p-1.5 rounded-lg text-xs transition-all flex items-center justify-center ${
              viewLayout === 'mobile'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
