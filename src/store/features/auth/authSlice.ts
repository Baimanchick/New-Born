import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AxiosError } from "axios";
import { RootState } from "../../store";

export type LoginUser = Pick<User, "email"> & { password: string };
export type RegisterUser = Pick<User, "email" | "name"> & { password: string };

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
  isValidToken: boolean;
  error: ErrorMessage;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  tokens: JSON.parse(localStorage.getItem("tokens") || "null"),
  isValidToken: true,
  error: null,
  isAuth:
    !!JSON.parse(localStorage.getItem("tokens") || "null") &&
    !!JSON.parse(localStorage.getItem("user") || "null"),
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
      state.isAuth = false;
    },

    setIsValidToken(state: AuthState, action: PayloadAction<boolean>) {
      state.isValidToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuth = true;
    });
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
      const err = error as AxiosError;
      return rejectWithValue(err.response);
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
      const err = error as AxiosError;
      return rejectWithValue(err.response);
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
      if (Object.keys(data).length == 0) {
        dispatch(authSlice.actions.setIsValidToken(true));
      } else {
        dispatch(authSlice.actions.setIsValidToken(false));
      }
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
      console.log("data", data);
      console.log("state.auth.isValidToken", state.auth.isValidToken);
      if (!state.auth.isValidToken) {
        authSlice.actions.setTokens(data);
      }
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

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
