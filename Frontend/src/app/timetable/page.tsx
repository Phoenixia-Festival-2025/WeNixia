'use client';

import { Suspense } from 'react';
import TimeTablePageClient from '@/components/timetable/TimeTablePageClient';

export default function TimeTablePage() {
  return (
    <Suspense fallback={<div className="p-4">로딩 중...</div>}>
      <TimeTablePageClient />
    </Suspense>
  );
}