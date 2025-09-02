"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getProducts } from '@/lib/firebase-products'
import { getCategories } from '@/lib/firebase-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, Folder } from 'lucide-react'
import Image from 'next/image'

interface ActivityItem {
  title: string
  subtitle?: string
}

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number>(0)
  const [categoryCount, setCategoryCount] = useState<number>(0)
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategories(),
        ])
        setProductCount(products.length)
        setCategoryCount(categories.length)

        // Build a simple recent activity list using latest items
        const latestProducts = products.slice(-3).reverse().map((p) => ({
          title: 'Product added',
          subtitle: p.name,
        }))
        const latestCategories = categories.slice(-2).reverse().map((c) => ({
          title: 'Category added',
          subtitle: c.name,
        }))
        setRecentActivity([...latestProducts, ...latestCategories])
      } catch (e) {
        // Keep defaults on error
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Brand hero */}
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-organic-green/90 to-emerald-600 text-white">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="Dhanya Global" fill className="object-contain p-2" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">Dhanya Global Admin</h1>
              <p className="text-white/90 text-sm md:text-base">Manage products and categories with ease</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20" />)
              : (<div className="text-2xl font-bold">{productCount}</div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Folder className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20" />)
              : (<div className="text-2xl font-bold">{categoryCount}</div>)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">Total: {loading ? '...' : productCount}</div>
            <Link href="/admin/products/new">
              <Button className="w-full bg-organic-green hover:bg-organic-green/90">
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full">
                View All Products
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Organize your catalog</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">Total: {loading ? '...' : categoryCount}</div>
            <Link href="/admin/categories/new">
              <Button className="w-full bg-organic-green hover:bg-organic-green/90">
                Add New Category
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" className="w-full">
                View All Categories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest additions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-4 w-72" />
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-sm text-gray-500">No recent activity</div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="ml-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}