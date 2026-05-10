"use client";

import { useState, useEffect } from "react";
import { ArrowRight, TrendingDown, Scale, TrendingUp, ChevronDown } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";
import type { UserProfile } from "@/types";

const activityLevels = [
  { value: 1.2,   label: 'Ít vận động (ngồi nhiều)' },
  { value: 1.375, label: 'Vận động nhẹ (1-3 buổi/tuần)' },
  { value: 1.55,  label: 'Vận động vừa (3-5 buổi/tuần)' },
  { value: 1.725, label: 'Vận động nhiều (6-7 buổi/tuần)' },
  { value: 1.9,   label: 'Vận động rất nhiều' },
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

  // Tính TDEE Real-time
  useEffect(() => {
    const w = +form.weight;
    const h = +form.height;
    const a = +form.age;

    if (!w || !h || !a) return;

    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = form.gender === "male" ? bmr + 5 : bmr - 161;

    let tdee = bmr * form.activityLevel;

    if (form.goal === "lose") tdee -= 500;
    if (form.goal === "gain") tdee += 500;

    const finalCal = Math.round(tdee);
    const protein  = Math.round((finalCal * 0.3) / 4);
    const fat      = Math.round((finalCal * 0.25) / 9);
    const carbs    = Math.round((finalCal * 0.45) / 4);

    setResults({ calories: finalCal, protein, carbs, fat });
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: UserProfile = {
      name: "Người dùng",
      age: +form.age,
      weight: +form.weight,
      height: +form.height,
      goal: form.goal,
      macroTarget: {
        calories: results.calories,
        protein:  results.protein,
        carbs:    results.carbs,
        fat:      results.fat,
      },
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
            Hãy bắt đầu hành trình của<br />bạn
          </h1>
          <p className="text-sm text-[#1A2F24] font-medium">
            Chúng tôi sẽ tính lượng calo phù hợp với<br />cơ thể bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              Giới tính
            </label>
            <div className="flex bg-[#EAEFEA] p-1 rounded-xl">
              {['male', 'female'].map((g) => (
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
                  {g === 'male' ? 'Nam' : 'Nữ'}
                </button>
              ))}
            </div>
          </div>

          {/* Tuổi, Cao, Nặng */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'age',    label: 'TUỔI'      },
              { key: 'height', label: 'CAO (CM)'   },
              { key: 'weight', label: 'NẶNG (KG)'  },
            ].map((item) => (
              <div key={item.key}>
                <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
                  {item.label}
                </label>
                <input
                  type="number"
                  value={form[item.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [item.key]: e.target.value })}
                  className="w-full bg-white text-[#1A2F24] text-base font-semibold px-4 py-3.5 rounded-xl focus:outline-none border border-transparent focus:border-[#084C3A] shadow-sm transition-all"
                />
              </div>
            ))}
          </div>

          {/* Mức độ hoạt động */}
          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              MỨC ĐỘ HOẠT ĐỘNG
            </label>
            <div className="relative">
              <select
                value={form.activityLevel}
                onChange={(e) => setForm({ ...form, activityLevel: +e.target.value })}
                className="w-full bg-white text-[#1A2F24] text-sm font-semibold py-4 pl-4 pr-10 rounded-xl appearance-none focus:outline-none border border-transparent focus:border-[#084C3A] shadow-sm transition-all"
              >
                {activityLevels.map((a) => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Mục tiêu */}
          <div>
            <label className="block text-sm font-bold text-[#084C3A] uppercase tracking-wide mb-2">
              MỤC TIÊU CỦA BẠN
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: 'lose',     l: 'Giảm cân', icon: TrendingDown },
                { v: 'maintain', l: 'Duy trì',  icon: Scale        },
                { v: 'gain',     l: 'Tăng cân', icon: TrendingUp   },
              ].map((g) => (
                <button
                  key={g.v}
                  type="button"
                  onClick={() => setForm({ ...form, goal: g.v as "lose" | "maintain" | "gain" })}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    form.goal === g.v
                      ? "bg-[#E6F4EA] border-[#084C3A] text-[#084C3A]"
                      : "bg-white border-transparent text-[#1A2F24] shadow-sm hover:border-[#E0E7E3]"
                  }`}
                >
                  <g.icon className={`w-5 h-5 mb-2 ${form.goal === g.v ? 'text-[#084C3A]' : 'text-gray-500'}`} />
                  <span className="text-[11px] font-bold">{g.l}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Nhu cầu dinh dưỡng dự tính — UI MỚI ── */}
          <div className="relative overflow-hidden bg-[#F2F8F4] p-6 rounded-2xl border border-[#E3EFE8] transition-all">
            {/* Watermark chiếc lá in chìm ở góc phải */}
            <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[130px] text-[#084C3A] opacity-[0.04] pointer-events-none transform -rotate-12">
              energy_savings_leaf
            </span>

            <div className="relative z-10 mb-4">
              <p className="text-[11px] font-bold text-[#4A6355] uppercase tracking-wide mb-1">
                NHU CẦU DINH DƯỠNG DỰ TÍNH
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#084C3A] font-numbers tracking-tight">
                  {results.calories.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-[#084C3A]">kcal / ngày</span>
              </div>
            </div>

            <div className="border-t border-[#D5E6DC]/80 pt-5 grid grid-cols-3 gap-2 relative z-10">
              {/* Tinh bột */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#F4EBE1] flex items-center justify-center">
                    <span className="material-symbols-outlined filled-icon text-[12px] text-[#A05E2C]">
                      bakery_dining
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-[#4A6355]">Tinh bột</p>
                </div>
                <p className="text-[22px] font-black text-[#1A2F24] font-numbers leading-none">
                  {results.carbs}g
                </p>
              </div>

              {/* Đạm */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#E3EFE8] flex items-center justify-center">
                    <span className="material-symbols-outlined filled-icon text-[12px] text-[#3B7254]">
                      set_meal
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-[#4A6355]">Đạm</p>
                </div>
                <p className="text-[22px] font-black text-[#1A2F24] font-numbers leading-none">
                  {results.protein}g
                </p>
              </div>

              {/* Chất béo */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#E8F3EA] flex items-center justify-center">
                    <span className="material-symbols-outlined filled-icon text-[12px] text-[#4C8F62]">
                      egg_alt
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-[#4A6355]">Chất béo</p>
                </div>
                <p className="text-[22px] font-black text-[#1A2F24] font-numbers leading-none">
                  {results.fat}g
                </p>
              </div>
            </div>
          </div>

          {/* Button Bắt đầu ngay */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-[#084C3A] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#063B2D] transition-all shadow-md active:scale-[0.98]"
            >
              Bắt đầu ngay <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}