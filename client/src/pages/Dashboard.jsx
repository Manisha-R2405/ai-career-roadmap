import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRoadmapStore } from '../store/roadmapStore';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaRoadmap, FaChartBar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const logout = useAuthStore((state) => state.logout);
  
  const roadmaps = useRoadmapStore((state) => state.roadmaps);
  const getUserRoadmaps = useRoadmapStore((state) => state.getUserRoadmaps);
  const deleteRoadmap = useRoadmapStore((state) => state.deleteRoadmap);
  const isLoading = useRoadmapStore((state) => state.isLoading);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      if (!user) {
        await getCurrentUser();
      }
      await getUserRoadmaps();
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleDeleteRoadmap = async (id) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await deleteRoadmap(id);
        toast.success('Roadmap deleted successfully');
      } catch (error) {
        toast.error('Failed to delete roadmap');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            {user && <p className="text-gray-600">Welcome, {user.name}!</p>}
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Roadmaps</p>
                <p className="text-3xl font-bold text-gray-800">{roadmaps.length}</p>
              </div>
              <FaRoadmap className="text-4xl text-blue-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Department</p>
                <p className="text-3xl font-bold text-gray-800">{user?.department || 'N/A'}</p>
              </div>
              <FaChartBar className="text-4xl text-green-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Education Level</p>
                <p className="text-3xl font-bold text-gray-800">{user?.educationLevel || 'N/A'}</p>
              </div>
              <FaChartBar className="text-4xl text-purple-600" />
            </div>
          </div>
        </div>

        {/* Roadmaps Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Roadmaps</h2>
            <button
              onClick={() => navigate('/roadmap/create')}
              className="btn btn-primary flex items-center gap-2"
            >
              <FaPlus /> Create New Roadmap
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading roadmaps...</p>
            </div>
          ) : roadmaps.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">No roadmaps yet</p>
              <button
                onClick={() => navigate('/roadmap/create')}
                className="btn btn-primary"
              >
                Create Your First Roadmap
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((roadmap) => (
                <div key={roadmap.id} className="card">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{roadmap.title}</h3>
                  <p className="text-gray-600 mb-1">Target Role: {roadmap.target_role}</p>
                  <p className="text-gray-600 mb-4">Department: {roadmap.department}</p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-gray-800">{roadmap.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${roadmap.completion_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                      className="btn btn-primary flex-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteRoadmap(roadmap.id)}
                      className="btn btn-danger flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
