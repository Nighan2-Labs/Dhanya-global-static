"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AppError, ErrorBoundaryState } from '@/lib/types'

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State extends ErrorBoundaryState {}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Log error to error tracking service (e.g., Sentry, LogRocket)
    this.logErrorToService(error, errorInfo)
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    // Update state with error info
    this.setState({ error, errorInfo })
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your error tracking service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    // Simulated error logging - replace with actual error tracking service
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged to service:', errorData)
    } else {
      // Production error logging
      // trackError(errorData)
    }
  }

  private resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleGoHome = () => {
    this.resetError()
    window.location.href = '/'
  }

  private handleReload = () => {
    this.resetError()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-cream-white to-white flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl border-red-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">Oops! Something went wrong</CardTitle>
              <CardDescription>
                We're sorry, but an unexpected error has occurred. Please try again or go back to the homepage.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Technical Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <AlertDescription className="text-red-800 font-mono text-sm">
                    <div className="space-y-1">
                      <div><strong>Error:</strong> {this.state.error.message}</div>
                      <div><strong>Stack:</strong></div>
                      <pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleReload} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reload Page
                </Button>
                <Button onClick={this.handleGoHome} variant="outline" className="flex items-center gap-2">
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

    return this.props.children
  }
}

// Hook for error boundaries in functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by hook:', error, errorInfo)
    
    // Log error to tracking service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged to service:', errorData)
    }

    // Show user-friendly error (you could integrate with a toast notification system)
    // showErrorToast("An unexpected error occurred. Please try again.")
  }
}

// Error boundary for specific components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

// Async error boundary for handling async operations
export class AsyncErrorBoundary extends Component<
  { children: ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> },
  { error: Error | null; hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> }) {
    super(props)
    this.state = { error: null, hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true }
  }

  retry = () => {
    this.setState({ error: null, hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} retry={this.retry} />
      }

      return (
        <div className="p-6 text-center">
          <Alert className="border-red-200">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <p className="font-medium text-red-800 mb-2">Failed to load content</p>
              <p className="text-sm text-red-700 mb-4">{this.state.error?.message}</p>
              <Button onClick={this.retry} size="sm" variant="outline">
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )
    }

    return this.props.children
  }
}