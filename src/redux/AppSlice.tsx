import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppSlicepType, ProductType, UserType } from '../types/Types'
import { act } from 'react';

const initialState: AppSlicepType = {
    currentUser: null,
    loading: false,
    products: []

}

const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSlicepType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentUser: (state: AppSlicepType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
        setProducts: (state: AppSlicepType, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        }

    }

})

export const { setLoading, setCurrentUser, setProducts } = AppSlice.actions

export default AppSlice.reducer