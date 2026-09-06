import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChartLine, FaAward, FaBriefcase } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaRobot className="text-3xl text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">AI Career Roadmap</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Your Career Success Starts Here
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Personalized career roadmaps powered by AI to guide your professional growth across any field
        </p>
        <Link to="/signup" className="btn btn-primary text-lg px-8 py-3 inline-block">
          Get Started Free
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose AI Career Roadmap?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <FaChartLine className="text-4xl text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Personalized Paths</h4>
              <p className="text-gray-600">
                Custom roadmaps based on your education, skills, and career goals
              </p>
            </div>
            <div className="card text-center">
              <FaAward className="text-4xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Skill Development</h4>
              <p className="text-gray-600">
                Track and improve skills with structured learning paths
              </p>
            </div>
            <div className="card text-center">
              <FaBriefcase className="text-4xl text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Career Roles</h4>
              <p className="text-gray-600">
                Explore 30+ career paths across different engineering disciplines
              </p>
            </div>
            <div className="card text-center">
              <FaRobot className="text-4xl text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">AI Guidance</h4>
              <p className="text-gray-600">
                Interview preparation and feedback powered by AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Build Your Career Roadmap?
          </h3>
          <p className="text-lg mb-8">Join thousands of students planning their perfect career</p>
          <Link to="/signup" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition inline-block">
            Start Your Journey Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AI Career Roadmap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
