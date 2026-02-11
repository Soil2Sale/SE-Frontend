import type { ReactNode } from "react";
import {
  Home,
  Store,
  LineChart,
  Book,
  Lightbulb,
  Landmark,
  AlertCircle,
  ShoppingBasket,
  Handshake,
  Package,
  Truck,
  Warehouse,
  BadgeDollarSign,
  PiggyBank,
  Users,
  Lock,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export const NAV_LINKS: Record<string, NavLink[]> = {
  Farmer: [
    {
      label: "Dashboard",
      href: "/farmer/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Sell Crops",
      href: "/farmer/sell-crops",
      icon: <Store className="w-5 h-5" />,
    },
    {
      label: "Market Prices",
      href: "/farmer/market-prices",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      label: "Guidance",
      href: "/farmer/guidance",
      icon: <Book className="w-5 h-5" />,
    },
    {
      label: "AI Insights",
      href: "/farmer/ai-insights",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      label: "Schemes",
      href: "/farmer/schemes",
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      label: "Support",
      href: "/farmer/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],

  Buyer: [
    {
      label: "Dashboard",
      href: "/buyer/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Marketplace",
      href: "/buyer/marketplace",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      label: "Offers & Negotiations",
      href: "/buyer/offers",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Market Prices",
      href: "/buyer/market-prices",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      label: "Support",
      href: "/buyer/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],

  Cooperative: [
    {
      label: "Dashboard",
      href: "/cooperative/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Marketplace",
      href: "/cooperative/marketplace",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      label: "Manage Listings",
      href: "/cooperative/manage-listings",
      icon: <Store className="w-5 h-5" />,
    },
    {
      label: "Offers & Negotiations",
      href: "/cooperative/offers",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Market Prices",
      href: "/cooperative/market-prices",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      label: "Support",
      href: "/cooperative/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],

  "Logistics Provider": [
    {
      label: "Dashboard",
      href: "/logistics-provider/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Shipments",
      href: "/logistics-provider/shipments",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Tracking",
      href: "/logistics-provider/tracking",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      label: "Fleet & Storage",
      href: "/logistics-provider/fleet-storage",
      icon: <Warehouse className="w-5 h-5" />,
    },
    {
      label: "Support",
      href: "/logistics-provider/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],

  "Financial Partner": [
    {
      label: "Dashboard",
      href: "/financial-partner/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Credit Offers",
      href: "/financial-partner/credit-offers",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "BNPL Loans",
      href: "/financial-partner/bnpl-loans",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Market Signals",
      href: "/financial-partner/market-signals",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      label: "Support",
      href: "/financial-partner/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],

  Admin: [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Users & Roles",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Content Hub",
      href: "/admin/content-hub",
      icon: <Book className="w-5 h-5" />,
    },
    {
      label: "Market Prices",
      href: "/admin/market-prices",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      label: "AI Insights Monitor",
      href: "/admin/ai-monitor",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      label: "Audit Logs",
      href: "/admin/audit-logs",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: "Support & Disputes",
      href: "/admin/support",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  ],
};

export const PROFILE_LINKS: Record<string, NavLink[]> = {
  Farmer: [
    {
      label: "Profile",
      href: "/farmer/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "My Crops",
      href: "/farmer/profile/my-crops",
      icon: <Store className="w-5 h-5" />,
    },
    {
      label: "My Listings",
      href: "/farmer/profile/my-listings",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      label: "Yield History",
      href: "/farmer/profile/yield-history",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Offers Received",
      href: "/farmer/profile/offers-received",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Negotiations",
      href: "/farmer/profile/negotiations",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Orders Sold",
      href: "/farmer/profile/orders-sold",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/farmer/profile/transactions",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "Wallet",
      href: "/farmer/profile/wallet",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Disputes",
      href: "/farmer/profile/disputes",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Ratings & Reviews",
      href: "/farmer/profile/ratings-reviews",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/farmer/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/farmer/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],

  Buyer: [
    {
      label: "Profile",
      href: "/buyer/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Orders Purchased",
      href: "/buyer/profile/orders-purchased",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      label: "Offers Made",
      href: "/buyer/profile/offers-made",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "My Negotiations",
      href: "/buyer/profile/negotiations",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/buyer/profile/transactions",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "Wallet",
      href: "/buyer/profile/wallet",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Disputes",
      href: "/buyer/profile/disputes",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Ratings & Reviews",
      href: "/buyer/profile/ratings-reviews",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/buyer/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/buyer/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],

  Cooperative: [
    {
      label: "Profile",
      href: "/cooperative/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Orders Purchased",
      href: "/cooperative/profile/orders-purchased",
      icon: <ShoppingBasket className="w-5 h-5" />,
    },
    {
      label: "Orders Sold",
      href: "/cooperative/profile/orders-sold",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Offers",
      href: "/cooperative/profile/offers",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Negotiations",
      href: "/cooperative/profile/negotiations",
      icon: <Handshake className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/cooperative/profile/transactions",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "Wallet",
      href: "/cooperative/profile/wallet",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Disputes",
      href: "/cooperative/profile/disputes",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Ratings & Reviews",
      href: "/cooperative/profile/ratings-reviews",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/cooperative/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/cooperative/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],

  "Logistics Provider": [
    {
      label: "Profile",
      href: "/logistics-provider/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Vehicles",
      href: "/logistics-provider/profile/vehicles",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      label: "Storage Facilities",
      href: "/logistics-provider/profile/storage-facilities",
      icon: <Warehouse className="w-5 h-5" />,
    },
    {
      label: "Shipment History",
      href: "/logistics-provider/profile/shipment-history",
      icon: <Package className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/logistics-provider/profile/transactions",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "Wallet",
      href: "/logistics-provider/profile/wallet",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Disputes",
      href: "/logistics-provider/profile/disputes",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Ratings & Reviews",
      href: "/logistics-provider/profile/ratings-reviews",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/logistics-provider/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/logistics-provider/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],

  "Financial Partner": [
    {
      label: "Profile",
      href: "/financial-partner/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Active Offers",
      href: "/financial-partner/profile/active-offers",
      icon: <BadgeDollarSign className="w-5 h-5" />,
    },
    {
      label: "Loan Portfolio",
      href: "/financial-partner/profile/loan-portfolio",
      icon: <PiggyBank className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/financial-partner/profile/transactions",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Disputes",
      href: "/financial-partner/profile/disputes",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/financial-partner/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/financial-partner/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],

  Admin: [
    {
      label: "Profile",
      href: "/admin/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Activity Logs",
      href: "/admin/profile/activity-logs",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: "Permissions",
      href: "/admin/profile/permissions",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: "Notifications",
      href: "/admin/profile/notifications",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/admin/profile/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
};
