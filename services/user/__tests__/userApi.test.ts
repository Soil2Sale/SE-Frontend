
import {
    getProfile,
    updateProfile,
    deleteAccount,
    getUserByRole,
} from '../userApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}));

describe('User Service', () => {
    beforeEach(() => jest.clearAllMocks());

    // ── Unit Tests ────────────────────────────────────────────────────────────

    describe('getProfile', () => {
        it('should fetch the current user profile', async () => {
            const mockData = { success: true, data: { id: 'u-1', name: 'Kanha', role: 'Farmer' } };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getProfile();

            expect(apiClient.get).toHaveBeenCalledWith('/users/profile');
            expect(result).toEqual(mockData);
        });

        it('should throw when user is not authenticated', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Unauthorized'));
            await expect(getProfile()).rejects.toThrow('Unauthorized');
        });
    });

    describe('updateProfile', () => {
        it('should update the user profile with given data', async () => {
            const updateData = { name: 'Kanha Updated', recovery_email: 'new@example.com' };
            const mockData = { success: true, data: { id: 'u-1', ...updateData } };
            (apiClient.put as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await updateProfile(updateData as any);

            expect(apiClient.put).toHaveBeenCalledWith('/users/profile', updateData);
            expect(result).toEqual(mockData);
        });

        it('should throw on validation error from server', async () => {
            (apiClient.put as jest.Mock).mockRejectedValue(new Error('Validation failed'));
            await expect(updateProfile({} as any)).rejects.toThrow('Validation failed');
        });
    });

    describe('deleteAccount', () => {
        it('should delete the current user account', async () => {
            const mockData = { success: true, message: 'Account deleted' };
            (apiClient.delete as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await deleteAccount();

            expect(apiClient.delete).toHaveBeenCalledWith('/users/account');
            expect(result).toEqual(mockData);
        });
    });

    describe('getUserByRole', () => {
        it('should fetch users by role', async () => {
            const mockData = { success: true, data: [{ id: 'u-2', role: 'Buyer' }] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getUserByRole('Buyer');

            expect(apiClient.get).toHaveBeenCalledWith('/users/role?role=Buyer');
            expect(result).toEqual(mockData);
        });

        it('should return empty array when no users match role', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [] } });
            const result = await getUserByRole('Admin');
            expect(result.data).toHaveLength(0);
        });
    });
});
