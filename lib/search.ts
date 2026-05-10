import ingredients from "@/lib/ingredients.json";
import type { Ingredient } from "@/types";

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");
}

// Tính điểm khớp - điểm càng cao càng ưu tiên
function getMatchScore(
  normalizedName: string,
  normalizedQuery: string,
): number {
  if (normalizedName === normalizedQuery) return 4; // khớp chính xác
  if (normalizedName.startsWith(normalizedQuery)) return 3; // bắt đầu bằng query
  if (normalizedName.includes(` ${normalizedQuery}`)) return 2; // khớp đầu từ
  if (normalizedName.includes(normalizedQuery)) return 1; // chứa query
  return 0;
}

export function searchIngredient(
  query: string,
  limit: number = 10,
): Ingredient[] {
  if (!query || query.trim() === "") return [];

  const normalizedQuery = normalize(query.trim());
  // Map source JSON shape to `Ingredient` type to satisfy TypeScript
  const normalizedIngredients: Ingredient[] = (ingredients as any[]).map(
    (i) => ({
      name: i.name,
      // JSON uses `calPer100g`; Ingredient expects `calories` (use per-100g as default)
      calories: i.calPer100g ?? i.calories ?? 0,
      protein: i.protein ?? 0,
      // JSON sometimes uses `carb` (singular) — normalize to `carbs`
      carbs: i.carb ?? i.carbs ?? 0,
      fat: i.fat ?? 0,
      // `amount` not provided in JSON — default to 100 (grams)
      amount: i.amount ?? 100,
    }),
  );

  return normalizedIngredients
    .map((item) => ({
      item,
      score: getMatchScore(normalize(item.name), normalizedQuery),
    }))
    .filter(({ score }) => score > 0) // bỏ những cái không khớp
    .sort((a, b) => b.score - a.score) // sort theo điểm cao nhất
    .slice(0, limit) // giới hạn kết quả
    .map(({ item }) => item); // trả về Ingredient[]
}
