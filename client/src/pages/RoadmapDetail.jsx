import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoadmapStore } from '../store/roadmapStore';
import { FaArrowLeft, FaCheckCircle, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentRoadmap = useRoadmapStore((state) => state.currentRoadmap);
  const phases = useRoadmapStore((state) => state.phases);
  const isLoading = useRoadmapStore((state) => state.isLoading);
  const getRoadmapById = useRoadmapStore((state) => state.getRoadmapById);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      await getRoadmapById(id);
    } catch (error) {
      toast.error('Failed to load roadmap');
      navigate('/dashboard');
    }
  };

  if (isLoading || !currentRoadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading roadmap...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{currentRoadmap.title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Target Role</p>
              <p className="text-lg font-semibold text-gray-800">{currentRoadmap.target_role}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Department</p>
              <p className="text-lg font-semibold text-gray-800">{currentRoadmap.department}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Current Stage</p>
              <p className="text-lg font-semibold text-gray-800">{currentRoadmap.current_stage}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Progress</p>
              <p className="text-lg font-semibold text-blue-600">{currentRoadmap.completion_percentage}%</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-gray-800">{currentRoadmap.completion_percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentRoadmap.completion_percentage}%` }}
              ></div>
            </div>
          </div>

          {currentRoadmap.career_goal && (
            <div>
              <p className="text-gray-600 text-sm mb-2">Career Goal</p>
              <p className="text-gray-800">{currentRoadmap.career_goal}</p>
            </div>
          )}
        </div>

        {/* Phases Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Roadmap Phases</h2>
          {phases.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No phases defined yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {phases.map((phase, index) => (
                <div key={phase.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        Phase {phase.phase_number}: {phase.phase_name}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2">
                        <FaClock className="text-blue-600" /> {phase.duration}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {phase.completion_percentage}% Complete
                    </span>
                  </div>

                  {phase.description && (
                    <p className="text-gray-700 mb-4">{phase.description}</p>
                  )}

                  {/* Skills */}
                  {phase.skills && phase.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-2">Skills to Learn:</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {skill.skill_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  {phase.tasks && phase.tasks.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">Tasks:</p>
                      <ul className="space-y-2">
                        {phase.tasks.map((task) => (
                          <li key={task.id} className="flex items-start gap-3">
                            <FaCheckCircle
                              className={`mt-1 ${
                                task.status === 'completed'
                                  ? 'text-green-600'
                                  : 'text-gray-400'
                              }`}
                            />
                            <span
                              className={`${
                                task.status === 'completed'
                                  ? 'line-through text-gray-500'
                                  : 'text-gray-700'
                              }`}
                            >
                              {task.task_name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interview Section */}
        <div className="mt-12">
          <button
            onClick={() => navigate(`/interview/${id}`)}
            className="btn btn-primary px-8 py-3"
          >
            Start Interview Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
