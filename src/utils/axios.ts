import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
import { API_URL } from "./consts";

export interface Tokens {
  access: string;
  refresh: string;
}

export interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const $axios = axios.create();

$axios.interceptors.request.use(
  async (config: AxiosRequestConfig | any) => {
    const tokens = JSON.parse(
      localStorage.getItem("tokens") || "null"
    ) as Tokens;
    if (tokens) {
      config.headers = {
        ...(config.headers as AxiosRequestHeaders),
        Authorization: `Token ${tokens.access}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as RetryableAxiosRequestConfig;
    if (error.response) {
      if (error.response.status === 401 && !config._retry) {
        config._retry = true;
        const access = await refreshAccessToken();
        $axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return $axios(config);
      }
    }
  }
);

async function refreshAccessToken(): Promise<string | undefined> {
  try {
    const tokens = JSON.parse(
      localStorage.getItem("tokens") || "null"
    ) as Tokens;
    if (!tokens) {
      return;
    }
    const { data } = await axios.post<{ access: string }>(
      `${API_URL}/login/jwt/refresh/`,
      {
        refresh: tokens.refresh,
      }
    );
    localStorage.setItem(
      "tokens",
      JSON.stringify({ access: data.access, refresh: tokens.refresh })
    );
    return data.access;
  } catch (error) {
    localStorage.removeItem("tokens");
  }
}

export default $axios;
