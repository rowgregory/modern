const initialEventFormState = {
  // Basic Event Information
  title: '',
  description: '',
  category: '',
  type: '',

  // Date and Time
  date: '',
  time: '',
  duration: '',

  // Location
  location: '',
  address: '',

  // Capacity and Registration
  maxAttendees: '',
  registrationDeadline: '',
  cost: 0,

  // Settings
  waitlistEnabled: true,
  featured: false,
  visibility: 'PUBLIC',

  // Additional Details
  dresscode: '',
  requirements: '',
  materials: '',
  registrationUrl: '',
  meetingUrl: ''
}

export default initialEventFormState
