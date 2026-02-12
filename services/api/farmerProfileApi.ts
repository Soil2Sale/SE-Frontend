// API service for farmer profile updates
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface PersonalInfoUpdate {
    recovery_email?: string;
    telegram_chat_id?: string;
}

export interface FarmDetailsUpdate {
    manual_location_correction?: boolean;
    location_latitude?: number;
    location_longitude?: number;
}

export interface CropCreate {
    crop_name: string;
    seasonality: string;
}

export interface YieldRecordCreate {
    crop_id: string;
    year: number;
    yield_quantity: number;
    consent_sharing: boolean;
}

export const farmerProfileApi = {
    // Update personal information
    updatePersonalInfo: async (data: PersonalInfoUpdate): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/farmer/profile/personal`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add auth token when authentication is implemented
                // 'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update personal information');
        }

        return response.json();
    },

    // Update farm details
    updateFarmDetails: async (data: FarmDetailsUpdate): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/farmer/profile/farm`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update farm details');
        }

        return response.json();
    },

    // Add new crop
    addCrop: async (data: CropCreate): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/farmer/crops`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add crop');
        }

        return response.json();
    },

    // Delete crop
    deleteCrop: async (cropId: string): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/farmer/crops/${cropId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete crop');
        }

        return response.json();
    },

    // Add yield record
    addYieldRecord: async (data: YieldRecordCreate): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/farmer/yield`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add yield record');
        }

        return response.json();
    },
};
