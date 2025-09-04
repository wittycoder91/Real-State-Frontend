import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/api';

// Create real estate listing with images
export const createRealEstateListing = async (formData) => {
  try {
    // Create FormData for file upload
    const uploadData = new FormData();
    
    // Add form fields
    uploadData.append('userEmail', formData.userEmail);
    uploadData.append('address', formData.address);
    uploadData.append('propertyType', formData.propertyType);
    uploadData.append('bedrooms', formData.bedrooms);
    uploadData.append('bathrooms', formData.bathrooms);
    uploadData.append('squareFootage', formData.squareFootage);
    uploadData.append('price', formData.price);
    uploadData.append('description', formData.description);
    
    // Add images
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image) => {
        uploadData.append('images', image);
      });
    }

    // Use axios for the API call
    const response = await apiClient.post(API_ENDPOINTS.CREATE_REAL_ESTATE, uploadData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'Property listed successfully!'
    };
  } catch (error) {
    console.error('Error creating real estate listing:', error);
    
    // Handle axios error response
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create property listing. Please try again.';
    
    return {
      success: false,
      error: errorMessage,
      message: errorMessage
    };
  }
};
