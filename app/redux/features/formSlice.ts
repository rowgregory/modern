import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    dispatch(formSlice.actions.handleToggle({ formName, name: e.target.name, checked: e.target.checked }))
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
