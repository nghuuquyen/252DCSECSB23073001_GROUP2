"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingDown,
  Scale,
  TrendingUp,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useProfileStore } from "@/store/profileStore";
import type { UserProfile } from "@/types";

const activityLevels = [
  { value: 1.2, label: "Ít vận động (ngồi nhiều)" },
  { value: 1.375, label: "Vận động nhẹ (1-3 buổi/tuần)" },
  { value: 1.55, label: "Vận động vừa (3-5 buổi/tuần)" },
  { value: 1.725, label: "Vận động nhiều (6-7 buổi/tuần)" },
  { value: 1.9, label: "Vận động rất nhiều" },
];

export default function ProfileForm() {
  const { setProfile } = useProfileStore();

  const [form, setForm] = useState({
    gender: "male",
    age: "25",
    weight: "70",
    height: "175",
    activityLevel: 1.55,
    goal: "maintain" as "lose" | "maintain" | "gain",
  });

  const [results, setResults] = useState({
    calories: 1850,
    protein: 116,
    carbs: 231,
    fat: 51,
  });

  const [error, setError] = useState<string | null>(null);

  // Tính TDEE Real-time
  useEffect(() => {
    const w = Math.abs(Number(form.weight));
    const h = Math.abs(Number(form.height));
    const a = Math.abs(Number(form.age));

    // Chặn tính toán nếu dữ liệu bằng 0 hoặc trống (Task 24: Empty data/0g input)
    if (!w || !h || !a) {
      setError("Vui lòng nhập đầy đủ thông số lớn hơn 0");
      return;
    }

    setError(null);

    // Công thức Mifflin-St Jeor
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = form.gender === "male" ? bmr + 5 : bmr - 161;

    let tdee = bmr * form.activityLevel;

    if (form.goal === "lose") tdee -= 500;
    if (form.goal === "gain") tdee += 500;

    // Edge Case: Đảm bảo calo không âm hoặc quá thấp (Minimum 1200kcal)
    const finalCal = Math.max(Math.round(tdee), 1200);

    // Phân bổ Macros (Đảm bảo không ra số 0 gây lỗi chia cho 0 ở Dashboard)
    const protein = Math.max(Math.round((finalCal * 0.3) / 4), 1);
    const fat = Math.max(Math.round((finalCal * 0.25) / 9), 1);
    const carbs = Math.max(Math.round((finalCal * 0.45) / 4), 1);

    setResults({ calories: finalCal, protein, carbs, fat });
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final check trước khi lưu
    if (error || +form.weight <= 0 || +form.height <= 0 || +form.age <= 0) {
      alert("Thông tin nhập vào không hợp lệ!");
      return;
    }

    const profile: UserProfile = {
      name: "Người dùng",
      age: +form.age,
      weight: +form.weight,
      height: +form.height,
      goal: form.goal,
      macroTarget: {
        calories: results.calories,
        protein: results.protein,
        carbs: results.carbs,
        fat: results.fat,
      },
      currentStreak: 0,
      bestStreak: 0,
    };

    setProfile(profile);
    alert("Hồ sơ đã được đồng bộ thành công!");
  };

  return (
    <div className="min-h-screen bg-[#F7FDF9] flex items-center justify-center p-4 font-sans text-[#1A2F24]">
      <div className="max-w-[480px] w-full pt-8 pb-12 px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <span className="material-symbols-outlined filled-icon text-[#084C3A] text-4xl">
              local_fire_department
            </span>
            <span className="text-3xl font-black text-[#084C3A]">CaloMate</span>
          </div>
          <h1 className="text-3xl font-bold text-[#084C3A] leading-tight mb-3">
            Hãy bắt đầu hành trình của
            <br />
            bạn
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Giới tính */}
          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              Giới tính
            </label>
            <div className="flex bg-[#EAEFEA] p-1 rounded-xl">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, gender: g })}
                  className={`flex-1 py-3.5 text-sm font-semibold rounded-lg transition-all ${
                    form.gender === g
                      ? "bg-white text-[#084C3A] shadow-sm"
                      : "text-gray-500 hover:text-[#084C3A]"
                  }`}
                >
                  {g === "male" ? "Nam" : "Nữ"}
                </button>
              ))}
            </div>
          </div>

          {/* Tuổi, Cao, Nặng - Chặn giá trị âm và 0 */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: "age", label: "TUỔI", max: 120 },
              { key: "height", label: "CAO (CM)", max: 300 },
              { key: "weight", label: "NẶNG (KG)", max: 500 },
            ].map((item) => (
              <div key={item.key}>
                <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
                  {item.label}
                </label>
                <input
                  type="number"
                  min="1"
                  max={item.max}
                  value={form[item.key as keyof typeof form]}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Chỉ nhận số dương (Task 24: 0g input prevention)
                    setForm({ ...form, [item.key]: val });
                  }}
                  className={`w-full bg-white text-[#1A2F24] text-base font-semibold px-4 py-3.5 rounded-xl focus:outline-none border shadow-sm transition-all ${
                    +form[item.key as keyof typeof form] <= 0
                      ? "border-red-500"
                      : "border-transparent focus:border-[#084C3A]"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Hoạt động & Mục tiêu (Giữ nguyên UI của bạn) */}
          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              MỨC ĐỘ HOẠT ĐỘNG
            </label>
            <div className="relative">
              <select
                value={form.activityLevel}
                onChange={(e) =>
                  setForm({ ...form, activityLevel: +e.target.value })
                }
                className="w-full bg-white text-sm font-semibold py-4 pl-4 pr-10 rounded-xl appearance-none focus:outline-none border border-transparent focus:border-[#084C3A] shadow-sm"
              >
                {activityLevels.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              MỤC TIÊU CỦA BẠN
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "lose", l: "Giảm cân", icon: TrendingDown },
                { v: "maintain", l: "Duy trì", icon: Scale },
                { v: "gain", l: "Tăng cân", icon: TrendingUp },
              ].map((g) => (
                <button
                  key={g.v}
                  type="button"
                  onClick={() => setForm({ ...form, goal: g.v as any })}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    form.goal === g.v
                      ? "bg-[#E6F4EA] border-[#084C3A] text-[#084C3A]"
                      : "bg-white border-transparent text-[#1A2F24] shadow-sm"
                  }`}
                >
                  <g.icon
                    className={`w-5 h-5 mb-2 ${form.goal === g.v ? "text-[#084C3A]" : "text-gray-500"}`}
                  />
                  <span className="text-[11px] font-bold">{g.l}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hiển thị lỗi nếu có (Task 24 requirement) */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Results Display */}
          <div className="relative overflow-hidden bg-[#F2F8F4] p-6 rounded-2xl border border-[#E3EFE8]">
            <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[130px] text-[#084C3A] opacity-[0.04] pointer-events-none transform -rotate-12">
              energy_savings_leaf
            </span>
            <div className="relative z-10 mb-4">
              <p className="text-[11px] font-bold text-[#4A6355] uppercase tracking-wide mb-1">
                NHU CẦU DINH DƯỠNG DỰ TÍNH
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#084C3A] font-numbers">
                  {error ? "--" : results.calories.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-[#084C3A]">
                  kcal / ngày
                </span>
              </div>
            </div>

            <div className="border-t border-[#D5E6DC]/80 pt-5 grid grid-cols-3 gap-2 relative z-10">
              {/* Render Macros... */}
              {[
                {
                  label: "Tinh bột",
                  val: results.carbs,
                  icon: "bakery_dining",
                  color: "#A05E2C",
                  bg: "#F4EBE1",
                },
                {
                  label: "Đạm",
                  val: results.protein,
                  icon: "set_meal",
                  color: "#3B7254",
                  bg: "#E3EFE8",
                },
                {
                  label: "Chất béo",
                  val: results.fat,
                  icon: "egg_alt",
                  color: "#4C8F62",
                  bg: "#E8F3EA",
                },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center`}
                      style={{ backgroundColor: m.bg }}
                    >
                      <span
                        className="material-symbols-outlined filled-icon text-[12px]"
                        style={{ color: m.color }}
                      >
                        {m.icon}
                      </span>
                    </div>
                    <p className="text-[12px] font-bold text-[#4A6355]">
                      {m.label}
                    </p>
                  </div>
                  <p className="text-[22px] font-black text-[#1A2F24] font-numbers leading-none">
                    {error ? "0" : m.val}g
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!!error}
              className="w-full py-4 bg-[#084C3A] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#063B2D] transition-all shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Bắt đầu ngay <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
