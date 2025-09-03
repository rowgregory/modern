import { FormEvent } from 'react'

export interface IBeaconForm {
  inputs: any
  errors: any
  handleInput: (inputs: any) => void
  isEditing: boolean
  handleToggle: any
}

export interface INavigatorForm {
  inputs: any
  errors: any
  handleSubmit: (e: FormEvent) => void
  handleInput: (inputs: any) => void
  handleToggle: any
  isLoading: boolean
  isUpdating: boolean
  onClose: () => void
}
