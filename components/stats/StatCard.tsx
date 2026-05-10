'use client';

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  isNegative?: boolean;
  isStreak?: boolean;
}

export default function StatCard({
  label,
  value,
  unit,
  isNegative = false,
  isStreak = false,
}: StatCardProps) {
  return (
    <div
      className="bg-white/88 backdrop-blur-md border border-[#005239]/10 shadow-sm rounded-3xl p-4 flex flex-col gap-2"
      style={isStreak ? { borderLeft: '4px solid #005239' } : {}}
    >
      {/* Label */}
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#48645a] font-['Space_Grotesk']">
        {label}
      </span>

      {/* Value + unit */}
      <div className="flex items-baseline gap-1">
        <span
          className="text-2xl font-bold font-['Space_Grotesk']"
          style={{ color: isNegative ? '#ba1a1a' : '#005239' }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="text-sm font-['Be_Vietnam_Pro'] font-normal"
            style={{ color: isNegative ? '#ba1a1a' : '#48645a' }}
          >
            {unit}
          </span>
        )}

        {/* Flame icon cho streak */}
        {isStreak && (
          <span
            className="material-symbols-outlined text-orange-500 text-xl ml-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
        )}
      </div>
    </div>
  );
}