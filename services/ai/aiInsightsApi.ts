import apiClient from "../apiClient";

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category:
    | "weather"
    | "market"
    | "crop_health"
    | "optimization"
    | "recommendation";
  priority: "high" | "medium" | "low";
  confidence: number;
  created_at: string;
  action_required: boolean;
  potential_impact?: string;
}

export interface GetAIInsightsParams {
  category?:
    | "weather"
    | "market"
    | "crop_health"
    | "optimization"
    | "recommendation";
  priority?: "high" | "medium" | "low";
  page?: number;
  limit?: number;
}

export interface GetAIInsightsResponse {
  success: boolean;
  data: AIInsight[];
  message?: string;
}

export const getAIInsights = async (
  params?: GetAIInsightsParams,
): Promise<GetAIInsightsResponse> => {
  const response = await apiClient.get<GetAIInsightsResponse>("/ai-insights", {
    params,
  });
  return response.data;
};
