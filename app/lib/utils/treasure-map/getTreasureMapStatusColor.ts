const getTreasureMapStatusColor = (status: string) => {
  switch (status) {
    case 'GIVEN':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'ACCEPTED':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    case 'CONTACTED':
      return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
    case 'CLOSED':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'DECLINED':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
  }
}

export default getTreasureMapStatusColor
