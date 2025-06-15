import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Barber services
export const barberService = {
  getBarbers: async (location) => {
    const response = await api.get('/barbers', { params: { location } });
    return response.data;
  },

  getBarberDetails: async (barberId) => {
    const response = await api.get(`/barbers/${barberId}`);
    return response.data;
  },

  bookAppointment: async (barberId, appointmentData) => {
    const response = await api.post(`/barbers/${barberId}/book`, appointmentData);
    return response.data;
  },
};

// User services
export const userService = {
  getLoyaltyPoints: async () => {
    const response = await api.get('/user/loyalty');
    return response.data;
  },

  redeemPoints: async (rewardId) => {
    const response = await api.post('/user/loyalty/redeem', { rewardId });
    return response.data;
  },
};

// AI Style services
export const styleService = {
  analyzeImage: async (imageData) => {
    const response = await api.post('/ai/analyze', { image: imageData });
    return response.data;
  },

  getStyleRecommendations: async (faceData) => {
    const response = await api.post('/ai/recommend', faceData);
    return response.data;
  },
};

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 