import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from 'date-fns'
import { ProductDetail, CartItem, SearchFilters, ComparisonData, LocalStorageData } from './types'

// Utility function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce utility for search and other input handlers
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Currency formatting
export function formatPrice(price: string | number): string {
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
    : price
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice)
}

// Price range formatting
export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`
}

// Date formatting utilities
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMMM dd, yyyy')
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

// Search and filter utilities
export function createSearchIndex(products: ProductDetail[]): Map<string, ProductDetail[]> {
  const searchIndex = new Map<string, ProductDetail[]>()
  
  products.forEach(product => {
    const searchableText = [
      product.name,
      product.description,
      product.detailedDescription,
      product.category,
      ...(product.features || []),
      ...(product.benefits || []),
      ...(Object.keys(product.specifications || {})),
      ...(Object.values(product.specifications || {})),
      ...(product.tags || [])
    ].join(' ').toLowerCase()
    
    // Split into words and add to index
    const words = searchableText.split(/\s+/).filter(word => word.length > 2)
    const uniqueWords = [...new Set(words)]
    
    uniqueWords.forEach(word => {
      if (!searchIndex.has(word)) {
        searchIndex.set(word, [])
      }
      searchIndex.get(word)!.push(product)
    })
  })
  
  return searchIndex
}

// Advanced search function with fuzzy matching
export function searchProducts(
  products: ProductDetail[], 
  query: string, 
  filters?: Partial<SearchFilters>
): ProductDetail[] {
  if (!query.trim() && !filters) {
    return products
  }
  
  let filteredProducts = [...products]
  
  // Apply text search
  if (query.trim()) {
    const searchQuery = query.toLowerCase()
    filteredProducts = filteredProducts.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        product.detailedDescription,
        product.category,
        ...(product.features || []),
        ...(product.benefits || []),
        ...(product.tags || [])
      ].join(' ').toLowerCase()
      
      // Exact match first
      if (searchableText.includes(searchQuery)) {
        return true
      }
      
      // Fuzzy matching for partial matches
      const words = searchQuery.split(' ')
      return words.some(word => 
        searchableText.includes(word) || 
        levenshteinDistance(word, searchableText) < word.length * 0.3
      )
    })
  }
  
  // Apply filters
  if (filters) {
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.categories!.includes(product.category)
      )
    }
    
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max
      })
    }
    
    if (filters.ratings && filters.ratings.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.ratings!.includes(Math.floor(product.rating))
      )
    }
    
    if (filters.inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.inStock)
    }
    
    if (filters.features && filters.features.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.features!.some(feature =>
          product.features?.some(productFeature =>
            productFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      )
    }
  }
  
  return filteredProducts
}

// Levenshtein distance for fuzzy search
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
  
  for (let i = 0; i <= str1.length; i += 1) {
    matrix[0][i] = i
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    matrix[j][0] = j
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      )
    }
  }
  
  return matrix[str2.length][str1.length]
}

// Cart utilities
export function calculateCartTotal(items: CartItem[]): { total: string; originalTotal: string; discount: string } {
  const total = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    return sum + (itemPrice * item.quantity)
  }, 0)
  
  const originalTotal = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice 
      ? parseFloat(item.originalPrice.replace(/[^0-9.-]+/g, ''))
      : parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
    return sum + (originalPrice * item.quantity)
  }, 0)
  
  const discount = originalTotal - total
  
  return {
    total: formatPrice(total),
    originalTotal: formatPrice(originalTotal),
    discount: formatPrice(discount)
  }
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export function findCartItemIndex(items: CartItem[], productId: number, variantId?: string): number {
  return items.findIndex(item => 
    item.productId === productId && 
    (variantId === undefined || item.variantId === variantId)
  )
}

// Local Storage utilities
export const localStorageManager = {
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue || null
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Error reading from localStorage:`, error)
      return defaultValue || null
    }
  },
  
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage:`, error)
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing from localStorage:`, error)
    }
  },
  
  clear(): void {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error(`Error clearing localStorage:`, error)
    }
  }
}

// Analytics utilities
export const analytics = {
  trackEvent: (event: string, data?: Record<string, any>) => {
    if (typeof window === 'undefined') return
    
    // In a real application, this would send data to your analytics service
    const analyticsEvent = {
      event,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsEvent)
    } else {
      // Send to analytics service (e.g., Google Analytics, Mixpanel, etc.)
      // analyticsService.track(analyticsEvent)
    }
  },
  
  trackPageView: (page: string) => {
    analytics.trackEvent('page_view', { page })
  },
  
  trackSearch: (query: string, resultsCount: number, filters?: SearchFilters) => {
    analytics.trackEvent('search', { 
      query, 
      resultsCount, 
      filters,
      timestamp: new Date().toISOString()
    })
  },
  
  trackProductView: (productId: number, productName: string) => {
    analytics.trackEvent('product_view', { 
      productId, 
      productName,
      timestamp: new Date().toISOString()
    })
  },
  
  trackAddToCart: (productId: number, productName: string, quantity: number) => {
    analytics.trackEvent('add_to_cart', { 
      productId, 
      productName,
      quantity,
      timestamp: new Date().toISOString()
    })
  }
}

// Performance optimization utilities
export const performance = {
  measureComponent: (name: string, callback: () => void) => {
    if (typeof window === 'undefined' || !window.performance) {
      return callback()
    }
    
    const start = performance.now()
    const result = callback()
    const end = performance.now()
    
    console.log(`${name} rendered in ${end - start}ms`)
    return result
  },
  
  memoize: <T extends (...args: any[]) => any>(fn: T, keyGenerator?: (...args: Parameters<T>) => string) => {
    const cache = new Map<string, ReturnType<T>>()
    
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args)
      
      if (cache.has(key)) {
        return cache.get(key)!
      }
      
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
  }
}

// Image optimization utilities
export const imageUtils = {
  getOptimizedSrc: (src: string, width?: number, quality: number = 75): string => {
    if (!src || typeof src !== 'string') return '/placeholder.svg'
    
    // If it's an external image URL, return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }
    
    // For Next.js Image optimization, add the width parameter
    if (width) {
      const url = new URL(src, window.location.origin)
      url.searchParams.set('w', width.toString())
      url.searchParams.set('q', quality.toString())
      return url.toString()
    }
    
    return src
  },
  
  getPlaceholderSrc: (width: number = 400, height: number = 400): string => {
    return `https://image.pollinations.ai/prompt/placeholder%20product%20image%20natural%20organic?width=${width}&height=${height}`
  }
}

// URL utilities
export const urlUtils = {
  generateProductSlug: (name: string): string => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '')
  },
  
  generateCategorySlug: (name: string): string => {
    return urlUtils.generateProductSlug(name)
  },
  
  parseSearchParams: (search: string): Record<string, string> => {
    const params: Record<string, string> = {}
    const urlSearchParams = new URLSearchParams(search)
    
    for (const [key, value] of urlSearchParams.entries()) {
      params[key] = value
    }
    
    return params
  }
}

// Validation utilities
export const validators = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  isPhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  },
  
  isPrice: (price: string): boolean => {
    const priceRegex = /^�?[1-9]\d*(\.\d{1,2})?$|0?\.\d{1,2}$/
    return priceRegex.test(price)
  },
  
  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Accessibility utilities
export const accessibility = {
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('data-announcement', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    
    document.body.appendChild(announcement)
    announcement.textContent = message
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },
  
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    })
  }
}

