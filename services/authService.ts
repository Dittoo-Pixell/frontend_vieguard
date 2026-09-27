import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types/common';
import { User, LoginDto, RegisterDto, ResetPasswordDto } from '@/types/auth';

export const authService = {
  async register(data: RegisterDto): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post('/auth/register', data);
  },

  async login(data: LoginDto): Promise<ApiResponse<{ user: User }>> {
    return apiClient.post('/auth/login', data);
  },

  async logout(): Promise<ApiResponse<null>> {
    return apiClient.post('/auth/logout');
  },

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(data: ResetPasswordDto): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post('/auth/reset-password', data);
  },

  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get('/users/profile');
  },

  async updateProfile(data: { name?: string; phone?: string; address?: string; profilePhoto?: string }): Promise<ApiResponse<User>> {
    return apiClient.put('/users/profile', data);
  },
};
