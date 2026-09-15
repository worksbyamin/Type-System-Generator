import re

with open('src/components/Workspace/SpecimenView.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { SCALE_STEPS } from '../../constants/ratios';", "import { SCALE_STEPS, POPULAR_GOOGLE_FONTS_EN, POPULAR_GOOGLE_FONTS_FA, FALLBACK_SYSTEM_FONTS } from '../../constants/ratios';")

select_replace = """                 <div className="flex flex-col items-end">
                    <select
                      value={config.fontFamilies[step.name] || (isHeading ? config.fontHeading : config.fontBody)}
                      onChange={(e) => {
                        if (onConfigChange) {
                          onConfigChange({
                            fontFamilies: {
                              ...config.fontFamilies,
                              [step.name]: e.target.value
                            }
                          });
                        }
                      }}
                      className="font-semibold text-neutral-800 mb-0.5 max-w-[140px] truncate bg-transparent outline-none cursor-pointer hover:bg-neutral-100 rounded px-1 -mr-1"
                    >
                      <optgroup label="Google Fonts">
                        {(isRtl ? POPULAR_GOOGLE_FONTS_FA : POPULAR_GOOGLE_FONTS_EN).map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </optgroup>
                      <optgroup label="System Fonts">
                        {FALLBACK_SYSTEM_FONTS.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </optgroup>
                    </select>
                    <span className="whitespace-nowrap">{px.toFixed(1)}px ({rem}rem)</span>
                    <span className="whitespace-nowrap">LH: {lh.toFixed(2)} • W: {weight}</span>
                    <span className="whitespace-nowrap">LS: {tracking > 0 ? `+${tracking.toFixed(3)}` : tracking.toFixed(3)}em</span>
                 </div>"""

content = re.sub(r'                 <div className="flex flex-col items-end">\n                    <span className="font-semibold text-neutral-800 mb-0\.5 max-w-\[140px\] truncate">\{font\}</span>\n                    <span className="whitespace-nowrap">\{px\.toFixed\(1\)\}px \(\{rem\}rem\)</span>\n                    <span className="whitespace-nowrap">LH: \{lh\.toFixed\(2\)\} • W: \{weight\}</span>\n                    <span className="whitespace-nowrap">LS: \{tracking > 0 \? `\+\$\{tracking\.toFixed\(3\)\}` : tracking\.toFixed\(3\)\}em</span>\n                 </div>', select_replace, content)

with open('src/components/Workspace/SpecimenView.tsx', 'w') as f:
    f.write(content)
