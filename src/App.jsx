import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProfileSetup from './components/profile/ProfileSetup';
import Profile from './components/profile/EnhancedProfile';
import GameModes from './components/game/GameModes';
import GameInterface from './components/game/EnhancedGameInterface';
import Leaderboard from './components/game/Leaderboard';
import DailyChallenges from './components/game/DailyChallenges';
import Navigation from './components/ui/Navigation';

// Protected Route Component - must be used within AuthProvider context
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Animated Pirate Background Component
const PirateBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/30 to-transparent">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-800/20 animate-pulse"></div>
        <div className="absolute bottom-4 left-0 w-full h-8 bg-blue-700/15 animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Floating treasure islands */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-600/20 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-500/30 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-green-600/20 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

      {/* Floating clouds */}
      <div className="absolute top-10 left-1/4 w-20 h-8 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute top-16 right-1/3 w-16 h-6 bg-white/8 rounded-full animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>

      {/* Subtle pirate ship silhouette */}
      <div className="absolute bottom-20 right-10 opacity-10">
        <div className="w-24 h-12 bg-black rounded-t-full transform rotate-12"></div>
        <div className="absolute -top-2 left-2 w-20 h-8 bg-gray-800 rounded-t-full"></div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-800 text-white relative">
      <PirateBackground />
      <div className="relative z-10">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/game-modes" element={<ProtectedRoute><GameModes /></ProtectedRoute>} />
          <Route path="/game/:mode" element={<ProtectedRoute><GameInterface /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><DailyChallenges /></ProtectedRoute>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

// Root component that wraps everything with providers in the correct order
const AppWithProviders = () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default AppWithProviders;
