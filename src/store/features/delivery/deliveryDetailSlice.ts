import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { DeliveryI } from "../../../helpers/interfaces/delivery.interface";

const initialState: DeliveryI = {
  deliveryDetail: [],
};

const deliveryDetaillSlice = createSlice({
  name: "deliveryDetail",
  initialState,
  reducers: {
    setDeliveryDetail: (state, action: PayloadAction<DeliveryI>) => {
      state.deliveryDetail = action.payload.deliveryDetail;
    },
  },
});

export const fetchDeliveryDetail = createAsyncThunk<unknown, void>(
  "delivery/fetchDeliveryDetail",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/order_detail/`);
      const data: DeliveryI = { deliveryDetail: response.data };
      dispatch(deliveryDetaillSlice.actions.setDeliveryDetail(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);
export const { setDeliveryDetail } = deliveryDetaillSlice.actions;
export default deliveryDetaillSlice.reducer;
