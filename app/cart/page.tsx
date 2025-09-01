"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart, getSubtotal } = useCart()
  const subtotal = getSubtotal()

  return (
    <div className="min-h-screen bg-cream-white/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm" className="text-organic-green">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-organic-green">Shopping Cart</h1>
          {cart.totalItems > 0 && (
            <Badge variant="secondary" className="text-sm">
              {cart.totalItems} {cart.totalItems === 1 ? "item" : "items"}
            </Badge>
          )}
        </div>

        {cart.items.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center py-20"
          >
            <div className="relative mb-8">
              <ShoppingBag className="w-24 h-24 text-earth-brown/30" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-organic-green/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-organic-green">0</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-organic-green mb-4">Your cart is empty</h2>
            <p className="text-earth-brown/70 max-w-md mb-8">
              Looks like you haven't added any organic products to your cart yet. Browse our selection of premium organic goods!
            </p>
            <Link href="/products">
              <Button className="bg-organic-green hover:bg-organic-green/90 text-white px-8 py-3 rounded-full text-lg font-semibold">
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-xl shadow-sm border border-organic-green/10 p-6">
                <h3 className="text-lg font-semibold text-organic-green mb-4">Your Items</h3>
                
                <div className="space-y-4">
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.variantId}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-cream-white/30 rounded-lg hover:bg-cream-white/50 transition-colors duration-300"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-organic-green text-base truncate">
                              {item.name}
                            </h4>
                            {item.variantId && (
                              <p className="text-sm text-earth-brown/70 mt-1">
                                Variant: {item.variantId}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs border-organic-green/30 text-organic-green">
                                {item.weight}
                              </Badge>
                              {item.discount && (
                                <Badge className="text-xs bg-red-100 text-red-700 border-red-200">
                                  -{item.discount}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-earth-brown/60 hover:text-red-500 hover:bg-red-50 rounded-full"
                            onClick={() => removeItem(item.productId, item.variantId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-organic-green text-lg">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-earth-brown/60 text-sm line-through">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 border-organic-green/30 text-organic-green hover:bg-organic-green/10 rounded-full"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-medium text-organic-green">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 border-organic-green/30 text-organic-green hover:bg-organic-green/10 rounded-full"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                              disabled={item.quantity >= (item.maxQuantity || 10)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="mt-6 pt-6 border-t border-organic-green/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-earth-brown/30 text-earth-brown hover:bg-earth-brown/10"
                    onClick={clearCart}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-sm border border-organic-green/10 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-organic-green mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-earth-brown font-medium">Subtotal:</span>
                    <span className="font-bold text-organic-green text-lg">{subtotal}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-earth-brown font-medium">Shipping:</span>
                    <span className="font-medium text-organic-green">Free</span>
                  </div>

                  {/* Divider */}
                  <Separator className="my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-organic-green">Total:</span>
                    <span className="text-xl font-bold text-organic-green">{subtotal}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-3 rounded-full transition-all duration-300 mt-6">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Continue Shopping */}
                  <Link href="/products">
                    <Button variant="ghost" className="w-full text-organic-green hover:bg-organic-green/10 mt-3">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}