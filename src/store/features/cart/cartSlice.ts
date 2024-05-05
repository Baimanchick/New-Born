import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { CartI } from "../../../helpers/interfaces/cart.interface";
import { RootState } from "../../store";

const initialState: CartI = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartI>) => {
      state.carts = action.payload.carts;
    },
  },
});

export const fetchCarts = createAsyncThunk<unknown, void>(
  "carts/fetchCarts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/carts/`);
      const data: CartI = { carts: response.data };
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
        const updatedCartData: CartI = { carts: updatedCarts };
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

export const addToCart = createAsyncThunk<
  unknown,
  { user: number; product: number; count: number; price: number }
>(
  "carts/addToCart",
  async ({ user, product, count, price }, { dispatch, rejectWithValue }) => {
    try {
      const productPrice = price;
      const obj = {
        user: user,
        product: product,
        count: count,
        productPrice,
        price,
      };
      const response = await $axios.post(`${API_URL}/carts/`, obj);
      dispatch(fetchCarts());
      console.log(response, obj);
      console.log(response);
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
