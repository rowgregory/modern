import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export const getNavigatorStatusIcon = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <CheckCircle className="w-4 h-4" />
    case 'PENDING':
      return <Clock className="w-4 h-4" />
    case 'EXPIRED':
      return <XCircle className="w-4 h-4" />
    case 'INACTIVE':
      return <AlertCircle className="w-4 h-4" />
    case 'SUSPENDED':
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}
