import { Clock, CheckCircle, XCircle, AlertCircle, UserCheck, Phone } from 'lucide-react'

const getTreasureMapStatusIcon = (status: string) => {
  switch (status) {
    case 'GIVEN':
      return <Clock className="w-4 h-4" />
    case 'ACCEPTED':
      return <CheckCircle className="w-4 h-4" />
    case 'CONTACTED':
      return <Phone className="w-4 h-4" />
    case 'CLOSED':
      return <UserCheck className="w-4 h-4" />
    case 'DECLINED':
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

export default getTreasureMapStatusIcon
