import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import {
  FilterProduct,
  Product,
} from "../../../helpers/interfaces/product.interface";
import { AxiosError } from "axios";
import { login, register } from "../auth/authSlice";

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: true,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const fetchProducts = createAsyncThunk<unknown, FilterProduct>(
  "products/fetchProducts",
  async (filters: FilterProduct, { dispatch, rejectWithValue }) => {
    try {
      const queryParams: FilterProduct = {
        limit: filters.limit || 100,
        offset: filters.offset || 0,
      };
      if (filters.brand) {
        queryParams.brand = filters.brand;
      }

      if (filters.category && filters.subcategory) {
        queryParams.subcategory = filters.subcategory;
        queryParams.category = filters.category;
      }
      const { data } = await $axios.get(`${API_URL}/products/`, {
        params: queryParams,
      });
      dispatch(productSlice.actions.setProduct(data.results));
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
      const { data } = await $axios.get(`${API_URL}/products/recommended/`, {
        params: queryParams,
      });
      dispatch(productSlice.actions.setProduct(data.products));
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
      const { data } = await $axios.get(`${API_URL}/products/new_products/`, {
        params: queryParams,
      });
      dispatch(productSlice.actions.setProduct(data.products));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const searchProducts = createAsyncThunk<
  ProductState,
  any,
  { rejectValue: unknown }
>(
  "products/searchProducts",
  async (search_filters, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $axios.get(`${API_URL}/products/`, {
        params: {
          search: search_filters,
        },
      });
      dispatch(productSlice.actions.setProduct(data.results));
      return data.results;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch searchProducts"
        );
      }
      throw error;
    }
  }
);

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
