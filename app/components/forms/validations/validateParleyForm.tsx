interface ParleyFormInputs {
  // Meeting details
  scheduledAt: string
  duration: number
  location: string
  meetingType: string

  // Participants
  requesterId: string
  recipientId: string

  // Status tracking
  status: string

  // Meeting outcomes
  completed: boolean
  completedAt: string
  referralGiven: boolean
  referralReceived: boolean
  followUpRequired: boolean

  // Notes
  notes: string
  requesterNotes: string
  recipientNotes: string

  // Chapter tracking
  chapterId: string
}

const validateParleyForm = (inputs: ParleyFormInputs, setErrors: any) => {
  const newErrors: any = {}

  // Required field validations
  if (!inputs?.scheduledAt?.trim()) {
    newErrors.scheduledAt = 'Please enter valid schedule time'
  }

  if (!inputs?.duration) {
    newErrors.duration = 'Please enter meeting duration'
  } else if (isNaN(Number(inputs.duration)) || Number(inputs.duration) <= 0) {
    newErrors.duration = 'Duration must be a positive number'
  }

  if (!inputs?.meetingType?.trim()) {
    newErrors.meetingType = 'Please select a meeting type'
  }

  if (!inputs?.requesterId?.trim()) {
    newErrors.requesterId = 'Requester ID is required'
  }

  if (!inputs?.recipientId?.trim()) {
    newErrors.recipientId = 'Please select a recipient'
  }

  if (!inputs?.status?.trim()) {
    newErrors.status = 'Status is required'
  }

  // Optional field validations
  if (inputs?.location && inputs.location.length > 200) {
    newErrors.location = 'Location must be less than 200 characters'
  }

  if (inputs?.notes && inputs.notes.length > 1000) {
    newErrors.notes = 'Notes must be less than 1000 characters'
  }

  if (inputs?.requesterNotes && inputs.requesterNotes.length > 1000) {
    newErrors.requesterNotes = 'Requester notes must be less than 1000 characters'
  }

  if (inputs?.recipientNotes && inputs.recipientNotes.length > 1000) {
    newErrors.recipientNotes = 'Recipient notes must be less than 1000 characters'
  }

  // Completed date validation
  if (inputs?.completedAt?.trim()) {
    const completedDate = new Date(inputs.completedAt)

    if (isNaN(completedDate.getTime())) {
      newErrors.completedAt = 'Please enter a valid completion date'
    }
  }

  // Business logic validations
  if (inputs?.completed && !inputs?.completedAt?.trim()) {
    newErrors.completedAt = 'Completion date is required when meeting is marked as completed'
  }

  if (inputs?.requesterId === inputs?.recipientId && inputs?.requesterId?.trim()) {
    newErrors.recipientId = 'Recipient must be different from requester'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateParleyForm
