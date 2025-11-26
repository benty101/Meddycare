/**
 * Performance Optimization Utilities
 */

/**
 * Lazy load a component with optional loading fallback
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = React.lazy(importFn);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Memoize expensive calculations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Prefetch data for faster navigation
 */
export async function prefetchData(url: string): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Prefetch failed for ${url}`);
    }
  } catch (error) {
    console.error('Prefetch error:', error);
  }
}

/**
 * Image optimization helper
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  quality?: number
): string {
  // For Next.js Image component
  if (!width && !quality) return src;

  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (quality) params.set('q', quality.toString());

  return `${src}?${params.toString()}`;
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Web Vitals reporting
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to analytics service
    // analytics.track('web-vital', {
    //   metric: metric.name,
    //   value: metric.value,
    //   id: metric.id,
    // });
  }
}

// Import React for lazy loading utilities
import React from 'react';
