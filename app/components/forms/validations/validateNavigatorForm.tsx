const validateNavigatorForm = (inputs: any, setErrors: any) => {
  const newErrors: any = {}

  if (!inputs?.name.trim()) newErrors.name = 'Name is required'
  if (!inputs?.email.trim()) newErrors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(inputs?.email)) newErrors.email = 'Please enter a valid email'
  if (!inputs?.company.trim()) newErrors.company = 'Company is required'
  if (!inputs?.industry.trim()) newErrors.industry = 'Profession is required'
  if (!inputs?.joinedAt) newErrors.joinedAt = 'Join date is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default validateNavigatorForm
