const validateEventForm = (inputs: any, setErrors: any) => {
  const newErrors = {} as any

  // Basic Event Information
  if (!inputs?.title?.trim()) newErrors.title = 'Chart your course with a proper event title'
  if (!inputs?.type) newErrors.type = 'Select what type of voyage this be'
  if (!inputs?.category) newErrors.category = 'Choose your event category, sailor'

  // Date and Time validation
  if (!inputs?.date) newErrors.date = 'When does this voyage set sail?'
  if (!inputs?.time) newErrors.time = 'What time do we weigh anchor?'
  if (!inputs?.location?.trim()) newErrors.location = 'Where be this harbor gathering?'

  // URL validation
  if (inputs?.registrationUrl && !isValidUrl(inputs.registrationUrl)) {
    newErrors.registrationUrl = 'Please enter a valid registration URL'
  }

  if (inputs?.meetingUrl && !isValidUrl(inputs.meetingUrl)) {
    newErrors.meetingUrl = 'Please enter a valid meeting URL'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// Helper function for URL validation
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default validateEventForm
