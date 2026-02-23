export interface FarmerProfile {
  id: string;
  land_size: number;
  location_latitude: number;
  location_longitude: number;
  manual_location_correction: boolean;
}

export interface FarmerAggregate {
  personal_info: {
    id: string;
    name: string;
    mobile_number: string;
    recovery_email: string;
    role: string;
    aadhaar_verified: boolean;
    business_verified: boolean;
    telegram_chat_id: string;
    is_telegram_linked: boolean;
    created_at: string;
  };
  farm_details: FarmerProfile;
  crops: Array<{ id: string; crop_name: string; seasonality: string }>;
  yield_history: Array<{
    id: string;
    crop_name: string;
    year: number;
    yield_quantity: number;
    consent_sharing: boolean;
  }>;
  wallet: {
    id: string;
    balance: number;
    total_credits: number;
    total_debits: number;
  };
  bnpl_loans: Array<{
    id: string;
    amount: number;
    status: string;
    due_date: string;
  }>;
  ratings: {
    average_rating: number;
    total_reviews: number;
    recent_reviews: Array<{
      id: string;
      rating: number;
      comment: string;
      reviewer_name: string;
      created_at: string;
    }>;
  };
  assets: Array<{
    id: string;
    asset_type: string;
    description: string;
    purchase_date: string;
  }>;
  transaction_summary: {
    total_sales: number;
    total_deductions: number;
    net_earnings: number;
    successful_transactions: number;
  };
}