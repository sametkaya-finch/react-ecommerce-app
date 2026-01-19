import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppSlicepType, ProductType, UserType } from '../types/Types'

const initialState: AppSlicepType = {
    currentUser: null,
    loading: false,
    products: [],
    drawer: false
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
        },
        setDrawer: (state: AppSlicepType, action: PayloadAction<boolean>) => {
            state.drawer = action.payload;
        },
        updateBalance: (state: AppSlicepType, action: PayloadAction<UserType>) => {
            const user: UserType = {
                //...action.payload da olurdu ayni sey
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                balance: action.payload.balance
            }
            state.currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        }

    }

})

export const { setLoading, setCurrentUser, setProducts, filetProducts, setDrawer, updateBalance } = AppSlice.actions

export default AppSlice.reducer