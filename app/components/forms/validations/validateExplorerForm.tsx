import isValidEmail from '@/app/regex/isValidEmail'

interface ExplorerFormInputs {
  name: string
  email: string
  company: string
  profession: string
}

const validateExplorerForm = (inputs: ExplorerFormInputs, setErrors: any) => {
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
  if (!inputs?.profession?.trim()) {
    newErrors.profession = 'Please enter valid profession'
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const isExplorerFormValid = (inputs: any) => {
  return inputs?.name && inputs?.email && inputs?.company && inputs?.profession
}

export default validateExplorerForm
