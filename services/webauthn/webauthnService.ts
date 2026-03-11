// ============================================================================
// WebAuthn Service Layer (Mock)
// ============================================================================
//
// This service layer simulates backend WebAuthn endpoints.
// Replace the mock implementations with real API calls when the backend is ready.
//
// Future backend endpoints:
//   POST /webauthn/generate-authentication-options
//   POST /webauthn/verify-authentication
// ============================================================================

/**
 * Check if WebAuthn is supported in the current browser.
 */
export function isWebAuthnSupported(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.PublicKeyCredential !== "undefined" &&
        typeof navigator.credentials !== "undefined"
    );
}

// ============================================================================
// Types
// ============================================================================

export interface AuthenticationOptionsResponse {
    challenge: Uint8Array;
    timeout: number;
    rpId: string;
    userVerification: UserVerificationRequirement;
    allowCredentials: PublicKeyCredentialDescriptor[];
}

export interface VerificationResponse {
    verified: boolean;
    message: string;
}

// ============================================================================
// Mock Backend Functions
// ============================================================================

/**
 * Simulate: POST /webauthn/generate-authentication-options
 *
 * In production, this would send the user's email to the backend,
 * which returns a challenge and the user's registered credential IDs.
 * For now, we return a mock challenge that triggers the real browser prompt.
 */
export async function generateAuthenticationOptions(
    _email: string
): Promise<AuthenticationOptionsResponse> {
    // Simulate network delay
    await delay(300);

    // Generate a random challenge (in production, the server generates this)
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    return {
        challenge,
        timeout: 60000,
        rpId: window.location.hostname, // "localhost" in dev
        userVerification: "required", // Forces biometric/PIN
        allowCredentials: [], // Empty = allow any passkey on the device
    };
}

/**
 * Simulate: POST /webauthn/verify-authentication
 *
 * In production, this would send the credential assertion to the backend,
 * which verifies the signature against the stored public key.
 * For now, we simulate a successful verification after a delay.
 */
export async function verifyAuthentication(
    _credential: Credential
): Promise<VerificationResponse> {
    // Simulate server verification delay
    await delay(1500);

    // Mock: always return verified
    // In production, the backend validates the assertion signature
    return {
        verified: true,
        message: "Passkey authentication verified successfully.",
    };
}

/**
 * Trigger the browser's native WebAuthn authentication prompt.
 * This calls navigator.credentials.get() with the provided options
 * to show Windows Hello, fingerprint, Face ID, or security key prompt.
 */
export async function authenticateWithPasskey(
    options: AuthenticationOptionsResponse
): Promise<Credential> {
    const publicKeyOptions: PublicKeyCredentialRequestOptions = {
        challenge: options.challenge,
        timeout: options.timeout,
        rpId: options.rpId,
        userVerification: options.userVerification,
        allowCredentials: options.allowCredentials,
    };

    const credential = await navigator.credentials.get({
        publicKey: publicKeyOptions,
    });

    if (!credential) {
        throw new Error("No credential returned from authenticator.");
    }

    return credential;
}

// ============================================================================
// Helpers
// ============================================================================

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
