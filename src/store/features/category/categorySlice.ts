import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import {
  CategoryI,
  CategoryType,
} from "../../../components/CategoryCard/CategoryCard.props";

interface CategoryState {
  category: CategoryType[];
  subcategories: any[];
}

const initialState = {
  category: [],
  subcategories: [],
};

const categoryCardlSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryCard: (
      state: CategoryState,
      action: PayloadAction<CategoryType[]>
    ) => {
      state.category = action.payload;
    },
    setSubcategories: (state: CategoryState, action: PayloadAction<any[]>) => {
      state.subcategories = action.payload;
    },
  },
});

export const fetchCategory = createAsyncThunk<unknown, void>(
  "category/fetchCategory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $axios.get(`${API_URL}/categories/`);
      dispatch(categoryCardlSlice.actions.setCategoryCard(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const fetchSubcategory = createAsyncThunk<unknown, void>(
  "category/fetchCategory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $axios.get(`${API_URL}/subcategories/`);
      dispatch(categoryCardlSlice.actions.setSubcategories(data.results));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);
export const { setCategoryCard } = categoryCardlSlice.actions;
export default categoryCardlSlice.reducer;
