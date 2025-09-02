// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS1owZWbZ5Cwi19DOMjK14roayuP8_bGQ",
  authDomain: "dhanyaglobal-908fb.firebaseapp.com",
  projectId: "dhanyaglobal-908fb",
  storageBucket: "dhanyaglobal-908fb.appspot.com",
  messagingSenderId: "759832478854",
  appId: "1:759832478854:web:79fc7da84b17293975bd07",
  measurementId: "G-RRNTEGTB97"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)

export default app