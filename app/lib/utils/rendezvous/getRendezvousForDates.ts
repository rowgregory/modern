const getRendezvousForDate = (
  events: any[],
  date: { getFullYear: () => number; getMonth: () => number; getDate: () => number }
) => {
  const matchingEvents = events.filter((event) => {
    if (event.startTime) {
      // For timed events, check if the date matches
      const eventDate = new Date(event.startTime)
      const matches =
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()

      return matches
    } else {
      // For all-day events, use existing logic
      const eventDate = new Date(event.date)
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      )
    }
  })

  return matchingEvents
}

export default getRendezvousForDate
