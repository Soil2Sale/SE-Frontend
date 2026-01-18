import apiClient, {
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../apiClient";
import type {
  RegisterRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../../types/auth.types";

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    data,
  );

  if (response.data.accessToken) {
    setAccessToken(response.data.accessToken);
  }

  if (response.data.refreshToken) {
    setRefreshToken(response.data.refreshToken);
  }

  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);

  if (response.data.accessToken) {
    setAccessToken(response.data.accessToken);
  }

  if (response.data.refreshToken) {
    setRefreshToken(response.data.refreshToken);
  }

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post<LogoutResponse>("/auth/logout");

  clearTokens();

  return response.data;
};

export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>(
    "/auth/refresh",
    data,
  );

  if (response.data.accessToken) {
    setAccessToken(response.data.accessToken);
  }

  if (response.data.refreshToken) {
    setRefreshToken(response.data.refreshToken);
  }

  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    data,
  );

  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>(
    "/auth/reset-password",
    data,
  );

  return response.data;
};
