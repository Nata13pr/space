import { configureStore } from '@reduxjs/toolkit'
import launchesReducer from './reducers/launches/launchesSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { spaceApi } from './spaceApi'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [spaceApi.reducerPath]: spaceApi.reducer,
        launches:launchesReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of rtk-query.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spaceApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see setupListeners docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)