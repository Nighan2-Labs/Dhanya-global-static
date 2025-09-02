"use client"

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { ScrollToTop } from './scroll-to-top'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTop />}
    </>
  )
}
