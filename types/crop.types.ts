export enum QualityGrade {
  PREMIUM = "Premium",
  GRADE_A = "Grade A",
  GRADE_B = "Grade B",
  STANDARD = "Standard",
}

export interface FarmerProfile {
  name: string;
}

export interface Crop {
  id: string;
  crop_name: string;
  quality_grade: QualityGrade;
  quantity_available: number;
  expected_price: number;
  farmer_profile: FarmerProfile;
}
