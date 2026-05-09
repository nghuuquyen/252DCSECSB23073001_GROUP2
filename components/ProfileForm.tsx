"use client";

import { useState, useMemo } from "react";
import { useProfileStore } from "@/store/profileStore";

const activityLevels = [
  { value: 1.2, label: 'Ít vận động (Văn phòng)' },
  { value: 1.375, label: 'Vận động nhẹ (1-2 buổi/tuần)' },
  { value: 1.55, label: 'Vận động vừa (3-5 buổi/tuần)' },
  { value: 1.725, label: 'Vận động nhiều (6-7 buổi/tuần)' },
  { value: 1.9, label: 'Vận động rất nhiều (Chuyên nghiệp)' },
];

export default function ProfileForm() {
  const setProfile = useProfileStore((state) => state.setProfile);

  const [form, setForm] = useState({
    name: "Người dùng mới", // Đặt tên mặc định để pass qua check rỗng
    gender: "male",
    age: 25,
    weight: 70,
    height: 175,
    activityLevel: 1.55,
    goal: "lose" as "lose" | "maintain" | "gain",
  });

  const calories = useMemo(() => {
    const bmr = form.gender === "male" 
      ? 10 * form.weight + 6.25 * form.height - 5 * form.age + 5
      : 10 * form.weight + 6.25 * form.height - 5 * form.age - 161;
    const tdee = bmr * form.activityLevel;
    const target = form.goal === "lose" ? tdee - 500 : form.goal === "gain" ? tdee + 500 : tdee;
    return Math.round(target);
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cập nhật Store - Khi Store thay đổi, app/page.tsx sẽ tự đổi sang Dashboard
    setProfile({
      name: form.name,
      age: form.age,
      weight: form.weight,
      height: form.height,
      goal: form.goal,
      macroTarget: { 
        calories, 
        protein: Math.round(calories * 0.25 / 4), 
        carbs: Math.round(calories * 0.5 / 4), 
        fat: Math.round(calories * 0.25 / 9) 
      }
    });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      
      <div className="min-h-screen w-full flex flex-col items-center py-10 bg-[#f4fbf6] font-['Be_Vietnam_Pro'] text-[#161d1a]">
        <form onSubmit={handleSubmit} className="w-full max-w-[480px] px-5 flex flex-col gap-8">
          
          <header className="flex flex-col items-center text-center gap-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#005239] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <span className="text-[#005239] text-2xl font-black tracking-tight">CaloMate</span>
            </div>
            <h1 className="text-3xl font-bold text-[#005239] tracking-tight leading-tight">Chào mừng bạn đến với CaloMate</h1>
            <p className="text-[#3f4943] text-sm mt-2 font-medium">Thiết lập mục tiêu dinh dưỡng cá nhân</p>
          </header>

          <div className="flex flex-col gap-6">
            {/* Giới tính */}
            <div className="flex flex-col gap-2">
              <span className="font-['Space_Grotesk'] text-[12px] font-bold text-[#3f4943] uppercase tracking-widest">Giới tính</span>
              <div className="grid grid-cols-2 p-1.5 bg-[#e8f0eb] rounded-2xl border border-[#bec9c1]/30">
                <button type="button" onClick={() => setForm({...form, gender: 'male'})}
                  className={`py-2.5 rounded-xl font-bold text-sm transition-all ${form.gender === 'male' ? 'bg-white text-[#005239] shadow-md' : 'text-[#3f4948]'}`}>NAM</button>
                <button type="button" onClick={() => setForm({...form, gender: 'female'})}
                  className={`py-2.5 rounded-xl font-bold text-sm transition-all ${form.gender === 'female' ? 'bg-white text-[#005239] shadow-md' : 'text-[#3f4948]'}`}>NỮ</button>
              </div>
            </div>

            {/* Chỉ số cơ thể */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { l: 'Tuổi', k: 'age' },
                { l: 'Cao (cm)', k: 'height' },
                { l: 'Nặng (kg)', k: 'weight' }
              ].map((item) => (
                <div key={item.k} className="flex flex-col gap-2">
                  <label className="font-['Space_Grotesk'] text-[11px] font-bold text-[#3f4943] uppercase text-center">{item.l}</label>
                  <input required type="number" value={(form as any)[item.k]}
                    onChange={(e) => setForm({...form, [item.k]: Number(e.target.value)})}
                    className="w-full h-14 bg-white rounded-2xl text-center font-['Space_Grotesk'] font-bold text-xl text-[#005239] border border-[#bec9c1] focus:ring-4 focus:ring-[#005239]/10 outline-none transition-all" />
                </div>
              ))}
            </div>

            {/* Vận động */}
            <div className="flex flex-col gap-2">
              <label className="font-['Space_Grotesk'] text-[11px] font-bold text-[#3f4943] uppercase">Mức độ hoạt động hằng ngày</label>
              <div className="relative">
                <select value={form.activityLevel} onChange={(e) => setForm({...form, activityLevel: Number(e.target.value)})}
                  className="w-full h-14 appearance-none bg-white rounded-2xl px-5 border border-[#bec9c1] outline-none font-bold text-[#161d1a] focus:ring-4 focus:ring-[#005239]/10">
                  {activityLevels.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#005239]">unfold_more</span>
              </div>
            </div>

            {/* Mục tiêu */}
            <div className="flex flex-col gap-2">
              <label className="font-['Space_Grotesk'] text-[11px] font-bold text-[#3f4943] uppercase">Mục tiêu sức khỏe</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: 'lose', l: 'GIẢM CÂN', i: 'trending_down' },
                  { v: 'maintain', l: 'DUY TRÌ', i: 'balance' },
                  { v: 'gain', l: 'TĂNG CÂN', i: 'trending_up' }
                ].map((goal) => (
                  <button key={goal.v} type="button" onClick={() => setForm({...form, goal: goal.v as any})}
                    className={`flex flex-col items-center justify-center py-4 rounded-2xl gap-2 border-2 transition-all ${
                      form.goal === goal.v 
                      ? 'bg-[#a5f3cd]/40 border-[#005239] shadow-inner' 
                      : 'bg-white border-transparent shadow-sm'
                    }`}>
                    <span className={`material-symbols-outlined ${form.goal === goal.v ? 'text-[#005239]' : 'text-[#3f4943]'}`}>{goal.i}</span>
                    <span className={`font-['Space_Grotesk'] text-[10px] font-black ${form.goal === goal.v ? 'text-[#005239]' : 'text-[#3f4943]'}`}>{goal.l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card kết quả */}
            <div className="bg-[#005239] p-6 rounded-[32px] flex flex-col items-center shadow-2xl shadow-[#005239]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-white text-6xl">bolt</span>
              </div>
              <span className="font-['Space_Grotesk'] text-[#a5f3cd] uppercase text-[11px] font-black tracking-[0.2em] mb-1">Target Calories</span>
              <div className="flex items-baseline gap-2">
                <span className="font-['Space_Grotesk'] text-5xl font-bold text-white tracking-tighter">{calories.toLocaleString()}</span>
                <span className="text-[#a5f3cd] font-bold italic text-sm">kcal/day</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#005239] text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-xl transition-all uppercase tracking-widest"
            >
              Bắt đầu hành trình
              <span className="material-symbols-outlined">rocket_launch</span>
            </button>
          </div>
        </form>

        {/* Nền hiệu ứng */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#f4fbf6]">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#a5f3cd]/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[0%] -left-[10%] w-[400px] h-[400px] bg-[#caeadd]/40 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </>
  );
}