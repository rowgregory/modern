import getGrogStatusColor from '@/app/lib/constants/grogs/getGrogStatusColor'
import { setOpenGrogDrawer } from '@/app/redux/features/grogSlice'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface CalendarGridProps {
  selectedDate: string
  events: any[]
  onDateSelect: (date: string) => void
  getEventTypeIcon: (type: string) => any
  getEventTypeColor: (type: string) => string
}

const CalendarGrid: FC<CalendarGridProps> = ({
  selectedDate,
  events,
  onDateSelect,
  getEventTypeIcon,
  getEventTypeColor
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const { user } = useUserSelector()
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  // Get calendar data for the selected month
  const currentDate = new Date(selectedDate)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday

  // Get previous month's last days to fill the grid
  const prevMonth = new Date(year, month - 1, 0)
  const daysFromPrevMonth = startingDayOfWeek

  // Create calendar grid
  const calendarDays: (Date | null)[] = []

  // Add previous month's days
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    calendarDays.push(new Date(year, month - 1, prevMonth.getDate() - i))
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }

  // Add next month's days to complete the grid (42 days total - 6 rows × 7 days)
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push(new Date(year, month + 1, day))
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter((event) => event.date === dateString)
  }

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month && date.getFullYear() === year
  }

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Handle day click
  const handleDayClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    setSelectedDay(dateString)
    onDateSelect(dateString)
  }

  // Get events for selected day
  const selectedDayEvents = selectedDay ? events.filter((e) => e.date === selectedDay) : []

  return (
    <div className="p-6">
      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-semibold text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            if (!date) return <div key={index} />

            const dayEvents = getEventsForDate(date)
            const isCurrentMonthDay = isCurrentMonth(date)
            const isTodayDay = isToday(date)
            const isSelected = selectedDay === date.toISOString().split('T')[0]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => handleDayClick(date)}
                className={`
                  relative min-h-[100px] p-2 cursor-pointer rounded-lg border transition-all duration-200 hover:border-purple-500/50
                  ${
                    isCurrentMonthDay
                      ? 'bg-gray-700/20 border-gray-600/30'
                      : 'bg-gray-800/10 border-gray-700/20 opacity-40'
                  }
                  ${isTodayDay ? 'ring-2 ring-blue-400/50' : ''}
                  ${isSelected ? 'bg-purple-500/20 border-purple-500/50' : ''}
                `}
              >
                {/* Day number */}
                <div
                  className={`text-sm font-medium mb-1 ${
                    isTodayDay ? 'text-blue-400 font-bold' : isCurrentMonthDay ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {date.getDate()}
                </div>

                {/* Event indicators */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => {
                    const EventIcon = getEventTypeIcon(event.type)
                    return (
                      <div
                        key={event.id}
                        className={`flex items-center space-x-1 p-1 rounded text-xs truncate ${getEventTypeColor(event.type)}`}
                        title={event.title}
                      >
                        <EventIcon className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{event.title}</span>
                      </div>
                    )
                  })}

                  {/* Show count if more than 3 events */}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-400 font-medium text-center">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      <AnimatePresence>
        {selectedDay && selectedDayEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-700/50 pt-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Events on{' '}
              {new Date(selectedDay).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>

            <div className="grid gap-4">
              {selectedDayEvents.map((event, index) => {
                const EventTypeIcon = getEventTypeIcon(event.type)
                const attendanceRate = event.maxAttendees ? (event.attendees / Number(event.maxAttendees)) * 100 : 0

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/20 border border-gray-600/30 rounded-lg p-4 hover:border-gray-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                          <EventTypeIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{event.title}</h4>
                          <p className="text-sm text-gray-400 mb-2">{event.description}</p>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>
                                {event.attendees}
                                {event.maxAttendees ? `/${event.maxAttendees}` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getGrogStatusColor(event.status)}`}
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </div>

                        {event.cost !== undefined && (
                          <div className="text-sm font-semibold text-white">
                            {event.cost === 0 ? 'Free' : `${event.cost}`}
                          </div>
                        )}

                        {event.maxAttendees && (
                          <div className="text-xs text-gray-400">{Math.round(attendanceRate)}% full</div>
                        )}
                      </div>
                    </div>

                    {/* Event tags */}
                    <div className="flex items-center space-x-2 mt-3">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getEventTypeColor(event.type)}`}
                      >
                        <EventTypeIcon className="w-3 h-3 mr-1" />
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                      {event.requiresRSVP && (
                        <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          RSVP Required
                        </div>
                      )}
                      {event.isPublic && (
                        <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                          Public Event
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No events message */}
      {selectedDay && selectedDayEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-gray-700/50 pt-6 text-center"
        >
          <div className="text-gray-400">
            No grogs scheduled for{' '}
            {new Date(selectedDay).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <button
            onClick={() =>
              user?.chapter?.hasUnlockedGrog ? dispatch(setOpenGrogDrawer()) : push('/admin/hidden-cover')
            }
            className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors"
          >
            Launch Grog
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default CalendarGrid
