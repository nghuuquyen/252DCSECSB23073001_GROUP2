'use client';

import React from 'react';

type BarColor = 'primary' | 'primary-container' | 'outline-variant';

interface MacroData {
  label: string;
  percent: number;
  kcal: number;
  color: BarColor;
}

interface MacroSectionProps {
  macros: MacroData[];
}

const BAR_COLOR: Record<BarColor, string> = {
  'primary': '#005239',
  'primary-container': '#1a6b4e',
  'outline-variant': '#bec9c1',
};

export default function MacroSection({ macros }: MacroSectionProps) {
  return (
    <section className="bg-white/88 backdrop-blur-md border border-[#005239]/10 shadow-sm rounded-3xl p-4 sm:p-5 lg:p-6 flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#005239] font-['Be_Vietnam_Pro']">
          Phân bổ Macro
        </h3>
        <span className="material-symbols-outlined text-[#005239] text-2xl lg:text-3xl">
          pie_chart
        </span>
      </div>

      {/* Macro rows */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 flex-grow flex flex-col justify-center">
        {macros.map((macro) => (
          <div key={macro.label} className="space-y-2">

            {/* Label + percent */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#48645a] font-['Space_Grotesk']">
                {macro.label}
              </span>
              <span className="text-lg lg:text-xl font-semibold text-[#005239] font-['Space_Grotesk']">
                {macro.percent}%
              </span>
            </div>

            {/* Progress bar — dày hơn trên laptop */}
            <div className="h-2 lg:h-2.5 w-full bg-[#caeadd]/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(macro.percent, 100)}%`,
                  backgroundColor: BAR_COLOR[macro.color],
                }}
              />
            </div>

            {/* Kcal label */}
            <p className="text-[10px] lg:text-xs text-right font-semibold tracking-wide text-[#6f7973] font-['Space_Grotesk']">
              {Math.round(macro.kcal)} KCAL
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}