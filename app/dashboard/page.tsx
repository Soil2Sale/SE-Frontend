"use client";

import { useState, useEffect } from "react";
import { logout } from "../../services/auth/authApi";
import "./dashboard.css";

interface StatsCard {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
}

export default function DashboardPage() {
    const [showContent, setShowContent] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        // Trigger entrance animation
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 100);

        // Update time every minute
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => {
            clearTimeout(timer);
            clearInterval(timeInterval);
        };
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            window.location.href = "/login";
        } catch {
            // Even if logout fails, redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const statsCards: StatsCard[] = [
        {
            title: "Active Crops",
            value: "12",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 6C12 6 8 8 8 12C8 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 6C12 6 16 8 16 12C16 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            trend: "+3 this month",
            trendUp: true,
        },
        {
            title: "Harvest Ready",
            value: "4",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            trend: "Ready to harvest",
            trendUp: true,
        },
        {
            title: "Field Health",
            value: "92%",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            trend: "+5% from last week",
            trendUp: true,
        },
        {
            title: "Weather",
            value: "26°C",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            trend: "Sunny, ideal for crops",
            trendUp: true,
        },
    ];

    const quickActions = [
        { label: "Add New Crop", icon: "+" },
        { label: "View Reports", icon: "📊" },
        { label: "Water Schedule", icon: "💧" },
        { label: "Market Prices", icon: "💰" },
    ];

    return (
        <div className="dashboard-container">
            {/* Animated Background */}
            <div className="dashboard-bg">
                <div className="bg-gradient"></div>
                <div className="floating-shapes">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`shape shape-${i + 1}`}></div>
                    ))}
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`sidebar ${showContent ? "show" : ""}`}>
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 8 8 8 12C8 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 16 8 16 12C16 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="logo-text">FarmHub</span>
                </div>

                <nav className="sidebar-nav">
                    <a href="/dashboard" className="nav-item active">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 8 8 8 12C8 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 6C12 6 16 8 16 12C16 16 12 18 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>My Crops</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Schedule</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M7 14L11 10L15 14L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Analytics</span>
                    </a>
                    <a href="#" className="nav-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 1V3M12 21V23M23 12H21M3 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36M18.36 18.36L16.95 16.95M7.05 7.05L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>Settings</span>
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Logout</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`main-content ${showContent ? "show" : ""}`}>
                {/* Header */}
                <header className="dashboard-header">
                    <div className="header-left">
                        <h1>{getGreeting()}, Farmer! 🌾</h1>
                        <p>Here&apos;s what&apos;s happening on your farm today</p>
                    </div>
                    <div className="header-right">
                        <div className="date-display">
                            <span className="date">
                                {currentTime.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="stats-grid">
                    {statsCards.map((card, index) => (
                        <div
                            key={card.title}
                            className="stat-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="stat-icon">{card.icon}</div>
                            <div className="stat-info">
                                <h3>{card.title}</h3>
                                <p className="stat-value">{card.value}</p>
                                {card.trend && (
                                    <span className={`stat-trend ${card.trendUp ? "up" : "down"}`}>
                                        {card.trend}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Quick Actions */}
                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        {quickActions.map((action, index) => (
                            <button
                                key={action.label}
                                className="action-btn"
                                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                            >
                                <span className="action-icon">{action.icon}</span>
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="recent-activity">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon green">🌱</div>
                            <div className="activity-info">
                                <p>Wheat field watered successfully</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon gold">🌾</div>
                            <div className="activity-info">
                                <p>Rice harvest completed - 150kg collected</p>
                                <span>Yesterday</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon blue">💧</div>
                            <div className="activity-info">
                                <p>Irrigation schedule updated for corn field</p>
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
