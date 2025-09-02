"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { CategoryData } from '@/lib/types'

interface CategoryFormProps {
  category?: (CategoryData[string] & { id: string, slug: string }) | null
  onSubmit: (category: Omit<CategoryData[string], 'slug'> & { slug: string }) => void
  onCancel: () => void
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const { toast } = useToast()
  const [name, setName] = useState(category?.name || '')
  const [description, setDescription] = useState(category?.description || '')
  const [detailedDescription, setDetailedDescription] = useState(category?.detailedDescription || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [image] = useState(category?.image || '')
  const [priceRange, setPriceRange] = useState(category?.priceRange || '')
  const [avgRating, setAvgRating] = useState(category?.avgRating?.toString() || '')
  const [highlights, setHighlights] = useState(category?.highlights?.join(', ') || '')
  const [benefits, setBenefits] = useState(category?.benefits?.join(', ') || '')
  const [qualityStandards, setQualityStandards] = useState(category?.qualityStandards?.join(', ') || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate form
    if (!name.trim()) {
      toast({
        title: "Validation error",
        description: "Category name is required.",
        variant: "destructive"
      })
      setIsSaving(false)
      return
    }

    if (!slug.trim()) {
      toast({
        title: "Validation error",
        description: "Category slug is required.",
        variant: "destructive"
      })
      setIsSaving(false)
      return
    }

    // Create category object
    const newCategory = {
      name,
      description,
      detailedDescription,
      slug,
      image,
      productCount: category?.productCount || 0,
      priceRange,
      avgRating: parseFloat(avgRating) || 0,
      highlights: highlights.split(',').map(item => item.trim()).filter(item => item),
      benefits: benefits.split(',').map(item => item.trim()).filter(item => item),
      qualityStandards: qualityStandards.split(',').map(item => item.trim()).filter(item => item),
    }

    onSubmit(newCategory)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{category ? 'Edit Category' : 'Add New Category'}</CardTitle>
            <CardDescription>Fill in the category details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Category Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Enter category slug (e.g., coconut-oil)"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter short description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description</Label>
              <Textarea
                id="detailedDescription"
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                placeholder="Enter detailed description"
                rows={4}
              />
            </div>

            {/* Category Image URL removed as requested */}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Input
                  id="priceRange"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="e.g., ₹449 - ₹1,899"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avgRating">Average Rating</Label>
                <Input
                  id="avgRating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={avgRating}
                  onChange={(e) => setAvgRating(e.target.value)}
                  placeholder="e.g., 4.8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (comma separated)</Label>
              <Textarea
                id="highlights"
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="e.g., Cold-Pressed, Virgin Quality, Chemical-Free"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (comma separated)</Label>
              <Textarea
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="e.g., Rich in MCTs, Supports heart health, Excellent for cooking"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualityStandards">Quality Standards (comma separated)</Label>
              <Textarea
                id="qualityStandards"
                value={qualityStandards}
                onChange={(e) => setQualityStandards(e.target.value)}
                placeholder="e.g., 100% organic certified, Cold-pressed, No chemical processing"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-organic-green hover:bg-organic-green/90"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (category ? 'Update Category' : 'Add Category')}
          </Button>
        </div>
      </form>
    </div>
  )
}