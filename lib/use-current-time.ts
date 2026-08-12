'use client';

import { useEffect, useState } from 'react';

export function useCurrentTime(refreshInterval = 60_000) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    refresh();
    const timer = window.setInterval(refresh, refreshInterval);
    return () => window.clearInterval(timer);
  }, [refreshInterval]);

  return now;
}
