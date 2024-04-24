import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { FilterProductCardType, ProductCardI } from "../../../components/ProductCard/ProductCard.props";


const initialState: ProductCardI = {
    products: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductCardI>) => {
            state.products = action.payload.products;
        },
    }
});

export const fetchProducts = (filters : FilterProductCardType) : AppThunk => async (dispatch) => {
    try {
        const queryParams ={
            limit: filters.limit || 100,
            offset: filters.offset || 0,

        }
        const response = await $axios.get(`${API_URL}/products/`, { params: queryParams })
        const data: ProductCardI = {products : response.data.results };
        dispatch(productSlice.actions.setProduct(data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchRecAndPopProducts = (filters : FilterProductCardType): AppThunk => async (dispatch) => {
    try {
        const queryParams ={
            limit: filters.limit || 100,
            offset: filters.offset || 0,
            min_price: filters.min_price || undefined,
            max_price: filters.max_price || undefined,
            brand: filters.brand || [],
            category: filters.category || [],
            product_name: filters.product_name || [],
        }
        const response = await $axios.get(`${API_URL}/products/recommended/`, { params: queryParams });
        const data: ProductCardI = { products: response.data.products };
        dispatch(productSlice.actions.setProduct(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;