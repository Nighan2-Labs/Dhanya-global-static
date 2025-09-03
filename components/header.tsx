"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Leaf, MessageCircle, Shield } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-organic-green/10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Dhanya Global Logo"
              className="w-10 h-10 object-contain group-hover:opacity-90 transition-opacity duration-300"
            />
            <div>
              <span className="text-xl font-bold text-organic-green font-playfair">Dhanya Global</span>
              <div className="text-xs text-earth-brown -mt-1">Organic Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-organic-green hover:text-golden-honey font-medium transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-golden-honey group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Admin Portal Link */}
            <Link
              href="/admin/login"
              className="text-organic-green hover:text-golden-honey font-medium transition-colors duration-300 relative group flex items-center"
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin
            </Link>
          </nav>

          {/* WhatsApp Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() =>
                window.open(
                  "https://wa.me/919876543210?text=Hi! I would like to know more about your organic products.",
                  "_blank",
                )
              }
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-6 h-6 text-organic-green" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-organic-green rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-organic-green font-playfair">Dhanya Global</span>
                </div>
              </div>

              <nav className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-organic-green hover:text-golden-honey font-medium text-lg transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Admin Portal Link */}
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="text-organic-green hover:text-golden-honey font-medium text-lg transition-colors duration-300 flex items-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Admin Portal
                </Link>

                <div className="pt-6 border-t border-organic-green/10 space-y-3">
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition-all duration-300"
                    onClick={() => {
                      window.open(
                        "https://wa.me/919876543210?text=Hi! I would like to know more about your organic products.",
                        "_blank",
                      )
                      setIsOpen(false)
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact on WhatsApp
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}