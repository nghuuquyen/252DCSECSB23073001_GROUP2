'use client';

import DashboardPage from "@/components/dashboard/DashboardPage";
// Nếu mày có BottomNav dùng chung thì import vào đây, 
// nhưng tốt nhất nên để BottomNav ở file layout.tsx

export default function Page() {
  return (
    <main>
      <DashboardPage />
      {/* 
         Nếu chưa có BottomNav ở layout.tsx thì có thể tạm thời 
         gọi component BottomNav ở đây 
      */}
    </main>
  );
}