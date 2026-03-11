import apiClient from "../apiClient";
import {
  GetDisputesParams,
  GetDisputesResponse,
  GetDisputeByIdResponse,
  CreateDisputeRequest,
  CreateDisputeResponse,
  AddDisputeEvidenceRequest,
  AddDisputeEvidenceResponse,
} from "../../types/dispute.types";

export const getDisputes = async (
  params?: GetDisputesParams,
): Promise<GetDisputesResponse> => {
  const response = await apiClient.get<GetDisputesResponse>("/disputes", {
    params,
  });
  return response.data;
};

export const getDisputeById = async (
  id: string,
): Promise<GetDisputeByIdResponse> => {
  const response = await apiClient.get<GetDisputeByIdResponse>(
    `/disputes/${id}`,
  );
  return response.data;
};

export const createDispute = async (
  data: CreateDisputeRequest,
): Promise<CreateDisputeResponse> => {
  const response = await apiClient.post<CreateDisputeResponse>(
    "/disputes",
    data,
  );
  return response.data;
};

export const addDisputeEvidence = async (
  id: string,
  data: AddDisputeEvidenceRequest,
): Promise<AddDisputeEvidenceResponse> => {
  const response = await apiClient.post<AddDisputeEvidenceResponse>(
    `/disputes/${id}/evidence`,
    data,
  );
  return response.data;
};
