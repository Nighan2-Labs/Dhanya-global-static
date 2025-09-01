"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Cart, CartItem, ProductDetail } from './types'

// Cart context shape
interface CartContextType {
  cart: Cart
  addItem: (product: ProductDetail, variantId?: string, quantity?: number) => void
  removeItem: (productId: number, variantId?: string) => void
  updateQuantity: (productId: number, quantity: number, variantId?: string) => void
  clearCart: () => void
  isInCart: (productId: number, variantId?: string) => boolean
  getItemQuantity: (productId: number, variantId?: string) => number
  getSubtotal: () => string
  getTotalItems: () => number
}

// Initial cart state
const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: "₹0",
  lastUpdated: new Date()
}

// Cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: ProductDetail; variantId?: string; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; variantId?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; variantId?: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }

// Cart reducer
function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variantId, quantity = 1 } = action.payload
      const variant = variantId ? product.variants?.find(v => v.id === variantId) : null
      const selectedVariant = variant || {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        weight: product.weight,
        inStock: product.inStock,
        discount: product.discount
      }

      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && item.variantId === selectedVariant.id
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + quantity
            return {
              ...item,
              quantity: newQuantity,
              maxQuantity: Math.max(item.maxQuantity || 1, newQuantity)
            }
          }
          return item
        })
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: product.id,
          variantId: selectedVariant.id,
          name: selectedVariant.name,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          image: product.image,
          weight: selectedVariant.weight,
          quantity,
          maxQuantity: selectedVariant.quantity || 10,
          inStock: selectedVariant.inStock,
          discount: selectedVariant.discount
        }
        newItems = [...state.items, newItem]
      }

      // Calculate totals
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ''))
        const originalPrice = item.originalPrice ? parseFloat(item.originalPrice.replace(/[₹,]/g, '')) : price
        const discount = item.discount || 0
        const discountedPrice = originalPrice * (1 - discount / 100)
        return sum + (discountedPrice * item.quantity)
      }, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice: `₹${Math.round(totalPrice).toLocaleString()}`,
        lastUpdated: new Date()
      }
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId } = action.payload
      const newItems = state.items.filter(
        item => !(item.productId === productId && item.variantId === variantId)
      )

      // Recalculate totals
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ''))
        const originalPrice = item.originalPrice ? parseFloat(item.originalPrice.replace(/[₹,]/g, '')) : price
        const discount = item.discount || 0
        const discountedPrice = originalPrice * (1 - discount / 100)
        return sum + (discountedPrice * item.quantity)
      }, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice: `₹${Math.round(totalPrice).toLocaleString()}`,
        lastUpdated: new Date()
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantId, quantity } = action.payload
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variantId } })
      }

      const newItems = state.items.map(item => {
        if (item.productId === productId && item.variantId === variantId) {
          return {
            ...item,
            quantity,
            maxQuantity: Math.max(item.maxQuantity || 1, quantity)
          }
        }
        return item
      })

      // Recalculate totals
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ''))
        const originalPrice = item.originalPrice ? parseFloat(item.originalPrice.replace(/[₹,]/g, '')) : price
        const discount = item.discount || 0
        const discountedPrice = originalPrice * (1 - discount / 100)
        return sum + (discountedPrice * item.quantity)
      }, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice: `₹${Math.round(totalPrice).toLocaleString()}`,
        lastUpdated: new Date()
      }
    }

    case 'CLEAR_CART':
      return {
        ...initialCart,
        lastUpdated: new Date()
      }

    case 'LOAD_CART':
      return { ...action.payload }

    default:
      return state
  }
}

// Cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('dhanya-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          // Convert date strings back to Date objects
          parsedCart.lastUpdated = new Date(parsedCart.lastUpdated)
          dispatch({ type: 'LOAD_CART', payload: parsedCart })
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dhanya-cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error)
      }
    }
  }, [cart])

  // Cart actions
  const addItem = (product: ProductDetail, variantId?: string, quantity?: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variantId, quantity } })
  }

  const removeItem = (productId: number, variantId?: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } })
  }

  const updateQuantity = (productId: number, quantity: number, variantId?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isInCart = (productId: number, variantId?: string): boolean => {
    return cart.items.some(item => item.productId === productId && item.variantId === variantId)
  }

  const getItemQuantity = (productId: number, variantId?: string): number => {
    const item = cart.items.find(item => item.productId === productId && item.variantId === variantId)
    return item ? item.quantity : 0
  }

  const getSubtotal = (): string => {
    const subtotal = cart.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, ''))
      const originalPrice = item.originalPrice ? parseFloat(item.originalPrice.replace(/[₹,]/g, '')) : price
      const discount = item.discount || 0
      const discountedPrice = originalPrice * (1 - discount / 100)
      return sum + (discountedPrice * item.quantity)
    }, 0)
    return `₹${Math.round(subtotal).toLocaleString()}`
  }

  const getTotalItems = (): number => {
    return cart.totalItems
  }

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getSubtotal,
    getTotalItems
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}