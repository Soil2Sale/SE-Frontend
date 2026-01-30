"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as loginApi, logout as logoutApi, register as registerApi } from "../services/auth/authApi";
import type { LoginRequest, RegisterRequest, UserData } from "../types/auth.types";

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<{ success: boolean; message?: string }>;
    register: (data: RegisterRequest) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = useCallback(() => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (data: LoginRequest) => {
        try {
            const response = await loginApi(data);
            if (response.success && response.data) {
                setUser(response.data);
                localStorage.setItem("userData", JSON.stringify(response.data));
                return { success: true };
            }
            return { success: false, message: response.message || "Login failed" };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Login failed";
            return { success: false, message };
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            const response = await registerApi(data);
            if (response.success && response.data) {
                setUser(response.data);
                localStorage.setItem("userData", JSON.stringify(response.data));
                return { success: true };
            }
            return { success: false, message: response.message || "Registration failed" };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Registration failed";
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
        } catch {
            // Ignore logout API errors
        } finally {
            setUser(null);
            localStorage.removeItem("userData");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
