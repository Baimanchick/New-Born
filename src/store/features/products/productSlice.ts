import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import {
  FilterProduct,
  Product,
} from "../../../helpers/interfaces/product.interface";
import { AxiosError } from "axios";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      state.products = action.payload.products;
    },
  },
});

export const fetchProducts = createAsyncThunk<unknown, FilterProduct>(
  "products/fetchProducts",
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = {
        limit: filters.limit || 100,
        offset: filters.offset || 0,
      };
      const response = await $axios.get(`${API_URL}/products/`, {
        params: queryParams,
      });
      const data: ProductState = { products: response.data.results };
      dispatch(productSlice.actions.setProduct(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const fetchRecAndPopProducts = createAsyncThunk<unknown, FilterProduct>(
  "products/fetchRecAndPopProducts",
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = {
        limit: filters.limit || 100,
        offset: filters.offset || 0,
        min_price: filters.min_price || undefined,
        max_price: filters.max_price || undefined,
        brand: filters.brand || [],
        category: filters.category || [],
        product_name: filters.product_name || [],
      };
      const response = await $axios.get(`${API_URL}/products/recommended/`, {
        params: queryParams,
      });
      const data: ProductState = { products: response.data.products };
      dispatch(productSlice.actions.setProduct(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const fetchNewProducts = createAsyncThunk<unknown, FilterProduct>(
  "products/fetchNewProducts",
  async (filters, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = {
        limit: filters.limit || 100,
        offset: filters.offset || 0,
        min_price: filters.min_price || undefined,
        max_price: filters.max_price || undefined,
        brand: filters.brand || [],
        category: filters.category || [],
        product_name: filters.product_name || [],
      };
      const response = await $axios.get(`${API_URL}/products/new_products/`, {
        params: queryParams,
      });
      const data: ProductState = { products: response.data.products };      
      dispatch(productSlice.actions.setProduct(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const searchProducts = createAsyncThunk<ProductState, any, {rejectValue: unknown}>(
  "products/searchProducts",
  async (search_filters, {dispatch, rejectWithValue}) => {
    try {
      const response = await $axios.get(`${API_URL}/products/`, {params : {
        search: search_filters
      }})
      const data: ProductState = { products: response.data.results } 
      dispatch(productSlice.actions.setProduct(data))
      return data
    } catch (error) {
      if(error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch searchProducts")
      }
      throw error
    }
  }
)

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
