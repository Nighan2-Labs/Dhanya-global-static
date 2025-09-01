import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { performance as perfUtils, debounce, throttle } from '@/lib/utils'

// Hook for measuring component performance
export function usePerformance(componentName: string) {
  const renderTime = useRef<number>(0)
  const [isSlowRender, setIsSlowRender] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const start = performance.now()
      
      return () => {
        const end = performance.now()
        renderTime.current = end - start
        
        // Flag slow renders (>100ms)
        if (renderTime.current > 100) {
          setIsSlowRender(true)
          console.warn(`Slow render detected: ${componentName} took ${renderTime.current.toFixed(2)}ms`)
        }
      }
    }
  }, [componentName])
  
  return {
    renderTime: renderTime.current,
    isSlowRender
  }
}

// Hook for memoizing expensive computations
export function useMemoized<T>(factory: () => T, deps: any[], key?: string) {
  return useMemo(factory, deps)
}

// Hook for debouncing values
export function useDebounce<T>(value: T, delay: number): T {
  return useMemo(() => value, [value, delay])
}

// Hook for throttling values
export function useThrottle<T>(value: T, limit: number): T {
  return useMemo(() => value, [value, limit])
}

// Hook for lazy loading components
export function useLazyLoad<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  } = {}
) {
  const [Component, setComponent] = useState<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])
  
  useEffect(() => {
    if (isVisible && !Component) {
      importFn().then(module => {
        setComponent(() => module.default)
      })
    }
  }, [isVisible, Component, importFn])
  
  return { Component, ref, isVisible }
}

// Hook for tracking component load time
export function useLoadTime(componentName: string) {
  const loadTime = useRef<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      loadTime.current = end - start
      setIsLoading(false)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} loaded in ${loadTime.current.toFixed(2)}ms`)
      }
    }
  }, [componentName])
  
  return {
    loadTime: loadTime.current,
    isLoading
  }
}

// Hook for optimizing scroll events
export function useOptimizedScroll(callback: () => void, options: {
  delay?: number
  throttle?: boolean
} = {}) {
  const { delay = 100, throttle = true } = options
  
  const optimizedCallback = useCallback(() => {
    if (throttle) {
      setTimeout(callback, delay)
    } else {
      callback()
    }
  }, [callback, delay, throttle])
  
  useEffect(() => {
    window.addEventListener('scroll', optimizedCallback, { passive: true })
    return () => {
      window.removeEventListener('scroll', optimizedCallback)
    }
  }, [optimizedCallback])
}

// Hook for optimizing resize events
export function useOptimizedResize(callback: () => void, options: {
  delay?: number
  throttle?: boolean
} = {}) {
  const { delay = 100, throttle = true } = options
  
  const optimizedCallback = useCallback(() => {
    if (throttle) {
      setTimeout(callback, delay)
    } else {
      callback()
    }
  }, [callback, delay, throttle])
  
  useEffect(() => {
    window.addEventListener('resize', optimizedCallback, { passive: true })
    return () => {
      window.removeEventListener('resize', optimizedCallback)
    }
  }, [optimizedCallback])
}

// Hook for tracking memory usage (if available)
export function useMemoryTracking() {
  const [memoryUsage, setMemoryUsage] = useState<{
    used?: number
    total?: number
    limit?: number
  }>({})
  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      const updateMemoryUsage = () => {
        const memory = (window as any).performance.memory
        setMemoryUsage({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        })
      }
      
      // Update memory usage every 5 seconds
      const interval = setInterval(updateMemoryUsage, 5000)
      updateMemoryUsage() // Initial update
      
      return () => clearInterval(interval)
    }
  }, [])
  
  return memoryUsage
}

// Hook for prefetching data
export function usePrefetch<T>(
  fetchFn: () => Promise<T>,
  options: {
    enabled?: boolean
    delay?: number
    condition?: boolean
  } = {}
) {
  const { enabled = true, delay = 1000, condition = true } = options
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isPrefetching, setIsPrefetching] = useState(false)
  
  useEffect(() => {
    if (!enabled || !condition) return
    
    const timer = setTimeout(() => {
      setIsPrefetching(true)
      
      fetchFn()
        .then(setData)
        .catch(setError)
        .finally(() => setIsPrefetching(false))
    }, delay)
    
    return () => clearTimeout(timer)
  }, [enabled, delay, condition, fetchFn])
  
  return { data, error, isPrefetching }
}

// Hook for image optimization
export function useImageOptimization(src: string, options: {
  width?: number
  quality?: number
  placeholder?: string
} = {}) {
  const { width, quality = 75, placeholder } = options
  
  const optimizedSrc = useMemo(() => {
    if (!src) return placeholder || '/placeholder.svg'
    
    // For external images, return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }
    
    // For Next.js images, add optimization parameters
    if (width) {
      const url = new URL(src, window.location.origin)
      url.searchParams.set('w', width.toString())
      url.searchParams.set('q', quality.toString())
      return url.toString()
    }
    
    return src
  }, [src, width, quality, placeholder])
  
  return { optimizedSrc }
}

// Hook for bundle size analysis
export function useBundleSize() {
  const [bundleSize, setBundleSize] = useState<{
    current?: number
    limit?: number
    warning?: boolean
  }>({})
  
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // This would typically be done during build time
      // For development, we'll simulate it
      const estimatedSize = 1024 * 1024 * 2 // 2MB estimate
      const limit = 1024 * 1024 * 3 // 3MB limit
      
      setBundleSize({
        current: estimatedSize,
        limit,
        warning: estimatedSize > limit
      })
    }
  }, [])
  
  return bundleSize
}

// Hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const { renderTime } = usePerformance(componentName)
  const memoryUsage = useMemoryTracking()
  const bundleSize = useBundleSize()
  const loadTime = useLoadTime(componentName)
  
  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const metrics = {
        component: componentName,
        renderTime,
        loadTime: loadTime.loadTime,
        memory: memoryUsage,
        bundleSize: bundleSize.current,
        timestamp: new Date().toISOString()
      }
      
      console.log('Performance Metrics:', metrics)
      
      // Send to analytics in production
      if (renderTime > 100) {
        console.warn(`Performance warning: ${componentName} rendered slowly (${renderTime}ms)`)
      }
    }
  }, [componentName, renderTime, loadTime, memoryUsage, bundleSize])
  
  return {
    renderTime,
    loadTime: loadTime.loadTime,
    memoryUsage,
    bundleSize,
    isLoading: loadTime.isLoading
  }
}