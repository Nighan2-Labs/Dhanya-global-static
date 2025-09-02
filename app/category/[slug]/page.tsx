"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts } from "@/lib/firebase-products"
import { getCategoryBySlug } from "@/lib/firebase-categories"
import { ProductDetail } from "@/lib/types"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"

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

interface CategoryPageProps {
  params: {
    slug: string
  }
  category?: any
  categoryProducts: any[]
  filteredProducts: any[]
  searchTerm: string
  sortBy: "name" | "price-low" | "price-high" | "rating" | "popularity"
  priceRange: "all" | "under-500" | "500-1000" | "over-1000"
}

export default function CategoryPage({
  params,
  searchParams: { search = "", sort = "name", price = "all" } = {}
}: {
  params: { slug: string }
  searchParams?: {
    search?: string;
    sort?: string;
    price?: string;
  }
}) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high" | "rating" | "popularity">("name")
  const [priceRange, setPriceRange] = useState<"all" | "under-500" | "500-1000" | "over-1000">("all")
  const [category, setCategory] = useState<any>(null)
  const [categoryProducts, setCategoryProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Initialize from search params and data
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true)
        // Fetch category from Firebase
        const fetchedCategory = await getCategoryBySlug(params.slug)
        
        if (fetchedCategory) {
          setCategory(fetchedCategory)
        } else {
          setError("Category not found")
          return
        }
        
        // Fetch products from Firebase
        const firebaseProducts = await getProducts()
        
        // Filter products by category
        const categoryProductsList = firebaseProducts.filter((product) => {
          const productCategorySlug = product.category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
          return productCategorySlug === params.slug
        })
        
        setCategoryProducts(categoryProductsList)
        
        // Apply filters
        const filteredProductsList = categoryProductsList
          .filter(
            (product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (priceRange === "all" ||
                (priceRange === "under-500" && Number.parseInt(product.price.replace("₹", "").replace(/,/g, "")) < 500) ||
                (priceRange === "500-1000" &&
                  Number.parseInt(product.price.replace("₹", "").replace(/,/g, "")) >= 500 &&
                  Number.parseInt(product.price.replace("₹", "").replace(/,/g, "")) <= 1000) ||
                (priceRange === "over-1000" && Number.parseInt(product.price.replace("₹", "").replace(/,/g, "")) > 1000)),
          )
          .sort((a, b) => {
            switch (sortBy) {
              case "price-low":
                return Number.parseInt(a.price.replace("₹", "").replace(/,/g, "")) - Number.parseInt(b.price.replace("₹", "").replace(/,/g, ""))
              case "price-high":
                return Number.parseInt(b.price.replace("₹", "").replace(/,/g, "")) - Number.parseInt(a.price.replace("₹", "").replace(/,/g, ""))
              case "rating":
                return b.rating - a.rating
              case "popularity":
                return (b.reviews || 0) - (a.reviews || 0)
              default:
                return a.name.localeCompare(b.name)
            }
          })
        
        setFilteredProducts(filteredProductsList)
      } catch (err) {
        console.error("Error fetching category and products:", err)
        setError("Failed to load category and products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategoryAndProducts()
  }, [params.slug, searchTerm, sortBy, priceRange])

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-organic-green mb-4">Category Not Found</h1>
          <p className="text-earth-brown mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-organic-green hover:bg-organic-green/90 text-white">View All Products</Button>
          </Link>
        </div>
      </div>
    )
  }

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
      <section className="relative py-20 bg-organic-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="relative inset-0 opacity-20">
            <Image
              src={category.heroImage || "/placeholder.svg"}
              alt={category.name}
              fill
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center text-golden-honey hover:text-white transition-colors duration-300 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{category.name}</h1>
            <p className="text-xl text-cream-white/90 leading-relaxed mb-8">{category.description}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {category.highlights.map((highlight, index) => (
                <Badge key={index} className="bg-golden-honey text-organic-green font-semibold px-4 py-2 text-sm">
                  {highlight}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold text-organic-green mb-6">About Our {category.name}</h2>
              <div className="prose prose-lg text-earth-brown">
                <p className="mb-4">{category.detailedDescription}</p>
                <h3 className="text-xl font-semibold text-organic-green mb-3">Health Benefits:</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {category.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold text-organic-green mb-3">Quality Standards:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {category.qualityStandards.map((standard, index) => (
                    <li key={index}>{standard}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 shadow-xl border-0 bg-gradient-to-b from-organic-green to-organic-green/90 text-white">
                <h3 className="text-xl font-bold mb-4 text-golden-honey">Category Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Products:</span>
                    <span className="font-bold text-golden-honey">{categoryProducts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Price Range:</span>
                    <span className="font-bold text-golden-honey">{category.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg. Rating:</span>
                    <span className="font-bold text-golden-honey flex items-center">
                      {category.avgRating}
                      <Star className="w-4 h-4 ml-1 fill-golden-honey" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Organic Certified:</span>
                    <span className="font-bold text-golden-honey">100%</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-golden-honey hover:bg-golden-honey/90 text-organic-green font-semibold"
                  onClick={() =>
                    window.open(
                      `https://wa.me/919876543210?text=Hi! I'm interested in your ${category.name} products.`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask About This Category
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-cream-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-organic-green">{filteredProducts.length} Products Found</h3>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={priceRange} onValueChange={(value: "all" | "under-500" | "500-1000" | "over-1000") => setPriceRange(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="over-1000">Over ₹1000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: "name" | "price-low" | "price-high" | "rating" | "popularity") => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
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
                  showCategory={false}
                  showWeight={true}
                  showFeatures={true}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-brown text-xl mb-4">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setPriceRange("all")
                  setSortBy("name")
                }}
                className="bg-organic-green hover:bg-organic-green/90 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-cream-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-organic-green text-center mb-12">Explore Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categoryData)
              .filter(([slug]) => slug !== params.slug)
              .slice(0, 3)
              .map(([slug, cat], index) => (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/category/${slug}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
                      <div className="relative overflow-hidden h-48">
                        <div className="relative inset-0 h-48 overflow-hidden">
                          <Image
                            src={cat.image || "/placeholder.svg"}
                            alt={cat.name}
                            fill
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-organic-green/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                          <p className="text-sm text-cream-white/90">{cat.productCount} products</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}