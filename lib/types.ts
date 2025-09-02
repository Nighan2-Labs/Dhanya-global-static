// Product Types
export interface ProductVariant {
  id: string
  name: string
  price: string
  originalPrice?: string
  weight: string
  inStock: boolean
  discount?: number
  sku?: string
  quantity?: number
}

export interface ProductDetail {
  id: number | string  // Allow both number and string for Firebase compatibility
  name: string
  category: string
  price: string
  originalPrice?: string
  image: string
  images?: string[]
  rating: number
  reviews: number
  badge?: string
  description: string
  detailedDescription?: string
  inStock: boolean
  weight: string
  features: string[]
  specifications?: Record<string, string>
  benefits?: string[]
  variants?: ProductVariant[]
  discount?: number
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock"
  estimatedRestock?: string
  shippingInfo?: {
    freeShipping: boolean
    shippingTime: string
    returnPolicy: string
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    faqs?: Array<{
      question: string
      answer: string
    }>
  }
  createdAt?: Date
  updatedAt?: Date
  popularity?: number
  tags?: string[]
}

// Category Types
export interface CategoryData {
  [key: string]: {
    name: string
    description: string
    detailedDescription?: string
    image: string
    heroImage?: string
    productCount: number
    priceRange: string
    avgRating: number
    highlights: string[]
    benefits: string[]
    qualityStandards: string[]
    slug: string
    seo?: {
      title?: string
      description?: string
      keywords?: string[]
    }
  }
}

// Add a specific type for Firebase categories
export interface FirebaseCategory {
  id: string
  name: string
  description: string
  detailedDescription?: string
  image: string
  heroImage?: string
  productCount: number
  priceRange: string
  avgRating: number
  highlights: string[]
  benefits: string[]
  qualityStandards: string[]
  slug: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

// Cart Types
export interface CartItem {
  productId: number
  variantId?: string
  name: string
  price: string
  originalPrice?: string
  image: string
  weight: string
  quantity: number
  maxQuantity?: number
  inStock: boolean
  discount?: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: string
  originalTotalPrice?: string
  discountAmount?: string
  lastUpdated: Date
}

// Search and Filter Types
export interface SearchFilters {
  query: string
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  ratings: number[]
  inStockOnly: boolean
  features: string[]
  tags: string[]
  sortBy: "name" | "price-low" | "price-high" | "rating" | "popularity" | "newest"
  sortOrder: "asc" | "desc"
}

export interface SearchResult {
  products: ProductDetail[]
  totalCount: number
  facets: {
    categories: Array<{
      name: string
      count: number
    }>
    priceRange: {
      min: number
      max: number
    }
    ratings: Array<{
      rating: number
      count: number
    }>
    features: Array<{
      name: string
      count: number
    }>
  }
}

// Comparison Types
export interface ComparisonItem {
  productId: number
  product: ProductDetail
  checked: boolean
}

export interface ComparisonData {
  items: ComparisonItem[]
  maxItems: number
  attributes: string[]
}

// Analytics Types
export interface AnalyticsEvent {
  event: string
  data: {
    [key: string]: any
  }
  timestamp: Date
  userId?: string
  sessionId?: string
}

export interface SearchAnalytics {
  query: string
  resultsCount: number
  filtersApplied: SearchFilters
  timeTaken: number
  clickedProducts?: number[]
  timestamp: Date
}

export interface FilterAnalytics {
  filterType: string
  filterValue: any
  productsBefore: number
  productsAfter: number
  timestamp: Date
}

// UI Types
export interface ToastMessage {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
}

export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  timestamp: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  success: boolean
}

// User Types
export interface User {
  id?: string
  name?: string
  email?: string
  phone?: string
  preferences?: {
    currency?: string
    language?: string
    notifications?: boolean
    theme?: "light" | "dark" | "auto"
  }
  lastSearch?: SearchFilters
  favoriteProducts?: number[]
  cartId?: string
}

// Local Storage Types
export interface LocalStorageData {
  cart: Cart
  comparison: ComparisonData
  searchHistory: string[]
  filters: SearchFilters
  userPreferences: User["preferences"]
  viewedProducts: number[]
}

// Error Types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, "VALIDATION_ERROR", 400, details)
    this.name = "ValidationError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404)
    this.name = "NotFoundError"
  }
}

export class NetworkError extends AppError {
  constructor(message: string = "Network error occurred") {
    super(message, "NETWORK_ERROR", 0)
    this.name = "NetworkError"
  }
}

// Performance Types
export interface PerformanceMetrics {
  renderTime: number
  componentLoadTime: number
  apiResponseTime: number
  memoryUsage?: number
  bundleSize?: number
}

// Feature Flags
export interface FeatureFlags {
  enableCart: boolean
  enableComparison: boolean
  enableSearch: boolean
  enableAdvancedFilters: boolean
  enableAnalytics: boolean
  enableWishlist: boolean
  enableReviews: boolean
  enableQuickView: boolean
}

// Environment Configuration
export interface EnvironmentConfig {
  apiUrl: string
  isDevelopment: boolean
  isProduction: boolean
  analyticsEnabled: boolean
  debugMode: boolean
  featureFlags: FeatureFlags
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableCart: true,
  enableComparison: true,
  enableSearch: true,
  enableAdvancedFilters: true,
  enableAnalytics: true,
  enableWishlist: true,
  enableReviews: true,
  enableQuickView: true,
}