import apiClient from "../apiClient";
import type {
  CropListing,
  CropListingStatus,
  QualityGrade,
  GetAllCropListingsParams,
  GetAllCropListingsResponse,
  GetCropListingByIdResponse,
  GetCropListingsByFarmerIdResponse,
  GetActiveCropListingsResponse,
  CreateCropListingRequest,
  CreateCropListingResponse,
  UpdateCropListingRequest,
  UpdateCropListingResponse,
  UpdateCropListingStatusRequest,
  UpdateCropListingStatusResponse,
  DeleteCropListingResponse,
} from "../../types/crop.types";

export const getAllCropListings = async (
  params?: GetAllCropListingsParams,
): Promise<GetAllCropListingsResponse> => {
  const response = await apiClient.get<GetAllCropListingsResponse>(
    "/crop-listings",
    { params },
  );
  return response.data;
};

export const getCropListingById = async (
  id: string,
): Promise<GetCropListingByIdResponse> => {
  const response = await apiClient.get<GetCropListingByIdResponse>(
    `/crop-listings/${id}`,
  );
  return response.data;
};

export const getActiveCropListings =
  async (): Promise<GetActiveCropListingsResponse> => {
    const response = await apiClient.get<GetActiveCropListingsResponse>(
      "/crop-listings/active",
    );
    return response.data;
  };

export const createCropListing = async (
  data: CreateCropListingRequest,
): Promise<CreateCropListingResponse> => {
  const response = await apiClient.post<CreateCropListingResponse>(
    "/crop-listings",
    data,
  );
  return response.data;
};

export const updateCropListing = async (
  id: string,
  data: UpdateCropListingRequest,
): Promise<UpdateCropListingResponse> => {
  const response = await apiClient.put<UpdateCropListingResponse>(
    `/crop-listings/${id}`,
    data,
  );
  return response.data;
};

export const updateCropListingStatus = async (
  id: string,
  data: UpdateCropListingStatusRequest,
): Promise<UpdateCropListingStatusResponse> => {
  const response = await apiClient.patch<UpdateCropListingStatusResponse>(
    `/crop-listings/${id}/status`,
    data,
  );
  return response.data;
};

export const deleteCropListing = async (
  id: string,
): Promise<DeleteCropListingResponse> => {
  const response = await apiClient.delete<DeleteCropListingResponse>(
    `/crop-listings/${id}`,
  );
  return response.data;
};
