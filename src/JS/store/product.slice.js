import { createSlice } from '@reduxjs/toolkit'
import { getToProduct } from './product.thunk'

const initialState = {
    products: [],
    isLoading: false,
    error: '',
    count: 0,
    totalPrice: 0,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.products.map((item) => {
                if (item.id === action.payload) {
                    item.quantity++
                    item.total = item.total + item.price
                }
            })
        },
        decrement: (state, action) => {
            state.products.map((item) => {
                if (item.id === action.payload) {
                    item.quantity--
                    item.total = item.total - item.price
                }
            })
        },
        incrementPrice: (state, action) => {
            state.totalPrice += action.payload
        },
        decrementPrice: (state, action) => {
            state.totalPrice -= action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getToProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.products = action.payload.map((item) => {
                return {
                    ...item,
                    quantity: 0,
                    total: 0,
                }
            })
        })
        builder.addCase(getToProduct.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(getToProduct.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong!'
        })
    },
})

export default productSlice.reducer

export const productAction = productSlice.actions
