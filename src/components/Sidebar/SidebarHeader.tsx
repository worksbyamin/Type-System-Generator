import React from 'react';
import { Type, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  onToggleCollapse
}) => {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-auto py-4 gap-4 shrink-0">
        {/* Only Two Icons When Collapsed */}
        <div 
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white" 
          title="Type System Generator"
          aria-label="Type System Generator Icon"
        >
          <Type className="w-5 h-5 text-white" />
        </div>
        <button
          onClick={onToggleCollapse}
          className="w-10 h-10 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          title="Expand Sidebar"
          aria-label="Expand Sidebar"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#131315]">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0 shadow-sm">
          <Type className="w-4 h-4 text-black" />
        </div>
        <span className="font-semibold text-sm tracking-tight text-white truncate">
          Type System Generator
        </span>
      </div>
      <button
        onClick={onToggleCollapse}
        className="w-8 h-8 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
        title="Collapse Sidebar"
        aria-label="Collapse Sidebar"
      >
        <PanelLeftClose className="w-4 h-4" />
      </button>
    </div>
  );
};
