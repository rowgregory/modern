import { DateInput } from '../date/formatDate'

export const extractTimeFromDate = (date: DateInput, options: { fallback?: string } = {}): string => {
  const { fallback = 'Invalid time' } = options

  if (!date) return fallback

  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return fallback

  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}

// formatTime('2024-01-15T14:30:00')     // "2:30 PM"
// formatTime(new Date())                // "3:45 PM" (current time)
// formatTime(null)                      // "Invalid time"
// formatTime(null, { fallback: 'TBD' }) // "TBD"
// formatTime('invalid-date')            // "Invalid time"
