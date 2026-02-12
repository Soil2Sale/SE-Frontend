import apiClient from "../apiClient";

export const getNotificationsByUser = async (params?: Record<string, any>) => {
  const response = await apiClient.get("/notifications", { params });
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await apiClient.get("/notifications/unread-count");
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await apiClient.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await apiClient.patch(`/notifications/read-all`);
  return response.data;
};
