import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateRoadmap from './pages/CreateRoadmap';
import RoadmapDetail from './pages/RoadmapDetail';
import InterviewPractice from './pages/InterviewPractice';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmap/create"
          element={
            <ProtectedRoute>
              <CreateRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmap/:id"
          element={
            <ProtectedRoute>
              <RoadmapDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/:roadmapId"
          element={
            <ProtectedRoute>
              <InterviewPractice />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
