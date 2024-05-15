import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { RootState } from "../../store";
import { Cart } from "../../../helpers/interfaces/cart.interface";

export interface CartState {
  carts: Cart[];
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.carts = action.payload.carts;
    },
  },
});

export const fetchCarts = createAsyncThunk<unknown, void>(
  "carts/fetchCarts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/carts/`);
      const data: CartState = { carts: response.data.results };
      dispatch(cartSlice.actions.setCart(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const deleteCart = createAsyncThunk<unknown, any, { state: RootState }>(
  "carts/deleteCart",
  async (id, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await $axios.delete(`${API_URL}/carts/${id}/`);
      if (response.status === 204) {
        const updatedCarts = getState().carts.carts.filter(
          (cart) => cart.id !== id
        );
        const updatedCartData: CartState = { carts: updatedCarts };
        dispatch(cartSlice.actions.setCart(updatedCartData));
      } else {
        console.log("Ошибка при удалении товара");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const addToCart = createAsyncThunk<unknown, any>(
  "carts/addToCart",
  async ({ count, product_id }: any, { dispatch, rejectWithValue }) => {
    try {
      const obj = {
        count: count,
        product: product_id,
      };
      const response = await $axios.post(`${API_URL}/carts/`, obj);
      const addedProducts = JSON.parse(
        localStorage.getItem("addedProducts") || "[]"
      );
      const updatedProducts = [...addedProducts, product_id];
      localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
      dispatch(fetchCarts());
      console.log(response);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const changeCountCartProduct = createAsyncThunk<
  unknown,
  { count: number; product_id: number }
>(
  "carts/changeCountCartProduct",
  async ({ count, product_id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.patch(`${API_URL}/carts/${product_id}/`, {
        count: count,
      });
      console.log(product_id);
      console.log(response.data);
      dispatch(fetchCarts());
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
