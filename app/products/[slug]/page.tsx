"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, Eye, Clock, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { categoryData } from "@/lib/product-data"
import { getProducts } from "@/lib/firebase-products"
import { getCategoryBySlug } from "@/lib/firebase-categories"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ProductDetail as FirebaseProductDetail } from "@/lib/types"

interface ProductVariant {
  id: string
  name: string
  price: string
  originalPrice?: string
  weight: string
  inStock: boolean
  discount?: number
}

interface ProductDetail {
  id: number
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
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<FirebaseProductDetail | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<FirebaseProductDetail[]>([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const firebaseProducts = await getProducts()
        
        // Find the product by slug
        const foundProduct = firebaseProducts.find(p =>
          p.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === slug
        )
        
        if (foundProduct) {
          setProduct(foundProduct)
          
          // Find the category for this product
          const categorySlug = foundProduct.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
          const fetchedCategory = await getCategoryBySlug(categorySlug)
          setCategory(fetchedCategory)
          
          // Find related products (same category, different products)
          const related = firebaseProducts
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [showStockNotification, setShowStockNotification] = useState(false)
  
  // Update selected variant when product changes
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0])
    } else {
      setSelectedVariant(null)
    }
  }, [product])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-organic-green mx-auto mb-4"></div>
          <p className="text-earth-brown text-xl">Loading product...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-organic-green hover:bg-organic-green/90 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-organic-green mb-4">Product Not Found</h1>
          <p className="text-earth-brown mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-organic-green hover:bg-organic-green/90 text-white">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleStockNotification = () => {
    setShowStockNotification(true)
    setTimeout(() => setShowStockNotification(false), 3000)
  }

  const getStockStatusBadge = () => {
    switch (product.stockStatus) {
      case "in-stock":
        return <Badge className="bg-green-500 text-white">In Stock</Badge>
      case "low-stock":
        return <Badge className="bg-yellow-500 text-white">Low Stock</Badge>
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-earth-brown">
          <Link href="/" className="hover:text-organic-green transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-organic-green transition-colors">
            Products
          </Link>
          <span>/</span>
          <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`} className="hover:text-organic-green transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-organic-green font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Stock Notification */}
      <AnimatePresence>
        {showStockNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-green-500 text-white border-0 shadow-lg px-6 py-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Thank you! We'll notify you when this product is back in stock.</span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={product.images?.[selectedImageIndex] || product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Stock Status Overlay */}
                {product.stockStatus === "out-of-stock" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    {getStockStatusBadge()}
                  </div>
                )}
                
                {/* Discount Badge */}
                {product.discount && product.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white font-semibold text-lg px-4 py-2">
                    -{product.discount}%
                  </Badge>
                )}

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : (product.images?.length || 1) - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-organic-green rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev < (product.images?.length || 1) - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-organic-green rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Enhanced Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        selectedImageIndex === index
                          ? 'border-organic-green scale-105'
                          : 'border-transparent hover:border-organic-green'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="w-full h-full object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Enhanced Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link
                    href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`}
                    className="text-sm text-earth-brown hover:text-organic-green transition-colors"
                  >
                    ← Back to {product.category}
                  </Link>
                  <Badge variant="outline" className="border-organic-green/30 text-organic-green">
                    {product.category}
                  </Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-organic-green mb-4">{product.name}</h1>
                


                {/* Enhanced Description */}
                <div className="space-y-4 mb-6">
                  <p className="text-xl text-earth-brown leading-relaxed">{product.description}</p>
                  {product.detailedDescription && (
                    <p className="text-earth-brown leading-relaxed">{product.detailedDescription}</p>
                  )}
                </div>

                {/* Enhanced Price */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-organic-green">
                      {selectedVariant?.price || product.price}
                    </span>
                    {(selectedVariant?.originalPrice || product.originalPrice) && (
                      <span className="text-xl text-earth-brown line-through">
                        {selectedVariant?.originalPrice || product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-organic-green">
                    {selectedVariant?.weight || product.weight}
                  </Badge>
                  {getStockStatusBadge()}
                </div>

                {/* Product Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-organic-green mb-3">Select Variant:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            selectedVariant?.id === variant.id
                              ? 'border-organic-green bg-organic-green/5'
                              : 'border-gray-200 hover:border-organic-green'
                          } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!variant.inStock}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-organic-green">{variant.name}</span>
                            {variant.discount && variant.discount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">
                                -{variant.discount}%
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-organic-green">{variant.price}</span>
                            <span className="text-sm text-earth-brown">{variant.weight}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Features */}
                {product.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-organic-green mb-3">Key Features:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-organic-green/30 text-organic-green"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Benefits */}
                {product.benefits && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-organic-green mb-3">Health Benefits:</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-earth-brown">
                          <span className="text-organic-green mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Enhanced Actions */}
                <div className="flex gap-4 mb-8">
                  <Button
                    className="flex-1 bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-50"
                    disabled={selectedVariant?.inStock === false || product.stockStatus === "out-of-stock"}
                    onClick={() => {
                      if (product.stockStatus === "out-of-stock") {
                        handleStockNotification()
                      } else {
                        window.open(`https://wa.me/919876543210?text=Hi! I'm interested in ${product.name}`, "_blank")
                      }
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {product.stockStatus === "out-of-stock"
                      ? "Notify When Available"
                      : "Inquire on WhatsApp"
                    }
                  </Button>
                  
                  <Button variant="outline" size="icon" className="border-organic-green text-organic-green hover:bg-organic-green hover:text-white">
                    <Heart className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="border-organic-green text-organic-green hover:bg-organic-green hover:text-white">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Enhanced Product Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 bg-gradient-to-r from-organic-green/10 to-organic-green/5 border-organic-green/20">
                    <div className="flex items-center gap-3">
                      <Truck className="w-8 h-8 text-organic-green" />
                      <div>
                        <h4 className="font-semibold text-organic-green">Free Shipping</h4>
                        <p className="text-sm text-earth-brown">On orders over ₹999</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-r from-organic-green/10 to-organic-green/5 border-organic-green/20">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-organic-green" />
                      <div>
                        <h4 className="font-semibold text-organic-green">Quality Guarantee</h4>
                        <p className="text-sm text-earth-brown">100% organic certified</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-r from-organic-green/10 to-organic-green/5 border-organic-green/20">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-organic-green" />
                      <div>
                        <h4 className="font-semibold text-organic-green">Fast Delivery</h4>
                        <p className="text-sm text-earth-brown">2-3 business days</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Category Info Card */}
                {category && (
                  <Card className="p-6 bg-gradient-to-r from-organic-green/10 to-organic-green/5 border-organic-green/20">
                    <h3 className="font-semibold text-organic-green mb-3">About {category.name}</h3>
                    <p className="text-earth-brown mb-3">{category.description}</p>

                  </Card>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-cream-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-organic-green text-center mb-12">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/products/${relatedProduct.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white h-full">
                      <div className="relative overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        {relatedProduct.badge && (
                          <Badge className="absolute top-3 left-3 bg-golden-honey text-organic-green font-semibold">
                            {relatedProduct.badge}
                          </Badge>
                        )}
                        {!relatedProduct.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive" className="text-sm px-3 py-1">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-bold text-organic-green mb-2 group-hover:text-golden-honey transition-colors duration-300 line-clamp-2">
                          {relatedProduct.name}
                        </h3>

                        <p className="text-earth-brown mb-3 text-sm leading-relaxed line-clamp-2">
                          {relatedProduct.description}
                        </p>



                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-organic-green">{relatedProduct.price}</span>
                            {relatedProduct.originalPrice && (
                              <span className="text-earth-brown line-through text-xs">{relatedProduct.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-2 rounded-full transition-all duration-300 disabled:opacity-50"
                          disabled={!relatedProduct.inStock}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}