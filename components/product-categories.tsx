"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Coconut Oil",
    slug: "coconut-oil",
    description: "Premium virgin and organic coconut oil varieties",
    image:
      "https://image.pollinations.ai/prompt/coconut%20oil%20bottles%20organic%20premium%20natural%20lighting?width=600&height=400",
    productCount: 12,
    gradient: "from-golden-honey/20 to-golden-honey/5",
  },
  {
    id: 2,
    name: "Pure Honey",
    slug: "pure-honey",
    description: "Raw, unprocessed honey from natural sources",
    image:
      "https://image.pollinations.ai/prompt/pure%20honey%20jars%20golden%20natural%20organic%20beehive?width=600&height=400",
    productCount: 15,
    gradient: "from-organic-green/20 to-organic-green/5",
  },
  {
    id: 3,
    name: "Pulses & Lentils",
    slug: "pulses-lentils",
    description: "Premium organic pulses and lentils rich in protein",
    image:
      "https://image.pollinations.ai/prompt/mixed%20pulses%20variety%20colorful%20organic%20lentils%20natural?width=600&height=400",
    productCount: 18,
    gradient: "from-earth-brown/20 to-earth-brown/5",
  },
  {
    id: 4,
    name: "Spices & Herbs",
    slug: "spices-herbs",
    description: "Aromatic organic spices and herbs for authentic flavors",
    image:
      "https://image.pollinations.ai/prompt/organic%20spices%20herbs%20colorful%20natural%20aromatic?width=600&height=400",
    productCount: 25,
    gradient: "from-golden-honey/20 to-golden-honey/5",
  },
  {
    id: 5,
    name: "Organic Grains",
    slug: "organic-grains",
    description: "Wholesome organic grains and cereals for healthy meals",
    image:
      "https://image.pollinations.ai/prompt/organic%20grains%20cereals%20natural%20wholesome%20healthy?width=600&height=400",
    productCount: 20,
    gradient: "from-organic-green/20 to-organic-green/5",
  },
  {
    id: 6,
    name: "Dry Fruits & Nuts",
    slug: "dry-fruits-nuts",
    description: "Premium quality dry fruits and nuts packed with goodness",
    image:
      "https://image.pollinations.ai/prompt/premium%20dry%20fruits%20nuts%20natural%20healthy%20organic?width=600&height=400",
    productCount: 22,
    gradient: "from-earth-brown/20 to-earth-brown/5",
  },
]

export function ProductCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-cream-white to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-organic-green mb-6">Product Categories</h2>
          <p className="text-earth-brown text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of organic products, each category carefully curated for quality and
            authenticity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/category/${category.slug}`}>
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 group-hover:bg-white transition-colors duration-300">
                      <span className="text-organic-green font-semibold text-sm">{category.productCount} products</span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-organic-green mb-3 group-hover:text-golden-honey transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-earth-brown mb-4 leading-relaxed">{category.description}</p>

                    <div className="flex items-center text-organic-green group-hover:text-golden-honey transition-colors duration-300">
                      <span className="font-semibold">Explore Category</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
