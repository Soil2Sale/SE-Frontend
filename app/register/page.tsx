"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import type { RegisterRequest } from "../../types/auth.types";
import "./register.css";

interface FormData extends RegisterRequest {
    confirmPassword: string;
}

export default function RegisterPage() {
    const [showContent, setShowContent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        language: "en",
        password: "",
        confirmPassword: "",
    });
    const { register, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect if already authenticated
        if (isAuthenticated) {
            router.push("/dashboard");
            return;
        }

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    const validateForm = (): string | null => {
        if (!formData.name.trim()) return "Name is required";
        if (!formData.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
        if (!formData.phone.trim()) return "Phone number is required";
        if (formData.password.length < 8) return "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword) return "Passwords do not match";
        return null;
    };

    const getPasswordStrength = (): { level: number; label: string; color: string } => {
        const { password } = formData;
        if (!password) return { level: 0, label: "", color: "" };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return { level: strength, label: "Weak", color: "#dc2626" };
        if (strength <= 3) return { level: strength, label: "Medium", color: "#f59e0b" };
        return { level: strength, label: "Strong", color: "#16a34a" };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError(null);

        const { confirmPassword, ...registerData } = formData;
        const result = await register(registerData);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        } else {
            setError(result.message || "Registration failed. Please try again.");
            setIsLoading(false);
        }
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="register-page">
            {/* Left Side - Branding */}
            <div className={`register-branding ${showContent ? "show" : ""}`}>
                <div className="branding-content">
                    <div className="brand-logo">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 8 8 8 12C8 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 16 8 16 12C16 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M8 10C6 9 4 10 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M16 10C18 9 20 10 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>HARVEST</span>
                    </div>

                    <div className="branding-text">
                        <h1>Start Your Farming Journey</h1>
                        <p>Join thousands of farmers who trust our platform to manage their crops and maximize yields.</p>
                    </div>

                    <div className="branding-stats">
                        <div className="stat">
                            <span className="stat-value">10K+</span>
                            <span className="stat-label">Active Farmers</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">50K+</span>
                            <span className="stat-label">Crops Tracked</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">95%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                    </div>

                    <div className="branding-illustration">
                        <div className="farm-scene">
                            <div className="tractor">
                                <div className="tractor-body"></div>
                                <div className="wheel wheel-front"></div>
                                <div className="wheel wheel-back"></div>
                            </div>
                            <div className="field">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`plant plant-${i + 1}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className={`register-form-container ${showContent ? "show" : ""}`}>
                <div className="form-wrapper">
                    {success ? (
                        <div className="success-state">
                            <div className="success-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2>Welcome to FarmHub!</h2>
                            <p>Your account has been created successfully.</p>
                            <span className="redirect-text">Redirecting to dashboard...</span>
                        </div>
                    ) : (
                        <>
                            <div className="form-header">
                                <h2>Create Account</h2>
                                <p>Fill in your details to get started.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="register-form">
                                {error && (
                                    <div className="error-alert">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <circle cx="12" cy="16" r="1" fill="currentColor" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <div className="input-container">
                                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M4 20C4 17 8 14 12 14C16 14 20 17 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Farmer"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <div className="input-container">
                                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                                <line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 234 567 8900"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-container">
                                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="farmer@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="language">Preferred Language</label>
                                    <div className="input-container">
                                        <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        <select
                                            id="language"
                                            name="language"
                                            value={formData.language}
                                            onChange={handleInputChange}
                                        >
                                            <option value="en">English</option>
                                            <option value="ko">한국어</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                            <option value="de">Deutsch</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <div className="input-container">
                                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                                            </svg>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        {formData.password && (
                                            <div className="password-strength">
                                                <div className="strength-bars">
                                                    {[1, 2, 3, 4, 5].map((level) => (
                                                        <div
                                                            key={level}
                                                            className={`strength-bar ${level <= passwordStrength.level ? "active" : ""}`}
                                                            style={{ backgroundColor: level <= passwordStrength.level ? passwordStrength.color : undefined }}
                                                        />
                                                    ))}
                                                </div>
                                                <span style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <div className="input-container">
                                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                                            </svg>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="btn-loader"></span>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </form>

                            <div className="form-footer">
                                <p>
                                    Already have an account?{" "}
                                    <a href="/login">Sign in</a>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
