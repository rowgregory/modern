import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'

const getAnchorStatusIcon = (status: string) => {
  switch (status) {
    case 'REPORTED':
      return <Clock className="w-4 h-4" />
    case 'VERIFIED':
      return <CheckCircle className="w-4 h-4" />
    case 'DISPUTED':
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

export default getAnchorStatusIcon
