"use client"

import { useCart } from "@/lib/cart-context"
import { ShoppingCart, BaggageClaim } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CartIconProps {
  className?: string
  showCount?: boolean
  size?: "sm" | "md" | "lg"
}

export default function CartIcon({ className = "", showCount = true, size = "md" }: CartIconProps) {
  const { getTotalItems, getSubtotal } = useCart()
  const totalItems = getTotalItems()
  const subtotal = getSubtotal()

  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  const buttonSizeClasses = {
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3"
  }

  const badgeSizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-2.5 py-1"
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`relative ${buttonSizeClasses[size]} ${className}`}
      onClick={() => {
        // TODO: Open cart drawer/modal
        console.log("Open cart")
      }}
    >
      <ShoppingCart className={`${sizeClasses[size]} text-organic-green`} />
      
      {showCount && totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className={`absolute -top-2 -right-2 ${badgeSizeClasses[size]} bg-red-500 text-white border-none shadow-md`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
      
      {size === "lg" && totalItems > 0 && (
        <div className="absolute -bottom-1 -right-1 text-xs text-earth-brown font-medium whitespace-nowrap">
          {subtotal}
        </div>
      )}
    </Button>
  )
}