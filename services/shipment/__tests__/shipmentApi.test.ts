
import {
    getShipments,
    getShipmentById,
    createShipment,
    updateShipmentStatus,
    confirmDelivery,
    trackShipment,
    getVehicles,
    createVehicle,
} from '../shipmentApi';
import apiClient from '../../apiClient';

jest.mock('../../apiClient', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}));

describe('Shipment Service', () => {
    beforeEach(() => jest.clearAllMocks());

    // ── Unit Tests ────────────────────────────────────────────────────────────

    describe('getShipments', () => {
        it('should fetch all shipments', async () => {
            const mockData = { success: true, data: [{ id: 's-1', status: 'PENDING' }] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getShipments();

            expect(apiClient.get).toHaveBeenCalledWith('/shipments', { params: undefined });
            expect(result.data).toHaveLength(1);
        });

        it('should throw on network error', async () => {
            (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));
            await expect(getShipments()).rejects.toThrow('Network error');
        });
    });

    describe('getShipmentById', () => {
        it('should fetch a shipment by ID', async () => {
            const mockData = { success: true, data: { id: 's-1', tracking_code: 'TRK-001' } };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getShipmentById('s-1');

            expect(apiClient.get).toHaveBeenCalledWith('/shipments/s-1');
            expect(result.data.tracking_code).toBe('TRK-001');
        });
    });

    describe('createShipment', () => {
        it('should create a new shipment', async () => {
            const payload: any = {
                order_id: 'order-uuid-001',
                vehicle_id: 'vehicle-uuid-001',
                origin_latitude: 28.7041,
                origin_longitude: 77.1025,
                destination_latitude: 19.076,
                destination_longitude: 72.877,
                estimated_cost: 5000,
            };
            const mockData = { success: true, data: { id: 's-2', ...payload } };
            (apiClient.post as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await createShipment(payload);

            expect(apiClient.post).toHaveBeenCalledWith('/shipments', payload);
            expect(result.data.estimated_cost).toBe(5000);
        });

        it('should throw on creation failure', async () => {
            (apiClient.post as jest.Mock).mockRejectedValue(new Error('Vehicle unavailable'));
            await expect(createShipment({} as any)).rejects.toThrow('Vehicle unavailable');
        });
    });

    describe('updateShipmentStatus', () => {
        it('should update shipment status to IN_TRANSIT', async () => {
            const mockData = { success: true, data: { id: 's-1', status: 'IN_TRANSIT' } };
            (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await updateShipmentStatus('s-1', { status: 'IN_TRANSIT' } as any);

            expect(apiClient.patch).toHaveBeenCalledWith('/shipments/s-1/status', { status: 'IN_TRANSIT' });
            expect(result.data.status).toBe('IN_TRANSIT');
        });
    });

    describe('confirmDelivery', () => {
        it('should confirm delivery of a shipment', async () => {
            const mockData = { success: true, data: { id: 's-1', status: 'DELIVERED' } };
            (apiClient.patch as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await confirmDelivery('s-1');

            expect(apiClient.patch).toHaveBeenCalledWith('/shipments/s-1/deliver');
            expect(result.data.status).toBe('DELIVERED');
        });
    });

    describe('trackShipment', () => {
        it('should track a shipment by tracking code', async () => {
            const mockData = { success: true, data: { tracking_code: 'TRK-001', status: 'IN_TRANSIT' } };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await trackShipment('TRK-001');

            expect(apiClient.get).toHaveBeenCalledWith('/shipments/track/TRK-001');
            expect(result.data.tracking_code).toBe('TRK-001');
        });
    });

    describe('getVehicles', () => {
        it('should fetch all available vehicles', async () => {
            const mockData = { success: true, data: [{ id: 'v-1', vehicle_type: 'PICKUP_VAN' }] };
            (apiClient.get as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await getVehicles();

            expect(apiClient.get).toHaveBeenCalledWith('/vehicles', { params: undefined });
            expect(result.data[0].vehicle_type).toBe('PICKUP_VAN');
        });
    });

    describe('createVehicle', () => {
        it('should create a vehicle', async () => {
            const payload: any = { vehicle_type: 'PICKUP_VAN', capacity: 1000, logistics_provider_profile_id: 'lp-1' };
            const mockData = { success: true, data: { id: 'v-2', ...payload } };
            (apiClient.post as jest.Mock).mockResolvedValue({ data: mockData });

            const result = await createVehicle(payload);

            expect(apiClient.post).toHaveBeenCalledWith('/vehicles', payload);
            expect(result.data.capacity).toBe(1000);
        });
    });
});
