'use client';

import { Flame, Droplet } from 'lucide-react';
import { BottomNav } from '@/components/ui';
import CalorieCard from '@/components/CalorieCard';
import MacroBar from '@/components/MacroBar';

export default function Page() {
  // Demo data - sẽ được thay bằng state management sau
  const userData = {
    dailyTarget: 2480,
    consumed: 1240,
  };

  const remaining = userData.dailyTarget - userData.consumed;

  const macros = {
    carbs: { consumed: 150, target: 250 },
    protein: { consumed: 80, target: 120 },
    fat: { consumed: 45, target: 65 },
  };

  const meals = [
    {
      id: 1,
      type: 'Bữa sáng',
      name: 'Trứng & Bánh mì',
      calories: 420,
      icon: '🍳',
    },
    {
      id: 2,
      type: 'Bữa trưa',
      name: 'Salad Cá hồi',
      calories: 650,
      icon: '🥗',
    },
    {
      id: 3,
      type: 'Ăn vặt',
      name: 'Hạt dinh dưỡng',
      calories: 170,
      icon: '🥜',
    },
  ];

  const waterIntake = {
    consumed: 1250,
    target: 2000,
    glasses: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-emerald-600 fill-emerald-600" />
            <h1 className="text-xl font-bold text-gray-900">CaloMate</h1>
          </div>
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Calorie Card */}
        <CalorieCard
          remaining={remaining}
          consumed={userData.consumed}
          target={userData.dailyTarget}
        />

        {/* Macro Nutrients */}
        <div className="rounded-3xl bg-white shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chất dinh dưỡng</h2>
          <MacroBar
            label="Carbohydrate"
            consumed={macros.carbs.consumed}
            target={macros.carbs.target}
            color="emerald"
          />
          <MacroBar
            label="Protein"
            consumed={macros.protein.consumed}
            target={macros.protein.target}
            color="blue"
          />
          <MacroBar
            label="Chất béo"
            consumed={macros.fat.consumed}
            target={macros.fat.target}
            color="orange"
          />
        </div>

        {/* Water Tracker */}
        <div className="rounded-3xl bg-white shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-blue-500 fill-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">Uống nước</h2>
            </div>
            <span className="text-sm text-gray-600">
              {waterIntake.consumed} / {waterIntake.target} ml
            </span>
          </div>
          <div className="flex justify-between items-center gap-2 mb-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center ${
                  i < waterIntake.glasses
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {i < waterIntake.glasses && (
                  <Droplet className="w-5 h-5 fill-white" />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((waterIntake.consumed / waterIntake.target) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Meals Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">Bữa ăn</h2>
          <div className="space-y-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="rounded-2xl bg-white shadow-lg p-4 flex items-center justify-between hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-3xl">{meal.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {meal.type}
                    </p>
                    <p className="font-medium text-gray-900">{meal.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{meal.calories}</p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Meal Button */}
          <button className="w-full mt-3 rounded-2xl bg-emerald-100 text-emerald-700 font-medium py-3 hover:bg-emerald-200 transition-colors duration-200 flex items-center justify-center gap-2">
            <span className="text-xl">+</span>
            Thêm bữa ăn
          </button>
        </div>

        {/* Empty Dinner */}
        <div className="mb-6">
          <div className="rounded-2xl bg-white shadow-lg p-4 border-2 border-dashed border-gray-300 flex items-center justify-between opacity-60">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-3xl">🍽️</div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Bữa tối
                </p>
                <p className="font-medium text-gray-700">Chưa ghi nhận</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-400">0</p>
              <p className="text-xs text-gray-500">kcal</p>
            </div>
          </div>
        </div>
      </main>

      {/* FAB Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-200 z-40">
        <span className="text-2xl">+</span>
      </button>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
