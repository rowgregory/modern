import isValidEmail from '@/app/regex/isValidEmail'

interface TreasureMapFormInputs {
  receiverId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceNeeded: string
}

const validateTreasureMapForm = (inputs: TreasureMapFormInputs, setErrors: (newErrors: any) => void) => {
  const newErrors: any = {}

  if (!inputs?.receiverId?.trim()) {
    newErrors.receiverId = 'Please select who is receiving the referral'
  }

  if (!inputs?.clientName?.trim()) {
    newErrors.clientName = 'Please enter client name'
  }

  // Optional but if provided, must be valid
  if (inputs?.clientEmail?.trim() && !isValidEmail(inputs.clientEmail)) {
    newErrors.clientEmail = 'Please enter valid email'
  }

  if (!inputs?.serviceNeeded?.trim()) {
    newErrors.serviceNeeded = 'Please describe the service needed'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateTreasureMapForm
