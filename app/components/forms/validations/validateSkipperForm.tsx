import isValidEmail from '@/app/regex/isValidEmail'

interface SkipperFormInputs {
  name: string
  email: string
  company: string
  industry: string
}

const validateSkipperForm = (inputs: SkipperFormInputs, setErrors: (newErrors: any) => void) => {
  const newErrors: any = {}

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Please enter valid name'
  }

  if (!isValidEmail(inputs?.email)) {
    newErrors.email = 'Please enter valid email'
  }

  if (!inputs?.company?.trim()) {
    newErrors.company = 'Please enter valid company'
  }

  if (!inputs?.industry?.trim()) {
    newErrors.industry = 'Please enter valid industry'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const isSkipperFormValid = (inputs: any) => {
  return inputs?.name && inputs?.email && inputs?.company && inputs?.industry
}

export default validateSkipperForm
