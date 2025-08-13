'use client'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './services/api'
import { formReducer } from './features/formSlice'
import { logReducer } from './features/logSlice'
import { adminReducer } from './features/adminSlice'
import { face2FaceReducer } from './features/face2FaceSlice'
import { userReducer } from './features/userSlice'
import { toastReduer } from './features/toastSlice'
import { settingsReducer } from './features/settingsSlice'
import { appReducer } from './features/appSlice'
import { notificationReducer } from './features/notificationsSlice'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  log: logReducer,
  admin: adminReducer,
  face2Face: face2FaceReducer,
  toast: toastReduer,
  settings: settingsReducer,
  app: appReducer,
  notification: notificationReducer,
  [api.reducerPath]: api.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppSelector = typeof store.getState

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
