'use client';

import Banner from '@/components/common/Banner';
import DaySelector from '@/components/common/DaySelector';
import MiniTimetable from '@/components/main/MiniTimetable';
import MiniNotice from '@/components/main/MiniNotice';

export default function HomePage() {
  return (
    <section className="p-4 space-y-6">
      <Banner />
      <DaySelector />
      <MiniTimetable />
      <MiniNotice />
    </section>
  );
}