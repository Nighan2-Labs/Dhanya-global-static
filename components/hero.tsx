"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Heart, Shield } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://image.pollinations.ai/prompt/organic%20farm%20fresh%20vegetables%20honey%20coconut%20oil%20natural%20sunlight%20premium%20quality?width=1920&height=1080"
          alt="Organic farm fresh products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-organic-green/80 via-organic-green/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-golden-honey" />
            <span className="text-golden-honey font-semibold text-lg tracking-wide">100% ORGANIC & PURE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dhanya Global
            <span className="block text-golden-honey text-4xl md:text-5xl font-light mt-2">
              Nature's Finest Selection
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-cream-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover premium organic coconut oil, pure honey, and finest pulses sourced directly from nature's bounty
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-golden-honey hover:bg-golden-honey/90 text-organic-green font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-organic-green font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
            >
              Contact via WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Heart className="w-12 h-12 text-golden-honey mb-3" />
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-cream-white/80 text-center">
                Hand-selected organic products with uncompromising quality standards
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <Shield className="w-12 h-12 text-golden-honey mb-3" />
              <h3 className="font-semibold text-lg mb-2">Certified Organic</h3>
              <p className="text-cream-white/80 text-center">
                Fully certified organic products with complete traceability
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <Leaf className="w-12 h-12 text-golden-honey mb-3" />
              <h3 className="font-semibold text-lg mb-2">Sustainable</h3>
              <p className="text-cream-white/80 text-center">Environmentally responsible sourcing and packaging</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
