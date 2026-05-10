'use client';

import React, { useEffect, useState } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { getLogs } from '@/lib/storage';
import type { DailyLog } from '@/types';
import {
  WeeklyChart,
  StatCard,
  MacroSection,
} from '@/components/stats';
import { BottomNav } from '@/components/nav/BottomNav';
import Link from 'next/link';

// ============================================
// Helper functions
// ============================================

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
}

function getWeekRange(): string {
  const days = getLast7Days();
  const start = new Date(days[0]);
  const end = new Date(days[6]);
  const fmt = (d: Date) =>
    d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' });
  return `${fmt(start)} - ${fmt(end)}, ${end.getFullYear()}`;
}

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return labels[d.getDay()];
}

function calcStreak(logs: DailyLog[], target: number): { currentStreak: number } {
  const logMap = new Map(logs.map((l) => [l.date, l]));
  let currentStreak = 0;

  for (let i = 0; i <= 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const log = logMap.get(dateStr);
    if (log && log.totalCalories >= target * 0.8) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak };
}

function calcAvgMacros(logs: DailyLog[]): {
  protein: number;
  carbs: number;
  fat: number;
} {
  if (logs.length === 0) return { protein: 0, carbs: 0, fat: 0 };

  const total = logs.reduce(
    (acc, log) => {
      const protein = log.meals.reduce(
        (s, m) =>
          s + m.ingredients.reduce(
            (si, i) => si + (i.protein * (i.amount ?? 100)) / 100, 0
          ), 0
      );
      const carbs = log.meals.reduce(
        (s, m) =>
          s + m.ingredients.reduce(
            (si, i) => si + (i.carbs * (i.amount ?? 100)) / 100, 0
          ), 0
      );
      const fat = log.meals.reduce(
        (s, m) =>
          s + m.ingredients.reduce(
            (si, i) => si + (i.fat * (i.amount ?? 100)) / 100, 0
          ), 0
      );
      return {
        protein: acc.protein + protein,
        carbs: acc.carbs + carbs,
        fat: acc.fat + fat,
      };
    },
    { protein: 0, carbs: 0, fat: 0 }
  );

  const count = logs.filter((l) => l.totalCalories > 0).length || 1;
  return {
    protein: Math.round(total.protein / count),
    carbs: Math.round(total.carbs / count),
    fat: Math.round(total.fat / count),
  };
}

// ============================================
// Main Component
// ============================================

export default function StatsPage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const { profile, loadProfile } = useProfileStore();

  useEffect(() => {
    loadProfile();
    const days = getLast7Days();
    const data = getLogs(days[0], days[days.length - 1]);
    setLogs(data);
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const target: number = profile?.macroTarget?.calories ?? 2000;
  const days: string[] = getLast7Days();
  const today: string = new Date().toISOString().split('T')[0];

  const daysLogged: number = logs.filter((l) => l.totalCalories > 0).length;

  const avgCalories: number =
    daysLogged > 0
      ? Math.round(logs.reduce((s, l) => s + l.totalCalories, 0) / daysLogged)
      : 0;

  const daysMetTarget: number = logs.filter(
    (l) => l.totalCalories >= target * 0.8
  ).length;

  const totalDeficit: number = logs
    .filter((l) => l.totalCalories > 0)
    .reduce((s, l) => s + (l.totalCalories - target), 0);

  const { currentStreak } = calcStreak(logs, target);
  const avgMacros = calcAvgMacros(logs);

  const proteinKcal: number = avgMacros.protein * 4;
  const carbsKcal: number = avgMacros.carbs * 4;
  const fatKcal: number = avgMacros.fat * 9;
  const totalMacroKcal: number = proteinKcal + carbsKcal + fatKcal || 1;

  const macroPercents = {
    carbs: Math.round((carbsKcal / totalMacroKcal) * 100),
    protein: Math.round((proteinKcal / totalMacroKcal) * 100),
    fat: Math.round((fatKcal / totalMacroKcal) * 100),
  };

  const weeklyData = days.map((date) => {
    const log = logs.find((l) => l.date === date);
    return {
      date: getDayLabel(date),
      calories: log?.totalCalories ?? 0,
      target,
      isToday: date === today,
    };
  });

  const macroStats = [
    {
      label: 'TINH BỘT',
      percent: macroPercents.carbs,
      kcal: carbsKcal,
      color: 'primary' as const,
    },
    {
      label: 'ĐẠM',
      percent: macroPercents.protein,
      kcal: proteinKcal,
      color: 'primary-container' as const,
    },
    {
      label: 'CHẤT BÉO',
      percent: macroPercents.fat,
      kcal: fatKcal,
      color: 'outline-variant' as const,
    },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">

      {/* ── HEADER — đồng bộ Diary ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-900/10 h-14 flex justify-center items-center px-6">
        <div className="w-full max-w-[1100px] flex justify-between items-center">

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined filled-icon text-primary text-2xl">
              local_fire_department
            </span>
            <h1 className="font-h1 text-2xl text-primary font-black tracking-tight">
              CaloMate
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary-fixed-dim/30 px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined filled-icon text-primary text-base">
                local_fire_department
              </span>
              <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-primary">
                Chuỗi{' '}
                <span className="font-numbers">{currentStreak}</span>{' '}
                ngày
              </span>
            </div>
            <Link href="/settings">
              <button className="hover:bg-surface-container transition-all active:scale-95 p-2 rounded-full">
                <span className="material-symbols-outlined text-primary text-xl">
                  settings
                </span>
              </button>
            </Link>
          </div>

        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────── */}
      <main className="pt-20 pb-24 px-6 max-w-[1100px] mx-auto space-y-5">

        {/* Page title + date range */}
        <section className="space-y-1 text-center">
          <h2 className="font-h1 text-2xl text-primary font-bold">
            Thống kê tuần này
          </h2>
          <p className="font-body-md text-base text-secondary font-semibold">
            {getWeekRange()}
          </p>
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* Left column */}
          <div className="lg:col-span-7 space-y-5">

            <WeeklyChart data={weeklyData} />

            <section className="grid grid-cols-2 gap-5">
              <StatCard
                label="TB MỖI NGÀY"
                value={avgCalories.toLocaleString()}
                unit="kcal"
              />
              <StatCard
                label="ĐẠT MỤC TIÊU"
                value={`${daysMetTarget}/7`}
                unit="ngày"
              />
              <StatCard
                label="THÂM HỤT"
                value={
                  totalDeficit >= 0
                    ? `+${totalDeficit.toLocaleString()}`
                    : totalDeficit.toLocaleString()
                }
                unit="kcal"
                isNegative={totalDeficit < 0}
              />
              <StatCard
                label="CHUỖI STREAK"
                value={currentStreak}
                unit="ngày"
                isStreak
              />
            </section>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 h-full">
            <MacroSection macros={macroStats} />
          </div>

        </div>

        {/* Empty state */}
        {logs.length === 0 && (
          <div className="text-center py-10 glass-card rounded-3xl">
            <span className="material-symbols-outlined text-4xl text-outline">
              bar_chart
            </span>
            <p className="text-outline text-sm mt-2">
              Chưa có dữ liệu tuần này
            </p>
            <p className="text-outline/60 text-xs mt-1">
              Hãy ghi nhật ký bữa ăn đầu tiên!
            </p>
          </div>
        )}

      </main>

      {/* ── BOTTOM NAV — đồng bộ Diary ──────────────────────────── */}
      <BottomNav />

    </div>
  );
}