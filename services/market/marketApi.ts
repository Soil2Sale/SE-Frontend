import apiClient from "../apiClient";

export interface MarketPrice {
  _id: string;
  id: string;
  crop_name: string;
  price: number;
  recorded_date: string;
  price_type: string;
  market_type: string;
  market_location: string;
  state: string;
  created_at: string;
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
