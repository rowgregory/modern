const getAnchorStatusColor = (status: string) => {
  switch (status) {
    case 'REPORTED':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'VERIFIED':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'DISPUTED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}

export default getAnchorStatusColor
