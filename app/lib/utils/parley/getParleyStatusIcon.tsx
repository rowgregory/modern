import { Clock, CheckCircle, XCircle, AlertCircle, UserCheck } from 'lucide-react'

const getParleyStatusIcon = (status: string) => {
  switch (status) {
    case 'REQUESTED':
      return <Clock className="w-4 h-4" />
    case 'CONFIRMED':
      return <CheckCircle className="w-4 h-4" />
    case 'COMPLETED':
      return <UserCheck className="w-4 h-4" />
    case 'CANCELLED':
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

export default getParleyStatusIcon
