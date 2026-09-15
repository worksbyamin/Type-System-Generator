import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Copy, Check } from 'lucide-react';
import { AppConfig } from '../../types/typography';
import { generateCodeOutput } from '../../utils/cssGenerator';

interface GeneratedCodeCollapsibleProps {
  appConfig: AppConfig;
  onChangeFormat: (format: 'css' | 'tailwind') => void;
}

export const GeneratedCodeCollapsible: React.FC<GeneratedCodeCollapsibleProps> = ({
  appConfig,
  onChangeFormat
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const code = generateCodeOutput(appConfig);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#1c1c1f] rounded-xl border border-white/5 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-white hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-white" />
          <span>Generated Code</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-1 flex flex-col gap-3 border-t border-white/5 bg-[#17171a]/50">
          {/* Format Tabs */}
          <div className="flex bg-[#232326] p-1 rounded-lg gap-1">
            <button
              onClick={() => onChangeFormat('css')}
              className={`flex-1 py-1.5 px-2 text-xs rounded font-medium transition-all ${
                appConfig.exportFormat === 'css'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              CSS Variables
            </button>
            <button
              onClick={() => onChangeFormat('tailwind')}
              className={`flex-1 py-1.5 px-2 text-xs rounded font-medium transition-all ${
                appConfig.exportFormat === 'tailwind'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tailwind
            </button>
          </div>

          {/* Code Box */}
          <pre className="p-3 bg-[#111113] rounded-lg border border-white/5 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-52 overflow-y-auto leading-relaxed">
            <code>{code}</code>
          </pre>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
