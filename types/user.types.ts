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

export interface User {
  id: string;
  name: string;
  mobile_number: string;
  role: string;
  recovery_email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetUserByRoleResponse {
  success: boolean;
  count: number;
  data: User[];
}
