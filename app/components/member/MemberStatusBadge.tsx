import { AlertCircle, CheckCircle } from 'lucide-react'

const MemberStatusBadge = ({ status = 'ACTIVE', isExpiring = false }) => {
  const getStatusColor = () => {
    if (isExpiring) return 'bg-orange-500/10 border-orange-500/20 text-orange-400'
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 border-green-500/20 text-green-400'
      case 'PENDING':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
      case 'SUSPENDED':
        return 'bg-red-500/10 border-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400'
    }
  }

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor()}`}
    >
      {isExpiring && <AlertCircle className="w-3 h-3" />}
      {!isExpiring && status === 'ACTIVE' && <CheckCircle className="w-3 h-3" />}
      <span>{isExpiring ? 'Expiring Soon' : status}</span>
    </span>
  )
}

export default MemberStatusBadge
