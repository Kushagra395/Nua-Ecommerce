import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorCardProps {
  message: string
  onRetry: () => void
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <div className="bg-error/10 border border-error rounded-lg p-6 text-center">
      <AlertCircle className="mx-auto mb-4 text-error" size={40} />
      <p className="text-error mb-4">{message}</p>
      <Button onClick={onRetry} variant="outline">
        Retry
      </Button>
    </div>
  )
}
