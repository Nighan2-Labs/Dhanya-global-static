"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageCircle, Search, Filter } from "lucide-react"
import { products } from "@/lib/product-data"

const categories = [
  "All",
  "Coconut Oil",
  "Pure Honey",
  "Pulses & Lentils",
  "Spices & Herbs",
  "Organic Grains",
  "Dry Fruits & Nuts",
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseInt(a.price.replace("₹", "")) - Number.parseInt(b.price.replace("₹", ""))
        case "price-high":
          return Number.parseInt(b.price.replace("₹", "")) - Number.parseInt(a.price.replace("₹", ""))
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-organic-green text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://image.pollinations.ai/prompt/organic%20products%20collection%20coconut%20oil%20honey%20lentils%20natural?width=1920&height=600"
            alt="Products collection"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-cream-white/90 max-w-3xl mx-auto">
              Discover our complete range of premium organic products, each carefully selected for quality and purity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-organic-green text-white hover:bg-organic-green/90"
                      : "border-organic-green text-organic-green hover:bg-organic-green hover:text-white hover:border-organic-green"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-golden-honey text-organic-green font-semibold">
                      {product.badge}
                    </Badge>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="text-sm text-earth-brown font-medium mb-1">{product.category}</div>

                    <h3 className="font-bold text-organic-green mb-2 group-hover:text-golden-honey transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-earth-brown mb-3 text-sm leading-relaxed line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-golden-honey text-golden-honey" />
                        <span className="font-semibold text-organic-green text-sm">{product.rating}</span>
                      </div>
                      <span className="text-earth-brown text-xs">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-organic-green">{product.price}</span>
                        <span className="text-earth-brown line-through text-xs">{product.originalPrice}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-2 rounded-full transition-all duration-300 disabled:opacity-50"
                      disabled={!product.inStock}
                      onClick={() =>
                        window.open(`https://wa.me/1234567890?text=Hi! I'm interested in ${product.name}`, "_blank")
                      }
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {product.inStock ? "Inquire on WhatsApp" : "Notify When Available"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-brown text-xl">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
