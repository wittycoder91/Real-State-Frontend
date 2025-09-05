export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  CREATE_REAL_ESTATE: '/real-estate/add',
  GET_ACTIVE_REAL_ESTATE: '/real-estate/active',
  GET_REAL_ESTATE: '/real-estate',
  CONTACT_REAL_ESTATE: '/real-estate/contact',
};