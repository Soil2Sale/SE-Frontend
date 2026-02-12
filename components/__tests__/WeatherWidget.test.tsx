
import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherWidget from '../WeatherWidget';
import '@testing-library/jest-dom';

// Mock lucide-react icons to avoid rendering large SVG trees or errors
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

describe('WeatherWidget', () => {
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
        next_rain: 'None'
    };

    it('renders location and temperature', () => {
        render(<WeatherWidget location="Mumbai" weather={mockWeather} />);

        expect(screen.getByText('Mumbai')).toBeInTheDocument();
        expect(screen.getByText('25°C')).toBeInTheDocument();
        expect(screen.getByText('▲ 30°')).toBeInTheDocument(); // Max temp
        expect(screen.getByText('▼ 20°')).toBeInTheDocument(); // Min temp
    });

    it('renders condition icon based on weather condition', () => {
        // Override condition to test specific icon logic
        const rainWeather = { ...mockWeather, condition: 'Rainy' };
        render(<WeatherWidget location="Pune" weather={rainWeather} />);

        expect(screen.getByTestId('cloud-rain-icon')).toBeInTheDocument();
    });

    it('displays humidity and wind speed', () => {
        render(<WeatherWidget location="Delhi" weather={mockWeather} />);

        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('15 km/h')).toBeInTheDocument();
    });

    it('shows UV Index warning when high', () => {
        render(<WeatherWidget location="Chennai" weather={mockWeather} />); // uv_index 7 is high

        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('renders rain prediction', () => {
        const rainPrediction = { ...mockWeather, next_rain: 'Fri' };
        render(<WeatherWidget location="Bangalore" weather={rainPrediction} />);

        expect(screen.getByText('Rain: Fri')).toBeInTheDocument();
    });
});
