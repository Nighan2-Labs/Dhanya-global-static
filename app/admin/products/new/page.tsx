"use client"

import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'
import { useToast } from '@/hooks/use-toast'
import { ProductDetail } from '@/lib/types'
import { addProduct } from '@/lib/firebase-products'

export default function NewProduct() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (product: ProductDetail) => {
    try {
      // Remove the id field as Firestore will generate one
      const { id, ...productData } = product;
      
      await addProduct(productData)
      
      // Show success message
      toast({
        title: "Product created",
        description: "Your product has been successfully created."
      })
      
      // Redirect to products list
      router.push('/admin/products')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    router.push('/admin/products')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-organic-green">Add New Product</h1>
        <p className="text-gray-500">Create a new product for your store</p>
      </div>
      
      <ProductForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  )
}