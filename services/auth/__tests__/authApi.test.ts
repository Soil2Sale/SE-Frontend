
import {
    register,
    login,
    verifyOtp,
    refreshToken,
    logout
} from '../authApi';
import apiClient from '../../apiClient';

// Mock the apiClient
jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
        get: jest.fn(),
    },
    setAccessToken: jest.fn(),
    clearTokens: jest.fn(),
    setRole: jest.fn(),
}));

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const mockResponse = { data: { success: true, message: 'User registered' } };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const requestData = {
                name: 'Test User',
                mobile_number: '1234567890',
                role: 'buyer'
            };

            const result = await register(requestData);

            expect(apiClient.post).toHaveBeenCalledWith('/auth/register', requestData);
            expect(result).toEqual(mockResponse.data);
        });

        it('should throw error on registration failure', async () => {
            const error = new Error('Registration failed');
            (apiClient.post as jest.Mock).mockRejectedValue(error);

            const requestData = {
                name: 'Test User',
                mobile_number: '1234567890',
                role: 'buyer'
            };

            await expect(register(requestData)).rejects.toThrow('Registration failed');
        });
    });

    describe('login', () => {
        it('should login user successfully', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    message: 'Login successful',
                    data: { userId: '123', method: 'email' }
                }
            };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const requestData = { identifier: 'test@example.com' };
            const result = await login(requestData);

            expect(apiClient.post).toHaveBeenCalledWith('/auth/login', requestData);
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('verifyOtp', () => {
        it('should verify OTP and store tokens', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    message: 'OTP verified',
                    data: {
                        accessToken: 'token123',
                        user: { role: 'buyer', id: '1' }
                    }
                }
            };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
            const { setAccessToken, setRole } = require('../../apiClient');

            const requestData = { userId: '123', otp: '123456' };
            const result = await verifyOtp(requestData);

            expect(apiClient.post).toHaveBeenCalledWith('/auth/verify-otp', requestData);
            expect(setAccessToken).toHaveBeenCalledWith('token123');
            expect(setRole).toHaveBeenCalledWith('buyer');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('refreshToken', () => {
        it('should refresh token successfully', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    message: 'Token refreshed',
                    data: { accessToken: 'newToken123' }
                }
            };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
            const { setAccessToken } = require('../../apiClient');

            const result = await refreshToken();

            expect(apiClient.post).toHaveBeenCalledWith('/auth/refresh', {});
            expect(setAccessToken).toHaveBeenCalledWith('newToken123');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('logout', () => {
        it('should logout and clear tokens', async () => {
            const mockResponse = { data: { success: true, message: 'Logged out' } };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
            const { clearTokens } = require('../../apiClient');

            const result = await logout();

            expect(apiClient.post).toHaveBeenCalledWith('/auth/logout');
            expect(clearTokens).toHaveBeenCalled();
            expect(result).toEqual(mockResponse.data);
        });
    });
});
