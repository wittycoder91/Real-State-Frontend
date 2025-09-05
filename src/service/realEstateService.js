import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api';

// Get all active real estate listings
export const getActiveRealEstate = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_ACTIVE_REAL_ESTATE);
    return response.data;
  } catch (error) {
    console.error('Error fetching real estate listings:', error);
    throw error;
  }
};

// Get single real estate listing by ID
export const getRealEstateById = async (id) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.GET_REAL_ESTATE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching real estate listing:', error);
    throw error;
  }
};

// Contact real estate owner
export const contactRealEstateOwner = async (contactData) => {
  try {
    const uploadData = new FormData();
    
    uploadData.append('userName', contactData.userName);
    uploadData.append('email', contactData.email);
    uploadData.append('university', contactData.university);
    uploadData.append('realEstateId', contactData.realEstateId);
    
    if (contactData.images && contactData.images.length > 0) {
      contactData.images.forEach((image) => {
        uploadData.append('images', image);
      });
    }

    const response = await apiClient.post(API_ENDPOINTS.CONTACT_REAL_ESTATE, uploadData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'Contact message sent successfully!'
    };
  } catch (error) {    
    const errorMessage = error.response?.data?.message || error.message || 'Failed to send contact message. Please try again.';
    
    return {
      success: false,
      error: errorMessage,
      message: errorMessage
    };
  }
};
