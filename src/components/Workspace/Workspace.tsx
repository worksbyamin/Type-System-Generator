import React from 'react';
import { AppConfig } from '../../types/typography';
import { PREDEFINED_RATIOS } from '../../constants/ratios';
import { WorkspaceToolbar } from './WorkspaceToolbar';
import { ViewportCard } from './ViewportCard';
import { SpecimenView } from './SpecimenView';
import { SimulationLanding } from './SimulationLanding';
import { SimulationBlog } from './SimulationBlog';

interface WorkspaceProps {
  appConfig: AppConfig;
  onUpdateAppConfig: (partial: Partial<AppConfig>) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  appConfig,
  onUpdateAppConfig
}) => {
  const { previewMode, viewLayout, simScenario, activeLang, farsiEnabled } = appConfig;

  // Active language configuration
  const isFa = activeLang === 'fa' && farsiEnabled;
  const langConfig = isFa ? appConfig.fa : appConfig.en;

  const dtRatio = PREDEFINED_RATIOS[langConfig.dtRatioIdx]?.value ?? 1.25;
  const mbRatio = langConfig.mbScaleEnabled
    ? PREDEFINED_RATIOS[langConfig.mbRatioIdx]?.value ?? 1.125
    : dtRatio;
  const mbBase = langConfig.mbScaleEnabled ? langConfig.mbBase : langConfig.dtBase;

  const showDesktop = viewLayout === 'split' || viewLayout === 'desktop';
  const showMobile = viewLayout === 'split' || viewLayout === 'mobile';

  return (
    <main className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-[#0e0e10]">
      {/* Workspace Toolbar */}
      <WorkspaceToolbar
        appConfig={appConfig}
        onUpdateAppConfig={onUpdateAppConfig}
      />

      {/* Main Preview Work Area - Has its own independent scroll container with responsive flex direction */}
      <div className="workspace-scroll flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 flex flex-col xl:flex-row items-stretch xl:items-stretch justify-start xl:justify-center gap-6 min-h-0">
        {previewMode === 'type' ? (
          <>
            {/* Desktop Specimen Viewport */}
            {showDesktop && (
              <div className="hidden md:flex w-full xl:flex-1 xl:min-w-0">
                <ViewportCard
                  type="desktop"
                  title={`${isFa ? 'FARSI' : 'ENGLISH'} DESKTOP SPECIMEN`}
                  badge={`${langConfig.dtBase}px / ${dtRatio.toFixed(3)}`}
                >
                  <SpecimenView
                    config={langConfig}
                    base={langConfig.dtBase}
                    ratio={dtRatio}
                    isRtl={isFa}
                    onConfigChange={(updated) => onUpdateAppConfig({ [isFa ? 'fa' : 'en']: { ...langConfig, ...updated } })}
                  />
                </ViewportCard>
              </div>
            )}

            {/* Mobile Specimen Viewport */}
            {showMobile && (
              <div className="flex w-full md:w-auto xl:shrink-0 justify-center">
                <ViewportCard
                  type="mobile"
                  title={`${isFa ? 'FARSI' : 'ENGLISH'} MOBILE SPECIMEN`}
                  badge={`${mbBase}px / ${mbRatio.toFixed(3)}`}
                >
                  <SpecimenView
                    config={langConfig}
                    base={mbBase}
                    ratio={mbRatio}
                    isRtl={isFa}
                    onConfigChange={(updated) => onUpdateAppConfig({ [isFa ? 'fa' : 'en']: { ...langConfig, ...updated } })}
                  />
                </ViewportCard>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Desktop Simulation Viewport */}
            {showDesktop && (
              <div className="hidden md:flex w-full xl:flex-1 xl:min-w-0">
                <ViewportCard
                  type="desktop"
                  title={`${isFa ? 'FARSI' : 'ENGLISH'} DESKTOP SIMULATION`}
                  badge={simScenario === 'landing' ? 'LANDING' : 'EDITORIAL'}
                >
                  {simScenario === 'landing' ? (
                    <SimulationLanding
                      config={langConfig}
                      base={langConfig.dtBase}
                      ratio={dtRatio}
                      isRtl={isFa}
                    />
                  ) : (
                    <SimulationBlog
                      config={langConfig}
                      base={langConfig.dtBase}
                      ratio={dtRatio}
                      isRtl={isFa}
                    />
                  )}
                </ViewportCard>
              </div>
            )}

            {/* Mobile Simulation Viewport */}
            {showMobile && (
              <div className="flex w-full md:w-auto xl:shrink-0 justify-center">
                <ViewportCard
                  type="mobile"
                  title={`${isFa ? 'FARSI' : 'ENGLISH'} MOBILE SIMULATION`}
                  badge={simScenario === 'landing' ? 'LANDING' : 'EDITORIAL'}
                >
                  {simScenario === 'landing' ? (
                    <SimulationLanding
                      config={langConfig}
                      base={mbBase}
                      ratio={mbRatio}
                      isRtl={isFa}
                    />
                  ) : (
                    <SimulationBlog
                      config={langConfig}
                      base={mbBase}
                      ratio={mbRatio}
                      isRtl={isFa}
                    />
                  )}
                </ViewportCard>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};
