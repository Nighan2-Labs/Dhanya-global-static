"use client"

import { useRouter } from 'next/navigation'
import { CategoryForm } from '@/components/admin/category-form'
import { useToast } from '@/hooks/use-toast'
import { addCategory } from '@/lib/firebase-categories'

export default function NewCategory() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (category: any) => {
    try {
      await addCategory(category)
      
      // Show success message
      toast({
        title: "Category created",
        description: "Your category has been successfully created."
      })
      
      // Redirect to categories list
      router.push('/admin/categories')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    router.push('/admin/categories')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-organic-green">Add New Category</h1>
        <p className="text-gray-500">Create a new product category for your store</p>
      </div>
      
      <CategoryForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  )
}