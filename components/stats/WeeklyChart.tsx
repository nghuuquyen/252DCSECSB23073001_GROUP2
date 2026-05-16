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
    <section className="bg-white/88 backdrop-blur-md border border-[#005239]/10 shadow-sm rounded-3xl p-4 sm:p-5 lg:p-6">
      {/*
        Chiều cao chart tăng dần theo màn hình:
        mobile 180px → tablet 220px → laptop 260px → xl 280px
        Gap giữa bars tăng theo: 1.5 → 2 → 4 → 6
      */}
      <div className="flex justify-between items-end h-[180px] sm:h-[220px] lg:h-[260px] xl:h-[280px] gap-1.5 sm:gap-2 lg:gap-4 xl:gap-6">
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
              {/* Bar — max-w tăng dần: 14px → 18px → 24px → 28px */}
              <div className="w-full max-w-[14px] sm:max-w-[18px] lg:max-w-[24px] xl:max-w-[28px] bg-[#caeadd]/50 rounded-t-full h-full relative overflow-hidden">
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