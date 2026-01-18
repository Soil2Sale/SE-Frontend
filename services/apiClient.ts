import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: unknown;
}

interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
};

const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

const setRefreshToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", token);
  }
};

const clearTokens = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

const redirectToLogin = (): void => {
  if (typeof window !== "undefined") {
    clearTokens();
    window.location.href = "/login";
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    redirectToLogin();
    return null;
  }

  try {
    const response = await axios.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >(
      `${BASE_URL}/auth/refresh`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );

    const accessToken = (response.data as { accessToken?: string }).accessToken;
    const newRefreshToken = (response.data as { refreshToken?: string }).refreshToken;

    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }

    return accessToken || null;
  } catch (error) {
    clearTokens();
    redirectToLogin();
    return null;
  }
};

const publicRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/refresh",
  "/auth/forgot-password",
  "/auth/reset-password",
];

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route),
    );

    if (!isPublicRoute) {
      const token = getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { success, message, ...rest } = response.data;

    return {
      ...response,
      data: {
        success,
        message,
        ...rest,
      },
    };
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (newAccessToken && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }

      return Promise.reject(error);
    }

    const apiError: ApiError = {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      error: error.response?.data?.error,
      statusCode: error.response?.status,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;

export type { ApiResponse, ApiError };

export { setAccessToken, setRefreshToken, clearTokens };
