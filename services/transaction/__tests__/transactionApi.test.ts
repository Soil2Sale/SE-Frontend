
import {
    getTransactionsByUser,
    getTransactionById,
    createTransaction,
} from '../transactionApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

describe('Transaction Service', () => {
    beforeEach(() => jest.clearAllMocks());

    // ── Unit Tests ────────────────────────────────────────────────────────────

    describe('getTransactionsByUser', () => {
        it('should fetch all transactions for the user', async () => {
            const mockData = { success: true, data: [{ id: 'txn-001', amount: 21500 }] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getTransactionsByUser();

            expect(apiClient.get).toHaveBeenCalledWith('/transactions', { params: undefined });
            expect(result).toEqual(mockData);
        });

        it('should pass query params to the API', async () => {
            const mockData = { success: true, data: [] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            await getTransactionsByUser({ page: 2, limit: 5 });

            expect(apiClient.get).toHaveBeenCalledWith('/transactions', { params: { page: 2, limit: 5 } });
        });

        it('should throw when the API errors', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));
            await expect(getTransactionsByUser()).rejects.toThrow('Network error');
        });
    });

    describe('getTransactionById', () => {
        it('should fetch a single transaction by id', async () => {
            const mockData = { success: true, data: { id: 'txn-001', amount: 21500 } };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getTransactionById('txn-001');

            expect(apiClient.get).toHaveBeenCalledWith('/transactions/txn-001');
            expect(result).toEqual(mockData);
        });

        it('should throw when transaction is not found', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Not found'));
            await expect(getTransactionById('bad-id')).rejects.toThrow('Not found');
        });
    });

    describe('createTransaction', () => {
        it('should create a new transaction', async () => {
            const payload = {
                sender_wallet_id: 'w-123',
                receiver_wallet_id: 'w-456',
                amount: 21500,
                type: 'CROP_SALE',
                payment_method: 'WALLET',
            };
            const mockData = { success: true, data: { id: 'txn-002', ...payload } };
            (apiClient.post as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await createTransaction(payload);

            expect(apiClient.post).toHaveBeenCalledWith('/transactions', payload);
            expect(result).toEqual(mockData);
        });

        it('should throw when transaction creation fails', async () => {
            (apiClient.post as jest.Mock).mockRejectedValue(new Error('Insufficient funds'));
            await expect(createTransaction({})).rejects.toThrow('Insufficient funds');
        });
    });
});
