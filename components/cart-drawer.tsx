"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartDrawerProps {
  trigger?: React.ReactNode
  className?: string
}

export default function CartDrawer({ trigger, className = "" }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, clearCart, getSubtotal } = useCart()
  const subtotal = getSubtotal()

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className={`relative ${className}`}>
      <ShoppingCart className="w-6 h-6 text-organic-green" />
      {cart.totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 bg-red-500 text-white border-none shadow-md text-xs px-2 py-1"
        >
          {cart.totalItems > 99 ? "99+" : cart.totalItems}
        </Badge>
      )}
    </Button>
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-organic-green flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Shopping Cart
            {cart.totalItems > 0 && (
              <Badge variant="secondary" className="text-sm">
                {cart.totalItems} {cart.totalItems === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="w-16 h-16 text-earth-brown/30 mb-4" />
              <h3 className="text-lg font-semibold text-organic-green mb-2">Your cart is empty</h3>
              <p className="text-earth-brown/70 mb-6">Add some organic products to get started!</p>
              <Link href="/products">
                <Button className="bg-organic-green hover:bg-organic-green/90 text-white">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 p-3 bg-cream-white/50 rounded-lg">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="64px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-organic-green text-sm truncate">
                          {item.name}
                        </h4>
                        {item.variantId && (
                          <p className="text-xs text-earth-brown/70 mt-1">
                            Variant: {item.variantId}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-organic-green text-sm">
                            {item.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-7 h-7 p-0 border-organic-green/30 text-organic-green hover:bg-organic-green/10"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium text-organic-green">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-7 h-7 p-0 border-organic-green/30 text-organic-green hover:bg-organic-green/10"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                              disabled={item.quantity >= (item.maxQuantity || 10)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-7 h-7 p-0 text-earth-brown/60 hover:text-red-500 hover:bg-red-50"
                              onClick={() => removeItem(item.productId, item.variantId)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="border-t border-organic-green/10 pt-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-earth-brown font-medium">Subtotal:</span>
                  <span className="font-bold text-organic-green text-lg">{subtotal}</span>
                </div>

                {/* Clear Cart Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-earth-brown/30 text-earth-brown hover:bg-earth-brown/10"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-3 rounded-full transition-all duration-300">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/products" className="block">
                  <Button variant="ghost" className="w-full text-organic-green hover:bg-organic-green/10">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}