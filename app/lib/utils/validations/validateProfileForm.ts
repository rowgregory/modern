const validateProfileForm = (inputs: any, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs.name?.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!inputs.email?.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
    newErrors.email = 'Invalid email format'
  }

  if (!inputs.company?.trim()) {
    newErrors.company = 'Company is required'
  }

  if (inputs.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(inputs.phone.replace(/[\s\-\(\)]/g, ''))) {
    newErrors.phone = 'Invalid phone number format'
  }
  setErrors(newErrors)
  return Object.values(newErrors).every((error) => error === '')
}

export default validateProfileForm
