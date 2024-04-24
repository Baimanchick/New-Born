import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { CategoryI } from "../../../components/CategoryCard/CategoryCard.props";
import { AxiosError } from "axios";

const initialState: CategoryI = {
  category: [],
};

const categoryCardlSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryCard: (state, action: PayloadAction<CategoryI>) => {
      state.category = action.payload.category;
    },
  },
});

export const fetchCategory = createAsyncThunk<unknown, void>(
  "category/fetchCategory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/categories/`);
      const data: CategoryI = { category: response.data.results };
      dispatch(categoryCardlSlice.actions.setCategoryCard(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);
export const { setCategoryCard } = categoryCardlSlice.actions;
export default categoryCardlSlice.reducer;
