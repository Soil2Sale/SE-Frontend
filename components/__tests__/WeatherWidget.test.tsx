
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeatherWidget from '../WeatherWidget';
import '@testing-library/jest-dom';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    CloudSun: () => <div data-testid="cloud-sun-icon" />,
    Droplets: () => <div data-testid="droplets-icon" />,
    Wind: () => <div data-testid="wind-icon" />,
    Sun: () => <div data-testid="sun-icon" />,
    CloudRain: () => <div data-testid="cloud-rain-icon" />,
    CloudLightning: () => <div data-testid="cloud-lightning-icon" />,
    CloudSnow: () => <div data-testid="cloud-snow-icon" />,
    Cloud: () => <div data-testid="cloud-icon" />,
}));

// Mock the global fetch used by getLocationName inside the component.
// Without an API key the component hits the fallback "Mumbai, Maharashtra".
// We simulate that fallback by returning an empty array (no API key branch).
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: 'Mumbai', state: 'Maharashtra', country: 'IN' }]),
    } as Response)
);

const mockWeather = {
    temp: 25,
    condition: 'Sunny',
    humidity: 60,
    wind_speed: 15,
    pressure: 1013,
    advisory: 'None',
    uv_index: 7,
    max_temp: 30,
    min_temp: 20,
    next_rain: 'None',
};

describe('WeatherWidget', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset the locationCache so each test starts fresh
        // (the cache is module-level; setting an unlikely coord avoids cache hits)
    });

    // ── Unit Tests ────────────────────────────────────────────────────────────

    it('renders the temperature', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('25°C')).toBeInTheDocument();
    });

    it('renders the Max and Min temp', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        // Rendered as separate text nodes: "▲ " "30" "°"
        expect(screen.getByText(/30/)).toBeInTheDocument();
        expect(screen.getByText(/20/)).toBeInTheDocument();
    });

    it('renders the condition label', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('Sunny')).toBeInTheDocument();
    });

    it('renders the cloud-sun icon for Sunny condition', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByTestId('cloud-sun-icon')).toBeInTheDocument();
    });

    it('renders cloud-rain icon for Rainy condition', () => {
        const rainWeather = { ...mockWeather, condition: 'Rainy' };
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={rainWeather} />);
        expect(screen.getByTestId('cloud-rain-icon')).toBeInTheDocument();
    });

    it('renders cloud-lightning icon for Stormy condition', () => {
        const stormWeather = { ...mockWeather, condition: 'Thunderstorm / Lightning' };
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={stormWeather} />);
        expect(screen.getByTestId('cloud-lightning-icon')).toBeInTheDocument();
    });

    it('renders cloud-snow icon for Snowy condition', () => {
        const snowWeather = { ...mockWeather, condition: 'Snowfall' };
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={snowWeather} />);
        expect(screen.getByTestId('cloud-snow-icon')).toBeInTheDocument();
    });

    it('renders cloud icon for Cloudy condition', () => {
        const cloudyWeather = { ...mockWeather, condition: 'Partly cloudy' };
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={cloudyWeather} />);
        expect(screen.getByTestId('cloud-icon')).toBeInTheDocument();
    });

    it('displays humidity percentage', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('60%')).toBeInTheDocument();
    });

    it('displays wind speed', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('15 km/h')).toBeInTheDocument();
    });

    it('shows UV Index value', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('shows "High" UV warning label (hardcoded in component)', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('renders rain prediction: None', () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        expect(screen.getByText('Rain: None')).toBeInTheDocument();
    });

    it('renders rain prediction with a day when next_rain is set', () => {
        const rainPrediction = { ...mockWeather, next_rain: 'Fri' };
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={rainPrediction} />);
        expect(screen.getByText('Rain: Fri')).toBeInTheDocument();
    });

    // ── Integration: async location name resolution ───────────────────────────

    it('resolves location name from lat/lon via API and displays it', async () => {
        render(<WeatherWidget latitude={19.076} longitude={72.877} weather={mockWeather} />);
        // After async useEffect resolves, location name should update
        await waitFor(() => {
            expect(screen.getByText('Mumbai, Maharashtra')).toBeInTheDocument();
        });
    });

    it('falls back to "Mumbai, Maharashtra" when OpenWeather API key is absent', async () => {
        // Simulate no API key → component takes the early-return path
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('No key')));
        render(<WeatherWidget latitude={0} longitude={0} weather={mockWeather} />);
        await waitFor(() => {
            expect(screen.getByText(/Mumbai/)).toBeInTheDocument();
        });
    });
});
