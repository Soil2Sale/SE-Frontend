# Detailed Unit Testing Report — Soil2Sale Frontend

**Date:** 2026-02-12
**Framework:** Jest (Ts-Jest, React Testing Library)
**Total Tests:** 18
**Result:** ✅ 18 COMPLETED (0 Failed)

This report details every test case executed, explaining exactly **what it checks** and **why it's important**.

---

## 1️⃣ Authentication Service (`services/auth/authApi.ts`)
These **Unit Tests** verify the core security functions in `auth.controller.js` by mocking the `apiClient`.

### 🔐 Register & Login
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `should register a new user successfully` | Verifies that valid registration data is sent to `/auth/register` and success response is returned. | Ensures new users can sign up without errors. |
| `should throw error on registration failure` | Checks if the system validates errors correctly when registration inputs (like duplicate email) are rejected. | Prevents silent failures and informs user of issues. |
| `should login user successfully` | Verifies that correct credentials invoke `/auth/login` and return user data. | Primary entry point for users to access the platform. |

### 🛡️ Token Management
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `should verify OTP and store tokens` | Verifies that OTP submission stores `accessToken` and user role in local storage. | completing the 2FA loop is critical for secured access. |
| `should refresh token successfully` | Checks if `/auth/refresh` is called and new access token is stored. | Keeps the user logged in seamlessly without re-entering credentials. |
| `should logout and clear tokens` | Verifies that logout API is called and local tokens are cleared. | **Security Critical:** Prevents unauthorized access after a user walks away. |

---

## 2️⃣ Crop Listing Service (`services/crop-listing/cropApi.ts`)
These **Integration Tests** verify the CRUD operations for the marketplace listings.

### 🌾 Fetching Data
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `should fetch all crop listings` | Verifies `getAllCropListings` calls the correct endpoint `/crop-listings`. | Populates the main marketplace feed. |
| `should fetch active crop listings` | Verifies `getActiveCropListings` fetches only available crops. | Buyers should only see crops that are currently for sale. |
| `should fetch a single listing by ID` | Verifies `getCropListingById` calls specific resource endpoint. | Required for the "Product Details" page. |

### ➕ Managing Listings
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `should create a new crop listing` | Verifies `createCropListing` sends the correct payload (name, quantity, price). | Allows farmers to add new stock to the marketplace. |
| `should update listing status` | Verifies `updateCropListingStatus` can change a listing (e.g., to "Sold"). | Keeps inventory accurate and prevents overselling. |
| `should delete a crop listing` | Verifies `deleteCropListing` removes an item from the DB. | Farmers must be able to remove incorrect or old listings. |
| `should handle delete error` | Checks error handling when trying to delete a non-existent item (404). | UX: Prevents app crash when acting on stale data. |

---

## 3️⃣ Weather Widget Component (`components/WeatherWidget.tsx`)
These **Component Tests** verify the UI logic for the dashboard weather card using `React Testing Library`.

### ☀️ Visual Rendering
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `renders location and temperature` | Verifies that the city name and current temp are visible. | Basic validation that the widget is working. |
| `renders condition icon based on weather condition` | Checks if the correct icon (e.g., Rain Cloud) renders for "Rainy" weather. | Visual cues allow farmers to quickly assess weather. |
| `displays humidity and wind speed` | Verifies specific data points (Humidity %, Wind km/h) are shown. | Critical farming metrics for irrigation and spraying. |

### ⚠️ Alerts & Predictions
| Test Case | What It Checks | Why It Matters |
|-----------|----------------|----------------|
| `shows UV Index warning when high` | Checks if "High" warning appears when UV index is 7+. | **Safety:** Protects farmers from dangerous sun exposure. |
| `renders rain prediction` | Verifies the "Next Rain" day is displayed. | Helps in planning near-term agricultural activities. |

---

## 📊 Summary Statistics
- **Total Tests:** 18
- **Passed:** 18
- **Failed:** 0
- **Coverage Areas:** Auth Flow, Marketplace API, Dashboard UI
