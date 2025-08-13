import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChangeEvent } from 'react'

export type Inputs = {
  [key: string]: string | number | boolean | undefined | unknown
}

export type Errors = {
  [key: string]: string
}

interface SetInputProps {
  formName: string
  data: any
}
interface SetErrorsProps {
  formName: string
  errors: Errors
}
interface SetSubmitttedProps {
  formName: string
  submitted: boolean
}
interface HandleInputProps {
  formName: string
  name: string
  value: any
}

const memberInputs = {
  name: '',
  email: '',
  phone: '',
  company: '',
  profession: '',
  chapterId: '',
  joinedAt: new Date().toISOString().split('T')[0],
  expiresAt: '',
  membershipStatus: 'PENDING',
  interests: [],
  profileImage: '',
  isPublic: true
}

const profileInputs = {
  name: '',
  email: '',
  phone: '',
  profileImage: '',
  profileImageFilename: '',
  profession: '',
  company: '',
  isPublic: false,
  interests: [],
  chapter: {
    name: '',
    location: ''
  },
  meta: {
    profileCompleteness: false
  }
}

const formInitialState = {
  isCreating: false,
  isEditing: false,
  memberForm: {
    inputs: memberInputs,
    errors: {}
  },
  settingsForm: {
    inputs: { name: '', location: '', meetingDay: '', meetingTime: '', meetingFrequency: '' },
    errors: {}
  },
  profileForm: {
    inputs: profileInputs,
    errors: {}
  },
  explorerForm: {
    inputs: { name: '', email: '', location: '', phone: '', company: '', profession: '', interests: [] },
    errors: {}
  }
} as any

const formSlice = createSlice({
  name: 'form',
  initialState: formInitialState,
  reducers: {
    setIsCreating: (state) => {
      state.isCreating = true
    },
    setIsEditing: (state) => {
      state.isEditing = true
    },
    setIsNotEditing: (state) => {
      state.isEditing = false
    },
    setIsNotCreating: (state) => {
      state.isCreating = false
    },
    resetForm: (state, { payload }) => {
      if (state[payload] && state[payload].inputs !== undefined) {
        state[payload].inputs = null
        state[payload].errors = null
      }
    },
    setInputs: (state, { payload }: PayloadAction<SetInputProps>) => {
      const { formName, data } = payload
      if (!state[formName]) state[formName] = { inputs: {}, errors: {}, submitted: false }
      state[formName].inputs = { ...state[formName].inputs, ...data }
    },
    clearInputs: (state, { payload }: PayloadAction<{ formName: string }>) => {
      const { formName } = payload
      state[formName].inputs = {}
    },
    clearErrors: (state, { payload }: PayloadAction<{ formName: string }>) => {
      const { formName } = payload
      state[formName].errors = {}
    },
    setErrors: (state, { payload }: PayloadAction<SetErrorsProps>) => {
      const { formName, errors } = payload
      if (!state[formName]) {
        return
      }

      state[formName].errors = errors
    },

    setSubmitted: (state, { payload }: PayloadAction<SetSubmitttedProps>) => {
      const { formName, submitted } = payload
      if (!state[formName]) return
      state[formName].submitted = submitted
    },
    handleInput: (state, action: PayloadAction<HandleInputProps>) => {
      const { formName, name, value } = action.payload

      const form = state[formName]

      state[formName] = {
        ...form,
        inputs: {
          ...form?.inputs,
          [name]: value
        },
        errors: {
          ...form?.errors
        }
      }
    },
    handleSelect: (state, { payload }: PayloadAction<{ formName: string; name: string; value: string }>) => {
      const { formName, name, value } = payload
      if (!state[formName]) return
      state[formName].inputs[name] = value
    },
    handleToggle: (state, { payload }: PayloadAction<{ formName: string; name: string; checked: boolean }>) => {
      const { formName, name, checked } = payload
      const form = state[formName]

      state[formName] = {
        ...form,
        inputs: {
          ...form?.inputs,
          [name]: checked
        },
        errors: {
          ...form?.errors
        }
      }
    },
    removeConcertDetails: (state, { payload }: PayloadAction<{ formName: string; concertId: string }>) => {
      const { formName, concertId } = payload
      if (!state[formName] || !state[formName].inputs.eventDetails) return
      state[formName].inputs.eventDetails = state[formName].inputs.eventDetails.filter(
        (event: any) => event.id !== concertId
      )
    },
    addVenue: (state, { payload }: PayloadAction<{ formName: string; venue: any }>) => {
      const { formName, venue } = payload
      if (!state[formName]) return

      const { location } = state[formName].inputs

      // Check if a venue is already selected
      const isSelected = location?.venueId === venue.id

      if (isSelected) {
        // If the same venue is clicked again, unselect it
        state[formName].inputs.location = null
      } else {
        // If a different venue is clicked, unselect the current one and select the new one
        state[formName].inputs.location = {
          venueId: venue.id,
          name: venue.name,
          address: venue.address,
          longitude: venue.longitude,
          latitude: venue.latitude
        }
      }
    },
    addConcertDetails: (state, { payload }: PayloadAction<{ formName: string; newId: string }>) => {
      const { formName, newId } = payload
      if (!state[formName]) return

      const { time, date, location, city, dayOfWeek, externalLink, eventDetails = [] } = state[formName].inputs

      const newConcert = { id: newId, time, date, location, city, dayOfWeek, externalLink }

      const updatedEventDetails = [...JSON.parse(JSON.stringify(eventDetails)), newConcert]

      state[formName].inputs = {
        ...state[formName].inputs,
        eventDetails: updatedEventDetails,
        time: '',
        date: '',
        city: '',
        dayOfWeek: '',
        location: {},
        externalLink: ''
      }
    },
    updateConcertDetails: (state, { payload }: PayloadAction<{ formName: string; eventDetaildId: string }>) => {
      const { formName, eventDetaildId } = payload
      if (!state[formName]) return

      const { time, date, location, eventDetails, city, dayOfWeek, externalLink } = state[formName].inputs
      const parsedEventDetails = (eventDetails && JSON.parse(JSON.stringify(eventDetails))) ?? []

      const eventIndex = parsedEventDetails.findIndex((e: any) => e.id === eventDetaildId)

      if (eventIndex !== -1) {
        const updatedEventDetails = eventDetails.map((e: any) =>
          e.id === eventDetaildId
            ? { ...e, time, date, location, city, dayOfWeek, externalLink } // Update the existing event
            : e
        )

        state[formName].inputs = {
          ...state[formName].inputs,
          eventDetails: updatedEventDetails,
          time: '',
          date: '',
          city: '',
          dayOfWeek: '',
          location: {},
          externalLink: ''
        }
      }
    },
    handleFileUpload: (
      state,
      action: PayloadAction<{ formName: string; imageUrl: string | ArrayBuffer | null; file: File | null }>
    ) => {
      const { formName, imageUrl, file } = action.payload
      state[formName] = {
        ...state[formName],
        inputs: {
          ...state[formName]?.inputs,
          imageUrl,
          file
        }
      }
    },
    handleVideoUpload: (
      state,
      action: PayloadAction<{ formName: string; videoUrl: string | ArrayBuffer | null; videoFile: File | null }>
    ) => {
      const { formName, videoUrl, videoFile } = action.payload
      state[formName] = {
        ...state[formName],
        inputs: {
          ...state[formName]?.inputs,
          videoUrl,
          videoFile
        }
      }
    },
    setUploadProgress: (state, { payload }: any) => {
      state.progress = payload
      if ((state.progress = 100)) {
        state.progress = -1
      }
    }
  }
})

export const createFormActions = (formName: string, dispatch: any) => ({
  setInputs: (data: any) => dispatch(formSlice.actions.setInputs({ formName, data })),
  clearInputs: () => dispatch(formSlice.actions.clearInputs({ formName })),
  setErrors: (errors: Errors) => dispatch(formSlice.actions.setErrors({ formName, errors })),
  setSubmitted: (submitted: boolean) => dispatch(formSlice.actions.setSubmitted({ formName, submitted })),
  handleInput: (e: any) =>
    dispatch(formSlice.actions.handleInput({ formName, name: e.target.name, value: e.target.value })),
  handleSelect: (e: any) =>
    dispatch(formSlice.actions.handleSelect({ formName, name: e.target.name, value: e.target.value })),
  handleToggle: (e: any) =>
    dispatch(formSlice.actions.handleToggle({ formName, name: e.target.name, checked: e.target.checked })),
  addVenue: (venue: any) => dispatch(formSlice.actions.addVenue({ formName, venue })),
  addConcertDetails: (newId: string) => dispatch(formSlice.actions.addConcertDetails({ formName, newId })),
  updateConcertDetails: (eventDetaildId: string) =>
    dispatch(formSlice.actions.updateConcertDetails({ formName, eventDetaildId })),
  removeConcertDetails: (concertId: string) =>
    dispatch(formSlice.actions.removeConcertDetails({ formName, concertId })),
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch(formSlice.actions.handleFileUpload({ formName, imageUrl: reader.result, file: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  },
  handleVideoChange: (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0] && files[0].type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch(formSlice.actions.handleVideoUpload({ formName, videoUrl: reader.result, videoFile: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  },
  handleFileDrop: (event: React.DragEvent<HTMLDivElement>) => {
    const files = event.dataTransfer.files
    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch(formSlice.actions.handleFileUpload({ formName, imageUrl: reader.result, file: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  },

  handleVideoDrop: (event: React.DragEvent<HTMLDivElement>) => {
    const files = event.dataTransfer.files
    if (files && files[0] && files[0].type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onload = () => {
        dispatch(formSlice.actions.handleVideoUpload({ formName, videoUrl: reader.result, videoFile: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  },
  handleUploadProgress: (progress: any) => dispatch(formSlice.actions.setUploadProgress(progress))
})

export const {
  resetForm,
  setIsCreating,
  setIsNotCreating,
  setInputs,
  clearInputs,
  clearErrors,
  setIsEditing,
  setIsNotEditing
} = formSlice.actions
export const formReducer = formSlice.reducer
