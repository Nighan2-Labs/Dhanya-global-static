"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Get instant responses to your queries",
    value: "+91 98765 43210",
    action: "Chat Now",
    primary: true,
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Speak directly with our team",
    value: "+91 98765 43210",
    action: "Call Now",
    primary: false,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us detailed inquiries",
    value: "info@dhanyaglobal.com",
    action: "Send Email",
    primary: false,
  },
]

const faqs = [
  {
    question: "Are all your products certified organic?",
    answer:
      "Yes, all our products are certified organic by recognized certification bodies including USDA Organic and FSSAI.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply contact us via WhatsApp with your product requirements. Our team will guide you through the ordering process.",
  },
  {
    question: "Do you deliver pan-India?",
    answer:
      "Yes, we deliver across India. Delivery time varies by location, typically 3-7 business days for most areas.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 100% satisfaction guarantee. If you're not satisfied with the quality, contact us within 7 days of delivery.",
  },
  {
    question: "How can I verify the authenticity of products?",
    answer:
      "Each product comes with certification details and batch information. You can also verify through our customer service.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer attractive discounts for bulk orders. Contact us via WhatsApp for custom pricing.",
  },
]

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210?text=Hi! I would like to know more about your organic products.", "_blank")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - in real app, this would send data to backend
    alert("Thank you for your message! We will get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-organic-green text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://image.pollinations.ai/prompt/customer%20service%20organic%20food%20company%20contact%20support?width=1920&height=600"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-cream-white/90 max-w-3xl mx-auto">
              We're here to help you with all your organic product needs. Reach out to us anytime!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-organic-green mb-6">Get In Touch</h2>
            <p className="text-earth-brown text-xl max-w-3xl mx-auto">Choose your preferred way to connect with us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`text-center p-6 h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg ${
                    method.primary ? "bg-gradient-to-b from-organic-green to-organic-green/90 text-white" : "bg-white"
                  }`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        method.primary ? "bg-white/20" : "bg-organic-green/10"
                      }`}
                    >
                      <method.icon className={`w-8 h-8 ${method.primary ? "text-white" : "text-organic-green"}`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${method.primary ? "text-white" : "text-organic-green"}`}>
                      {method.title}
                    </h3>
                    <p className={`mb-4 ${method.primary ? "text-cream-white/90" : "text-earth-brown"}`}>
                      {method.description}
                    </p>
                    <p className={`font-semibold mb-6 ${method.primary ? "text-golden-honey" : "text-organic-green"}`}>
                      {method.value}
                    </p>
                    <Button
                      className={`w-full font-semibold py-3 rounded-full transition-all duration-300 ${
                        method.primary
                          ? "bg-golden-honey hover:bg-golden-honey/90 text-organic-green"
                          : "bg-organic-green hover:bg-organic-green/90 text-white"
                      }`}
                      onClick={method.title === "WhatsApp" ? handleWhatsAppClick : undefined}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-cream-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-xl border-0 bg-white">
                <h3 className="text-2xl font-bold text-organic-green mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-earth-brown font-medium mb-2">First Name *</label>
                      <Input
                        required
                        placeholder="Enter your first name"
                        className="border-organic-green/20 focus:border-organic-green"
                      />
                    </div>
                    <div>
                      <label className="block text-earth-brown font-medium mb-2">Last Name *</label>
                      <Input
                        required
                        placeholder="Enter your last name"
                        className="border-organic-green/20 focus:border-organic-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-earth-brown font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="border-organic-green/20 focus:border-organic-green"
                    />
                  </div>

                  <div>
                    <label className="block text-earth-brown font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="border-organic-green/20 focus:border-organic-green"
                    />
                  </div>

                  <div>
                    <label className="block text-earth-brown font-medium mb-2">Subject *</label>
                    <Input
                      required
                      placeholder="What is this regarding?"
                      className="border-organic-green/20 focus:border-organic-green"
                    />
                  </div>

                  <div>
                    <label className="block text-earth-brown font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="border-organic-green/20 focus:border-organic-green resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-organic-green hover:bg-organic-green/90 text-white font-semibold py-4 rounded-full transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Business Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-organic-green mb-6">Business Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-organic-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-organic-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-organic-green mb-2">Address</h4>
                      <p className="text-earth-brown leading-relaxed">
                        Dhanya Global Organic Foods Pvt. Ltd.
                        <br />
                        123, Organic Plaza, Green Valley
                        <br />
                        Bangalore, Karnataka - 560001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-organic-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-organic-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-organic-green mb-2">Business Hours</h4>
                      <div className="text-earth-brown space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                        <p className="text-golden-honey font-medium mt-2">WhatsApp support available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden shadow-xl border-0">
                <div className="h-64 bg-gradient-to-br from-organic-green/20 to-golden-honey/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-organic-green mx-auto mb-4" />
                    <p className="text-organic-green font-semibold">Interactive Map</p>
                    <p className="text-earth-brown text-sm">Click to view location</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-organic-green mb-6">Frequently Asked Questions</h2>
            <p className="text-earth-brown text-xl max-w-3xl mx-auto">
              Find quick answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-organic-green mb-3">{faq.question}</h3>
                  <p className="text-earth-brown leading-relaxed">{faq.answer}</p>
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
            <p className="text-earth-brown mb-6">Still have questions? We're here to help!</p>
            <Button
              size="lg"
              className="bg-organic-green hover:bg-organic-green/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact us on WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
