import apiClient from "./apiClient";

export const getAllUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const getAllDisputes = async (params?: any) => {
    const response = await apiClient.get("/disputes", { params });
    return response.data;
};

export const getDisputeById = async (id: string) => {
    const response = await apiClient.get(`/disputes/${id}`);
    return response.data;
};

export const updateDisputeStatus = async (id: string, status: string) => {
    const response = await apiClient.patch(`/disputes/${id}/status`, { status });
    return response.data;
};

export const getAllAuditLogs = async (params?: any) => {
    const response = await apiClient.get("/audit-logs", { params });
    return response.data;
};
