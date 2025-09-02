"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  user: { email: string } | null
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin-token')
    const adminUser = localStorage.getItem('admin-user')
    
    if (adminToken && adminUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(adminUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real application, this would be an API call to your backend
    // For demo purposes, we'll use a simple check
    if (email === 'admin@dhanyaglobal.com' && password === 'Dhanya@143') {
      const userData = { email }
      localStorage.setItem('admin-token', 'admin-demo-token')
      localStorage.setItem('admin-user', JSON.stringify(userData))
      setIsAuthenticated(true)
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    user
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}