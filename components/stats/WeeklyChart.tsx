"use client";

import React, { useEffect, useRef } from "react";

interface ChartPoint {
  date: string;
  dateNum?: string;
  fullDate?: string;
  calories: number;
  target: number;
  isToday?: boolean;
}

interface WeeklyChartProps {
  data: ChartPoint[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const BAR_HEIGHT = 160;
  const scrollRef = useRef<HTMLDivElement>(null);

  const target = data[0]?.target ?? 2000;

  const maxCalories = Math.max(
    ...data.map((d) => d.calories),
    target * 1.2,
    1
  );

  useEffect(() => {
    const todayIndex = data.findIndex((d) => d.isToday);

    if (todayIndex >= 0 && scrollRef.current) {
      const barWidth = 56; 

      scrollRef.current.scrollTo({
        left: Math.max(todayIndex * barWidth - 120, 0),
        behavior: "smooth",
      });
    }
  }, [data]);

  return (
    <div className="w-full rounded-3xl border border-emerald-600/10 bg-white p-4 shadow-sm space-y-3">

      {/* HEADER */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          Calo mỗi ngày
        </p>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]/20" />
            Chưa đủ
          </span>

          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
            Đạt mục tiêu
          </span>
        </div>
      </div>

      {/* SCROLL CHART — ĐÃ BẬT LẠI THANH TRƯỢT NGANG HIỂN THỊ ĐẸP MẮT */}
      <div
        ref={scrollRef}
        className="
          w-full 
          overflow-x-auto 
          overflow-y-hidden 
          scroll-smooth 
          pb-2
          /* Custom giao diện thanh trượt bằng Tailwind tinh tế */
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-slate-50
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-slate-200
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-slate-300
        "
      >
        <div className="relative w-full min-w-max lg:min-w-0">

          {/* Target line */}
          {data.length > 0 && (() => {
            const targetPx = Math.round(
              (target / maxCalories) * BAR_HEIGHT
            );

            return (
              <div
                className="absolute left-0 right-0 border-t border-dashed border-slate-200 z-0"
                style={{ bottom: targetPx + 28 }}
              />
            );
          })()}

          {/* Bars container */}
          <div
            className="relative z-10 flex w-full items-end justify-between gap-2 sm:gap-4"
            style={{ height: BAR_HEIGHT + 40 }}
          >
            {data.map((point, i) => {
              const isEmpty = point.calories === 0;

              const pct = isEmpty
                ? 0
                : point.calories / maxCalories;

              const barPx = Math.max(
                Math.round(pct * BAR_HEIGHT),
                isEmpty ? 0 : 8
              );

              return (
                <div
                  key={i}
                  className="group relative flex flex-1 max-w-[64px] min-w-[40px] flex-col items-center justify-start h-full"
                >
                  {/* Cột nền Track chạy full chiều cao */}
                  <div 
                    className="relative w-6 rounded-full bg-[#16a34a]/10 flex items-end overflow-hidden"
                    style={{ height: BAR_HEIGHT }}
                  >
                    {/* Cột dữ liệu calo thực tế đè lên phía trên */}
                    <div
                      className="w-full rounded-full bg-[#16a34a] transition-all duration-500 ease-out"
                      style={{ height: barPx }}
                    />
                  </div>

                  {/* Tooltip hiển thị số calo khi hover vào nguyên cả cột track */}
                  {!isEmpty && (
                    <div
                      className="absolute z-20 rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap"
                      style={{ bottom: barPx + 48 }}
                    >
                      {point.calories.toLocaleString()} kcal
                    </div>
                  )}

                  {/* Labels ngày tháng */}
                  <div className="mt-2 w-full text-center truncate">
                    <div
                      className={`text-[10px] truncate ${
                        point.isToday
                          ? "text-[#16a34a] font-bold"
                          : "text-slate-500/80"
                      }`}
                    >
                      {point.date}
                    </div>

                    {point.dateNum && (
                      <div
                        className={`text-[9px] truncate ${
                          point.isToday
                            ? "text-[#16a34a]"
                            : "text-slate-400"
                        }`}
                      >
                        {point.dateNum}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}