import apiClient from "../apiClient";
import type { Scheme } from "../../types/dashboard.types";

export interface GetGovernmentSchemesResponse {
  success: boolean;
  data: Scheme[];
  message?: string;
}

export const getGovernmentSchemes =
  async (): Promise<GetGovernmentSchemesResponse> => {
    const response = await apiClient.get<GetGovernmentSchemesResponse>(
      "/government-schemes/",
    );
    return response.data;
  };
