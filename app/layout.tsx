import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CartProvider } from "@/lib/cart-context"
import { AdminAuthProvider } from "@/lib/admin-auth-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Dhanya Global - Premium Organic Products | Coconut Oil, Honey, Pulses",
  description:
    "Discover premium organic coconut oil, pure honey, and finest pulses at Dhanya Global. 100% certified organic products sourced directly from nature.",
  keywords: "organic coconut oil, pure honey, organic lentils, organic food, premium organic products, Dhanya Global",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AdminAuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}