
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
    Bell: () => <div data-testid="bell-icon" />,
}));

const mockNotifications = [
    { id: '1', type: 'INFO', message: 'Your listing was approved', time: '2m ago', read: false },
    { id: '2', type: 'WARN', message: 'Price dropped for Maize', time: '5m ago', read: true },
    { id: '3', type: 'INFO', message: 'Shipment dispatched', time: '10m ago', read: false },
];

describe('Navbar Component', () => {
    it('renders the user name correctly', () => {
        render(<Navbar title="Dashboard" userName="Kanha" userLocation="Mumbai" />);
        expect(screen.getByText('Kanha')).toBeInTheDocument();
    });

    it('renders the user location', () => {
        render(<Navbar title="Dashboard" userName="Raam" userLocation="Chennai" />);
        expect(screen.getByText('Chennai')).toBeInTheDocument();
    });

    it('renders the first letter of username as avatar', () => {
        render(<Navbar title="Dashboard" userName="Sakthi" userLocation="Pune" />);
        expect(screen.getByText('S')).toBeInTheDocument();
    });

    it('renders "U" as avatar fallback when userName is empty', () => {
        render(<Navbar title="Dashboard" userName="" userLocation="Delhi" />);
        expect(screen.getByText('U')).toBeInTheDocument();
    });

    it('shows unread notification badge when there are unread notifications', () => {
        render(
            <Navbar
                title="Dashboard"
                userName="Kanha"
                userLocation="Mumbai"
                notifications={mockNotifications}
            />
        );
        // 2 unread notifications → badge should be present
        const badge = document.querySelector('.bg-red-500');
        expect(badge).toBeInTheDocument();
    });

    it('does NOT show red badge when all notifications are read', () => {
        const allRead = mockNotifications.map(n => ({ ...n, read: true }));
        render(
            <Navbar
                title="Dashboard"
                userName="Kanha"
                userLocation="Mumbai"
                notifications={allRead}
            />
        );
        const badge = document.querySelector('.bg-red-500');
        expect(badge).not.toBeInTheDocument();
    });

    it('calls onNotificationClick when bell is clicked', () => {
        const mockClick = jest.fn();
        render(
            <Navbar
                title="Dashboard"
                userName="Kanha"
                userLocation="Mumbai"
                onNotificationClick={mockClick}
            />
        );
        fireEvent.click(screen.getByTestId('bell-icon').parentElement!);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('renders the bell icon', () => {
        render(<Navbar title="Dashboard" userName="Aathitya" userLocation="Bangalore" />);
        expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    });
});
