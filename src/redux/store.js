import { configureStore } from '@reduxjs/toolkit'
import launchesReducer from './reducers/launches/launchesSlice'

export const store = configureStore({
  reducer: {
    launches:launchesReducer,
  },
})