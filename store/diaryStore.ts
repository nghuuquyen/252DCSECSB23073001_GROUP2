"use client";

import { create } from "zustand";
import type { DailyLog, MealEntry } from "@/types";
import { getLog, saveLog } from "@/lib/storage";
import { calculateAndUpdateStreak } from "@/lib/updateStreak";

type DiaryState = {
  currentLog: DailyLog | null;
  currentDate: string;
  loadLog: (date: string) => void;
  addMeal: (
    meal: MealEntry,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => void;
  removeMeal: (
    mealId: string,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => void;
  updateMeal: (
    mealId: string,
    updated: MealEntry,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => void;
  updateWater: (water: number) => void;
};

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function calcTotalCalories(log: DailyLog): number {
  return log.meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  currentLog: null,
  currentDate: getTodayDate(),

  // Load nhật ký theo ngày từ localStorage
  loadLog: (date: string) => {
    const log = getLog(date) ?? {
      date,
      meals: [],
      totalCalories: 0,
      water: 0,
    };
    if (log.water === undefined) {
      log.water = 0;
    }
    set({ currentLog: log, currentDate: date });
  },

  // Thêm bữa ăn vào nhật ký
  addMeal: (
    meal: MealEntry,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => {
    const { currentLog, currentDate } = get();
    if (!currentLog) return;

    const updated: DailyLog = {
      ...currentLog,
      meals: [...currentLog.meals, meal],
      totalCalories: 0,
    };
    updated.totalCalories = calcTotalCalories(updated);
    saveLog(currentDate, updated);
    set({ currentLog: updated });

    // Cập nhật streak khi thêm bữa ăn
    const streak = calculateAndUpdateStreak();
    if (onStreakUpdate) {
      onStreakUpdate(streak);
    }
  },

  // Xóa bữa ăn khỏi nhật ký
  removeMeal: (
    mealId: string,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => {
    const { currentLog, currentDate } = get();
    if (!currentLog) return;

    const updated: DailyLog = {
      ...currentLog,
      meals: currentLog.meals.filter((m) => m.id !== mealId),
      totalCalories: 0,
    };
    updated.totalCalories = calcTotalCalories(updated);
    saveLog(currentDate, updated);
    set({ currentLog: updated });

    // Cập nhật streak khi xóa bữa ăn
    const streak = calculateAndUpdateStreak();
    if (onStreakUpdate) {
      onStreakUpdate(streak);
    }
  },

  // Cập nhật bữa ăn trong nhật ký
  updateMeal: (
    mealId: string,
    updatedMeal: MealEntry,
    onStreakUpdate?: (streak: {
      currentStreak: number;
      bestStreak: number;
    }) => void,
  ) => {
    const { currentLog, currentDate } = get();
    if (!currentLog) return;

    const updated: DailyLog = {
      ...currentLog,
      meals: currentLog.meals.map((m) => (m.id === mealId ? updatedMeal : m)),
      totalCalories: 0,
    };
    updated.totalCalories = calcTotalCalories(updated);
    saveLog(currentDate, updated);
    set({ currentLog: updated });

    // Cập nhật streak khi cập nhật bữa ăn
    const streak = calculateAndUpdateStreak();
    if (onStreakUpdate) {
      onStreakUpdate(streak);
    }
  },

  // Cập nhật lượng nước uống
  updateWater: (water: number) => {
    const { currentLog, currentDate } = get();
    if (!currentLog) return;

    const updated: DailyLog = {
      ...currentLog,
      water,
    };
    saveLog(currentDate, updated);
    set({ currentLog: updated });
  },
}));
