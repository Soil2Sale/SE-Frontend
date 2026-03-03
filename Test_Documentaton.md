# Testing Documentation

_Last updated: March 3, 2026_

## Scope
This document covers testing for:
- Authentication APIs
- Farmer pages
- Buyer pages

## Prerequisites
- Node.js and npm installed
- Project dependencies installed

Install dependencies:
```bash
npm ci
```

## Test Commands

### 1) Auth Unit Tests
Run only auth tests:
```bash
npm test -- services/auth/__tests__/authApi.test.ts --coverage=false --runInBand
```

Expected result:
- Test suite passes
- 6 tests pass in `authApi.test.ts`

### 2) Farmer and Buyer Pages Smoke Test
Use production build to validate that pages compile and routes are generated:
```bash
npm run build
```

Expected result:
- Build succeeds
- Farmer and buyer routes are generated (for example `/farmer/dashboard`, `/buyer/marketplace`, etc.)

### 3) Optional Full Test Run
```bash
npm test -- --coverage=false --runInBand
```

Note:
- As of March 3, 2026, full suite has one unrelated failing test in WeatherWidget.
- This does not block auth tests or farmer/buyer build validation.

## Current Status (March 3, 2026)
- Auth tests: PASS
- Farmer/Buyer page build check: PASS
- Full Jest suite: FAIL (1 unrelated WeatherWidget test)

## Troubleshooting
If `jest` is not recognized or type packages are missing:
1. Reinstall dependencies:
   ```bash
   npm ci
   ```
2. Re-run test commands.
