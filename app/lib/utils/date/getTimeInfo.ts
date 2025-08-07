import { extractTimeFromDate } from '../time/extractTimeFromDate'
import { formatTimeAgo } from '../time/formatTimeAgo'
import { formatDate } from './formatDate'

// { time: "2:30 PM", relative: "2h ago", date: "Jan 15" }
export const getTimeInfo = (date: Date) => ({
  time: extractTimeFromDate(date),
  relative: formatTimeAgo(date),
  date: formatDate(date, { style: 'month-day' })
})
