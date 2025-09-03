"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { getProducts } from "@/lib/firebase-products"
import { ProductDetail } from "@/lib/types"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const firebaseProducts = await getProducts()
        // Get first 3 products as featured
        setFeaturedProducts(firebaseProducts.slice(0, 3))
      } catch (err) {
        console.error("Error fetching featured products:", err)
        setError("Failed to load featured products.")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-organic-green mb-6">Featured Products</h2>
            <p className="text-earth-brown text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our most popular organic products, carefully selected for their exceptional quality and purity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="h-full bg-gray-200 animate-pulse rounded-lg">
                <div className="h-64 bg-gray-300 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-organic-green mb-6">Featured Products</h2>
          <p className="text-earth-brown text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our most popular organic products, carefully selected for their exceptional quality and purity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`}>
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-b from-white to-cream-white/30 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-golden-honey text-organic-green font-semibold">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-earth-brown font-medium">{product.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-organic-green mb-2 group-hover:text-golden-honey transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-earth-brown mb-4 text-sm leading-relaxed">{product.description}</p>



                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-organic-green">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-earth-brown line-through text-sm">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                    onClick={() =>
                      window.open(`https://wa.me/1234567890?text=Hi! I'm interested in ${product.name}`, "_blank")
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Inquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-organic-green text-organic-green hover:bg-organic-green hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent"
            onClick={() => window.location.href = "/products"}
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}