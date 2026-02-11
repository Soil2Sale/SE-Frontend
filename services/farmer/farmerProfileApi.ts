import apiClient from "../apiClient";

export const getFarmerProfileByUserId = async (userId: string) => {
  const response = await apiClient.get(`/farmer-profiles/user/${userId}`);
  return response.data;
};

export const getAllFarmerProfiles = async (params?: Record<string, any>) => {
  const response = await apiClient.get(`/farmer-profiles`, { params });
  return response.data;
};

export const createFarmerProfile = async (data: any) => {
  const response = await apiClient.post(`/farmer-profiles`, data);
  return response.data;
};
