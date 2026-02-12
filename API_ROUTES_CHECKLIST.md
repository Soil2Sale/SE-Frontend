# API Routes Testing Checklist

## Base URL

`{BASE_URL}` = `process.env.NEXT_PUBLIC_API_URL` or `http://localhost:3000/api`

All routes require **Authorization header**: `Bearer {JWT_TOKEN}`

---

## 1. Crop Listings Routes

### ✅ GET `{BASE_URL}/crop-listings/active`

**Used in**: Dashboard

- **Query Params**: None
- **Sending**: Nothing
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "crop_name": "string",
      "quantity": 100,
      "expected_price": 500,
      "quality_grade": "PREMIUM",
      "status": "ACTIVE",
      "created_at": "2026-02-12T10:00:00Z",
      "harvest_date": "2026-03-15T00:00:00Z"
    }
  ]
}
```

### ⏳ GET `{BASE_URL}/crop-listings`

**Used in**: Sell Crops Page

- **Query Params**:
  - `status` (optional): string
  - `page` (optional): number
  - `limit` (optional): number
- **Sending**: Query parameters only
- **Expecting**:

```json
{
  "success": true,
  "data": [
    /* same as above */
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### ⏳ POST `{BASE_URL}/crop-listings`

**Used in**: Sell Crops Page

- **Query Params**: None
- **Sending** (Request Body):

```json
{
  "crop_name": "Wheat",
  "quantity": 200,
  "expected_price": 450,
  "quality_grade": "STANDARD",
  "harvest_date": "2026-04-10T00:00:00Z",
  "location": "Punjab",
  "description": "High quality wheat"
}
```

- **Expecting**:

```json
{
  "success": true,
  "data": {
    "id": "new-id",
    "crop_name": "Wheat"
    /* ... all crop listing fields */
  },
  "message": "Crop listing created successfully"
}
```

---

## 2. Transactions Routes

### ✅ GET `{BASE_URL}/transactions`

**Used in**: Dashboard

- **Query Params**:
  - Any custom filters (optional)
- **Sending**: Query parameters (optional)
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "amount": 25000,
      "type": "CROP_SALE",
      "status": "SUCCESS",
      "completed_at": "2026-02-10T15:30:00Z"
    }
  ]
}
```

---

## 3. Government Schemes Routes

### ✅ GET `{BASE_URL}/government-schemes/`

**Used in**: Dashboard, Schemes Page

- **Query Params**: None
- **Sending**: Nothing
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "PM-KISAN Scheme",
      "description": "Financial assistance to farmers",
      "deadline": "2026-12-31T00:00:00Z",
      "state": "All India",
      "crop": "All Crops",
      "land_size_min": 0,
      "land_size_max": 100
    }
  ]
}
```

---

## 4. User Profile Routes

### ✅ GET `{BASE_URL}/users/profile`

**Used in**: Farmer Layout

- **Query Params**: None
- **Sending**: Nothing (uses JWT token)
- **Expecting**:

```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "name": "Ram Kumar",
    "email": "ram@example.com",
    "phone": "+91-9876543210",
    "role": "Farmer",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2026-02-01T00:00:00Z"
  }
}
```

---

## 5. Farmer Profile Routes

### ✅ GET `{BASE_URL}/farmer-profiles/user/{userId}`

**Used in**: Farmer Layout

- **URL Params**: `userId` (from user profile)
- **Query Params**: None
- **Sending**: userId in URL path
- **Expecting**:

```json
{
  "success": true,
  "data": {
    "id": "farmer-profile-123",
    "user_id": "user-123",
    "farm_size": 5.5,
    "location_latitude": 30.7333,
    "location_longitude": 76.7794,
    "crops_grown": ["Wheat", "Rice", "Cotton"],
    "certifications": ["Organic"]
  }
}
```

---

## 6. Notifications Routes

### ✅ GET `{BASE_URL}/notifications`

**Used in**: Farmer Layout

- **Query Params**:
  - Any custom filters (optional)
- **Sending**: Query parameters (optional)
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "notif-123",
      "notification_type": "SCHEME_ALERT",
      "message": "New scheme available for cotton farmers",
      "sent_at": "2026-02-12T09:00:00Z",
      "read_at": null
    }
  ]
}
```

---

## 7. Market Prices Routes

### ⏳ GET `{BASE_URL}/market-prices`

**Used in**: Market Prices Page

- **Query Params**:
  - `state` (optional): string - e.g., "Punjab"
  - `search` (optional): string - e.g., "wheat"
  - `page` (optional): number
  - `limit` (optional): number
- **Sending**: Query parameters
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "price-123",
      "crop_name": "Wheat",
      "current_price": 2500,
      "previous_price": 2400,
      "market_name": "Amritsar Mandi",
      "state": "Punjab",
      "updated_at": "2026-02-12T08:00:00Z",
      "unit": "quintal"
    }
  ]
}
```

---

## 8. Guidance Routes

### ⏳ GET `{BASE_URL}/guidance/articles`

**Used in**: Guidance Page

- **Query Params**:
  - `category` (optional): string - e.g., "Crop Management"
  - `type` (optional): "article" | "video" | "document"
  - `search` (optional): string
  - `page` (optional): number
  - `limit` (optional): number
- **Sending**: Query parameters
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "guide-123",
      "title": "Best Practices for Wheat Cultivation",
      "description": "Complete guide to growing wheat",
      "category": "Crop Management",
      "type": "article",
      "duration": null,
      "views": 1500,
      "bookmarked": false,
      "created_at": "2026-01-15T00:00:00Z",
      "thumbnail_url": "https://example.com/thumb.jpg",
      "content_url": "https://example.com/article/123"
    }
  ]
}
```

### ⏳ POST `{BASE_URL}/guidance/{id}/bookmark`

**Used in**: Guidance Page

- **URL Params**: `id` - guidance article ID
- **Query Params**: None
- **Sending**: Nothing (id in URL)
- **Expecting**:

```json
{
  "success": true,
  "message": "Article bookmarked successfully"
}
```

---

## 9. AI Insights Routes

### ⏳ GET `{BASE_URL}/ai-insights`

**Used in**: AI Insights Page

- **Query Params**:
  - `category` (optional): "weather" | "market" | "crop_health" | "optimization" | "recommendation"
  - `priority` (optional): "high" | "medium" | "low"
  - `page` (optional): number
  - `limit` (optional): number
- **Sending**: Query parameters
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "insight-123",
      "title": "Optimal Irrigation Schedule",
      "description": "Based on weather patterns, reduce irrigation by 20% this week",
      "category": "optimization",
      "priority": "high",
      "confidence": 85,
      "created_at": "2026-02-12T06:00:00Z",
      "action_required": true,
      "potential_impact": "Save 500 liters of water per day"
    }
  ]
}
```

---

## 10. Support Routes

### ⏳ GET `{BASE_URL}/support/tickets`

**Used in**: Support Page

- **Query Params**:
  - `status` (optional): "open" | "in_progress" | "resolved" | "closed"
  - `page` (optional): number
  - `limit` (optional): number
- **Sending**: Query parameters
- **Expecting**:

```json
{
  "success": true,
  "data": [
    {
      "id": "ticket-123",
      "subject": "Payment not received",
      "description": "I sold 200kg wheat but haven't received payment",
      "category": "Payment",
      "status": "open",
      "priority": "high",
      "created_at": "2026-02-11T14:00:00Z",
      "updated_at": "2026-02-11T14:00:00Z",
      "response_count": 0
    }
  ]
}
```

### ⏳ POST `{BASE_URL}/support/tickets`

**Used in**: Support Page

- **Query Params**: None
- **Sending** (Request Body):

```json
{
  "subject": "Issue with crop listing",
  "description": "Cannot update my rice listing price",
  "category": "Technical",
  "priority": "medium"
}
```

- **Expecting**:

```json
{
  "success": true,
  "data": {
    "id": "ticket-new-123",
    "subject": "Issue with crop listing",
    /* ... all ticket fields */
    "status": "open",
    "response_count": 0
  },
  "message": "Support ticket created successfully"
}
```

---

## Testing Notes

### Legend:

- ✅ = Already implemented API (from existing services)
- ⏳ = New API endpoint needed

### Authentication:

All routes require JWT token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Error Response Format:

All routes should return errors in this format:

```json
{
  "success": false,
  "message": "Error description for user",
  "error": "Technical error details",
  "statusCode": 400
}
```

### HTTP Status Codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (valid token but no access)
- `404` - Not Found
- `500` - Internal Server Error

### Testing Checklist:

For each route, test:

1. ✓ Successful request with valid data
2. ✓ Request without Authorization header (should return 401)
3. ✓ Request with invalid token (should return 401)
4. ✓ Request with invalid query params (should return 400)
5. ✓ Request with invalid body data for POST (should return 400)
6. ✓ Verify response structure matches expected format
7. ✓ Verify data types of all fields
8. ✓ Test pagination (if applicable)
9. ✓ Test filtering (if applicable)
10. ✓ Test edge cases (empty results, large datasets, etc.)
