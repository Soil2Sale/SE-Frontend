export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface RouteData {
  distance: number;
  riskLevel: "low" | "medium" | "high";
  eta: string;
  status: "on-time" | "delayed" | "early";
  activeShipments: number;
}

export interface FinancialData {
  profit: number;
  cost: number;
  margin: number;
}

export interface ShipmentData {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  eta: string;
  status: "in-transit" | "delivered" | "pending";
  riskLevel: "low" | "medium" | "high";
}

export const DUMMY_WEATHER: WeatherData = {
  temperature: 25,
  condition: "Partly Cloudy",
  humidity: 68,
  windSpeed: 12,
};

export const DUMMY_ROUTE: RouteData = {
  distance: 142,
  riskLevel: "low",
  eta: "2:30 PM",
  status: "on-time",
  activeShipments: 142,
};

export const DUMMY_FINANCIAL: FinancialData = {
  profit: 48500,
  cost: 16200,
  margin: 75,
};

export const DUMMY_RATING = {
  rating: 4.8,
  maxRating: 5.0,
  reviews: 247,
};

export const DUMMY_PERFORMANCE = {
  percentage: 12,
  trend: "up" as const,
  period: "This Month",
};

export const DUMMY_SHIPMENTS: ShipmentData[] = [
  {
    id: "SHP001",
    origin: "Mumbai",
    destination: "Delhi",
    distance: 142,
    eta: "2:30 PM",
    status: "in-transit",
    riskLevel: "low",
  },
  {
    id: "SHP002",
    origin: "Bangalore",
    destination: "Hyderabad",
    distance: 98,
    eta: "4:15 PM",
    status: "in-transit",
    riskLevel: "low",
  },
  {
    id: "SHP003",
    origin: "Chennai",
    destination: "Pune",
    distance: 186,
    eta: "6:45 PM",
    status: "pending",
    riskLevel: "medium",
  },
];
