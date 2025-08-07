import { MEETING_DAYS } from '../../constants/settings/meetingDay'

export const validateChapterSettingsForm = (inputs: any, setErrors: any) => {
  const newErrors = {
    name: '',
    location: '',
    meetingDay: '',
    meetingTime: ''
  }

  // Validate name
  if (!inputs.name.trim()) {
    newErrors.name = 'Chapter name is required'
  } else if (inputs.name.trim().length < 2) {
    newErrors.name = 'Chapter name must be at least 2 characters'
  }

  // Validate location
  if (!inputs.location.trim()) {
    newErrors.location = 'Location is required'
  } else if (inputs.location.trim().length < 2) {
    newErrors.location = 'Location must be at least 2 characters'
  }

  // Validate meeting day
  if (!MEETING_DAYS.some((day) => day.value === inputs.meetingDay)) {
    newErrors.meetingDay = 'Invalid meeting day'
  }

  // Validate meeting time
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

  if (!inputs.meetingTime) {
    newErrors.meetingTime = 'Meeting time is required'
  } else if (!timeRegex.test(inputs.meetingTime)) {
    newErrors.meetingTime = 'Invalid time format. Use HH:MM'
  }

  setErrors(newErrors)
  return Object.values(newErrors).every((error) => error === '')
}
