import apiClient from "../apiClient";

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
  response_count: number;
}

export interface GetSupportTicketsParams {
  status?: "open" | "in_progress" | "resolved" | "closed";
  page?: number;
  limit?: number;
}

export interface GetSupportTicketsResponse {
  success: boolean;
  data: SupportTicket[];
  message?: string;
}

export interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
}

export interface CreateSupportTicketResponse {
  success: boolean;
  data: SupportTicket;
  message: string;
}

export const getSupportTickets = async (
  params?: GetSupportTicketsParams,
): Promise<GetSupportTicketsResponse> => {
  const response = await apiClient.get<GetSupportTicketsResponse>(
    "/support/tickets",
    { params },
  );
  return response.data;
};

export const createSupportTicket = async (
  data: CreateSupportTicketRequest,
): Promise<CreateSupportTicketResponse> => {
  const response = await apiClient.post<CreateSupportTicketResponse>(
    "/support/tickets",
    data,
  );
  return response.data;
};
