import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './AppSlice'
import BasketSlice from './BasketSlice'

export const store = configureStore({
    reducer: {
        app: AppReducer,
        basket: BasketSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch