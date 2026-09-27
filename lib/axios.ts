import axios from 'axios';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v0/website';
const baseURL = rawBaseUrl.includes('/api/v0/website')
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/+$/, '')}/api/v0/website`;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Server backend atau database belum aktif.'));
    }
    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      `Terjadi kendala pada server (${error.response.status})`;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
