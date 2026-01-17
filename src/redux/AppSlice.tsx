import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppSlicepType, ProductType, UserType } from '../types/Types'

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
        },
        filetProducts: (state: AppSlicepType, action: PayloadAction<string>) => {
            const tempList: ProductType[] = [];
            state.products.map((product: ProductType) => {
                if (product.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempList.push(product);
                }
            })
            state.products = [...tempList];
        }

    }

})

export const { setLoading, setCurrentUser, setProducts, filetProducts } = AppSlice.actions

export default AppSlice.reducer