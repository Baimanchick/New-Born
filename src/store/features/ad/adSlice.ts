import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AdI } from "../../../components/AdCard/AdCard.props";
import { AxiosError } from "axios";

const initialState: AdI = {
  ad: [],
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    setAd: (state, action: PayloadAction<AdI>) => {
      state.ad = action.payload.ad;
    },
  },
});

export const fetchAd = createAsyncThunk<unknown, void>(
  "ad/fetchAd",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/promotion/`);
      const data: AdI = { ad: response.data.results };

      dispatch(adSlice.actions.setAd(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setAd } = adSlice.actions;
export default adSlice.reducer;
