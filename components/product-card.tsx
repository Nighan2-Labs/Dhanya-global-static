import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"
import { ProductDetail } from "@/lib/types"

interface ProductCardProps {
  product: ProductDetail
  showCategory?: boolean
  showWeight?: boolean
  showFeatures?: boolean
  className?: string
  showAddToCart?: boolean
}

export default function ProductCard({
  product,
  showCategory = true,
  showWeight = true,
  showFeatures = true,
  className = "",
  showAddToCart = true
}: ProductCardProps) {
  const { addItem, isInCart } = useCart()
  
  // Generate product slug for URL
  const productSlug = product.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Link href={`/products/${productSlug}`}>
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white h-full cursor-pointer">
        <div className="relative overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-golden-honey text-organic-green font-semibold">
              {product.badge}
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.discount && product.discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white font-semibold">
              -{product.discount}%
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex-grow">
            {showCategory && (
              <div className="text-sm text-earth-brown font-medium mb-1">{product.category}</div>
            )}
            
            <h3 className="font-bold text-organic-green mb-2 group-hover:text-golden-honey transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            <p className="text-earth-brown mb-3 text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>



            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-organic-green">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-earth-brown line-through text-xs">{product.originalPrice}</span>
                )}
              </div>
              {showWeight && product.weight && (
                <span className="text-xs text-earth-brown bg-cream-white px-2 py-1 rounded">
                  {product.weight}
                </span>
              )}
            </div>

            {showFeatures && product.features && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-organic-green/30 text-organic-green"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-auto">
            {showAddToCart && product.inStock && (
              <Button
                className="flex-1 bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-2 rounded-full transition-all duration-300 disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  addItem(product)
                }}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
              </Button>
            )}
            <Button
              className="flex-1 bg-earth-brown hover:bg-earth-brown/90 text-white font-semibold py-2 rounded-full transition-all duration-300 disabled:opacity-50"
              disabled={!product.inStock}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(`https://wa.me/919876543210?text=Hi! I'm interested in ${product.name}`, "_blank")
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {product.inStock ? "Inquire" : "Notify"}
            </Button>
          </div>
        </CardContent>
      </Card>
      </Link>
    </motion.div>
  )
}