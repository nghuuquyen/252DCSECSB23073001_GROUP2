'use client';

import { useState } from 'react';
import type { Ingredient } from '@/types';
import FOOD_DB from '@/lib/ingredients.json';

// ─────────────────────────────────────────────────────────────────────────────

type FoodItem = typeof FOOD_DB[number];
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

const MEAL_META: Record<MealType, { label: string }> = {
  breakfast: { label: 'Bữa sáng' },
  lunch:     { label: 'Bữa trưa' },
  dinner:    { label: 'Bữa tối'  },
  snack:     { label: 'Ăn vặt'   },
};

function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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

interface AddMealModalProps {
  mealType: MealType;
  onClose:  () => void;
  onAdd:    (ingredient: Ingredient) => void;
}

export default function AddMealModal({ mealType, onClose, onAdd }: AddMealModalProps) {
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Thêm món vào ${MEAL_META[mealType].label}`}
        className="fixed bottom-0 left-0 right-0 z-[101] bg-background rounded-t-3xl max-h-[90vh] flex flex-col shadow-2xl pb-8"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-primary/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-4">
          <h2 className="font-h2 text-lg font-bold text-on-background">
            Thêm món — {MEAL_META[mealType].label}
          </h2>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center hover:bg-primary/15 transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-base">close</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2.5 bg-surface-container-lowest rounded-xl border border-primary/15 px-3.5 py-2.5">
            <span className="material-symbols-outlined text-outline text-base">search</span>
            <input
              type="text"
              placeholder="Tìm nguyên liệu..."
              value={query}
              autoComplete="off"
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              className="flex-1 bg-transparent outline-none font-body-md text-sm text-on-background placeholder:text-outline"
            />
          </div>
        </div>

        {/* Step 1: Food list */}
        {!selected ? (
          <div className="flex-1 overflow-y-auto px-5 space-y-2">
            {filtered.length === 0 && (
              <p className="text-center text-outline text-sm py-6">
                Không tìm thấy nguyên liệu 😕
              </p>
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
                  {food.calories}{' '}
                  <span className="text-[10px] font-normal text-outline">kcal</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Step 2: Gram input */
          <div className="flex-1 overflow-y-auto px-5">
            <button
              onClick={() => setSelected(null)}
              className="text-primary font-semibold text-sm pb-3 hover:underline"
            >
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
                  type="number"
                  min="1"
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
                  { label: 'Protein', value: String(nutrition.protein),  unit: 'g'    },
                  { label: 'Carbs',   value: String(nutrition.carbs),    unit: 'g'    },
                  { label: 'Fat',     value: String(nutrition.fat),       unit: 'g'    },
                ].map(({ label, value, unit }) => (
                  <div key={label} className="bg-surface-container-lowest rounded-xl p-2.5 border border-primary/10 text-center">
                    <p className="font-label-caps text-[9px] uppercase tracking-widest text-outline mb-1">{label}</p>
                    <p className="font-numbers font-bold text-sm text-primary">
                      {value}
                      <span className="text-[9px] font-normal text-outline"> {unit}</span>
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