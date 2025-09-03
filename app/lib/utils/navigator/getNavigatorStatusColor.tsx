const getNavigatorStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'PENDING':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'EXPIRED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    case 'INACTIVE':
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    case 'SUSPENDED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}
export default getNavigatorStatusColor
