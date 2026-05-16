'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',      label: 'Tổng quan', icon: 'home'      },
  { href: '/diary', label: 'Nhật ký',   icon: 'menu_book' },
  { href: '/stats', label: 'Thống kê',  icon: 'bar_chart' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-[#005239]/10 h-16 lg:h-[68px] flex justify-center items-center">
      {/* max-w-7xl đồng bộ với header và main — px tăng dần theo màn hình */}
      <nav className="w-full max-w-7xl flex justify-around items-center px-4 sm:px-6 lg:px-10">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = href === '/' ? pathname === '/' : pathname?.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 lg:gap-1.5 py-2 px-4 sm:px-6 lg:px-10 rounded-2xl transition-all ${
                active
                  ? 'bg-[#caeadd] text-[#005239]'
                  : 'text-[#6f7973] hover:text-[#005239]'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {icon}
              </span>
              {/* text tăng nhẹ từ tablet+ */}
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-[0.1em] font-['Be_Vietnam_Pro']">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}