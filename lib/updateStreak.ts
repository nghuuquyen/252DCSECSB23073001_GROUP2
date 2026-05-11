/**
 * lib/updateStreak.ts
 *
 * Helper để cập nhật streak trong profile khi có log mới
 */

import { calcCurrentStreak, calcBestStreak } from "./calc";
import { getLogs } from "./storage";
import type { DailyLog } from "@/types";

/**
 * Cập nhật currentStreak và bestStreak trong profile từ tất cả logs
 * Hàm này được gọi khi:
 * - Thêm bữa ăn mới
 * - Xóa bữa ăn
 * - Cập nhật bữa ăn
 *
 * @returns Object chứa { currentStreak, bestStreak }
 */
export function calculateAndUpdateStreak(): {
  currentStreak: number;
  bestStreak: number;
} {
  // Lấy tất cả logs từ năm trước đến hiện tại
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const start = startDate.toISOString().split("T")[0];
  const end = new Date().toISOString().split("T")[0];

  const allLogs = getLogs(start, end);

  const currentStreak = calcCurrentStreak(allLogs);
  const bestStreak = calcBestStreak(allLogs);

  return { currentStreak, bestStreak };
}
