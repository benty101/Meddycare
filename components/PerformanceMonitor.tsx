'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/performance';

/**
 * Performance monitoring component
 * Tracks Core Web Vitals and reports them
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    }).catch((error) => {
      console.error('Failed to load web-vitals:', error);
    });
  }, []);

  return null; // This component doesn't render anything
}
