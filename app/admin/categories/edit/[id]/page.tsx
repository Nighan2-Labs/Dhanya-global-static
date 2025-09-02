"use client"

import { useRouter } from 'next/navigation'
import { CategoryForm } from '@/components/admin/category-form'
import { useToast } from '@/hooks/use-toast'
import { getCategoryById, updateCategory } from '@/lib/firebase-categories'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function EditCategory({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [category, setCategory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCategory()
  }, [params.id])

  const fetchCategory = async () => {
    try {
      setIsLoading(true)
      const fetchedCategory = await getCategoryById(params.id)
      setCategory(fetchedCategory)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch category. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (updatedCategory: any) => {
    try {
      await updateCategory(params.id, updatedCategory)
      
      // Show success message
      toast({
        title: "Category updated",
        description: "Your category has been successfully updated."
      })
      
      // Redirect to categories list
      router.push('/admin/categories')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    router.push('/admin/categories')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-organic-green"></div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-organic-green">Category Not Found</h1>
        <p className="text-gray-500 mt-2">The category you're looking for doesn't exist.</p>
        <Button 
          onClick={() => router.push('/admin/categories')} 
          className="mt-4 bg-organic-green hover:bg-organic-green/90"
        >
          Back to Categories
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-organic-green">Edit Category</h1>
        <p className="text-gray-500">Update your category details</p>
      </div>
      
      <CategoryForm 
        category={category}
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  )
}