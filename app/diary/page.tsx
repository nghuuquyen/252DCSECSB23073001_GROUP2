'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useDiaryStore } from '@/store/diaryStore';
import { useProfileStore } from '@/store/profileStore';
import type { MealEntry, Ingredient } from '@/types';
import FOOD_DB from '@/lib/ingredients.json';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type FoodItem = typeof FOOD_DB[number];
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const MEAL_META: Record<MealType, { label: string; icon: string }> = {
  breakfast: { label: 'Bữa sáng', icon: 'wb_sunny' },
  lunch:     { label: 'Bữa trưa', icon: 'restaurant' },
  dinner:    { label: 'Bữa tối',  icon: 'bedtime' },
  snack:     { label: 'Ăn vặt',   icon: 'cookie' },
};

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function formatDate(dateStr: string): { day: number; month: number; isToday: boolean } {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date().toISOString().slice(0, 10);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    isToday: dateStr === today,
  };
}

function offsetDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function calcNutrition(food: FoodItem, grams: number) {
  const r = grams / 100;
  return {
    calories: Math.round(food.calories * r),
    protein:  Math.round(food.protein  * r * 10) / 10,
    carbs:    Math.round(food.carbs    * r * 10) / 10,
    fat:      Math.round(food.fat      * r * 10) / 10,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Meal Modal
// ─────────────────────────────────────────────────────────────────────────────

function AddMealModal({
  mealType, onClose, onAdd,
}: {
  mealType: MealType;
  onClose: () => void;
  onAdd: (ingredient: Ingredient) => void;
}) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams]       = useState('100');

  const filtered = query.trim() === ''
    ? FOOD_DB
    : FOOD_DB.filter((f) => removeAccents(f.name).includes(removeAccents(query.trim())));

  const nutrition = selected ? calcNutrition(selected, Number(grams) || 0) : null;

  function handleConfirm() {
    if (!selected || !grams || Number(grams) <= 0) return;
    const g = Number(grams);
    const n = calcNutrition(selected, g);
    onAdd({
      id:       `${selected.id}-${Date.now()}`,
      name:     selected.name,
      calories: n.calories,
      protein:  n.protein,
      carbs:    n.carbs,
      fat:      n.fat,
      amount:   g,
    });
    onClose();
  }

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
      <div className="fixed bottom-0 left-0 right-0 z-[101] bg-background rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl pb-8">

        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-primary/20" />
        </div>

        <div className="flex items-center justify-between px-5 pt-3 pb-4">
          <h2 className="font-h2 text-lg font-bold text-on-background">
            Thêm món — {MEAL_META[mealType].label}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center hover:bg-primary/15 transition-colors">
            <span className="material-symbols-outlined text-primary text-base">close</span>
          </button>
        </div>

        <div className="px-5 pb-3">
          <div className="flex items-center gap-2.5 bg-surface-container-lowest rounded-xl border border-primary/15 px-3.5 py-2.5">
            <span className="material-symbols-outlined text-outline text-base">search</span>
            <input
              type="text"
              placeholder="Tìm nguyên liệu..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              className="flex-1 bg-transparent outline-none font-body-md text-sm text-on-background placeholder:text-outline"
            />
          </div>
        </div>

        {!selected ? (
          <div className="flex-1 overflow-y-auto px-5 space-y-2">
            {filtered.length === 0 && (
              <p className="text-center text-outline text-sm py-6">Không tìm thấy nguyên liệu 😕</p>
            )}
            {filtered.map((food) => (
              <div
                key={food.id}
                onClick={() => setSelected(food)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-surface-container-lowest border border-primary/10 cursor-pointer hover:border-primary/30 hover:bg-surface-container-low transition-all"
              >
                <div>
                  <p className="font-body-md font-semibold text-sm text-on-background">{food.name}</p>
                  <p className="font-numbers text-[11px] text-outline mt-0.5">
                    P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g / 100g
                  </p>
                </div>
                <span className="font-numbers font-bold text-sm text-primary ml-3 shrink-0">
                  {food.calories} <span className="text-[10px] font-normal text-outline">kcal</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5">
            <button onClick={() => setSelected(null)} className="text-primary font-semibold text-sm pb-3 hover:underline">
              ← Quay lại
            </button>
            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-primary/12 mb-4">
              <p className="font-body-md font-bold text-base text-on-background mb-1">{selected.name}</p>
              <p className="font-numbers text-[11px] text-outline">
                {selected.calories} kcal · P {selected.protein}g · C {selected.carbs}g · F {selected.fat}g / 100g
              </p>
            </div>

            <p className="font-label-caps text-[11px] uppercase tracking-widest text-outline mb-2">Số gram</p>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setGrams((g) => String(Math.max(10, (Number(g) || 100) - 10)))}
                className="w-11 h-11 rounded-full bg-primary/10 text-primary text-2xl flex items-center justify-center hover:bg-primary/20 transition-colors"
              >−</button>
              <div className="flex-1 flex items-end gap-2">
                <input
                  type="number" min="1"
                  value={grams}
                  onChange={(e) => setGrams(e.target.value)}
                  className="flex-1 text-center font-numbers font-bold text-3xl text-primary bg-transparent outline-none border-b-2 border-primary/20 focus:border-primary pb-1 transition-colors"
                />
                <span className="font-numbers text-sm text-outline pb-1">g</span>
              </div>
              <button
                onClick={() => setGrams((g) => String((Number(g) || 100) + 10))}
                className="w-11 h-11 rounded-full bg-primary/10 text-primary text-2xl flex items-center justify-center hover:bg-primary/20 transition-colors"
              >+</button>
            </div>

            {nutrition && (
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { label: 'Calo',    value: String(nutrition.calories), unit: 'kcal' },
                  { label: 'Protein', value: String(nutrition.protein),  unit: 'g' },
                  { label: 'Carbs',   value: String(nutrition.carbs),    unit: 'g' },
                  { label: 'Fat',     value: String(nutrition.fat),      unit: 'g' },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="bg-surface-container-lowest rounded-xl p-2.5 border border-primary/10 text-center">
                    <p className="font-label-caps text-[9px] uppercase tracking-widest text-outline mb-1">{label}</p>
                    <p className="font-numbers font-bold text-sm text-primary">
                      {value}<span className="text-[9px] font-normal text-outline"> {unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={!grams || Number(grams) <= 0}
              className="w-full py-3.5 rounded-2xl font-body-md font-bold text-base text-white bg-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg filled-icon">check</span>
              Thêm vào {MEAL_META[mealType].label}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meal Section
// ─────────────────────────────────────────────────────────────────────────────

function MealSection({ mealType, meal, onAdd }: {
  mealType: MealType;
  meal: MealEntry | undefined;
  onAdd: (type: MealType) => void;
}) {
  const { label, icon } = MEAL_META[mealType];
  const hasItems = meal && meal.ingredients.length > 0;

  return (
    <section className="glass-card rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${hasItems ? 'bg-primary/12' : 'bg-primary/6'}`}>
            <span className={`material-symbols-outlined text-xl ${hasItems ? 'filled-icon text-primary' : 'text-primary/50'}`}>
              {icon}
            </span>
          </div>
          <div>
            <p className="font-body-md font-bold text-base text-on-background">{label}</p>
            <p className="font-numbers text-[10px] uppercase tracking-wider text-outline mt-0.5">
              {hasItems ? `Tổng: ${meal.totalCalories.toLocaleString()} kcal` : 'Chưa thêm món'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onAdd(mealType)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
            hasItems ? 'bg-primary text-white shadow-md shadow-primary/25 hover:opacity-90' : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          <span className="material-symbols-outlined text-lg">add</span>
        </button>
      </div>

      {hasItems && (
        <div className="border-t border-primary/6 px-4 pb-3 pt-2 space-y-2">
          {meal.ingredients.map((ing) => (
            <div key={ing.id} className="flex items-center gap-3 py-2 border-b border-primary/4 last:border-0">
              <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                <span className="text-lg">🍽️</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body-md font-semibold text-sm text-on-background truncate">{ing.name}</p>
                <p className="font-numbers text-[10px] uppercase tracking-wider text-outline mt-0.5">
                  Khẩu phần: {ing.amount ?? 100}g
                </p>
              </div>
              <span className="font-numbers font-semibold text-sm text-primary shrink-0">
                {ing.calories.toLocaleString()}
                <span className="text-[10px] font-normal text-outline ml-0.5">kcal</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DiaryPage() {
  const { currentLog, loadLog, addMeal, updateMeal } = useDiaryStore();
  const { profile, loadProfile }                     = useProfileStore();
  const [mounted, setMounted]         = useState(false);
  const [currentDate, setCurrentDate] = useState(getToday());
  const [modalMeal, setModalMeal]     = useState<MealType | null>(null);

  useEffect(() => {
    loadProfile();
    loadLog(getToday());
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mounted) loadLog(currentDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const isToday = currentDate === getToday();
  const goBack  = useCallback(() => setCurrentDate((d) => offsetDate(d, -1)), []);
  const goNext  = useCallback(() => { if (!isToday) setCurrentDate((d) => offsetDate(d, 1)); }, [isToday]);

  const target      = profile?.macroTarget?.calories ?? 2000;
  const consumed    = currentLog?.totalCalories ?? 0;
  const remaining   = target - consumed;

  function getMeal(type: MealType): MealEntry | undefined {
    return currentLog?.meals.find((m) => m.mealType === type);
  }

  function handleAddIngredient(mealType: MealType, ingredient: Ingredient) {
    const existing = getMeal(mealType);
    if (existing) {
      const updatedIngredients = [...existing.ingredients, ingredient];
      updateMeal(existing.id, {
        ...existing,
        ingredients:   updatedIngredients,
        totalCalories: updatedIngredients.reduce((s, i) => s + i.calories, 0),
      });
    } else {
      const now  = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      addMeal({
        id:            `${mealType}-${Date.now()}`,
        mealType,
        ingredients:   [ingredient],
        totalCalories: ingredient.calories,
        time,
      });
    }
  }

  if (!mounted) return null;

  const { day, month, isToday: todayFlag } = formatDate(currentDate);
  const isAfterToday = currentDate > getToday();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">

      {/* ── HEADER — đồng bộ Dashboard ────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-900/10 h-14 flex justify-center items-center px-6">
        <div className="w-full max-w-[1100px] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined filled-icon text-primary text-2xl">local_fire_department</span>
            <h1 className="font-h1 text-2xl text-primary font-black tracking-tight">CaloMate</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary-fixed-dim/30 px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined filled-icon text-primary text-base">local_fire_department</span>
              <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-primary">
                Chuỗi <span className="font-numbers">5</span> ngày
              </span>
            </div>
            <Link href="/settings">
              <button className="hover:bg-surface-container transition-all active:scale-95 p-2 rounded-full">
                <span className="material-symbols-outlined text-primary text-xl">settings</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-24 px-6 max-w-[1100px] mx-auto">

        {/* ── DATE NAV — đồng bộ Dashboard ──────────────────────────── */}
        <nav className="flex items-center justify-center gap-8 my-5">
          <button
            onClick={goBack}
            className="p-2 hover:bg-surface-container rounded-full transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl text-outline group-hover:text-primary">chevron_left</span>
          </button>
          <h2 className="font-h1 text-3xl text-primary font-bold">
            {todayFlag ? 'Hôm nay' : 'Ngày'},{' '}
            <span className="font-numbers">{day}</span> tháng{' '}
            <span className="font-numbers">{month}</span>
          </h2>
          <button
            onClick={goNext}
            disabled={isAfterToday}
            className="p-2 hover:bg-surface-container rounded-full transition-colors group disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-2xl text-outline group-hover:text-primary">chevron_right</span>
          </button>
        </nav>

        {/* ── 2-COLUMN GRID — đồng bộ Dashboard ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT: Summary */}
          <div className="lg:col-span-7 space-y-5">

            {/* Calorie summary card */}
            <section className="glass-card rounded-3xl p-6">
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-outline mb-3">
                Tổng kết hôm nay
              </p>

              {/* Remaining big number */}
              <div className="flex items-end gap-3 mb-5">
                <span className={`font-numbers font-bold text-6xl leading-none tracking-tight ${remaining < 0 ? 'text-error' : 'text-primary'}`}>
                  {Math.abs(remaining).toLocaleString()}
                </span>
                <span className="font-numbers text-sm text-outline mb-2">kcal còn lại</span>
              </div>

              {/* Consumed vs Target bars */}
              <div className="space-y-3">
                {[
                  { label: 'Đã nạp',   value: consumed, max: target,  pct: Math.min((consumed / (target || 1)) * 100, 100) },
                  { label: 'Mục tiêu', value: target,   max: target,  pct: 100 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-label-caps text-[10px] uppercase tracking-widest text-outline">{row.label}</span>
                      <span className="font-numbers font-semibold text-sm text-primary">
                        {row.value.toLocaleString()}
                        <span className="text-[10px] font-normal text-outline ml-1">kcal</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${row.pct}%`, opacity: row.label === 'Mục tiêu' ? 0.25 : 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Macro summary */}
            <section className="glass-card rounded-3xl p-6">
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-outline mb-4">Dinh dưỡng</p>
              <div className="grid grid-cols-3 gap-6">
                {(() => {
                  const macros = currentLog?.meals.reduce(
                    (acc, meal) => {
                      meal.ingredients.forEach((ing) => {
                        acc.p += ing.protein || 0;
                        acc.c += ing.carbs   || 0;
                        acc.f += ing.fat     || 0;
                      });
                      return acc;
                    },
                    { p: 0, c: 0, f: 0 }
                  ) || { p: 0, c: 0, f: 0 };

                  const targets = {
                    p: profile?.macroTarget?.protein ?? 120,
                    c: profile?.macroTarget?.carbs   ?? 250,
                    f: profile?.macroTarget?.fat     ?? 65,
                  };

                  return [
                    { label: 'Carbs',   current: macros.c, target: targets.c },
                    { label: 'Protein', current: macros.p, target: targets.p },
                    { label: 'Fat',     current: macros.f, target: targets.f },
                  ].map((m) => (
                    <div key={m.label} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label-caps text-[10px] font-bold text-primary uppercase">{m.label}</span>
                        <span className="font-numbers text-xs">{Math.round(m.current)}/{m.target}g</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-700"
                          style={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </section>
          </div>

          {/* RIGHT: Meal sections */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center px-1 mb-1">
              <h3 className="font-h2 text-lg text-primary font-bold">Bữa ăn hôm nay</h3>
            </div>
            {MEAL_ORDER.map((type) => (
              <MealSection
                key={type}
                mealType={type}
                meal={getMeal(type)}
                onAdd={setModalMeal}
              />
            ))}
          </div>

        </div>
      </main>

      {/* ── FAB — đồng bộ Dashboard ───────────────────────────────── */}
      <button
        onClick={() => setModalMeal('breakfast')}
        className="fixed bottom-20 right-8 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/35 hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* ── BOTTOM NAV — đồng bộ Dashboard ───────────────────────── */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-primary/10 h-16 flex justify-center items-center">
        <nav className="w-full max-w-[1100px] flex justify-around items-center px-8">
          <Link href="/" className="flex flex-col items-center gap-1 text-outline hover:text-primary transition-colors py-2 px-8">
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-[0.1em]">Tổng quan</span>
          </Link>
          <Link href="/diary" className="flex flex-col items-center gap-1 py-2 px-8 rounded-2xl bg-secondary-container text-primary transition-all">
            <span className="material-symbols-outlined filled-icon text-2xl">menu_book</span>
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-[0.1em]">Nhật ký</span>
          </Link>
          <Link href="/stats" className="flex flex-col items-center gap-1 text-outline hover:text-primary transition-colors py-2 px-8">
            <span className="material-symbols-outlined text-2xl">bar_chart</span>
            <span className="font-label-caps text-[10px] font-bold uppercase tracking-[0.1em]">Thống kê</span>
          </Link>
        </nav>
      </footer>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      {modalMeal && (
        <AddMealModal
          mealType={modalMeal}
          onClose={() => setModalMeal(null)}
          onAdd={(ingredient) => handleAddIngredient(modalMeal, ingredient)}
        />
      )}
    </div>
  );
}