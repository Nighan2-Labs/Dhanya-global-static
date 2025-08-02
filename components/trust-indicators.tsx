"use client"

import { motion } from "framer-motion"
import { Award, Leaf, Shield, Star } from "lucide-react"

const certifications = [
  {
    icon: Award,
    title: "USDA Organic",
    description: "Certified Organic",
  },
  {
    icon: Leaf,
    title: "Non-GMO",
    description: "Project Verified",
  },
  {
    icon: Shield,
    title: "ISO 22000",
    description: "Food Safety",
  },
  {
    icon: Star,
    title: "Premium Grade",
    description: "Quality Assured",
  },
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-cream-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-organic-green mb-4">Trusted Quality Certifications</h2>
          <p className="text-earth-brown text-lg max-w-2xl mx-auto">
            Our commitment to excellence is backed by industry-leading certifications and quality standards
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-organic-green/10 rounded-full flex items-center justify-center group-hover:bg-organic-green/20 transition-colors duration-300">
                <cert.icon className="w-10 h-10 text-organic-green" />
              </div>
              <h3 className="font-semibold text-organic-green mb-2">{cert.title}</h3>
              <p className="text-earth-brown text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
