"use client"

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-red-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Something went wrong!</CardTitle>
          <CardDescription>
            We apologize for the inconvenience. Please try again or go back to the homepage.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Technical Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800 font-mono text-sm">
                <div className="space-y-1">
                  <div><strong>Error:</strong> {error.message}</div>
                  <div><strong>Stack:</strong></div>
                  <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto">
                    {error.stack}
                  </pre>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </div>

          {/* Additional Help */}
          <div className="text-center text-sm text-gray-600">
            <p>If the problem persists, please contact our support team.</p>
            <p className="mt-2">Email: support@dhanyaglobal.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}