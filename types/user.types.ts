export interface UserProfile {
  id: string;
  email: string;
  name: string;
  language: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  language?: string;
  phone?: string;
}

export interface GetProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

export interface DeleteAccountResponse {
  success: boolean;
  message?: string;
}
