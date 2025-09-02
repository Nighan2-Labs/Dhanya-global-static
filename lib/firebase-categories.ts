import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'
import { CategoryData } from './types'

const CATEGORIES_COLLECTION = 'categories'

// Function to add a new category
export async function addCategory(category: Omit<CategoryData[string], 'slug'> & { slug: string }): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), category)
    return docRef.id
  } catch (error) {
    console.error('Error adding category: ', error)
    throw new Error('Failed to add category')
  }
}

// Function to get all categories
export async function getCategories(): Promise<(CategoryData[string] & { id: string, slug: string })[]> {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('name'))
    const querySnapshot = await getDocs(q)
    const categories: (CategoryData[string] & { id: string, slug: string })[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as CategoryData[string] & { slug: string }
      categories.push({
        ...data,
        id: doc.id
      })
    })
    
    return categories
  } catch (error) {
    console.error('Error getting categories: ', error)
    throw new Error('Failed to fetch categories')
  }
}

// Function to get a category by ID
export async function getCategoryById(id: string): Promise<(CategoryData[string] & { id: string, slug: string }) | null> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    const data = docSnap.data() as CategoryData[string] & { slug: string }
    return {
      ...data,
      id: docSnap.id
    }
  } catch (error) {
    console.error('Error getting category: ', error)
    throw new Error('Failed to fetch category')
  }
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<(CategoryData[string] & { id: string, slug: string }) | null> {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('name'))
    const querySnapshot = await getDocs(q)
    
    for (const doc of querySnapshot.docs) {
      const data = doc.data() as CategoryData[string] & { slug: string }
      if (data.slug === slug) {
        return {
          ...data,
          id: doc.id
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting category by slug: ', error)
    throw new Error('Failed to fetch category')
  }
}

// Function to update a category
export async function updateCategory(id: string, category: Partial<CategoryData[string] & { slug: string }>): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id)
    await updateDoc(docRef, category)
  } catch (error) {
    console.error('Error updating category: ', error)
    throw new Error('Failed to update category')
  }
}

// Function to delete a category
export async function deleteCategory(id: string): Promise<void> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting category: ', error)
    throw new Error('Failed to delete category')
  }
}