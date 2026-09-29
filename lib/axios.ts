import axios from 'axios';

// On the client (browser), use relative path so Next.js rewrites proxy to backend without CORS or IP mismatch issues.
// On the server, connect directly to backend URL.
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return '/api/v0/website';
  }
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v0/website';
  return rawBaseUrl.includes('/api/v0/website')
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/+$/, '')}/api/v0/website`;
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && !config.baseURL?.startsWith('/')) {
    config.baseURL = '/api/v0/website';
  }
  return config;
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
