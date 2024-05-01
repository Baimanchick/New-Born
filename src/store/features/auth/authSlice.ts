import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { RootState } from "../../store";

type LoginUser = Pick<User, "email"> & { password: string };
type RegisterUser = Pick<User, "email" | "name"> & { password: string };

interface User {
  id: number;
  email: string;
  name: string;
}
type ErrorMessage = Error | AxiosError | null;
interface Tokens {
  refresh: string;
  access: string;
}
interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  error: ErrorMessage;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "{}") || null,
  tokens: JSON.parse(localStorage.getItem("tokens") || "{}") || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      const user = JSON.stringify(action.payload);
      localStorage.setItem("user", user);
      state.user = action.payload;
    },
    setTokens: (state: AuthState, action: PayloadAction<Tokens>) => {
      const tokens = JSON.stringify(action.payload);
      localStorage.setItem("tokens", tokens);
      state.tokens = action.payload;
    },
    setLogout: (state: AuthState) => {
      localStorage.removeItem("tokens");
      localStorage.removeItem("user");
      state.tokens = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {});
    // builder.addCase(
    //   login.rejected,
    //   (state: AuthState, action: PayloadAction<AuthState>) => {
    //     state.error = payload;
    //   }
    // );
  },
});

export const login = createAsyncThunk<unknown, LoginUser>(
  "auth/login",
  async (data: LoginUser, { dispatch, rejectWithValue }) => {
    try {
      const { data: tokens } = await $axios.post(
        `${API_URL}/login/jwt/create/`,
        data
      );

      dispatch(authSlice.actions.setTokens(tokens));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const register = createAsyncThunk<unknown, RegisterUser>(
  "auth/register",
  async (data: RegisterUser, { dispatch, rejectWithValue }) => {
    try {
      const { data: tokens } = await $axios.post(`${API_URL}/users/`, data);
      dispatch(authSlice.actions.setTokens(tokens));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const checkToken = createAsyncThunk<unknown, void>(
  "auth/validateToken",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.tokens?.access;

      const { data } = await $axios.post(`${API_URL}/login/jwt/verify/`, {
        token,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const refreshToken = createAsyncThunk<unknown, void>(
  "auth/refresh",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refresh = state.auth.tokens?.refresh;

      const { data } = await $axios.post(`${API_URL}/login/jwt/refresh/`, {
        refresh,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const userMe = createAsyncThunk<unknown, void>(
  "auth/userMe",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.tokens?.refresh;

      const { data: user } = await $axios.get(`${API_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(user));
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response!.data.message);
      }
    }
  }
);

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
