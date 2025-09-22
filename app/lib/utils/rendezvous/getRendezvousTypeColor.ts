const getRendezvousTypeColor = (type: string) => {
  switch (type) {
    case 'day-off':
      return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    default:
      return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
  }
}

export default getRendezvousTypeColor
