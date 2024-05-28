import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import {
  OrderHistoryI,
  OrderHistoryType,
} from "../../../helpers/interfaces/order.interface";

const initialState: OrderHistoryI = {
  orderHistory: [],
};

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    setOrderHistory: (state, action: PayloadAction<OrderHistoryType[]>) => {
      state.orderHistory = action.payload;
    },
  },
});

export const fetchOrderHistory = createAsyncThunk<unknown, void>(
  "orders/fetchOrderHistory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $axios.get(`${API_URL}/orders/get_history/`);
      dispatch(orderHistorySlice.actions.setOrderHistory(data));
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
