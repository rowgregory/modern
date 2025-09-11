import { Clock, CheckCircle, XCircle, AlertCircle, Pause, Ban } from 'lucide-react'

const getApplicationStatusIcon: any = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <Clock className="w-4 h-4" />
    case 'ACTIVE':
      return <CheckCircle className="w-4 h-4" />
    case 'INACTIVE':
      return <Pause className="w-4 h-4" />
    case 'SUSPENDED':
      return <AlertCircle className="w-4 h-4" />
    case 'EXPIRED':
      return <XCircle className="w-4 h-4" />
    case 'CANCELLED':
      return <Ban className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

export default getApplicationStatusIcon
