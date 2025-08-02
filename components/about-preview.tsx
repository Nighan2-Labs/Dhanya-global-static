"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Leaf, Heart, Users, Award } from "lucide-react"

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Leaf, value: "100%", label: "Organic Products" },
  { icon: Award, value: "15+", label: "Certifications" },
  { icon: Heart, value: "5 Years", label: "Trust & Quality" },
]

export function AboutPreview() {
  return (
    <section className="py-20 bg-organic-green text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://image.pollinations.ai/prompt/organic%20leaf%20pattern%20natural%20texture%20subtle%20background?width=1920&height=1080"
          alt="Organic pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Story of
              <span className="block text-golden-honey">Natural Excellence</span>
            </h2>

            <p className="text-xl mb-6 text-cream-white/90 leading-relaxed">
              At Dhanya Global, we believe in the power of nature's purest offerings. Our journey began with a simple
              mission: to bring you the finest organic products directly from their natural sources.
            </p>

            <p className="text-lg mb-8 text-cream-white/80 leading-relaxed">
              Every product in our collection is carefully selected, tested, and certified to ensure you receive nothing
              but the best. From our premium coconut oil to our raw forest honey, each item tells a story of quality,
              sustainability, and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-golden-honey hover:bg-golden-honey/90 text-organic-green font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Learn More About Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-organic-green font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent"
              >
                Our Certifications
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 text-golden-honey mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-cream-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
