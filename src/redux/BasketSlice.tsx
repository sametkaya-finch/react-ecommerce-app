import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BasketSliceType, ProductType } from '../types/Types'

const initialState: BasketSliceType = {
    basket: [],
    totalAmount: 0
}

const BasketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state: BasketSliceType, action: PayloadAction<ProductType[]>) => {
            state.basket = [...action.payload];
        },
        addProductToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            if (state.basket.length == 0) {
                // ilk eklenen urun
                state.basket = [action.payload];
            } else {
                // ilk eklenen urun degil
                // farkli urun ekleniyorsa dogrudan else state farkli urunlerle dolmaya devam eder
                // ayni urun ekleniyorsa urunun sayisi guncelleniyor ve guncellenmis sayiyla state'e koyuluyor
                const findProduct = state.basket.find((product: ProductType) => product.id === action.payload.id);
                if (findProduct) {
                    if (findProduct.count && action.payload.count) {
                        findProduct.count = findProduct.count + action.payload.count;
                        state.basket = [...state.basket.map((product: ProductType) => product.id === findProduct.id ? findProduct : product)];
                    }
                } else {
                    state.basket = [...state.basket, action.payload];
                }
            }

            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        calculateBasket: (state: BasketSliceType) => {
            let totalAmount: number = 0;
            state.basket && state.basket.map((product: ProductType) => {
                if (product.count) {
                    totalAmount += product.price * product.count;
                }
            })
            state.totalAmount = totalAmount;
        },
        removeProductFromBasket: (state: BasketSliceType, action: PayloadAction<number>) => {
            state.basket = [...state.basket.filter((product: ProductType) => product.id !== action.payload)];
            localStorage.setItem("basket", JSON.stringify(state.basket));
        }
    }
})


export const { addProductToBasket, setBasket, calculateBasket, removeProductFromBasket } = BasketSlice.actions

export default BasketSlice.reducer