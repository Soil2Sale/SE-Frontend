# Backend API Routes & Data Structure Report

## Overview

This document outlines all backend API routes expected by the farmer portal pages, including the data structures needed for each endpoint.

---

## 1. Dashboard Page (`/farmer/dashboard`)

### API Routes Called:

#### 1.1 GET `/crop-listings/active`

**Service**: `getActiveCropListings()` from `services/crop-listing/cropApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: CropListing[];
  message?: string;
}

interface CropListing {
  id: string;
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: "PREMIUM" | "STANDARD" | "ECONOMY";
  status: "DRAFT" | "ACTIVE" | "UNDER_NEGOTIATION" | "SOLD" | "CANCELLED";
  created_at: string; // ISO 8601 date
  harvest_date?: string;
}
```

#### 1.2 GET `/transactions`

**Service**: `getTransactionsByUser()` from `services/transaction/transactionApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: Transaction[];
  message?: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: "CROP_SALE" | "LOGISTICS_FEE" | "BNPL_DEDUCTION" | "REFUND" | "ADJUSTMENT";
  status: "INITIATED" | "SUCCESS" | "FAILED" | "REFUNDED";
  completed_at: string; // ISO 8601 date
}
```

#### 1.3 GET `/government-schemes/`

**Service**: `getGovernmentSchemes()` from `services/government-schemes/governmentSchemesApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: Scheme[];
  message?: string;
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  deadline: string; // ISO 8601 date
  state: string;
  crop?: string;
  land_size_min?: number;
  land_size_max?: number;
}
```

---

## 2. Farmer Layout (`/farmer/layout`)

### API Routes Called:

#### 2.1 GET `/users/profile`

**Service**: `getProfile()` from `services/user/userApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: UserProfile;
  message?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "Farmer" | "Buyer" | "LogisticsProvider" | "Admin";
  created_at: string;
  updated_at: string;
}
```

#### 2.2 GET `/farmer-profiles/user/{userId}`

**Service**: `getFarmerProfileByUserId(userId)` from `services/farmer/farmerProfileApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: FarmerProfile;
  message?: string;
}

interface FarmerProfile {
  id: string;
  user_id: string;
  farm_size?: number;
  location_latitude?: number | string;
  location_longitude?: number | string;
  crops_grown?: string[];
  certifications?: string[];
}
```

#### 2.3 GET `/notifications`

**Service**: `getNotificationsByUser()` from `services/notification/notificationApi.ts`

**Response Structure**:

```typescript
{
  success: boolean;
  data: Notification[];
  message?: string;
}

interface Notification {
  id: string;
  notification_type: "ORDER_UPDATE" | "SCHEME_ALERT" | "AI_INSIGHT" | "SYSTEM_ALERT";
  message: string;
  sent_at: string; // ISO 8601 date
  read_at: string | null; // ISO 8601 date or null
}
```

---

## 3. Sell Crops Page (`/farmer/sell-crops`)

### Expected API Routes (TO BE IMPLEMENTED):

#### 3.1 GET `/crop-listings`

**Service**: `getCropListings()` from `services/crop-listing/cropApi.ts`

**Query Parameters**:

- `status?: string` - Filter by status
- `page?: number` - Pagination
- `limit?: number` - Items per page

**Response Structure**:

```typescript
{
  success: boolean;
  data: CropListing[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

interface CropListing {
  id: string;
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: "PREMIUM" | "STANDARD" | "ECONOMY";
  status: "DRAFT" | "ACTIVE" | "UNDER_NEGOTIATION" | "SOLD" | "CANCELLED";
  created_at: string;
  harvest_date?: string;
  location?: string;
  description?: string;
}
```

#### 3.2 POST `/crop-listings`

**Service**: `createCropListing(data)` from `services/crop-listing/cropApi.ts`

**Request Body**:

```typescript
{
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: "PREMIUM" | "STANDARD" | "ECONOMY";
  harvest_date?: string;
  location?: string;
  description?: string;
}
```

**Response Structure**:

```typescript
{
  success: boolean;
  data: CropListing;
  message?: string;
}
```

---

## 4. Market Prices Page (`/farmer/market-prices`)

### Expected API Routes (TO BE IMPLEMENTED):

#### 4.1 GET `/market-prices`

**Service**: `getMarketPrices(params)` from `services/market/marketApi.ts` **(NEW FILE NEEDED)**

**Query Parameters**:

- `state?: string` - Filter by state
- `search?: string` - Search crop names
- `page?: number`
- `limit?: number`

**Response Structure**:

```typescript
{
  success: boolean;
  data: MarketPrice[];
  message?: string;
}

interface MarketPrice {
  id: string;
  crop_name: string;
  current_price: number;
  previous_price: number;
  market_name: string;
  state: string;
  updated_at: string; // ISO 8601 date
  unit: string; // e.g., "kg", "quintal"
}
```

---

## 5. Guidance Page (`/farmer/guidance`)

### Expected API Routes (TO BE IMPLEMENTED):

#### 5.1 GET `/guidance/articles`

**Service**: `getGuidanceArticles(params)` from `services/guidance/guidanceApi.ts` **(NEW FILE NEEDED)**

**Query Parameters**:

- `category?: string`
- `type?: "article" | "video" | "document"`
- `search?: string`
- `page?: number`

**Response Structure**:

```typescript
{
  success: boolean;
  data: GuidanceArticle[];
  message?: string;
}

interface GuidanceArticle {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., "Crop Management", "Pest Control"
  type: "article" | "video" | "document";
  duration?: string; // For videos
  views: number;
  bookmarked: boolean;
  created_at: string;
  thumbnail_url?: string;
  content_url?: string;
}
```

#### 5.2 POST `/guidance/{id}/bookmark`

**Service**: `bookmarkGuidance(id)` from `services/guidance/guidanceApi.ts` **(NEW FILE NEEDED)**

**Response Structure**:

```typescript
{
  success: boolean;
  message: string;
}
```

---

## 6. AI Insights Page (`/farmer/ai-insights`)

### Expected API Routes (TO BE IMPLEMENTED):

#### 6.1 GET `/ai-insights`

**Service**: `getAIInsights(params)` from `services/ai/aiInsightsApi.ts` **(NEW FILE NEEDED)**

**Query Parameters**:

- `category?: "weather" | "market" | "crop_health" | "optimization" | "recommendation"`
- `priority?: "high" | "medium" | "low"`
- `page?: number`

**Response Structure**:

```typescript
{
  success: boolean;
  data: AIInsight[];
  message?: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: "weather" | "market" | "crop_health" | "optimization" | "recommendation";
  priority: "high" | "medium" | "low";
  confidence: number; // 0-100
  created_at: string;
  action_required: boolean;
  potential_impact?: string;
}
```

---

## 7. Schemes Page (`/farmer/schemes`)

### API Routes Called:

#### 7.1 GET `/government-schemes/`

**Service**: `getGovernmentSchemes()` from `services/government-schemes/governmentSchemesApi.ts`

**Already implemented** - Same as Dashboard (1.3)

---

## 8. Support Page (`/farmer/support`)

### Expected API Routes (TO BE IMPLEMENTED):

#### 8.1 GET `/support/tickets`

**Service**: `getSupportTickets()` from `services/support/supportApi.ts` **(NEW FILE NEEDED)**

**Query Parameters**:

- `status?: "open" | "in_progress" | "resolved" | "closed"`
- `page?: number`

**Response Structure**:

```typescript
{
  success: boolean;
  data: SupportTicket[];
  message?: string;
}

interface SupportTicket {
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
```

#### 8.2 POST `/support/tickets`

**Service**: `createSupportTicket(data)` from `services/support/supportApi.ts` **(NEW FILE NEEDED)**

**Request Body**:

```typescript
{
  subject: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
}
```

**Response Structure**:

```typescript
{
  success: boolean;
  data: SupportTicket;
  message: string;
}
```

---

## Summary of New API Services Needed

### Files to Create:

1. **`services/market/marketApi.ts`**
   - `getMarketPrices(params)`

2. **`services/guidance/guidanceApi.ts`**
   - `getGuidanceArticles(params)`
   - `bookmarkGuidance(id)`

3. **`services/ai/aiInsightsApi.ts`**
   - `getAIInsights(params)`

4. **`services/support/supportApi.ts`**
   - `getSupportTickets(params)`
   - `createSupportTicket(data)`

### Existing Services Used:

- ✅ `services/crop-listing/cropApi.ts`
- ✅ `services/transaction/transactionApi.ts`
- ✅ `services/government-schemes/governmentSchemesApi.ts`
- ✅ `services/user/userApi.ts`
- ✅ `services/farmer/farmerProfileApi.ts`
- ✅ `services/notification/notificationApi.ts`

---

## Authentication

All API calls use the `apiClient` which:

- Automatically includes JWT token from localStorage
- Base URL: `process.env.NEXT_PUBLIC_API_URL` or `http://localhost:3000/api`
- Handles token refresh automatically
- Adds `Authorization: Bearer {token}` header to all requests

---

## Error Handling

All responses follow this error structure:

```typescript
{
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}
```

Common HTTP Status Codes:

- **200**: Success
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

---

## Notes for Backend Development

1. **Pagination**: Implement cursor-based or offset pagination for list endpoints
2. **Filtering**: Support filter parameters for all list endpoints
3. **Search**: Implement fuzzy search for text fields
4. **Sorting**: Allow sorting by common fields (date, name, price)
5. **Real-time Updates**: Consider WebSocket support for notifications and market prices
6. **Rate Limiting**: Implement rate limiting per user/IP
7. **Data Validation**: Validate all input data with proper error messages
8. **Security**: Sanitize inputs, implement CORS, use HTTPS
9. **Performance**: Add caching for frequently accessed data (market prices, schemes)
10. **Monitoring**: Log all API calls for debugging and analytics

---

## File to Delete

**`/app/farmer/crop-listing/page.tsx`** - This page should be removed as it's been replaced by `/farmer/sell-crops` page.

You can delete it manually or use this command:

```bash
rm -rf app/farmer/crop-listing
```
