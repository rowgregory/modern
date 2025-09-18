const getGrogStatusColor = (status: string) => {
  switch (status) {
    case 'UPCOMING':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    case 'ONGOING':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    case 'COMPLETED':
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    case 'CANCELLED':
      return 'text-red-400 bg-red-500/10 border-red-500/30'
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
  }
}

export default getGrogStatusColor
