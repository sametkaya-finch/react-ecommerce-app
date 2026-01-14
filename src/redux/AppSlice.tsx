import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppSlicepType, UserType } from '../types/Types'

const initialState: AppSlicepType = {
    currentUser: null,
    loading: false

}

const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSlicepType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state: AppSlicepType, action: PayloadAction<UserType>) => {
            state.currentUser = action.payload;
        }

    }

})

export const { setLoading, setCurrentUser } = AppSlice.actions

export default AppSlice.reducer