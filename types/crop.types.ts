export enum QualityGrade {
  PREMIUM = "Premium",
  GRADE_A = "Grade A",
  GRADE_B = "Grade B",
  STANDARD = "Standard",
}

export enum CropListingStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  SOLD = "sold",
  EXPIRED = "expired",
}

export interface FarmerProfile {
  id: string;
  name: string;
  user_id?: string;
  location?: string;
  farm_size?: number;
}

export interface CropListing {
  id: string;
  farmer_profile_id: string | FarmerProfile;
  crop_name: string;
  quality_grade: QualityGrade;
  quantity: number;
  expected_price: number;
  status: CropListingStatus;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: string;
  crop_name: string;
  quality_grade: QualityGrade;
  quantity_available: number;
  expected_price: number;
  farmer_profile: FarmerProfile;
}

// API Request/Response Types
export interface GetAllCropListingsParams {
  page?: number;
  limit?: number;
  status?: CropListingStatus;
  crop_name?: string;
  quality_grade?: QualityGrade;
  farmer_profile_id?: string;
  min_quantity?: number;
  max_quantity?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface GetAllCropListingsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: CropListing[];
}

export interface GetCropListingByIdResponse {
  success: boolean;
  data: CropListing;
}

export interface GetCropListingsByFarmerIdResponse {
  success: boolean;
  count: number;
  data: CropListing[];
}

export interface GetActiveCropListingsResponse {
  success: boolean;
  count: number;
  data: CropListing[];
}

export interface CreateCropListingRequest {
  farmer_profile_id: string;
  crop_name: string;
  quality_grade: QualityGrade;
  quantity: number;
  expected_price: number;
  status?: CropListingStatus;
}

export interface CreateCropListingResponse {
  success: boolean;
  data: CropListing;
}

export interface UpdateCropListingRequest {
  crop_name?: string;
  quality_grade?: QualityGrade;
  quantity?: number;
  expected_price?: number;
  status?: CropListingStatus;
}

export interface UpdateCropListingResponse {
  success: boolean;
  data: CropListing;
}

export interface UpdateCropListingStatusRequest {
  status: CropListingStatus;
}

export interface UpdateCropListingStatusResponse {
  success: boolean;
  data: CropListing;
}

export interface DeleteCropListingResponse {
  success: boolean;
  message: string;
}
