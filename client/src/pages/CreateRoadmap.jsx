import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useRoadmapStore } from '../store/roadmapStore';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const CreateRoadmap = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const createRoadmap = useRoadmapStore((state) => state.createRoadmap);
  const isLoading = useRoadmapStore((state) => state.isLoading);

  const departments = ['CSE', 'IT', 'AIML', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AGRICULTURE', 'ARTS'];
  const roles = {
    CSE: ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Cloud Engineer', 'DevOps Engineer', 'Cybersecurity Analyst', 'Database Administrator'],
    IT: ['Data Analyst', 'IT Support Specialist', 'System Administrator', 'Database Administrator'],
    AIML: ['Data Scientist', 'Machine Learning Engineer', 'AI Engineer'],
    ECE: ['Embedded Systems Engineer', 'VLSI Engineer', 'IoT Engineer', 'Firmware Engineer'],
    EEE: ['Electrical Engineer', 'Power Systems Engineer', 'Control Systems Engineer'],
    MECH: ['Mechanical Design Engineer', 'CAD Engineer', 'Manufacturing Engineer', 'Robotics Engineer'],
    CIVIL: ['Structural Engineer', 'Site Engineer', 'BIM Engineer'],
    AGRICULTURE: ['Agricultural Engineer', 'Precision Agriculture Specialist', 'Agri-Tech Specialist'],
    ARTS: ['Content Strategist', 'Digital Marketing Specialist', 'UX Writer', 'HR Specialist'],
  };

  const [formData, setFormData] = useState({
    title: '',
    educationLevel: user?.educationLevel || 'UG',
    department: user?.department || 'CSE',
    currentStage: '1st Year',
    targetRole: '',
    careerGoal: '',
    availableTime: 'part-time',
  });

  const stages = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Fresher', 'Professional'];
  const availableTimeOptions = ['Full-time', 'Part-time', 'Flexible'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetRole) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createRoadmap(formData);
      toast.success('Roadmap created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create roadmap');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div className="card">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Roadmap</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roadmap Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer Journey"
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="UG">Undergraduate</option>
                  <option value="PG">Postgraduate</option>
                  <option value="PROF">Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input-field"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stage
                </label>
                <select
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleChange}
                  className="input-field"
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time *
                </label>
                <select
                  name="availableTime"
                  value={formData.availableTime}
                  onChange={handleChange}
                  className="input-field"
                >
                  {availableTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Role *
              </label>
              <select
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a role</option>
                {roles[formData.department].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Goal
              </label>
              <textarea
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                placeholder="What are your long-term career aspirations?"
                className="input-field resize-none"
                rows="4"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary flex-1"
              >
                {isLoading ? 'Creating...' : 'Create Roadmap'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoadmap;
