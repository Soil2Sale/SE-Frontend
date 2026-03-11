export enum DisputeStatus {
  OPEN = "OPEN",
  UNDER_REVIEW = "UNDER_REVIEW",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export interface DisputeEvidence {
  id: string;
  dispute_id: string;
  user_id: string;
  file_url: string;
  description?: string;
  created_at: string;
  user?: any;
}

export interface Dispute {
  id: string;
  order_id: string;
  raised_by_user_id: string;
  description: string;
  status: DisputeStatus;
  created_at: string;
  order?: any;
  raised_by?: any;
}

export interface GetDisputesParams {
  status?: DisputeStatus | string;
  page?: number;
  limit?: number;
}

export interface GetDisputesResponse {
  success: boolean;
  data: Dispute[];
  count: number;
  total: number;
  page: number;
  totalPages: number;
}

export interface GetDisputeByIdResponse {
  success: boolean;
  data: {
    dispute: Dispute;
    evidence: DisputeEvidence[];
  };
}

export interface CreateDisputeRequest {
  order_id: string;
  description: string;
}

export interface CreateDisputeResponse {
  success: boolean;
  data: Dispute;
}

export interface AddDisputeEvidenceRequest {
  file_url: string;
  description?: string;
}

export interface AddDisputeEvidenceResponse {
  success: boolean;
  data: DisputeEvidence;
}
