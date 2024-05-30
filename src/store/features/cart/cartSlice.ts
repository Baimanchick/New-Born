import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { RootState } from "../../store";
import { Cart, CartItem } from "../../../helpers/interfaces/cart.interface";
import { Localstorage } from "../../../helpers/localstorage";

export interface CartState {
  carts: Cart[];
}

const initialState: CartState = {
  carts:
    JSON.parse(localStorage.getItem(Localstorage.AddedProducts) || "[]") || [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart[]>) => {
      const productIds = action.payload.map((cart) => cart.product.id);
      console.log(productIds);
      localStorage.setItem(
        Localstorage.AddedProducts,
        JSON.stringify(action.payload)
      );
      state.carts = action.payload;
    },
  },
});

export const fetchCarts = createAsyncThunk<unknown, void>(
  "carts/fetchCarts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $axios.get(`${API_URL}/carts/`, {
        params: { limit: 30 },
      });
      console.log("data", data.results);
      dispatch(cartSlice.actions.setCart(data.results));
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
      const state = getState() as RootState;

      if (response.status === 204) {
        const updatedCartData = state.carts.carts.filter(
          (cart) => cart.id !== id
        );
        dispatch(cartSlice.actions.setCart(updatedCartData));
        dispatch(fetchCarts());
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

export const addToCart = createAsyncThunk<unknown, CartItem>(
  "carts/addToCart",
  async ({ count, product_id }: CartItem, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.post(`${API_URL}/carts/`, {
        count,
        product: product_id,
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

export const changeCountCartProduct = createAsyncThunk<
  unknown,
  { count: number; product_id: number; cart_id: number }
>(
  "carts/changeCountCartProduct",
  async ({ count, product_id, cart_id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.patch(`${API_URL}/carts/${cart_id}/`, {
        count: count,
        product: product_id,
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
