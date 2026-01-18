import apiClient from "../apiClient";
import type {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  DeleteAccountResponse,
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
