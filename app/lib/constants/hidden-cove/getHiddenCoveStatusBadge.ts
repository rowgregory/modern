export const getHiddenCoveStatusBadge = (status: string) => {
  switch (status) {
    case 'not_purchased':
      return {
        text: 'Not Purchased',
        color: 'bg-gray-600/10 text-gray-300 border-gray-600/20',
        description: 'Development starts upon purchase.'
      }
    case 'available':
      return {
        text: 'Available Now',
        color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        description: 'Ready to enable — no setup required.'
      }
    case 'beta':
      return {
        text: 'Private Beta',
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        description: 'Limited release for early adopters and testing.'
      }
    case 'development':
      return {
        text: 'Shipyard',
        color: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
        description: "Purchased — currently being built. We'll notify the group when it's ready."
      }
    case 'active':
      return {
        text: 'Hoisted',
        color: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
        description: 'Live and available for the group to use.'
      }
    default:
      return {
        text: 'Coming Soon',
        color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        description: 'Planned but not available yet.'
      }
  }
}
