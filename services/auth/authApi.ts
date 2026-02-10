import apiClient, { setAccessToken, clearTokens } from "../apiClient";

// ============================================================================
// Request Types
// ============================================================================

export interface RegisterRequest {
  name: string;
  mobile_number: string;
  role: string;
  recovery_email?: string;
}

export interface VerifyRegistrationRequest {
  userId: string;
  otp: string;
}

export interface LoginRequest {
  identifier: string; // email or mobile number
}

export interface VerifyOtpRequest {
  userId: string;
  otp: string;
}

// ============================================================================
// Response Types
// ============================================================================

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      mobile_number: string;
      role: string;
      recovery_email?: string;
      is_verified: boolean;
      is_telegram_linked: boolean;
      created_at: string;
      updated_at: string;
    };
    telegram_bot_link: string;
    note: string;
  };
}

export interface VerifyRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      mobile_number: string;
      role: string;
      recovery_email?: string;
      is_verified: boolean;
      is_telegram_linked: boolean;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    method: "email" | "telegram";
  };
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      mobile_number: string;
      role: string;
      recovery_email?: string;
      is_verified: boolean;
      is_telegram_linked: boolean;
      telegram_chat_id?: string;
      created_at: string;
      updated_at: string;
    };
    accessToken: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ============================================================================
// API Functions
// ============================================================================

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    data,
  );
  return response.data;
};

export const verifyRegistration = async (
  data: VerifyRegistrationRequest,
): Promise<VerifyRegistrationResponse> => {
  const response = await apiClient.post<VerifyRegistrationResponse>(
    "/auth/verify-registration",
    data,
  );
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const verifyOtp = async (
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  const response = await apiClient.post<VerifyOtpResponse>(
    "/auth/verify-otp",
    data,
  );

  if (response.data.data?.accessToken) {
    setAccessToken(response.data.data.accessToken);
  }

  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>(
    "/auth/refresh",
    {},
  );

  if (response.data.data?.accessToken) {
    setAccessToken(response.data.data.accessToken);
  }

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await apiClient.post<LogoutResponse>("/auth/logout");
  clearTokens();
  return response.data;
};
