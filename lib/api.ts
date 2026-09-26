import { ApiResponse } from '@/types/common';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  token?: string;
}

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

async function fetcher<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...customConfig } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...customConfig,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials: 'include',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status, data?.errors);
  }

  // If response adheres to ApiResponse<T> format
  if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
    return (data as ApiResponse<T>).data;
  }

  return data as T;
}

export async function apiGet<T>(endpoint: string, token?: string, options: RequestInit = {}): Promise<T> {
  return fetcher<T>(endpoint, {
    method: 'GET',
    token,
    cache: 'no-store',
    ...options,
  });
}

export async function apiPost<T>(endpoint: string, body: unknown, token?: string, options: RequestInit = {}): Promise<T> {
  return fetcher<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    token,
    ...options,
  });
}

export async function apiPut<T>(endpoint: string, body: unknown, token?: string, options: RequestInit = {}): Promise<T> {
  return fetcher<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    token,
    ...options,
  });
}

export async function apiPatch<T>(endpoint: string, body: unknown, token?: string, options: RequestInit = {}): Promise<T> {
  return fetcher<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
    token,
    ...options,
  });
}

export async function apiDelete<T>(endpoint: string, token?: string, options: RequestInit = {}): Promise<T> {
  return fetcher<T>(endpoint, {
    method: 'DELETE',
    token,
    ...options,
  });
}
