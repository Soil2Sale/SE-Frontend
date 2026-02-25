import { FarmerAggregate, FarmerProfile } from "../../types/farmerProfile.types";

export const getFarmerAggregateByUserId = async (
  userId: string,
): Promise<FarmerAggregate> => {
  const response = await apiClient.get<FarmerAggregate>(
    `/farmer-profiles/aggregate/${userId}`,
  );
  return response.data;
};
import apiClient from "../apiClient";

export const getFarmerProfileByUserId = async (userId: string) => {
  const response = await apiClient.get(`/farmer-profiles/user/${userId}`);
  return response.data;
};

export const getAllFarmerProfiles = async (params?: Record<string, FarmerProfile>) => {
  const response = await apiClient.get(`/farmer-profiles`, { params });
  return response.data;
};

export const createFarmerProfile = async (data: FarmerProfile) => {
  const response = await apiClient.post(`/farmer-profiles`, data);
  return response.data;
};
