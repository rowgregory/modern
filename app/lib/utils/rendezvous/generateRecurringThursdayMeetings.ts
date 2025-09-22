const generateRecurringThursdayMeetings = (
  startDate: Date,
  endDate: Date,
  meetingDetails: { title: any; type: any; description: any }
) => {
  const meetings = []
  const current = new Date(startDate)

  // Find the first Thursday from the start date
  while (current.getDay() !== 4) {
    // 4 = Thursday
    current.setDate(current.getDate() + 1)
  }

  // Generate meetings every Thursday until end date
  while (current.getTime() <= endDate.getTime()) {
    // Fixed: Use .getTime() for comparison
    const meetingStart = new Date(current)
    meetingStart.setHours(7, 0, 0, 0) // 7:00 AM

    const meetingEnd = new Date(current)
    meetingEnd.setHours(8, 0, 0, 0) // 8:00 AM

    meetings.push({
      id: `thursday-meeting-${meetingStart.toISOString().split('T')[0]}`,
      title: meetingDetails.title || 'Weekly Thursday Meeting',
      type: meetingDetails.type || 'meeting',
      startTime: meetingStart,
      endTime: meetingEnd,
      isRecurring: true,
      recurrencePattern: 'weekly',
      description: meetingDetails.description || 'Recurring weekly meeting every Thursday'
    })

    // Move to next Thursday
    current.setDate(current.getDate() + 7)
  }

  return meetings
}

export default generateRecurringThursdayMeetings
