import apiClient from "../apiClient";
import type {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  DeleteAccountResponse,
  GetUserByRoleResponse,
} from "../../types/user.types";

export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await apiClient.get<GetProfileResponse>("/user/profile");
  return response.data;
};

export const updateProfile = async (
  data: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>(
    "/user/profile",
    data,
  );
  return response.data;
};

export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  const response =
    await apiClient.delete<DeleteAccountResponse>("/user/account");
  return response.data;
};

export const getUserByRole = async (
  role: string
): Promise<GetUserByRoleResponse> => {
  const response = await apiClient.get<GetUserByRoleResponse>(
    `/users/role?role=${role}`
  );
  return response.data;
};
