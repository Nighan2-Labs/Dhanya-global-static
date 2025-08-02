import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductCategories } from "@/components/product-categories"
import { AboutPreview } from "@/components/about-preview"
import { TrustIndicators } from "@/components/trust-indicators"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <Hero />
      <TrustIndicators />
      <FeaturedProducts />
      <ProductCategories />
      <AboutPreview />
      <WhatsAppFloat />
    </main>
  )
}
