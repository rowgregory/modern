// "2024-01-15T14:30" (for datetime-local inputs)
export function getLocalISOString(date = new Date()) {
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60 * 1000)
  return localDate.toISOString().slice(0, 16)
}
