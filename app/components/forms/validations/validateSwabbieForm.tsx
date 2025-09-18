import isValidEmail from '@/app/regex/isValidEmail'

interface SSwabbieFormInputs {
  name: string
  email: string
  company: string
  industry: string
  location: string
  businessLicenseNumber: string
}

const validateSwabbieForm = (inputs: SSwabbieFormInputs, setErrors: (newErrors: any) => void) => {
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

  if (!inputs?.location?.trim()) {
    newErrors.location = 'Please enter valid location'
  }

  if (!inputs?.industry?.trim()) {
    newErrors.industry = 'Please enter valid industry'
  }
  if (!inputs?.businessLicenseNumber?.trim()) {
    newErrors.businessLicenseNumber = 'Please enter valid businees license number'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const isSSwabbieFormValid = (inputs: any) => {
  return inputs?.name && inputs?.email && inputs?.company && inputs?.industry
}

export default validateSwabbieForm
