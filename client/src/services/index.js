import api from './api';

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const userService = {
  updateProfile: (data) => api.put('/user/profile', data),
  getSkills: () => api.get('/user/skills'),
  addSkill: (data) => api.post('/user/skills', data),
  deleteSkill: (skillId) => api.delete(`/user/skills/${skillId}`),
  getInterests: () => api.get('/user/interests'),
  addInterest: (data) => api.post('/user/interests', data),
  deleteInterest: (interestId) => api.delete(`/user/interests/${interestId}`),
};

export const skillService = {
  getAllSkills: () => api.get('/skills'),
  getSkillsByDepartment: (department) => api.get(`/skills/department/${department}`),
  getSkillsByRole: (roleId) => api.get(`/skills/role/${roleId}`),
};

export const roadmapService = {
  createRoadmap: (data) => api.post('/roadmaps', data),
  getUserRoadmaps: () => api.get('/roadmaps'),
  getRoadmapById: (id) => api.get(`/roadmaps/${id}`),
  getRoadmapPhases: (id) => api.get(`/roadmaps/${id}/phases`),
  updateProgress: (id, data) => api.put(`/roadmaps/${id}/progress`, data),
  deleteRoadmap: (id) => api.delete(`/roadmaps/${id}`),
};

export const roleService = {
  getAllRoles: () => api.get('/roles'),
  getRolesByDepartment: (department) => api.get(`/roles/department/${department}`),
  getRoleById: (id) => api.get(`/roles/${id}`),
  getRoleProjects: (id) => api.get(`/roles/${id}/projects`),
};

export const interviewService = {
  getQuestions: (roadmapId) => api.get(`/interview/roadmap/${roadmapId}`),
  getQuestionById: (questionId) => api.get(`/interview/question/${questionId}`),
  submitAnswer: (questionId, data) => api.post(`/interview/question/${questionId}/answer`, data),
  getAnswerFeedback: (answerId) => api.get(`/interview/answer/${answerId}/feedback`),
  getStats: (roadmapId) => api.get(`/interview/roadmap/${roadmapId}/stats`),
};
