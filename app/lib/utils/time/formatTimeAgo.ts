// "Just now", "5m ago", "2h ago", "3d ago"
export const formatTimeAgo = (dateInput: Date): string => {
  const now = new Date()
  const date = new Date(dateInput)
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return `${Math.floor(diffInMinutes / 1440)}d ago`
}
