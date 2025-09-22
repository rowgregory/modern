const generateCalendarDays = (currentMonth: Date) => {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of current month and calculate offset
  const firstDay = new Date(year, month, 1)
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday

  // Create calendar grid starting from the correct date
  const calendarDays: Date[] = []

  // Start from the first day we want to show (could be from previous month)
  const startDate = new Date(year, month, 1 - startingDayOfWeek)

  // Generate 42 days (6 weeks × 7 days)
  for (let i = 0; i < 35; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    calendarDays.push(currentDate)
  }

  return calendarDays
}

export default generateCalendarDays
