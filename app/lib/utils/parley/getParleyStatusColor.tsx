const getParleyStatusColor = (status: string) => {
  switch (status) {
    case 'REQUESTED':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'CONFIRMED':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    case 'COMPLETED':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'CANCELLED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}

export default getParleyStatusColor
