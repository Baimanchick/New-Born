import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { Product } from "../../../helpers/interfaces/product.interface";
import { AxiosError } from "axios";

interface ProductState {
  product: Product | null;
  loading: boolean;
}

const initialState: ProductState = {
  product: null,
  loading: false,
};

const productOneSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<{ product: Product }>) => {
      state.product = action.payload.product;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOneProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOneProducts.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchOneProducts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const fetchOneProducts = createAsyncThunk<
  { product: Product },
  number,
  { rejectValue: unknown }
>("product/fetchOneProduct", async (id, { dispatch, rejectWithValue }) => {
  try {
    const response = await $axios.get(`${API_URL}/products/${id}/`);
    const data: { product: Product } = { product: response.data };
    dispatch(productOneSlice.actions.setProduct(data));
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
    throw error;
  }
});

export const { setProduct } = productOneSlice.actions;
export default productOneSlice.reducer;
