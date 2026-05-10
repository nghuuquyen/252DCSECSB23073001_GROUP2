'use client';

import React from 'react';

interface WeeklyChartProps {
  data: Array<{
    date: string;
    calories: number;
    target: number;
    isToday: boolean;
  }>;
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxCalories = Math.max(...data.map((d) => d.calories), data[0]?.target ?? 2000);

  return (
    <section className="bg-white/88 backdrop-blur-md border border-[#005239]/10 shadow-sm rounded-3xl p-5">
      <div className="flex justify-between items-end h-[240px] gap-2 lg:gap-6">
        {data.map((item) => {
          const heightPercent =
            item.calories > 0
              ? Math.min((item.calories / maxCalories) * 100, 100)
              : 0;

          return (
            <div
              key={item.date}
              className="flex-1 flex flex-col items-center gap-3 h-full"
            >
              {/* Bar track + fill */}
              <div className="w-full max-w-[20px] bg-[#caeadd]/50 rounded-t-full h-full relative overflow-hidden">
                {item.calories > 0 && (
                  <div
                    className="absolute bottom-0 w-full rounded-t-full transition-all duration-500"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.isToday ? '#005239' : '#1a6b4e',
                    }}
                  />
                )}
              </div>

              {/* Day label */}
              <span
                className="text-xs font-bold uppercase tracking-widest font-['Be_Vietnam_Pro']"
                style={{ color: item.isToday ? '#005239' : '#48645a' }}
              >
                {item.date}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}