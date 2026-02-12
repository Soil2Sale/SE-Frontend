// Types used specifically by the Farmer Dashboard UI

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  advisory: string;
  uv_index: number;
  max_temp: number;
  min_temp: number;
  next_rain: string;
}

export enum CropStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  UNDER_NEGOTIATION = "UNDER_NEGOTIATION",
  SOLD = "SOLD",
  CANCELLED = "CANCELLED",
}

export enum QualityGrade {
  PREMIUM = "PREMIUM",
  STANDARD = "STANDARD",
  ECONOMY = "ECONOMY",
}

export interface CropListing {
  id: string;
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: QualityGrade;
  status: CropStatus;
  created_at: string;
}

export enum TransactionType {
  CROP_SALE = "CROP_SALE",
  LOGISTICS_FEE = "LOGISTICS_FEE",
  BNPL_DEDUCTION = "BNPL_DEDUCTION",
  REFUND = "REFUND",
  ADJUSTMENT = "ADJUSTMENT",
}

export enum TransactionStatus {
  INITIATED = "INITIATED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  completed_at: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  deadline: string;
  state: string;
  crop?: string;
  land_size_min?: number;
  land_size_max?: number;
}

export enum NotificationType {
  ORDER_UPDATE = "ORDER_UPDATE",
  SCHEME_ALERT = "SCHEME_ALERT",
  AI_INSIGHT = "AI_INSIGHT",
  SYSTEM_ALERT = "SYSTEM_ALERT",
}

export interface Notification {
  id: string;
  notification_type: NotificationType;
  message: string;
  sent_at?: string;
  read_at?: string | null;
}

export interface FarmerProfile {
  id: string;
  user_id?: string;
  name?: string;
  location?: string;
  farm_size?: number;
  // optional geolocation fields present in backend responses
  location_latitude?: number | string;
  location_longitude?: number | string;
}

export interface DashboardUser {
  id?: string;
  name?: string;
  role?: string;
  location?: string;
  avatar_url?: string;
}
