"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageCircle, Search, Filter } from "lucide-react"
import { getProducts } from "@/lib/firebase-products"
import { getCategories } from "@/lib/firebase-categories"
import { ProductDetail } from "@/lib/types"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import ProductCard with no SSR
const ProductCard = dynamic(() => import("@/components/product-card"), {
  loading: () => (
    <div className="h-full bg-gray-200 animate-pulse rounded-lg">
      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  ),
  ssr: false
})

// Categories will be fetched from Firebase. Start with just "All".

export default function ProductsPage({
  searchParams: { category = "all", search = "", sort = "name" } = {}
}: {
  searchParams?: {
    category?: string;
    search?: string;
    sort?: string;
  }
}) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [products, setProducts] = useState<ProductDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryOptions, setCategoryOptions] = useState<string[]>(["All"])
  
  // Initialize from search params
  useEffect(() => {
    if (category) {
      const categoryName = category === "all" ? "All" :
        categoryOptions.find(cat => cat.toLowerCase().replace(/\s+/g, "-") === category) || "All"
      setSelectedCategory(categoryName)
    }
    if (search) setSearchTerm(search)
    if (sort) setSortBy(sort)
  }, [category, search, sort, categoryOptions])

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await getCategories()
        const names = fetched.map(c => c.name).filter(Boolean)
        setCategoryOptions(["All", ...names])
      } catch (err) {
        // If categories fail to load, keep only "All"
        console.error("Error fetching categories:", err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const firebaseProducts = await getProducts()
        setProducts(firebaseProducts)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-organic-green mx-auto"></div>
          <p className="mt-4 text-organic-green">Loading products...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-organic-green text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://image.pollinations.ai/prompt/organic%20products%20collection%20coconut%20oil%20honey%20lentils%20natural?width=1920&height=600"
            alt="Products collection"
            fill
            className="w-full h-full object-cover"
            priority
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
              {categoryOptions.map((category) => (
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
                <ProductCard
                  product={product}
                  showCategory={true}
                  showWeight={true}
                  showFeatures={true}
                  className="h-full"
                />
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