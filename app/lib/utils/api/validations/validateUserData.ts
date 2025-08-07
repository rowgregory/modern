export function validateUserData(data: any) {
  const errors: { field: string; message: string }[] = []

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' })
  } else if (data.name.length > 100) {
    errors.push({ field: 'name', message: 'Name too long' })
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  } else if (data.email.length > 255) {
    errors.push({ field: 'email', message: 'Email too long' })
  }

  if (!data.company || typeof data.company !== 'string' || data.company.trim().length === 0) {
    errors.push({ field: 'company', message: 'Company is required' })
  } else if (data.company.length > 100) {
    errors.push({ field: 'company', message: 'Company name too long' })
  }

  if (!data.profession || typeof data.profession !== 'string' || data.profession.trim().length === 0) {
    errors.push({ field: 'profession', message: 'Profession is required' })
  } else if (data.profession.length > 100) {
    errors.push({ field: 'profession', message: 'Profession too long' })
  }

  if (!data.chapterId || typeof data.chapterId !== 'string' || data.chapterId.trim().length === 0) {
    errors.push({ field: 'chapterId', message: 'Chapter ID is required' })
  }

  // Optional fields validation
  if (data.phone && (typeof data.phone !== 'string' || data.phone.length > 20)) {
    errors.push({ field: 'phone', message: 'Invalid phone number' })
  }

  // Validate membership status
  const validStatuses = ['PENDING', 'ACTIVE', 'INACTIVE', 'EXPIRED', 'SUSPENDED']
  if (data.membershipStatus && !validStatuses.includes(data.membershipStatus)) {
    errors.push({ field: 'membershipStatus', message: 'Invalid membership status' })
  }

  // Validate dates
  if (data.joinedAt && isNaN(Date.parse(data.joinedAt))) {
    errors.push({ field: 'joinedAt', message: 'Invalid join date' })
  }

  if (data.expiresAt && isNaN(Date.parse(data.expiresAt))) {
    errors.push({ field: 'expiresAt', message: 'Invalid expiration date' })
  }

  // Validate interests array
  if (data.interests && (!Array.isArray(data.interests) || !data.interests.every((i: any) => typeof i === 'string'))) {
    errors.push({ field: 'interests', message: 'Interests must be an array of strings' })
  }

  // Validate boolean fields
  if (data.isPublic !== undefined && typeof data.isPublic !== 'boolean') {
    errors.push({ field: 'isPublic', message: 'isPublic must be a boolean' })
  }

  return errors
}
