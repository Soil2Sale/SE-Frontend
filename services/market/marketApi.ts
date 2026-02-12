import apiClient from "../apiClient";

export interface MarketPrice {
  id: string;
  crop_name: string;
  current_price: number;
  previous_price: number;
  market_name: string;
  state: string;
  updated_at: string;
  unit: string;
}

export interface GetMarketPricesParams {
  state?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetMarketPricesResponse {
  success: boolean;
  data: MarketPrice[];
  message?: string;
}

export const getMarketPrices = async (
  params?: GetMarketPricesParams,
): Promise<GetMarketPricesResponse> => {
  const response = await apiClient.get<GetMarketPricesResponse>(
    "/market-prices",
    { params },
  );
  return response.data;
};
