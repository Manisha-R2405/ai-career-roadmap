import { create } from 'zustand';
import { roadmapService } from '../services/index';

export const useRoadmapStore = create((set, get) => ({
  roadmaps: [],
  currentRoadmap: null,
  phases: [],
  isLoading: false,
  error: null,

  setRoadmaps: (roadmaps) => set({ roadmaps }),
  setCurrentRoadmap: (roadmap) => set({ currentRoadmap: roadmap }),
  setPhases: (phases) => set({ phases }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  createRoadmap: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await roadmapService.createRoadmap(data);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to create roadmap';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  getUserRoadmaps: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await roadmapService.getUserRoadmaps();
      set({ roadmaps: response.data.roadmaps, isLoading: false });
      return response.data.roadmaps;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch roadmaps';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  getRoadmapById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await roadmapService.getRoadmapById(id);
      set({ currentRoadmap: response.data.roadmap, phases: response.data.phases, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch roadmap';
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  updateProgress: async (id, data) => {
    try {
      const response = await roadmapService.updateProgress(id, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRoadmap: async (id) => {
    try {
      await roadmapService.deleteRoadmap(id);
      set({ roadmaps: get().roadmaps.filter(r => r.id !== id) });
    } catch (error) {
      throw error;
    }
  },
}));
