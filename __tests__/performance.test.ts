import { debounce, throttle, memoize } from '@/lib/performance';

describe('Performance Utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('debounce', () => {
    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should only call function once for multiple rapid calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('call1');
      debouncedFn('call2');
      debouncedFn('call3');

      jest.advanceTimersByTime(1000);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call3'); // Should use last call's args
    });

    it('should reset timer on each call', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('test');
      jest.advanceTimersByTime(500);

      debouncedFn('test2'); // Reset timer
      jest.advanceTimersByTime(500);

      expect(mockFn).not.toHaveBeenCalled(); // Not called yet

      jest.advanceTimersByTime(500);
      expect(mockFn).toHaveBeenCalledWith('test2');
    });
  });

  describe('throttle', () => {
    it('should call function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn('test');
      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should ignore calls within throttle period', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn('call1');
      throttledFn('call2'); // Should be ignored
      throttledFn('call3'); // Should be ignored

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call1');
    });

    it('should allow calls after throttle period', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn('call1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      throttledFn('call2');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith('call2');
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      const mockFn = jest.fn((x: number) => x * 2);
      const memoizedFn = memoize(mockFn);

      const result1 = memoizedFn(5);
      const result2 = memoizedFn(5);

      expect(result1).toBe(10);
      expect(result2).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1); // Called only once
    });

    it('should call function again for different arguments', () => {
      const mockFn = jest.fn((x: number) => x * 2);
      const memoizedFn = memoize(mockFn);

      memoizedFn(5);
      memoizedFn(10);

      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should work with complex objects as arguments', () => {
      const mockFn = jest.fn((obj: { a: number }) => obj.a * 2);
      const memoizedFn = memoize(mockFn);

      const obj = { a: 5 };
      memoizedFn(obj);
      memoizedFn(obj);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple arguments', () => {
      const mockFn = jest.fn((a: number, b: number) => a + b);
      const memoizedFn = memoize(mockFn);

      const result1 = memoizedFn(2, 3);
      const result2 = memoizedFn(2, 3);

      expect(result1).toBe(5);
      expect(result2).toBe(5);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should differentiate between different argument combinations', () => {
      const mockFn = jest.fn((a: number, b: number) => a + b);
      const memoizedFn = memoize(mockFn);

      memoizedFn(2, 3);
      memoizedFn(3, 2);

      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
