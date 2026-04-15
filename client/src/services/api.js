import axios from 'axios';

const API_BASE_URL = '/api';

// Studio API
export const studioAPI = {
  getAll: (filters) => {
    let url = `${API_BASE_URL}/studios`;
    if (filters) {
      const params = new URLSearchParams(filters).toString();
      url += `?${params}`;
    }
    return axios.get(url);
  },
  getById: (id) => axios.get(`${API_BASE_URL}/studios/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/studios`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/studios/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/studios/${id}`)
};

// Booking API
export const bookingAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/bookings`),
  getById: (id) => axios.get(`${API_BASE_URL}/bookings/${id}`),
  create: (data) => axios.post(`${API_BASE_URL}/bookings`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/bookings/${id}`, data),
  cancel: (id) => axios.put(`${API_BASE_URL}/bookings/${id}/cancel`)
};

// Auth API
export const authAPI = {
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/auth/login`, { email, password }),
  register: (data) =>
    axios.post(`${API_BASE_URL}/auth/register`, data),
  getMe: () => axios.get(`${API_BASE_URL}/auth/me`)
};
