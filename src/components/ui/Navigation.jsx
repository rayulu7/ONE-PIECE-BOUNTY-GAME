import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaTrophy, FaGamepad, FaSignOutAlt, FaCalendarDay } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/game-modes', icon: FaHome, label: 'Home' },
    { path: '/challenges', icon: FaCalendarDay, label: 'Challenges' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/leaderboard', icon: FaTrophy, label: 'Leaderboard' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't show navigation on auth pages
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/profile-setup') {
    return null;
  }

  return (
    <motion.nav
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-2 border-yellow-500 sticky top-0 z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fbbf24" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            animate={{
              textShadow: ['0 0 5px rgba(251, 191, 36, 0.5)', '0 0 10px rgba(251, 191, 36, 0.8)', '0 0 5px rgba(251, 191, 36, 0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaGamepad className="text-yellow-500 text-2xl mr-2" />
            </motion.div>
            <span className="text-xl font-bold text-yellow-500 font-serif tracking-wider">🏴‍☠️ ONE PIECE BOUNTY</span>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 border ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black border-yellow-400 shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-yellow-400 border-transparent hover:border-yellow-500/50'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={isActive ? {
                      boxShadow: ['0 0 10px rgba(251, 191, 36, 0.5)', '0 0 20px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.5)']
                    } : {}}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    <motion.div
                      animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                    >
                      <Icon className="mr-2" />
                    </motion.div>
                    <span className="font-medium font-serif">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}

            {/* User Info & Logout */}
            {currentUser && (
              <div className="flex items-center space-x-3 border-l border-gray-600 pl-4">
                <span className="text-white text-sm">
                  Welcome, <span className="text-yellow-500">{currentUser.displayName || 'Pirate'}</span>
                </span>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
