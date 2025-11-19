'use client';

import { useEffect, useRef } from 'react';
import { logTimeSpent } from '@/app/actions';

export function TimeTracker({ userId, context }: { userId: string; context: string }) {
  const timeSpentRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTracking = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      timeSpentRef.current += 1;
    }, 1000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const sendTime = () => {
    if (timeSpentRef.current > 0) {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('durationSeconds', String(timeSpentRef.current));
      formData.append('context', context);
      
      // Use navigator.sendBeacon if available, for reliability on unload
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/log-time', formData);
      } else {
        logTimeSpent(formData);
      }
      timeSpentRef.current = 0;
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startTracking();
      } else {
        stopTracking();
        sendTime();
      }
    };
    
    // Start tracking on mount
    startTracking();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // On unmount, stop tracking and send any remaining time
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTracking();
      sendTime();
    };
  }, [userId, context]);

  return null; // This component does not render anything
}
