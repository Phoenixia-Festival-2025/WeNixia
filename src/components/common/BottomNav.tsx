'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CalendarCheck, Map, Home } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: '홈', icon: <Home size={20} />, path: '/' },
    { label: '타임테이블', icon: <CalendarCheck size={20} />, path: '/timetable' },
    { label: '부스', icon: <Map size={20} />, path: '/booth' },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full h-[72px] bg-white border-t border-gray-100 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600 font-bold' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}