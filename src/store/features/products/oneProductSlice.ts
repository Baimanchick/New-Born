import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import {Product,} from "../../../helpers/interfaces/product.interface";
import { AxiosError } from "axios";

interface ProductState {
  product: null | Product[]
}

const initialState: ProductState = {
  product: null
};

const productOneSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      state.product = action.payload.product;
    },
  },
});

export const fetchOneProducts = createAsyncThunk<ProductState, number, { rejectValue: unknown }>(
    "product/fetchOneProduct",
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const response = await $axios.get(`${API_URL}/products/${id}/`);
        const data: ProductState = { product: response.data };
        dispatch(productOneSlice.actions.setProduct(data));
        return data; 
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
        }
        throw error;
      }
    }
  );
  
  

export const { setProduct } = productOneSlice.actions;
export default productOneSlice.reducer;
