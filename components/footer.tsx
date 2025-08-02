"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Coconut Oil", href: "/products?category=coconut-oil" },
    { name: "Pure Honey", href: "/products?category=honey" },
    { name: "Pulses & Lentils", href: "/products?category=pulses" },
    { name: "All Products", href: "/products" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Certifications", href: "/about#certifications" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "FAQ", href: "/contact#faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Return Policy", href: "/returns" },
    { name: "Quality Guarantee", href: "/quality" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", name: "Facebook" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Youtube, href: "#", name: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-organic-green text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Organic Goodness</h3>
            <p className="text-cream-white/90 mb-8 text-lg">
              Subscribe to our newsletter for exclusive offers, organic tips, and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-cream-white/70 focus:border-golden-honey"
              />
              <Button className="bg-golden-honey hover:bg-golden-honey/90 text-organic-green font-semibold px-8 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-golden-honey rounded-full flex items-center justify-center">
                <Leaf className="w-7 h-7 text-organic-green" />
              </div>
              <div>
                <span className="text-2xl font-bold font-playfair">Dhanya Global</span>
                <div className="text-golden-honey text-sm -mt-1">Organic Excellence</div>
              </div>
            </div>

            <p className="text-cream-white/90 mb-6 leading-relaxed">
              Your trusted partner for premium organic products. We bring you nature's finest offerings with
              uncompromising quality and authenticity.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-golden-honey flex-shrink-0" />
                <span className="text-cream-white/90">Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-golden-honey flex-shrink-0" />
                <span className="text-cream-white/90">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-golden-honey flex-shrink-0" />
                <span className="text-cream-white/90">info@dhanyaglobal.com</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-golden-honey">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream-white/90 hover:text-golden-honey transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-golden-honey">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream-white/90 hover:text-golden-honey transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-golden-honey">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream-white/90 hover:text-golden-honey transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-semibold mb-2">Need Help? Contact Us on WhatsApp</h4>
              <p className="text-cream-white/90">Get instant support and product information</p>
            </div>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() =>
                window.open(
                  "https://wa.me/919876543210?text=Hi! I would like to know more about your organic products.",
                  "_blank",
                )
              }
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-cream-white/80 text-sm">
              © 2025 Dhanya Global. All rights reserved. | Made with ❤️ for organic food lovers
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-golden-honey/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-cream-white/80 group-hover:text-golden-honey transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
