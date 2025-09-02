"use client"

import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { useToast } from '@/hooks/use-toast'
import { ProductDetail } from '@/lib/types'
import { getProductById, updateProduct } from '@/lib/firebase-products'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const fetchedProduct = await getProductById(params.id)
      setProduct(fetchedProduct)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (updatedProduct: ProductDetail) => {
    try {
      // Remove the id field as we don't want to update it
      const { id, ...productData } = updatedProduct;
      
      await updateProduct(params.id, productData)
      
      // Show success message
      toast({
        title: "Product updated",
        description: "Your product has been successfully updated."
      })
      
      // Redirect to products list
      router.push('/admin/products')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    router.push('/admin/products')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-organic-green"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-organic-green">Product Not Found</h1>
        <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
        <Button 
          onClick={() => router.push('/admin/products')} 
          className="mt-4 bg-organic-green hover:bg-organic-green/90"
        >
          Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-organic-green">Edit Product</h1>
        <p className="text-gray-500">Update your product details</p>
      </div>
      
      <ProductForm 
        product={product}
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  )
}