"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package, Plus, LogOut } from "lucide-react"

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Package },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Package },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, logout, user } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // Allow the login page to render without auth guard or sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const linkClasses = (href: string) => {
    const active = pathname.startsWith(href)
    return `flex items-center px-4 py-2 text-sm font-medium rounded-md ${active ? 'bg-gray-100 text-organic-green' : 'text-gray-700 hover:bg-gray-100'}`
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-organic-green rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-organic-green">Admin Panel</span>
            </div>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={linkClasses(item.href)}
                  aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${pathname.startsWith(item.href) ? 'text-organic-green' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col p-4 border-t">
            <div className="text-sm text-gray-500 mb-2">
              {user?.email}
            </div>
            <Button
              variant="outline"
              onClick={() => logout('/')}
              className="flex items-center justify-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-organic-green rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-organic-green">Admin Panel</span>
                  </div>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={linkClasses(item.href)}
                      aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${pathname.startsWith(item.href) ? 'text-organic-green' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t">
                  <div className="text-sm text-gray-500 mb-2">
                    {user?.email}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => logout('/')}
                    className="w-full flex items-center justify-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="text-lg font-bold text-organic-green">Admin Panel</div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
