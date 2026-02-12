# SE-Frontend - Soil2Sale Agricultural Marketplace Frontend

A modern Next.js 16 React TypeScript application providing a user-friendly interface for the Soil2Sale agricultural marketplace platform. Features role-based dashboards, real-time tracking, and seamless integration with the backend API.

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Git Branches](#git-branches)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Authentication System](#authentication-system)
6. [Pages & Routes](#pages--routes)
7. [API Services & Integration](#api-services--integration)
8. [Type Definitions & Models](#type-definitions--models)
9. [Installation & Setup](#installation--setup)
10. [Environment Variables](#environment-variables)
11. [Running the Application](#running-the-application)
12. [Component Architecture](#component-architecture)
13. [Navigation Links by Role](#navigation-links-by-role)

---

## PROJECT OVERVIEW

SE-Frontend is a comprehensive agricultural marketplace interface built with Next.js and TypeScript. It provides:

- **Multi-role Support** - Separate interfaces for Farmers, Buyers, Cooperatives, Logistics Providers, Financial Partners, and Admins
- **Real-time Updates** - Live notifications and shipment tracking
- **Responsive Design** - Mobile, tablet, and desktop optimization
- **Authentication** - Telegram-based OTP verification
- **Data Visualization** - Charts and analytics for farmers and buyers
- **Weather Integration** - Real-time weather data and agricultural advisories

---

## GIT BRANCHES

The SE-Frontend repository contains the following branches:

### Current State:
```
  feat/admin
  feat/authenticator (origin/authui)
  feat/buyer
  feat/cooperative
  feat/crop-listing
  feat/farmer
  feat/finance-advisor
  feat/logistics-provider
* dev (current branch)
  main (default branch)
  remotes/origin/HEAD -> origin/main
```

### Branch Structure:

**Main Branches:**
- **main** - Production-ready code (default branch)
- **dev** - Development and integration (current branch)

**Feature Branches:**
- **feat/admin** - Admin dashboard features
- **feat/authenticator (origin/authui)** - Authentication UI improvements
- **feat/buyer** - Buyer interface features
- **feat/cooperative** - Cooperative management features
- **feat/crop-listing** - Crop listing functionality
- **feat/farmer** - Farmer dashboard features
- **feat/finance-advisor** - Financial services UI
- **feat/logistics-provider** - Logistics provider dashboard
- **feat/profile** - User profile management

### Branch Operations:

```bash
# View all branches
git branch -a

# Switch to a feature branch
git checkout feat/farmer

# Create new feature branch
git checkout -b feat/new-feature

# Merge feature to dev
git checkout dev
git merge feat/new-feature

# Create PR to main for releases
```

---

## TECH STACK

### Core Dependencies:
- **Next.js** 16.1.3 - React framework with file-based routing
- **React** 19.2.3 - UI library
- **TypeScript** 5.x - Type-safe JavaScript
- **Axios** 1.13.4 - HTTP client for API calls
- **Tailwind CSS** 4.x - Utility-first CSS framework
- **Lucide React** 0.469.0 - Icon library
- **Motion** 12.33.0 - Animation library
- **Recharts** 3.7.0 - React charting library

### Development Tools:
- **ESLint** 9.x - Code linting
- **Jest** 30.2.0 - Testing framework
- **Testing Library** - React component testing
- **TypeScript Compiler** - Type checking

### Project Configuration:
- **Node.js** 14+ required
- **npm** 6+ for package management

---

## PROJECT STRUCTURE

```
SE-Frontend/
├── app/                                    # Next.js App Router directory
│   ├── page.tsx                           # Home/landing page
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   ├── favicon.ico
│   ├── auth/                              # Authentication pages
│   │   ├── login/page.tsx                 # Login page
│   │   └── register/page.tsx              # Registration page
│   ├── farmer/                            # Farmer role pages
│   │   ├── layout.tsx                     # Farmer layout
│   │   ├── dashboard/page.tsx             # Farmer dashboard
│   │   ├── crop-listing/page.tsx          # Crop listing management
│   │   ├── profile/page.tsx               # Farmer profile
│   │   ├── sell-crops/page.tsx            # Sell crops interface
│   │   ├── market-prices/page.tsx         # Market price view
│   │   ├── guidance/page.tsx              # Agricultural guidance
│   │   ├── ai-insights/page.tsx           # AI-powered insights
│   │   ├── schemes/page.tsx               # Government schemes
│   │   └── support/page.tsx               # Support/help
│   ├── buyer/                             # Buyer role pages
│   │   ├── layout.tsx                     # Buyer layout
│   │   ├── dashboard/page.tsx             # Buyer dashboard
│   │   ├── marketplace/page.tsx           # Browse crops
│   │   ├── orders/page.tsx                # Order management
│   │   ├── profile/page.tsx               # Buyer profile
│   │   └── support/page.tsx               # Support
│   ├── logistics-provider/                # Logistics provider pages
│   │   ├── layout.tsx
│   │   ├── tracking/page.tsx              # Shipment tracking
│   │   ├── shipments/page.tsx             # Shipment management
│   │   ├── fleet-storage/page.tsx         # Vehicle & storage
│   │   ├── support/page.tsx               # Support
│   │   └── profile/page.tsx
│   ├── cooperative/                       # Cooperative pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   └── members/page.tsx
│   ├── financial-partner/                 # Financial partner pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   └── credit-offers/page.tsx
│   ├── admin/                             # Admin pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   └── users/page.tsx
│   └── constants/                         # App constants
│       ├── nav-links.tsx                  # Navigation configuration
│       └── translations.ts                # i18n translations
├── components/                            # Reusable React components
│   ├── Navbar.tsx                         # Navigation bar
│   ├── Sidebar.tsx                        # Sidebar navigation
│   ├── WeatherWidget.tsx                  # Weather widget
│   ├── ui/                                # UI component library
│   │   ├── AnimatedList.tsx              # Animated list component
│   │   ├── LanguageSelector.tsx          # Language selector
│   │   ├── StatusChip.tsx                # Status badge component
│   │   └── [... other UI components]
│   └── __tests__/                         # Component tests
├── services/                              # API integration layer
│   ├── apiClient.ts                       # Axios configuration & interceptors
│   ├── auth/
│   │   └── authApi.ts                     # Authentication API services
│   ├── crop-listing/
│   │   └── cropApi.ts                     # Crop listing API services
│   ├── farmer/
│   │   └── farmerProfileApi.ts            # Farmer profile API services
│   ├── notification/
│   │   └── notificationApi.ts             # Notification API services
│   ├── shipment/
│   │   └── shipmentApi.ts                 # Shipment tracking API services
│   ├── transaction/
│   │   └── transactionApi.ts              # Transaction API services
│   └── user/
│       └── userApi.ts                     # User API services
├── types/                                 # TypeScript type definitions
│   ├── auth.types.ts                      # Auth-related types
│   ├── crop.types.ts                      # Crop-related types
│   ├── dashboard.types.ts                 # Dashboard-specific types
│   ├── shipment.types.ts                  # Shipment-related types
│   └── user.types.ts                      # User-related types
├── .next/                                 # Next.js build output (auto-generated)
├── package.json                           # Project dependencies
├── tsconfig.json                          # TypeScript configuration
├── next.config.ts                         # Next.js configuration
├── postcss.config.mjs                     # PostCSS configuration
├── eslint.config.mjs                      # ESLint configuration
├── jest.config.js                         # Jest testing configuration
├── .gitignore                             # Git ignore rules
└── README.md                              # This file
```

---

## AUTHENTICATION SYSTEM

### Authentication Flow Overview

The frontend implements a comprehensive authentication system using JWT tokens with automatic refresh capability and Telegram-based OTP verification.

### 1. USER REGISTRATION

**Page:** `app/auth/register/page.tsx`

**Process:**
1. User enters name, mobile number, role, and recovery email
2. POST request via `authApi.register()`
3. Backend creates unverified user account
4. Frontend displays Telegram bot link
5. User clicks link to link their Telegram account

**Example Request:**
```typescript
await register({
  name: "John Farmer",
  mobile_number: "9876543210",
  role: "Farmer",
  recovery_email: "john@example.com"
});
```

**Example Response:**
```typescript
{
  success: true,
  message: "User registered successfully. Please link your Telegram and verify OTP.",
  data: {
    user: {
      id: "uuid",
      name: "John Farmer",
      mobile_number: "9876543210",
      role: "Farmer",
      is_verified: false,
      is_telegram_linked: false
    },
    telegram_bot_link: "https://t.me/soil2sale_bot?start=user_id",
    note: "Click the Telegram link to receive your verification OTP..."
  }
}
```

### 2. TELEGRAM LINKING & OTP

**Process:**
1. User clicks Telegram bot link
2. Telegram links user's chat_id to their account
3. OTP is automatically generated and sent via Telegram
4. OTP valid for 5 minutes

**Frontend handles:**
- Display Telegram bot link prominently
- Provide clear instructions
- Show loading state while waiting for OTP

### 3. REGISTRATION OTP VERIFICATION

**Endpoint:** `POST /api/auth/verify-registration`

**Request:**
```typescript
await verifyRegistration({
  userId: "user_uuid",
  otp: "123456"
});
```

**Response:**
```typescript
{
  success: true,
  message: "Registration verified successfully! You can now login.",
  data: {
    user: {
      id: "uuid",
      name: "John Farmer",
      is_verified: true,
      is_telegram_linked: true
    }
  }
}
```

### 4. LOGIN

**Page:** `app/auth/login/page.tsx`

**Process:**
1. User enters email or mobile number
2. Frontend calls `authApi.login()`
3. Backend sends OTP via Telegram
4. User receives OTP in Telegram chat

**Request:**
```typescript
await login({
  identifier: "9876543210" // or email
});
```

**Response:**
```typescript
{
  success: true,
  message: "OTP sent to your Telegram account",
  data: {
    userId: "user_uuid",
    method: "telegram"
  }
}
```

### 5. LOGIN OTP VERIFICATION

**Process:**
1. User receives OTP via Telegram
2. User enters OTP on frontend
3. Frontend calls `authApi.verifyOtp()`
4. Backend verifies OTP and returns JWT tokens

**Request:**
```typescript
const response = await verifyOtp({
  identifier: "9876543210",
  otp: "123456"
});
```

**Response:**
```typescript
{
  success: true,
  message: "Login successful",
  data: {
    user: {
      id: "uuid",
      name: "John Farmer",
      mobile_number: "9876543210",
      role: "Farmer",
      is_verified: true,
      is_telegram_linked: true
    },
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Frontend actions:**
```typescript
// Automatically handled by authApi.ts
if (response.data?.accessToken) {
  setAccessToken(response.data.accessToken);  // localStorage
}
if (response.data?.user?.role) {
  setRole(response.data.user.role);           // localStorage
}
// Redirect to role-based dashboard
```

### 6. TOKEN MANAGEMENT

**Access Token:**
- Short-lived (typically 15 minutes)
- Stored in browser localStorage
- Included in Authorization header for API requests
- Format: `Authorization: Bearer {accessToken}`

**Refresh Token:**
- Long-lived (7 days)
- Stored in httpOnly cookie (secure, not accessible via JavaScript)
- Automatically sent with requests
- Used to obtain new access token when expired

### 7. AUTOMATIC TOKEN REFRESH

**File:** `services/apiClient.ts`

**Process:**
1. API request fails with 401 Unauthorized
2. Axios interceptor detects 401 status
3. Frontend calls `/api/auth/refresh` endpoint
4. Backend validates refresh token (from httpOnly cookie)
5. Backend returns new access token
6. Frontend stores new token
7. Original request is retried with new token

**Code:**
```typescript
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      }
      
      const newToken = await refreshPromise;
      if (newToken && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);  // Retry original request
      }
    }
  }
);
```

### 8. LOGOUT

**Process:**
1. User clicks logout button
2. Frontend calls `authApi.logout()`
3. Backend clears refresh token session
4. Frontend clears localStorage (accessToken, role)
5. Frontend clears httpOnly cookie
6. User redirected to login page

**Code:**
```typescript
const handleLogout = async () => {
  await logout();      // API call
  clearTokens();       // Frontend cleanup
  clearRole();
  redirect("/auth/login");
};
```

### 9. AUTHENTICATION MIDDLEWARE IN API CLIENT

**File:** `services/apiClient.ts`

**Request Interceptor:**
- Checks if route is public (auth routes)
- If protected route, retrieves access token from localStorage
- Adds `Authorization: Bearer {token}` header
- Allows public routes without authentication

**Public Routes:**
```typescript
const publicRoutes = [
  "/auth/register",
  "/auth/login",
  "/auth/refresh",
  "/auth/forgot-password",
  "/auth/reset-password",
];
```

### 10. SECURITY MEASURES

✅ **JWT-based stateless authentication**  
✅ **httpOnly cookies for refresh tokens (XSS protection)**  
✅ **Automatic token refresh (seamless UX)**  
✅ **Telegram OTP verification (2FA)**  
✅ **Secure password handling (backend bcrypt)**  
✅ **Role-based access control (frontend checks)**  
✅ **Environment-based configuration**  
✅ **CORS-enabled for secure cross-origin requests**

---

## PAGES & ROUTES

### 1. PUBLIC PAGES

#### Home/Landing Page
**Route:** `/`
**File:** `app/page.tsx`
**Features:**
- Platform overview
- Features showcase
- Call-to-action buttons
- Navigation to login/register

#### Authentication Pages

**Login Page**
**Route:** `/auth/login`
**File:** `app/auth/login/page.tsx`
**Features:**
- Email/mobile number input
- OTP verification screen
- Telegram integration
- Remember me option
- Forgot password link

**Register Page**
**Route:** `/auth/register`
**File:** `app/auth/register/page.tsx`
**Features:**
- User information form (name, phone, email)
- Role selection dropdown
- Telegram linking instructions
- OTP verification
- Terms & conditions

---

### 2. FARMER ROLE PAGES

**Base URL:** `/farmer`  
**Layout:** `app/farmer/layout.tsx`

#### Dashboard
**Route:** `/farmer/dashboard`
**File:** `app/farmer/dashboard/page.tsx`
**Features:**
- Weather widget
- Quick statistics (active crops, sales, earnings)
- Recent transactions
- Upcoming notifications
- Quick action buttons

#### Crop Listing
**Route:** `/farmer/crop-listing`
**File:** `app/farmer/crop-listing/page.tsx`
**Features:**
- View all crop listings
- Create new crop listing
- Edit existing listings
- Manage crop status
- View offers on crops
- Pagination and filtering

#### Sell Crops
**Route:** `/farmer/sell-crops`
**Features:**
- Quick crop listing form
- Select from farmer's crops
- Set pricing and quantity
- View active listings
- Manage offers

#### Farmer Profile
**Route:** `/farmer/profile`
**File:** `app/farmer/profile/page.tsx`
**Features:**
- Edit profile information
- View verification status
- Update location
- Manage bank details
- View transaction history

#### Market Prices
**Route:** `/farmer/market-prices`
**File:** `app/farmer/market-prices/page.tsx`
**Features:**
- View current market prices by crop type
- Historical price trends
- Price comparison charts
- Filter by location
- Set price alerts

#### Agricultural Guidance
**Route:** `/farmer/guidance`
**File:** `app/farmer/guidance/page.tsx`
**Features:**
- Browse advisory content
- Search by crop/topic
- Filter by season
- View expert recommendations
- Read best practices

#### AI Insights
**Route:** `/farmer/ai-insights`
**File:** `app/farmer/ai-insights/page.tsx`
**Features:**
- AI-powered yield predictions
- Disease detection recommendations
- Optimal planting schedules
- Weather-based advisories
- Personalized recommendations

#### Government Schemes
**Route:** `/farmer/schemes`
**File:** `app/farmer/schemes/page.tsx`
**Features:**
- Browse government subsidies
- Filter by state/district
- Check eligibility
- Application links
- Deadline tracking

#### Support
**Route:** `/farmer/support`
**File:** `app/farmer/support/page.tsx`
**Features:**
- FAQ section
- Contact form
- Ticket tracking
- Live chat (if available)
- Knowledge base

---

### 3. BUYER ROLE PAGES

**Base URL:** `/buyer`  
**Layout:** `app/buyer/layout.tsx`

#### Dashboard
**Route:** `/buyer/dashboard`
**File:** `app/buyer/dashboard/page.tsx`
**Features:**
- Marketplace overview
- Quick statistics
- Recent purchases
- Active orders
- Pending shipments

#### Marketplace
**Route:** `/buyer/marketplace`
**File:** `app/buyer/marketplace/page.tsx`
**Features:**
- Browse all crop listings
- Advanced search and filtering
- Sort by price, date, quality
- Farmer ratings/reviews
- Create purchase offers

#### Orders
**Route:** `/buyer/orders`
**File:** `app/buyer/orders/page.tsx`
**Features:**
- View all orders
- Filter by status
- Order details view
- Download invoices
- Return/refund requests

#### Profile
**Route:** `/buyer/profile`
**Features:**
- Edit profile information
- Manage payment methods
- View transaction history
- Address management
- Notification preferences

#### Support
**Route:** `/buyer/support`
**Features:**
- Order support
- Dispute resolution
- Contact support team

---

### 4. LOGISTICS PROVIDER ROLE PAGES

**Base URL:** `/logistics-provider`  
**Layout:** `app/logistics-provider/layout.tsx`

#### Tracking
**Route:** `/logistics-provider/tracking`
**File:** `app/logistics-provider/tracking/page.tsx`
**Features:**
- Real-time shipment tracking
- Map visualization
- Status updates
- Delivery proofs
- Performance metrics

#### Shipments
**Route:** `/logistics-provider/shipments`
**File:** `app/logistics-provider/shipments/page.tsx`
**Features:**
- View all shipments
- Assign vehicles
- Update shipment status
- Route optimization
- Driver management

#### Fleet Storage
**Route:** `/logistics-provider/fleet-storage`
**File:** `app/logistics-provider/fleet-storage/page.tsx`
**Features:**
- Manage vehicles/fleet
- Storage facility details
- Capacity management
- Maintenance tracking
- Availability status

#### Support
**Route:** `/logistics-provider/support`
**File:** `app/logistics-provider/support/page.tsx`
**Features:**
- Operational support
- Issue reporting
- Documentation

---

### 5. COOPERATIVE ROLE PAGES

**Base URL:** `/cooperative`  
**Layout:** `app/cooperative/layout.tsx`

#### Dashboard
**Route:** `/cooperative/dashboard`
**Features:**
- Member statistics
- Pool assets overview
- Recent transactions
- Member notifications

#### Members Management
**Route:** `/cooperative/members`
**Features:**
- View all members
- Add/remove members
- Member profiles
- Payment distribution

---

### 6. FINANCIAL PARTNER ROLE PAGES

**Base URL:** `/financial-partner`  
**Layout:** `app/financial-partner/layout.tsx`

#### Dashboard
**Route:** `/financial-partner/dashboard`
**Features:**
- Loan portfolio overview
- Application queue
- Approval rate metrics
- Risk dashboard

#### Credit Offers
**Route:** `/financial-partner/credit-offers`
**Features:**
- Create credit products
- Set terms and rates
- View applications
- Manage approvals

---

### 7. ADMIN ROLE PAGES

**Base URL:** `/admin`  
**Layout:** `app/admin/layout.tsx`

#### Admin Dashboard
**Route:** `/admin/dashboard`
**Features:**
- Platform analytics
- User statistics
- Transaction metrics
- System health
- Pending approvals

#### User Management
**Route:** `/admin/users`
**Features:**
- View all users
- Enable/disable accounts
- Verify identities
- Reset passwords
- Suspend accounts

---

## API SERVICES & INTEGRATION

### API Client Setup

**File:** `services/apiClient.ts`

**Configuration:**
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,  // Enable cookies
});
```

**Key Features:**
- Centralized base URL configuration
- Automatic token injection
- Token refresh on 401 responses
- Public route detection
- Cookie-based refresh token handling
- Error normalization

### Authentication Service

**File:** `services/auth/authApi.ts`

**Available Functions:**

1. **register(data: RegisterRequest): Promise<RegisterResponse>**
   - Create new user account
   - Initial verification setup

2. **verifyRegistration(data: VerifyRegistrationRequest): Promise<VerifyRegistrationResponse>**
   - Verify OTP after registration
   - Activate user account

3. **login(data: LoginRequest): Promise<LoginResponse>**
   - Login with email/phone
   - Request OTP delivery

4. **verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse>**
   - Verify login OTP
   - Returns access token
   - Automatically stores token

5. **refreshToken(): Promise<RefreshTokenResponse>**
   - Get new access token
   - Called automatically on 401

6. **logout(): Promise<LogoutResponse>**
   - Logout user
   - Clear server-side token

### Crop Listing Service

**File:** `services/crop-listing/cropApi.ts`

**Available Functions:**

1. **getAllCropListings(params?: GetAllCropListingsParams): Promise<GetAllCropListingsResponse>**
   - Fetch paginated crop listings
   - Support filtering and sorting
   - Parameters: page, limit, status, crop_name, quality_grade, min_price, max_price

2. **getCropListingById(id: string): Promise<GetCropListingByIdResponse>**
   - Get single crop listing details
   - Includes farmer profile

3. **getActiveCropListings(): Promise<GetActiveCropListingsResponse>**
   - Get only active listings
   - For marketplace view

4. **createCropListing(data: CreateCropListingRequest): Promise<CreateCropListingResponse>**
   - Create new crop listing
   - Farmer feature

5. **updateCropListing(id: string, data: UpdateCropListingRequest): Promise<UpdateCropListingResponse>**
   - Update existing listing
   - Farmer feature

6. **updateCropListingStatus(id: string, data: UpdateCropListingStatusRequest): Promise<UpdateCropListingStatusResponse>**
   - Change listing status
   - Mark as sold, cancelled, etc.

7. **deleteCropListing(id: string): Promise<DeleteCropListingResponse>**
   - Delete listing
   - Farmer feature

### Farmer Profile Service

**File:** `services/farmer/farmerProfileApi.ts`

**Available Functions:**

1. **getFarmerProfileByUserId(userId: string): Promise<any>**
   - Get farmer profile for user

2. **getAllFarmerProfiles(params?: Record<string, any>): Promise<any>**
   - Get all farmer profiles (admin/buyer)

3. **createFarmerProfile(data: any): Promise<any>**
   - Create farmer profile after registration

### User Service

**File:** `services/user/userApi.ts`

**Available Functions:**

1. **getProfile(): Promise<GetProfileResponse>**
   - Get current logged-in user profile

2. **updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse>**
   - Update profile information
   - Change language, phone, email

3. **deleteAccount(): Promise<DeleteAccountResponse>**
   - Delete user account

4. **getUserByRole(role: string): Promise<GetUserByRoleResponse>**
   - Get users by role
   - Admin feature

### Shipment Service

**File:** `services/shipment/shipmentApi.ts`

**Available Functions:**
- Get all shipments with filtering
- Get shipment by ID
- Track shipment in real-time
- Create new shipment
- Update shipment details
- Update shipment status

### Notification Service

**File:** `services/notification/notificationApi.ts`

**Available Functions:**
- Get user notifications (paginated)
- Get notification by ID
- Mark as read
- Create notification
- Delete notification

### Transaction Service

**File:** `services/transaction/transactionApi.ts`

**Available Functions:**
- Get all transactions (paginated)
- Get transaction by ID
- Get user transactions
- Create transaction record
- Get transaction statistics

---

## TYPE DEFINITIONS & MODELS

### Authentication Types

**File:** `types/auth.types.ts`

```typescript
// Request Types
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  language: string;
  phone: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface VerifyRegistrationRequest {
  userId: string;
  otp: string;
}

interface VerifyOtpRequest {
  userId: string;
  otp: string;
}

// Response Types
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  language: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: UserData;
  accessToken?: string;
  refreshToken?: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  data?: UserData;
  accessToken?: string;
  refreshToken?: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    user: UserData;
    accessToken: string;
  };
}
```

### Crop Types

**File:** `types/crop.types.ts`

```typescript
export enum QualityGrade {
  PREMIUM = "Premium",
  GRADE_A = "Grade A",
  GRADE_B = "Grade B",
  STANDARD = "Standard",
}

export enum CropListingStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  SOLD = "sold",
  EXPIRED = "expired",
}

export interface CropListing {
  id: string;
  farmer_profile_id: string | FarmerProfile;
  crop_name: string;
  quality_grade: QualityGrade;
  quantity: number;
  expected_price: number;
  status: CropListingStatus;
  created_at: string;
  updated_at: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  user_id?: string;
  location?: string;
  farm_size?: number;
}

export interface GetAllCropListingsParams {
  page?: number;
  limit?: number;
  status?: CropListingStatus;
  crop_name?: string;
  quality_grade?: QualityGrade;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}
```

### User Types

**File:** `types/user.types.ts`

```typescript
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  language: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  language?: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  mobile_number: string;
  role: string;
  recovery_email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  message?: string;
  data?: UserProfile;
}
```

### Shipment Types

**File:** `types/shipment.types.ts`

```typescript
export enum ShipmentStatus {
  CREATED = "CREATED",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum VehicleType {
  TRUCK = "TRUCK",
  VAN = "VAN",
  BIKE = "BIKE",
}

export interface Shipment {
  id: string;
  order_id: string;
  vehicle_id: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  estimated_cost: number;
  actual_cost?: number;
  status: ShipmentStatus;
  tracking_code: string;
  dispatched_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  logistics_provider_id: string;
  vehicle_type: VehicleType;
  capacity: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface StorageFacility {
  id: string;
  logistics_provider_id: string;
  name: string;
  location_latitude: number;
  location_longitude: number;
  capacity: number;
  availability: boolean;
  pricing_per_unit: number;
  created_at: string;
  updated_at: string;
}
```

### Dashboard Types

**File:** `types/dashboard.types.ts`

```typescript
export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  advisory: string;
  uv_index: number;
  max_temp: number;
  min_temp: number;
  next_rain: string;
}

export enum CropStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  UNDER_NEGOTIATION = "UNDER_NEGOTIATION",
  SOLD = "SOLD",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  CROP_SALE = "CROP_SALE",
  LOGISTICS_FEE = "LOGISTICS_FEE",
  BNPL_DEDUCTION = "BNPL_DEDUCTION",
  REFUND = "REFUND",
  ADJUSTMENT = "ADJUSTMENT",
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: string;
  completed_at: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  deadline: string;
  state: string;
  crop?: string;
}

export interface Notification {
  id: string;
  notification_type: string;
  message: string;
  sent_at?: string;
  read_at?: string | null;
}
```

---

## INSTALLATION & SETUP

### Prerequisites

- **Node.js** v14+ and **npm** v6+
- **Git** for version control
- **Backend server** running (http://localhost:3000/api)

### Step 1: Clone Repository

```bash
git clone https://github.com/Soil2Sale/SE-Frontend.git
cd SE-Frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
# Copy example environment file
cp .env.example .env.local
```

### Step 4: Configure Environment Variables

Edit `.env.local` with your configuration (see below for details)

### Step 5: Run Development Server

```bash
npm run dev
```

Application will be available at http://localhost:3000

---

## ENVIRONMENT VARIABLES

Create `.env.local` file with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Production API URL
# NEXT_PUBLIC_API_URL=https://api.soil2sale.com

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Sentry Error Tracking
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Environment Variable Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- `NEXT_PUBLIC_API_URL` is critical for API communication
- Keep sensitive keys in server-only `.env` (hidden from client)

---

## RUNNING THE APPLICATION

### Development Mode

```bash
npm run dev
```

- Runs on http://localhost:3000
- Hot reload enabled
- Source maps available for debugging
- Turbopack for fast compilation

### Build for Production

```bash
npm run build
npm start
```

### Testing

```bash
npm run test              # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Coverage report
```

### Linting

```bash
npm run lint             # Check code style
npm run lint --fix       # Fix fixable issues
```

---

## COMPONENT ARCHITECTURE

### Global Components

**Components:** `components/`

1. **Navbar.tsx**
   - Fixed top navigation bar
   - Role-based menu items
   - User profile dropdown
   - Theme switcher
   - Notification bell

2. **Sidebar.tsx**
   - Collapsible sidebar navigation
   - Role-based navigation links
   - Active link highlighting
   - Responsive (collapses on mobile)

3. **WeatherWidget.tsx**
   - Real-time weather display
   - Location-based data
   - Agricultural advisories
   - Temperature and humidity
   - Wind and UV index

### UI Component Library

**Directory:** `components/ui/`

- **AnimatedList.tsx** - Animated list component for notifications
- **LanguageSelector.tsx** - Multi-language support dropdown
- **StatusChip.tsx** - Status badge with color coding
- **[... Additional UI components]**

---

## NAVIGATION LINKS BY ROLE

**File:** `app/constants/nav-links.tsx`

### Farmer Navigation Links

- Dashboard → `/farmer/dashboard`
- Sell Crops → `/farmer/sell-crops`
- Market Prices → `/farmer/market-prices`
- Guidance → `/farmer/guidance`
- AI Insights → `/farmer/ai-insights`
- Schemes → `/farmer/schemes`
- Support → `/farmer/support`

### Buyer Navigation Links

- Dashboard → `/buyer/dashboard`
- Marketplace → `/buyer/marketplace`
- Orders → `/buyer/orders`
- Transactions → `/buyer/transactions`
- Wallet → `/buyer/wallet`
- Support → `/buyer/support`

### Logistics Provider Navigation Links

- Dashboard → `/logistics-provider/dashboard`
- Shipments → `/logistics-provider/shipments`
- Tracking → `/logistics-provider/tracking`
- Fleet Management → `/logistics-provider/fleet-storage`
- Support → `/logistics-provider/support`

### Financial Partner Navigation Links

- Dashboard → `/financial-partner/dashboard`
- Credit Offers → `/financial-partner/credit-offers`
- Applications → `/financial-partner/applications`
- Reports → `/financial-partner/reports`

### Cooperative Navigation Links

- Dashboard → `/cooperative/dashboard`
- Members → `/cooperative/members`
- Transactions → `/cooperative/transactions`
- Reports → `/cooperative/reports`

### Admin Navigation Links

- Dashboard → `/admin/dashboard`
- Users → `/admin/users`
- Transactions → `/admin/transactions`
- Reports → `/admin/reports`
- Settings → `/admin/settings`

---

## STATE MANAGEMENT

### Token Management

**Methods in apiClient.ts:**
- `getAccessToken()` - Retrieve from localStorage
- `setAccessToken(token)` - Store in localStorage
- `clearTokens()` - Remove tokens on logout
- `getRole()` - Retrieve user role
- `setRole(role)` - Store user role

### Automatic Token Refresh

**Handled by apiClient interceptor:**
- Detects 401 responses
- Calls `/api/auth/refresh` with httpOnly cookie
- Stores new token automatically
- Retries failed request with new token

---

## STYLING

- **Tailwind CSS** v4 - Utility-first CSS
- **Dark Mode** - Built-in support
- **Custom Theme** - Brand colors in CSS variables
- **Responsive Design** - Mobile-first approach
- **Animations** - Motion library for smooth transitions

---

## DEPLOYMENT

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment for Deployment

Set `NEXT_PUBLIC_API_URL` to production API endpoint:

```bash
NEXT_PUBLIC_API_URL=https://api.soil2sale.com
```

---

## TROUBLESHOOTING

### Token Issues

- **401 Unauthorized:** Check localStorage for accessToken
- **Token not refreshing:** Verify refresh endpoint is working
- **Stuck on login:** Check API server is running

### API Connection

- **CORS error:** Verify NEXT_PUBLIC_API_URL is correct
- **Timeout:** Check backend server is running
- **Can't reach API:** Verify network connectivity

### Build Issues

- **Build fails:** Run `npm ci` instead of `npm install`
- **Port 3000 in use:** Change port with `npm run dev -- -p 3001`

---

## PERFORMANCE OPTIMIZATION

✓ Next.js Image Optimization  
✓ Code Splitting (automatic per page)  
✓ CSS-in-JS optimization  
✓ API request caching  
✓ Token refresh batching (no race conditions)  
✓ Pagination support (avoid loading all data)  

---

## PROJECT STATISTICS

- **10 User Roles** - Comprehensive access control
- **20+ Pages** - Full feature coverage
- **8 Service Modules** - API integration
- **5 Type Definition Files** - Complete type safety
- **Multiple Role-based Dashboards** - Customized UX
- **Real-time Tracking** - Live shipment updates
- **Weather Integration** - Agricultural data

---

## USEFUL COMMANDS

```bash
# Development
npm run dev                    # Start dev server

# Building & Running
npm run build                  # Build for production
npm start                      # Run production build

# Code Quality
npm run lint                   # Check code style
npm run lint --fix            # Fix issues automatically

# Testing
npm run test                   # Run tests
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report

# Cleanup
npm run clean                  # Remove build files
rm -rf node_modules .next    # Reset node_modules
npm install                   # Reinstall
```

---

## KEY FEATURES

✨ **Multi-role Support** - Different UIs for each user type  
✨ **JWT Authentication** - Secure token-based auth  
✨ **Telegram OTP** - Two-factor authentication  
✨ **Real-time Tracking** - Live shipment updates  
✨ **Weather Data** - Location-based agricultural info  
✨ **Market Analytics** - Price trends and insights  
✨ **Responsive Design** - Works on all devices  
✨ **Dark Mode** - Built-in theme support  

---

## CONTRIBUTING

1. Create feature branch from dev
2. Make changes
3. Test thoroughly
4. Create pull request to dev
5. After review, merge to dev
6. Create PR from dev to main for releases

---

## GIT WORKFLOW

```bash
# Create feature branch
git checkout dev
git pull origin dev
git checkout -b feat/my-feature

# Work on feature
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feat/my-feature

# After merge to dev, create release PR to main
git checkout main
git pull origin main
git merge origin/dev
git push origin main
```

---

## SUPPORT & DOCUMENTATION

- **GitHub Issues:** Report bugs and feature requests
- **Code Comments:** Inline documentation
- **Type Definitions:** Self-documenting with TypeScript
- **API Documentation:** See Backend README

---

## VERSION INFO

- **Current Version:** 0.1.0
- **Last Updated:** February 2026
- **Node Version:** 14+
- **Next.js Version:** 16.1.3
- **React Version:** 19.2.3
- **TypeScript Version:** 5.x

---

## LICENSE

ISC License - See package.json

---

**Repository:** https://github.com/Soil2Sale/SE-Frontend  
**Owner:** Soil2Sale Team  
**Main Branch:** main  
**Development Branch:** dev
