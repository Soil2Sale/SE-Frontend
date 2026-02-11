import apiClient from "../apiClient";
import type {
  GetShipmentsParams,
  GetShipmentsResponse,
  GetShipmentByIdResponse,
  CreateShipmentRequest,
  CreateShipmentResponse,
  UpdateShipmentStatusRequest,
  UpdateShipmentStatusResponse,
  TrackShipmentResponse,
  GetVehiclesParams,
  GetVehiclesResponse,
  CreateVehicleRequest,
  CreateVehicleResponse,
  UpdateVehicleRequest,
  UpdateVehicleResponse,
  DeleteVehicleResponse,
  GetStorageFacilitiesParams,
  GetStorageFacilitiesResponse,
  CreateStorageFacilityRequest,
  CreateStorageFacilityResponse,
  UpdateStorageFacilityRequest,
  UpdateStorageFacilityResponse,
  DeleteStorageFacilityResponse,
  GetNotificationsParams,
  GetNotificationsResponse,
  GetUnreadCountResponse,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
  DeleteNotificationResponse,
} from "../../types/shipment.types";

// Shipment APIs
export const getShipments = async (
  params?: GetShipmentsParams,
): Promise<GetShipmentsResponse> => {
  const response = await apiClient.get<GetShipmentsResponse>("/shipments", {
    params,
  });
  return response.data;
};

export const getShipmentById = async (
  id: string,
): Promise<GetShipmentByIdResponse> => {
  const response = await apiClient.get<GetShipmentByIdResponse>(
    `/shipments/${id}`,
  );
  return response.data;
};

export const createShipment = async (
  data: CreateShipmentRequest,
): Promise<CreateShipmentResponse> => {
  const response = await apiClient.post<CreateShipmentResponse>(
    "/shipments",
    data,
  );
  return response.data;
};

export const updateShipmentStatus = async (
  id: string,
  data: UpdateShipmentStatusRequest,
): Promise<UpdateShipmentStatusResponse> => {
  const response = await apiClient.patch<UpdateShipmentStatusResponse>(
    `/shipments/${id}/status`,
    data,
  );
  return response.data;
};

export const confirmDelivery = async (
  id: string,
): Promise<UpdateShipmentStatusResponse> => {
  const response = await apiClient.patch<UpdateShipmentStatusResponse>(
    `/shipments/${id}/deliver`,
  );
  return response.data;
};

export const trackShipment = async (
  trackingCode: string,
): Promise<TrackShipmentResponse> => {
  const response = await apiClient.get<TrackShipmentResponse>(
    `/shipments/track/${trackingCode}`,
  );
  return response.data;
};

// Vehicle APIs
export const getVehicles = async (
  params?: GetVehiclesParams,
): Promise<GetVehiclesResponse> => {
  const response = await apiClient.get<GetVehiclesResponse>("/vehicles", {
    params,
  });
  return response.data;
};

export const createVehicle = async (
  data: CreateVehicleRequest,
): Promise<CreateVehicleResponse> => {
  const response = await apiClient.post<CreateVehicleResponse>(
    "/vehicles",
    data,
  );
  return response.data;
};

export const updateVehicle = async (
  id: string,
  data: UpdateVehicleRequest,
): Promise<UpdateVehicleResponse> => {
  const response = await apiClient.put<UpdateVehicleResponse>(
    `/vehicles/${id}`,
    data,
  );
  return response.data;
};

export const deleteVehicle = async (
  id: string,
): Promise<DeleteVehicleResponse> => {
  const response = await apiClient.delete<DeleteVehicleResponse>(
    `/vehicles/${id}`,
  );
  return response.data;
};

// Storage Facility APIs
export const getStorageFacilities = async (
  params?: GetStorageFacilitiesParams,
): Promise<GetStorageFacilitiesResponse> => {
  const response = await apiClient.get<GetStorageFacilitiesResponse>(
    "/storage-facilities",
    { params },
  );
  return response.data;
};

export const createStorageFacility = async (
  data: CreateStorageFacilityRequest,
): Promise<CreateStorageFacilityResponse> => {
  const response = await apiClient.post<CreateStorageFacilityResponse>(
    "/storage-facilities",
    data,
  );
  return response.data;
};

export const updateStorageFacility = async (
  id: string,
  data: UpdateStorageFacilityRequest,
): Promise<UpdateStorageFacilityResponse> => {
  const response = await apiClient.put<UpdateStorageFacilityResponse>(
    `/storage-facilities/${id}`,
    data,
  );
  return response.data;
};

export const deleteStorageFacility = async (
  id: string,
): Promise<DeleteStorageFacilityResponse> => {
  const response = await apiClient.delete<DeleteStorageFacilityResponse>(
    `/storage-facilities/${id}`,
  );
  return response.data;
};

// Notification APIs
export const getNotifications = async (
  params?: GetNotificationsParams,
): Promise<GetNotificationsResponse> => {
  const response = await apiClient.get<GetNotificationsResponse>(
    "/notifications",
    { params },
  );
  return response.data;
};

export const getUnreadNotificationsCount =
  async (): Promise<GetUnreadCountResponse> => {
    const response = await apiClient.get<GetUnreadCountResponse>(
      "/notifications/unread-count",
    );
    return response.data;
  };

export const markNotificationAsRead = async (
  id: string,
): Promise<MarkNotificationReadResponse> => {
  const response = await apiClient.patch<MarkNotificationReadResponse>(
    `/notifications/${id}/read`,
  );
  return response.data;
};

export const markAllNotificationsAsRead =
  async (): Promise<MarkAllNotificationsReadResponse> => {
    const response = await apiClient.patch<MarkAllNotificationsReadResponse>(
      "/notifications/read-all",
    );
    return response.data;
  };

export const deleteNotification = async (
  id: string,
): Promise<DeleteNotificationResponse> => {
  const response = await apiClient.delete<DeleteNotificationResponse>(
    `/notifications/${id}`,
  );
  return response.data;
};
