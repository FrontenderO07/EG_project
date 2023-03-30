import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../dataService'

export const getToProduct = createAsyncThunk(
    'product/getProduct',
    async (_, { rejectWithValue }) => {
        try {
            const { products } = await getProducts()
            console.log(products)
            return products
        } catch (error) {
            return rejectWithValue('Something went wrong')
        }
    }
)
