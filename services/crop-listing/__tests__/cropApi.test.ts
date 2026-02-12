
import {
    getAllCropListings,
    getCropListingById,
    getActiveCropListings,
    createCropListing,
    updateCropListingStatus,
    deleteCropListing
} from '../cropApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        put: jest.fn(),
    },
}));

describe('Crop Listing Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllCropListings', () => {
        it('should fetch all crop listings', async () => {
            const mockResponse = { data: { success: true, data: [] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await getAllCropListings();

            expect(apiClient.get).toHaveBeenCalledWith('/crop-listings', { params: undefined });
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('getActiveCropListings', () => {
        it('should fetch active crop listings', async () => {
            const mockResponse = { data: { success: true, data: [{ id: '1', status: 'Available' }] } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await getActiveCropListings();

            expect(apiClient.get).toHaveBeenCalledWith('/crop-listings/active');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('getCropListingById', () => {
        it('should fetch a single listing by ID', async () => {
            const mockResponse = { data: { success: true, data: { id: '123' } } };
            (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await getCropListingById('123');

            expect(apiClient.get).toHaveBeenCalledWith('/crop-listings/123');
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('createCropListing', () => {
        it('should create a new crop listing', async () => {
            const mockResponse = { data: { success: true, data: { id: '1' } } };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

            // We use 'any' to bypass strict type check for mock data if needed, 
            // but ideally we should match the interface.
            const requestData: any = {
                crop_name: 'Wheat',
                quantity: 100,
                price_per_unit: 20
            };

            const result = await createCropListing(requestData);

            expect(apiClient.post).toHaveBeenCalledWith('/crop-listings', requestData);
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('updateCropListingStatus', () => {
        it('should update listing status', async () => {
            const mockResponse = { data: { success: true, message: 'Status updated' } };
            (apiClient.patch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await updateCropListingStatus('123', { status: 'sold' as any });

            expect(apiClient.patch).toHaveBeenCalledWith('/crop-listings/123/status', { status: 'sold' });
            expect(result).toEqual(mockResponse.data);
        });
    });

    describe('deleteCropListing', () => {
        it('should delete a crop listing', async () => {
            const mockResponse = { data: { success: true, message: 'Deleted' } };
            (apiClient.delete as jest.Mock).mockResolvedValue(mockResponse);

            const result = await deleteCropListing('123');

            expect(apiClient.delete).toHaveBeenCalledWith('/crop-listings/123');
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle delete error', async () => {
            const error = new Error('Not found');
            (apiClient.delete as jest.Mock).mockRejectedValue(error);

            await expect(deleteCropListing('999')).rejects.toThrow('Not found');
        });
    });
});
