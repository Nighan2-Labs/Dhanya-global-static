"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ProductDetail, ProductVariant } from '@/lib/types'
import { getCategories } from '@/lib/firebase-categories'

interface ProductFormProps {
  product?: ProductDetail | null
  onSubmit: (product: ProductDetail) => void
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { toast } = useToast()
  const [name, setName] = useState(product?.name || '')
  const [description, setDescription] = useState(product?.description || '')
  const [category, setCategory] = useState(product?.category || '')
  // Fix price state to properly handle ₹ symbol
  const [price, setPrice] = useState(product?.price ? product.price.replace('₹', '').replace(',', '') : '')
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice ? product.originalPrice.replace('₹', '').replace(',', '') : '')
  const [weight, setWeight] = useState(product?.weight || '')
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants || [])
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [approvedImages, setApprovedImages] = useState<string[]>(product?.images || [])
  const [isSaving, setIsSaving] = useState(false)

  // Categories from Firebase
  const [availableCategories, setAvailableCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const list = await getCategories()
        setAvailableCategories(list)
        if (!product && !category && list.length > 0) {
          setCategory(list[0].name)
        }
      } catch (error) {
        // If fetching fails, keep categories empty and notify
        toast({
          title: 'Failed to load categories',
          description: 'Please add categories first in Admin > Categories.',
        })
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [product, category, toast])

  // Initialize variants if creating new product
  useEffect(() => {
    if (!product && variants.length === 0) {
      setVariants([
        {
          id: '1',
          name: 'Standard',
          price: '',
          weight: '',
          inStock: true
        }
      ])
    }
  }, [product, variants.length])

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        name: '',
        price: '',
        weight: '',
        inStock: true
      }
    ])
  }

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter(variant => variant.id !== id))
  }

  const handleVariantChange = (id: string, field: keyof ProductVariant, value: string | boolean) => {
    setVariants(variants.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ))
  }

  const generateImages = async () => {
    if (!name.trim()) {
      toast({
        title: "Product name required",
        description: "Please enter a product name before generating images.",
        variant: "destructive"
      })
      return
    }

    setIsGeneratingImages(true)
    try {
      // Using Pollinations AI to generate images
      // In a real implementation, you would make an API call to Pollinations
      // For demo purposes, we'll generate placeholder URLs
      const prompt = encodeURIComponent(`${name} ${description} organic product professional photography`)
      const imageUrls = [
        `https://image.pollinations.ai/prompt/${prompt}?width=600&height=600&seed=1`,
        `https://image.pollinations.ai/prompt/${prompt}?width=600&height=600&seed=2`,
        `https://image.pollinations.ai/prompt/${prompt}?width=600&height=600&seed=3`,
        `https://image.pollinations.ai/prompt/${prompt}?width=600&height=600&seed=4`,
        `https://image.pollinations.ai/prompt/${prompt}?width=600&height=600&seed=5`
      ]
      
      setGeneratedImages(imageUrls)
      toast({
        title: "Images generated",
        description: "Please review and approve the generated images."
      })
    } catch (error) {
      toast({
        title: "Error generating images",
        description: "Failed to generate product images. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGeneratingImages(false)
    }
  }

  const approveImage = (imageUrl: string) => {
    if (!approvedImages.includes(imageUrl)) {
      setApprovedImages([...approvedImages, imageUrl])
    }
  }

  const removeApprovedImage = (imageUrl: string) => {
    setApprovedImages(approvedImages.filter(url => url !== imageUrl))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Validate form
    if (!name.trim()) {
      toast({
        title: "Validation error",
        description: "Product name is required.",
        variant: "destructive"
      })
      setIsSaving(false)
      return
    }

    if (!approvedImages.length) {
      toast({
        title: "Validation error",
        description: "At least one product image is required.",
        variant: "destructive"
      })
      setIsSaving(false)
      return
    }

    // Create product object
    const newProduct: ProductDetail = {
      id: product?.id || Date.now(), // This will be replaced by Firebase with a string ID
      name,
      description,
      category,
      price: `₹${parseInt(price).toLocaleString()}`, // Format with commas for thousands
      originalPrice: originalPrice ? `₹${parseInt(originalPrice).toLocaleString()}` : undefined,
      image: approvedImages[0],
      images: approvedImages,
      rating: product?.rating || 4.5,
      reviews: product?.reviews || 0,
      inStock,
      weight,
      features: product?.features || [],
      variants: variants.length > 0 ? variants.map(v => ({
        ...v,
        // Fix variant price formatting
        price: v.price && v.price.startsWith('₹') ? v.price : `₹${parseInt(v.price.replace('₹', '')).toLocaleString()}`
      })) : undefined
    }

    onSubmit(newProduct)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
            <CardDescription>Fill in the product details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLoadingCategories || availableCategories.length === 0}>
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingCategories ? 'Loading categories...' : (availableCategories.length === 0 ? 'No categories found' : 'Select category')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (₹)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 500g, 1kg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-organic-green focus:ring-organic-green"
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>
          </CardContent>
        </Card>

        {/* Variants Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
            <CardDescription>Add different variants of this product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {variants.map((variant, index) => (
              <div key={variant.id} className="grid gap-4 md:grid-cols-12 p-4 border rounded-lg">
                <div className="md:col-span-3 space-y-2">
                  <Label>Variant Name</Label>
                  <Input
                    value={variant.name}
                    onChange={(e) => handleVariantChange(variant.id, 'name', e.target.value)}
                    placeholder="e.g., 500ml, 1kg"
                  />
                </div>
                
                <div className="md:col-span-3 space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    // Fix variant price handling to properly extract numeric value
                    value={variant.price ? variant.price.replace('₹', '').replace(',', '') : ''}
                    onChange={(e) => handleVariantChange(variant.id, 'price', `₹${e.target.value}`)}
                    placeholder="0"
                  />
                </div>
                
                <div className="md:col-span-3 space-y-2">
                  <Label>Weight</Label>
                  <Input
                    value={variant.weight}
                    onChange={(e) => handleVariantChange(variant.id, 'weight', e.target.value)}
                    placeholder="e.g., 500ml"
                  />
                </div>
                
                <div className="md:col-span-2 flex items-end space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={variant.inStock}
                      onChange={(e) => handleVariantChange(variant.id, 'inStock', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-organic-green focus:ring-organic-green"
                    />
                    <Label className="ml-2">In Stock</Label>
                  </div>
                </div>
                
                <div className="md:col-span-1 flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveVariant(variant.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddVariant}
              className="w-full"
            >
              Add Variant
            </Button>
          </CardContent>
        </Card>

        {/* AI Image Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Generate and approve product images using AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                onClick={generateImages}
                disabled={isGeneratingImages}
                className="bg-organic-green hover:bg-organic-green/90"
              >
                {isGeneratingImages ? 'Generating...' : 'Generate AI Images'}
              </Button>
              
              <p className="text-sm text-gray-500 flex-1">
                Click to generate product images using AI. You'll be able to preview and approve the images before saving.
              </p>
            </div>

            {/* Generated Images Preview */}
            {generatedImages.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Generated Images</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Click on images to approve them for your product
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {generatedImages.map((url, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-organic-green transition-all"
                      onClick={() => approveImage(url)}
                    >
                      <img 
                        src={url} 
                        alt={`Generated product ${index + 1}`} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-center text-sm">
                        Click to approve
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Images */}
            {approvedImages.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Approved Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {approvedImages.map((url, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden relative">
                      <img 
                        src={url} 
                        alt={`Approved product ${index + 1}`} 
                        className="w-full h-40 object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                        onClick={() => removeApprovedImage(url)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-organic-green hover:bg-organic-green/90"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </Button>
        </div>
      </form>
    </div>
  )
}