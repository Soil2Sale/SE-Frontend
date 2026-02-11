import apiClient from "../apiClient";

export const getTransactionsByUser = async (params?: Record<string, any>) => {
  const response = await apiClient.get("/transactions", { params });
  return response.data;
};

export const getTransactionById = async (id: string) => {
  const response = await apiClient.get(`/transactions/${id}`);
  return response.data;
};

export const createTransaction = async (data: any) => {
  const response = await apiClient.post("/transactions", data);
  return response.data;
};
