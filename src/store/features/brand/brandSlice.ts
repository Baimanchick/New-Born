import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { BrandI } from "../../../helpers/interfaces/BrandCard.props";
import { AxiosError } from "axios";

const initialState: BrandI = {
  brand: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<BrandI>) => {
      state.brand = action.payload.brand;
    },
  },
});

export const fetchBrand = createAsyncThunk<unknown, void>(
  "brand/fetchBrand",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/brands/`);
      const data: BrandI = { brand: response.data };
      dispatch(brandSlice.actions.setBrand(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setBrand } = brandSlice.actions;
export default brandSlice.reducer;
