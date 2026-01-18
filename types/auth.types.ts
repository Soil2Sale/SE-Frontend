export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  language: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  language: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: UserData;
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: UserData;
  accessToken?: string;
  refreshToken?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}
