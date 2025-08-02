"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Virgin Coconut Oil",
    category: "Coconut Oil",
    price: "₹899",
    originalPrice: "₹1,199",
    image:
      "https://image.pollinations.ai/prompt/premium%20virgin%20coconut%20oil%20glass%20jar%20organic%20natural%20lighting?width=400&height=400",
    rating: 4.9,
    reviews: 156,
    badge: "Best Seller",
    description: "Cold-pressed virgin coconut oil with natural aroma and taste",
  },
  {
    id: 2,
    name: "Raw Forest Honey",
    category: "Pure Honey",
    price: "₹649",
    originalPrice: "₹799",
    image:
      "https://image.pollinations.ai/prompt/raw%20forest%20honey%20glass%20jar%20golden%20color%20natural%20organic?width=400&height=400",
    rating: 4.8,
    reviews: 203,
    badge: "Premium",
    description: "Unprocessed raw honey directly from forest beehives",
  },
  {
    id: 3,
    name: "Organic Mixed Lentils",
    category: "Pulses & Lentils",
    price: "₹299",
    originalPrice: "₹399",
    image:
      "https://image.pollinations.ai/prompt/organic%20mixed%20lentils%20colorful%20variety%20natural%20packaging?width=400&height=400",
    rating: 4.7,
    reviews: 89,
    badge: "New",
    description: "Premium mix of organic lentils including moong, masoor, and chickpea",
  },
]

export function FeaturedProducts() {
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
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-b from-white to-cream-white/30">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-golden-honey text-organic-green font-semibold">
                    {product.badge}
                  </Badge>
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

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-golden-honey text-golden-honey" />
                      <span className="font-semibold text-organic-green">{product.rating}</span>
                    </div>
                    <span className="text-earth-brown text-sm">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-organic-green">{product.price}</span>
                      <span className="text-earth-brown line-through text-sm">{product.originalPrice}</span>
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
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
