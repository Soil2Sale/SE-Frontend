"use client";

import { useState, useEffect } from "react";
import { forgotPassword } from "../../services/auth/authApi";
import "./forgot-password.css";

export default function ForgotPasswordPage() {
    const [showContent, setShowContent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await forgotPassword({ email });

            if (response.success) {
                setSuccess(true);
            } else {
                setError(response.message || "Failed to send reset email. Please try again.");
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            {/* Simplified Background */}
            <div className="background-elements">
                <div className="sun"></div>
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="hill hill-back"></div>
                <div className="hill hill-front"></div>

                {/* Floating particles */}
                <div className="particles">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                </div>
            </div>

            {/* Forgot Password Card */}
            <div className={`forgot-card ${showContent ? "show" : ""}`}>
                {success ? (
                    <div className="success-state">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2>Check Your Email</h2>
                        <p>We&apos;ve sent a password reset link to:</p>
                        <p className="email-display">{email}</p>
                        <p className="help-text">
                            Didn&apos;t receive the email? Check your spam folder or{" "}
                            <button
                                className="resend-btn"
                                onClick={() => setSuccess(false)}
                            >
                                try again
                            </button>
                        </p>
                        <a href="/login" className="back-to-login">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Login
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="forgot-header">
                            <div className="icon-container">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                                </svg>
                            </div>
                            <h1>Forgot Password?</h1>
                            <p>No worries! Enter your email and we&apos;ll send you reset instructions.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="forgot-form">
                            {error && (
                                <div className="error-message">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-group">
                                <label htmlFor="email" className="input-label">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                                        <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError(null);
                                        }}
                                        placeholder="farmer@example.com"
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>
                                        <span>Send Reset Link</span>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="forgot-footer">
                            <a href="/login" className="login-link">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back to Login
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
