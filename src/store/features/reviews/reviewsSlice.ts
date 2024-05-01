import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { ReviewsI } from "../../../helpers/interfaces/reviews.interface";
import { AxiosError } from "axios";

const initialState: ReviewsI = {
    reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (
      state,
      action: PayloadAction<ReviewsI>
    ) => {
      state.reviews = action.payload.reviews;
    },
  },
});

export const fetchReviews = createAsyncThunk<unknown, void>(
  "reviews/fetchReviews",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/reviews/'`);
      const data: ReviewsI = {
        reviews: response.data.results,
      };
      dispatch(reviewsSlice.actions.setReviews(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);


export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
