import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface ViewportCardProps {
  type: 'desktop' | 'mobile';
  title: string;
  badge: string;
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const ViewportCard: React.FC<ViewportCardProps> = ({
  type,
  title,
  badge,
  children,
  theme = 'light'
}) => {
  const isDesktop = type === 'desktop';

  return (
    <div
      className={`${theme === 'dark' ? 'dark' : ''} bg-white text-neutral-900 rounded-2xl border border-neutral-300/40 shadow-2xl flex flex-col overflow-hidden transition-all shrink-0 ${
        isDesktop
          ? 'w-full xl:flex-1 xl:min-w-0'
          : 'w-full max-w-[420px] self-center xl:w-[380px] xl:max-w-[380px] xl:shrink-0'
      } h-full min-h-[540px]`}
    >
      {/* Viewport Frame Header */}
      <div className="h-10 px-3 sm:px-4 bg-neutral-100/90 border-b border-neutral-200/80 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          {isDesktop ? (
            <Monitor className="w-3.5 h-3.5 text-neutral-600" />
          ) : (
            <Smartphone className="w-3.5 h-3.5 text-neutral-600" />
          )}
          <span className="text-xs font-semibold text-neutral-700 tracking-tight">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-medium text-neutral-600 bg-neutral-200/60 px-2 py-0.5 rounded">
            {badge}
          </span>
          {/* Subtle OS window dots */}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
        </div>
      </div>

      {/* Viewport Internal Dedicated Scroll Container */}
      <div className="flex-1 overflow-y-auto light-scrollbar bg-white p-4 sm:p-5 relative">
        {children}
      </div>
    </div>
  );
};
