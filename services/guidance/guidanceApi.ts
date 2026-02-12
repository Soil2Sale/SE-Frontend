import apiClient from "../apiClient";

export interface GuidanceArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "document";
  duration?: string;
  views: number;
  bookmarked: boolean;
  created_at: string;
  thumbnail_url?: string;
  content_url?: string;
}

export interface GetGuidanceArticlesParams {
  category?: string;
  type?: "article" | "video" | "document";
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetGuidanceArticlesResponse {
  success: boolean;
  data: GuidanceArticle[];
  message?: string;
}

export interface BookmarkGuidanceResponse {
  success: boolean;
  message: string;
}

export const getGuidanceArticles = async (
  params?: GetGuidanceArticlesParams,
): Promise<GetGuidanceArticlesResponse> => {
  const response = await apiClient.get<GetGuidanceArticlesResponse>(
    "/guidance/articles",
    { params },
  );
  return response.data;
};

export const bookmarkGuidance = async (
  id: string,
): Promise<BookmarkGuidanceResponse> => {
  const response = await apiClient.post<BookmarkGuidanceResponse>(
    `/guidance/${id}/bookmark`,
  );
  return response.data;
};
