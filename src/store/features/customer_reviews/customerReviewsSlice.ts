import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { CustomerReviewsCarouselI } from "../../../helpers/interfaces/CustomerReviews.props";
import { AxiosError } from "axios";

const initialState: CustomerReviewsCarouselI = {
  customerReviews: [],
};

const customerReviewsSlice = createSlice({
  name: "customerReviews",
  initialState,
  reducers: {
    setCustomerReviews: (
      state,
      action: PayloadAction<CustomerReviewsCarouselI>
    ) => {
      state.customerReviews = action.payload.customerReviews;
    },
  },
});

export const fetchCustomerReviews = createAsyncThunk<unknown, void>(
  "customerReviews/fetchCustomerReviews",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/customereviews/`);
      const data: CustomerReviewsCarouselI = {
        customerReviews: response.data.results,
      };
      dispatch(customerReviewsSlice.actions.setCustomerReviews(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);
export const { setCustomerReviews } = customerReviewsSlice.actions;
export default customerReviewsSlice.reducer;
