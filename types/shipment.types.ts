export enum ShipmentStatus {
  CREATED = "CREATED",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum VehicleType {
  TRUCK = "TRUCK",
  VAN = "VAN",
  BIKE = "BIKE",
}

export enum NotificationType {
  ORDER = "ORDER",
  SHIPMENT = "SHIPMENT",
  SYSTEM = "SYSTEM",
}

export interface Shipment {
  id: string;
  order_id: string;
  vehicle_id: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  estimated_cost: number;
  actual_cost?: number;
  status: ShipmentStatus;
  tracking_code: string;
  dispatched_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  order?: any;
  vehicle?: Vehicle;
}

export interface Vehicle {
  id: string;
  logistics_provider_id: string;
  vehicle_type: VehicleType;
  capacity: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface StorageFacility {
  id: string;
  logistics_provider_id: string;
  name: string;
  location_latitude: number;
  location_longitude: number;
  capacity: number;
  availability: boolean;
  pricing_per_unit: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  notification_type: NotificationType;
  message: string;
  read_at?: string;
  sent_at: string;
  created_at: string;
  updated_at: string;
}

// Request/Response types
export interface GetShipmentsParams {
  status?: ShipmentStatus;
  page?: number;
  limit?: number;
}

export interface GetShipmentsResponse {
  success: boolean;
  data: Shipment[];
  count: number;
  total: number;
  page: number;
  totalPages: number;
}

export interface GetShipmentByIdResponse {
  success: boolean;
  data: Shipment;
}

export interface CreateShipmentRequest {
  order_id: string;
  vehicle_id: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  estimated_cost: number;
}

export interface CreateShipmentResponse {
  success: boolean;
  data: Shipment;
}

export interface UpdateShipmentStatusRequest {
  status: ShipmentStatus;
}

export interface UpdateShipmentStatusResponse {
  success: boolean;
  data: Shipment;
}

export interface TrackShipmentResponse {
  success: boolean;
  data: Shipment;
}

export interface GetVehiclesParams {
  available?: boolean;
}

export interface GetVehiclesResponse {
  success: boolean;
  data: Vehicle[];
  count: number;
}

export interface CreateVehicleRequest {
  vehicle_type: VehicleType;
  capacity: number;
}

export interface CreateVehicleResponse {
  success: boolean;
  data: Vehicle;
}

export interface UpdateVehicleRequest {
  vehicle_type?: VehicleType;
  capacity?: number;
  available?: boolean;
}

export interface UpdateVehicleResponse {
  success: boolean;
  data: Vehicle;
}

export interface DeleteVehicleResponse {
  success: boolean;
  message: string;
}

export interface GetStorageFacilitiesParams {
  availability?: boolean;
}

export interface GetStorageFacilitiesResponse {
  success: boolean;
  data: StorageFacility[];
  count: number;
}

export interface CreateStorageFacilityRequest {
  name: string;
  location_latitude: number;
  location_longitude: number;
  capacity: number;
  pricing_per_unit: number;
}

export interface CreateStorageFacilityResponse {
  success: boolean;
  data: StorageFacility;
}

export interface UpdateStorageFacilityRequest {
  name?: string;
  capacity?: number;
  availability?: boolean;
  pricing_per_unit?: number;
}

export interface UpdateStorageFacilityResponse {
  success: boolean;
  data: StorageFacility;
}

export interface DeleteStorageFacilityResponse {
  success: boolean;
  message: string;
}

export interface GetNotificationsParams {
  unread_only?: boolean;
  notification_type?: NotificationType;
  page?: number;
  limit?: number;
}

export interface GetNotificationsResponse {
  success: boolean;
  data: Notification[];
  count: number;
  total: number;
  page: number;
  totalPages: number;
}

export interface GetUnreadCountResponse {
  success: boolean;
  count: number;
}

export interface MarkNotificationReadResponse {
  success: boolean;
  data: Notification;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
  message: string;
  modifiedCount: number;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}
