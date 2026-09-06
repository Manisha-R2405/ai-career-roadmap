import { create } from 'zustand';
import { authService } from '../services/index';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signup(data);
      set({ token: response.data.token, user: response.data.user, isLoading: false });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Signup failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(data);
      set({ token: response.data.token, user: response.data.user, isLoading: false });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response = await authService.getCurrentUser();
      set({ user: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
