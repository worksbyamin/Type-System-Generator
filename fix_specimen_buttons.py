import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("import React from 'react';", "import React from 'react';\nimport { Plus, Minus } from 'lucide-react';")

active_steps = """      {getActiveScaleSteps(config).map((step, idx, arr) => {
        const isHeading = step.power > 0;
        const font = config.fontFamilies[step.name] || (isHeading ? config.fontHeading : config.fontBody);"""
content = re.sub(r'      \{getActiveScaleSteps\(config\)\.map\(\(step\) => \{\n        const isHeading = step\.power > 0;\n        const font = isHeading \? config\.fontHeading : config\.fontBody;', active_steps, content)

metadata_replace = """            {/* Detailed Specimen Metadata (Floating on Hover) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end text-[10px] font-mono text-neutral-500 select-none opacity-0 group-hover:opacity-100 transition-opacity z-10 gap-1.5">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-neutral-200/60">
                 {idx === 0 && onConfigChange && (
                    <button onClick={() => onConfigChange({ extraTop: config.extraTop + 1 })} className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900 transition-colors" title="Add larger scale">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                 )}
                 {idx === 0 && config.extraTop > 0 && onConfigChange && (
                    <button onClick={() => onConfigChange({ extraTop: config.extraTop - 1 })} className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900 transition-colors" title="Remove larger scale">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                 )}
                 {idx === arr.length - 1 && onConfigChange && (
                    <button onClick={() => onConfigChange({ extraBottom: config.extraBottom + 1 })} className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900 transition-colors" title="Add smaller scale">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                 )}
                 {idx === arr.length - 1 && config.extraBottom > 0 && onConfigChange && (
                    <button onClick={() => onConfigChange({ extraBottom: config.extraBottom - 1 })} className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-900 transition-colors" title="Remove smaller scale">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                 )}
                 
                 <div className="w-px h-3 bg-neutral-200 mx-1"></div>
                 
                 <div className="flex flex-col items-end">
                    <span className="font-semibold text-neutral-800 mb-0.5 max-w-[140px] truncate">{font}</span>
                    <span className="whitespace-nowrap">{px.toFixed(1)}px ({rem}rem)</span>
                    <span className="whitespace-nowrap">LH: {lh.toFixed(2)} • W: {weight}</span>
                    <span className="whitespace-nowrap">LS: {tracking > 0 ? `+${tracking.toFixed(3)}` : tracking.toFixed(3)}em</span>
                 </div>
              </div>
            </div>"""
            
content = re.sub(r'            \{/\* Detailed Specimen Metadata \(Floating on Hover\) \*/\}.*?</div>', metadata_replace, content, flags=re.DOTALL)

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
