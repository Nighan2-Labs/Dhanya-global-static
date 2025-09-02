import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'
import { ProductDetail } from './types'

const PRODUCTS_COLLECTION = 'products'

// Function to add a new product
export async function addProduct(product: Omit<ProductDetail, 'id'>): Promise<string> {
  try {
    // Remove any temporary ID if it exists
    const productData = { ...product };
    if ('id' in productData) {
      delete (productData as any).id;
    }
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData)
    return docRef.id
  } catch (error) {
    console.error('Error adding product: ', error)
    throw new Error('Failed to add product')
  }
}

// Function to get all products
export async function getProducts(): Promise<ProductDetail[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
    const products: ProductDetail[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ProductDetail, 'id'>
      products.push({
        ...data,
        id: doc.id  // Keep Firebase ID as string
      } as ProductDetail)
    })
    
    return products
  } catch (error) {
    console.error('Error getting products: ', error)
    throw new Error('Failed to fetch products')
  }
}

// Function to get a product by ID
export async function getProductById(id: string): Promise<ProductDetail | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    const docData = docSnap.data() as Omit<ProductDetail, 'id'>
    return {
      ...docData,
      id: docSnap.id
    } as ProductDetail
  } catch (error) {
    console.error('Error getting product: ', error)
    throw new Error('Failed to fetch product')
  }
}

// Function to update a product
export async function updateProduct(id: string, product: Partial<Omit<ProductDetail, 'id'>>): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    await updateDoc(docRef, product)
  } catch (error) {
    console.error('Error updating product: ', error)
    throw new Error('Failed to update product')
  }
}

// Function to delete a product
export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting product: ', error)
    throw new Error('Failed to delete product')
  }
}

// Function to upload image to Firebase Storage
export async function uploadImage(imageData: string, fileName: string): Promise<string> {
  try {
    const storageRef = ref(storage, `products/${fileName}`)
    await uploadString(storageRef, imageData, 'data_url')
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    console.error('Error uploading image: ', error)
    throw new Error('Failed to upload image')
  }
}

// Function to search products by name or category
export async function searchProducts(searchTerm: string): Promise<ProductDetail[]> {
  try {
    // Note: For complex text search, consider using Firestore's full-text search integration with Algolia
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(
      productsRef,
      orderBy('name')
    )
    
    const querySnapshot = await getDocs(q)
    const products: ProductDetail[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ProductDetail, 'id'>
      const product = {
        ...data,
        id: doc.id
      } as ProductDetail
      
      // Simple text search
      if (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        products.push(product)
      }
    })
    
    return products
  } catch (error) {
    console.error('Error searching products: ', error)
    throw new Error('Failed to search products')
  }
}