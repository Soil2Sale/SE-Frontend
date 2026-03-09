
import { getMarketPrices } from '../marketApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

const mockPrices = [
    { id: 'mp-1', crop_name: 'Wheat', price: 2200, state: 'Punjab', market_type: 'APMC' },
    { id: 'mp-2', crop_name: 'Maize', price: 1800, state: 'Karnataka', market_type: 'APMC' },
];

describe('Market Price Service', () => {
    beforeEach(() => jest.clearAllMocks());

    // ── Unit Tests ────────────────────────────────────────────────────────────

    describe('getMarketPrices', () => {
        it('should fetch market prices without filters', async () => {
            const mockData = { success: true, data: mockPrices };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getMarketPrices();

            expect(apiClient.get).toHaveBeenCalledWith('/market-prices', { params: undefined });
            expect(result.data).toHaveLength(2);
        });

        it('should pass state filter to the API', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [mockPrices[0]] } });

            const result = await getMarketPrices({ state: 'Punjab' });

            expect(apiClient.get).toHaveBeenCalledWith('/market-prices', { params: { state: 'Punjab' } });
            expect(result.data[0].crop_name).toBe('Wheat');
        });

        it('should support search parameter', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [mockPrices[1]] } });

            await getMarketPrices({ search: 'Maize' });

            expect(apiClient.get).toHaveBeenCalledWith('/market-prices', { params: { search: 'Maize' } });
        });

        it('should support pagination params', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [] } });

            await getMarketPrices({ page: 2, limit: 10 });

            expect(apiClient.get).toHaveBeenCalledWith('/market-prices', { params: { page: 2, limit: 10 } });
        });

        it('should return empty data array when no prices found', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({ data: { success: true, data: [] } });
            const result = await getMarketPrices({ state: 'Unknown' });
            expect(result.data).toHaveLength(0);
        });

        it('should throw on API error', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Server error'));
            await expect(getMarketPrices()).rejects.toThrow('Server error');
        });
    });
});
