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
    setReviews: (state, action: PayloadAction<ReviewsI>) => {
      state.reviews = action.payload.reviews;
    },
  },
});

export const fetchReviews = createAsyncThunk<unknown, void>(
  "reviews/fetchReviews",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/reviews/`, {
        params: {
          limit: 100,
        },
      });
      const data: ReviewsI = {
        reviews: response.data.results,
      };
      console.log(data, response);
      dispatch(reviewsSlice.actions.setReviews(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const addReview = createAsyncThunk<unknown, any>(
  "reviews/addReview",
  async (obj: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.post(`${API_URL}/reviews/`, obj);
      await dispatch(fetchReviews());
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
