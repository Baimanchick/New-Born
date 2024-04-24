import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CarouselI } from "../../../components/Carousel/Carousel.props";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";

const initialState: CarouselI = {
  carousel: [],
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setCarousel: (state, action: PayloadAction<CarouselI>) => {
      state.carousel = action.payload.carousel;
    },
  },
});

export const fetchCarousel = createAsyncThunk<unknown, void>(
  "carousel/fetchCarousel",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/carousel_items/`);
      const data: CarouselI = { carousel: response.data.results };
      dispatch(carouselSlice.actions.setCarousel(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);
export const { setCarousel } = carouselSlice.actions;
export default carouselSlice.reducer;
