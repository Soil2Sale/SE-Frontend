
import {
    getNotificationsByUser,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
} from '../notificationApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        patch: jest.fn(),
    },
}));

describe('Notification Service', () => {
    beforeEach(() => jest.clearAllMocks());

    // ── Unit Tests ────────────────────────────────────────────────────────────

    describe('getNotificationsByUser', () => {
        it('should fetch all notifications', async () => {
            const mockData = { success: true, data: [{ id: 'n-1', message: 'Hello', read: false }] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getNotificationsByUser();

            expect(apiClient.get).toHaveBeenCalledWith('/notifications', { params: undefined });
            expect(result).toEqual(mockData);
        });

        it('should pass params to the API', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [] } });
            await getNotificationsByUser({ page: 1 });
            expect(apiClient.get).toHaveBeenCalledWith('/notifications', { params: { page: 1 } });
        });

        it('should throw on API failure', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Unauthorized'));
            await expect(getNotificationsByUser()).rejects.toThrow('Unauthorized');
        });
    });

    describe('getUnreadCount', () => {
        it('should fetch the unread notification count', async () => {
            const mockData = { success: true, data: { count: 5 } };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getUnreadCount();

            expect(apiClient.get).toHaveBeenCalledWith('/notifications/unread-count');
            expect(result.data.count).toBe(5);
        });

        it('should return 0 when no unread notifications', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: { count: 0 } } });
            const result = await getUnreadCount();
            expect(result.data.count).toBe(0);
        });
    });

    describe('markAsRead', () => {
        it('should mark a specific notification as read', async () => {
            const mockData = { success: true, message: 'Marked as read' };
            (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await markAsRead('n-1');

            expect(apiClient.patch).toHaveBeenCalledWith('/notifications/n-1/read');
            expect(result).toEqual(mockData);
        });

        it('should throw when notification is not found', async () => {
            (apiClient.patch as jest.Mock).mockRejectedValue(new Error('Not found'));
            await expect(markAsRead('bad-id')).rejects.toThrow('Not found');
        });
    });

    describe('markAllAsRead', () => {
        it('should mark all notifications as read', async () => {
            const mockData = { success: true, message: 'All marked as read' };
            (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await markAllAsRead();

            expect(apiClient.patch).toHaveBeenCalledWith('/notifications/read-all');
            expect(result).toEqual(mockData);
        });
    });
});
