"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Shield, Award, Users, Globe, Truck } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "All our products are certified organic, free from harmful chemicals and pesticides",
  },
  {
    icon: Heart,
    title: "Health First",
    description: "We prioritize your health and wellness with every product we offer",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Rigorous quality testing ensures you receive only the finest products",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Multiple certifications validate our commitment to quality and safety",
  },
]

const certifications = [
  {
    name: "USDA Organic",
    image: "https://image.pollinations.ai/prompt/USDA%20organic%20certification%20logo?width=200&height=200",
  },
  {
    name: "ISO 22000",
    image: "https://image.pollinations.ai/prompt/ISO%2022000%20food%20safety%20certification?width=200&height=200",
  },
  {
    name: "FSSAI",
    image: "https://image.pollinations.ai/prompt/FSSAI%20food%20safety%20certification%20India?width=200&height=200",
  },
  {
    name: "Non-GMO Project",
    image: "https://image.pollinations.ai/prompt/Non%20GMO%20project%20verified%20logo?width=200&height=200",
  },
]

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image:
      "https://image.pollinations.ai/prompt/Indian%20businessman%20founder%20organic%20food%20company%20professional?width=300&height=300",
    description: "20+ years experience in organic farming and food industry",
  },
  {
    name: "Priya Sharma",
    role: "Quality Assurance Head",
    image:
      "https://image.pollinations.ai/prompt/Indian%20woman%20quality%20assurance%20professional%20organic%20food?width=300&height=300",
    description: "Expert in food safety and organic certification processes",
  },
  {
    name: "Amit Patel",
    role: "Supply Chain Manager",
    image:
      "https://image.pollinations.ai/prompt/Indian%20man%20supply%20chain%20manager%20organic%20products?width=300&height=300",
    description: "Ensures seamless sourcing from organic farms across India",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-organic-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://image.pollinations.ai/prompt/organic%20farm%20landscape%20natural%20farming%20sustainable%20agriculture?width=1920&height=800"
            alt="Organic farming"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Dhanya Global</h1>
            <p className="text-xl text-cream-white/90 leading-relaxed">
              Committed to bringing you nature's finest organic products with uncompromising quality and authenticity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-organic-green mb-6">Our Story</h2>
              <p className="text-earth-brown text-lg mb-6 leading-relaxed">
                Dhanya Global was born from a simple yet powerful vision: to make premium organic products accessible to
                health-conscious families across India. Founded in 2019, our journey began when our founder, Rajesh
                Kumar, witnessed the transformative power of organic farming in rural communities.
              </p>
              <p className="text-earth-brown text-lg mb-6 leading-relaxed">
                What started as a small initiative to support local organic farmers has grown into a trusted brand that
                serves thousands of customers nationwide. We believe that everyone deserves access to pure,
                unadulterated food products that nourish both body and soul.
              </p>
              <p className="text-earth-brown text-lg leading-relaxed">
                Today, Dhanya Global stands as a testament to the power of sustainable agriculture and ethical business
                practices. Every product we offer carries with it the promise of quality, purity, and the dedication of
                countless farmers who share our vision of a healthier world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://image.pollinations.ai/prompt/organic%20farming%20story%20Indian%20farmers%20natural%20products%20sustainable?width=600&height=500"
                alt="Our organic farming story"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-golden-honey text-organic-green p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">5+</div>
                <div className="font-semibold">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-cream-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-organic-green mb-6">Our Core Values</h2>
            <p className="text-earth-brown text-xl max-w-3xl mx-auto">
              These principles guide everything we do, from sourcing to delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-organic-green/10 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-organic-green" />
                    </div>
                    <h3 className="text-xl font-bold text-organic-green mb-3">{value.title}</h3>
                    <p className="text-earth-brown leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-organic-green mb-6">Meet Our Team</h2>
            <p className="text-earth-brown text-xl max-w-3xl mx-auto">
              The passionate individuals behind Dhanya Global's success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <div className="relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-organic-green/20 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-organic-green mb-2">{member.name}</h3>
                    <Badge className="bg-golden-honey text-organic-green mb-3">{member.role}</Badge>
                    <p className="text-earth-brown leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-organic-green text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Certifications</h2>
            <p className="text-cream-white/90 text-xl max-w-3xl mx-auto">
              Recognized by leading certification bodies for our commitment to quality and safety
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.name}
                    className="w-20 h-20 mx-auto mb-4 object-contain"
                  />
                  <h3 className="font-semibold text-white">{cert.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-golden-honey to-golden-honey/80 text-organic-green">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Users className="w-12 h-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="font-semibold">Happy Customers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="font-semibold">States Served</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Truck className="w-12 h-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="font-semibold">Orders Delivered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Award className="w-12 h-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="font-semibold">Quality Awards</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
