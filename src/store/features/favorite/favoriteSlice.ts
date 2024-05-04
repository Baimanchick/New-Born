import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { FavoritesI } from "../../../helpers/interfaces/favorite.interface";

const initialState: FavoritesI = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoritesI>) => {
      state.favorites = action.payload.favorites;
    },
  },
});

export const fetchFavorites = createAsyncThunk<unknown, void>(
  "favorites/fetchFavorites",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.get(`${API_URL}/users/favorites/`);
      const data: FavoritesI = { favorites: response.data.results };
      dispatch(favoritesSlice.actions.setFavorites(data));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const addFavorites = createAsyncThunk<unknown, any>(
  "favorites/addFavorites",
  async (product_id, { dispatch, rejectWithValue }) => {
    try {
      const response = await $axios.post(
        `${API_URL}/products/${product_id}/favorite/`
      );
      dispatch(fetchFavorites());
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
