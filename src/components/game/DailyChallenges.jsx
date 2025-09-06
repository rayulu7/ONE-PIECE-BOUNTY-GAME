import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarDay, FaTrophy, FaFire, FaClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const DailyChallenges = () => {
  const { user } = useAuth();
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [streak, setStreak] = useState(0);

  // Daily challenge rotation - ordered by day of week (0 = Sunday, 6 = Saturday)
  const challenges = [
    {
      id: 'silhouette-sunday',
      name: 'Silhouette Sunday',
      description: 'Master the art of shadow recognition',
      mode: 'silhouette',
      target: 8,
      reward: 5000,
      icon: '🏴‍☠️',
      color: 'from-yellow-600 to-yellow-800',
      dayIndex: 0 // Sunday
    },
    {
      id: 'manga-monday',
      name: 'Manga Monday',
      description: 'Zoom into the action!',
      mode: 'manga-panel',
      target: 6,
      reward: 6000,
      icon: '📖',
      color: 'from-gray-600 to-gray-800',
      dayIndex: 1 // Monday
    },
    {
      id: 'treasure-tuesday',
      name: 'Treasure Tuesday',
      description: 'Find the Devil Fruit treasures',
      mode: 'devil-fruit',
      target: 7,
      reward: 5500,
      icon: '🍎',
      color: 'from-purple-600 to-purple-800',
      dayIndex: 2 // Tuesday
    },
    {
      id: 'wednesday-wonders',
      name: 'Wednesday Wonders',
      description: 'Explore the mysteries of the sea',
      mode: 'crew',
      target: 5,
      reward: 6000,
      icon: '🌊',
      color: 'from-blue-600 to-blue-800',
      dayIndex: 3 // Wednesday
    },
    {
      id: 'throwback-thursday',
      name: 'Throwback Thursday',
      description: 'Reconstruct the wanted posters',
      mode: 'bounty-poster',
      target: 6,
      reward: 6500,
      icon: '🧩',
      color: 'from-yellow-600 to-orange-600',
      dayIndex: 4 // Thursday
    },
    {
      id: 'fusion-friday',
      name: 'Fusion Friday',
      description: 'Master the impossible fusion challenge',
      mode: 'fusion',
      target: 4,
      reward: 10000,
      icon: '⚡',
      color: 'from-pink-600 to-purple-600',
      dayIndex: 5 // Friday
    },
    {
      id: 'samurai-saturday',
      name: 'Samurai Saturday',
      description: 'Test your knowledge of forms and transformations',
      mode: 'gear-form',
      target: 7,
      reward: 8000,
      icon: '⚔️',
      color: 'from-red-600 to-red-800',
      dayIndex: 6 // Saturday
    }
  ];

  useEffect(() => {
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();
    setCurrentChallenge(challenges[today]);
    
    // Load user progress (in a real app, this would come from Firebase)
    loadUserChallengeProgress();
  }, []);

  const loadUserChallengeProgress = () => {
    // Simulate loading user's challenge progress
    const savedProgress = localStorage.getItem(`dailyProgress_${user?.uid}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedChallenges(progress.completed || []);
      setStreak(progress.streak || 0);
    }
  };

  const saveProgress = (challengeId) => {
    const newCompleted = [...completedChallenges, challengeId];
    const newStreak = streak + 1;
    
    const progress = {
      completed: newCompleted,
      streak: newStreak,
      lastUpdate: new Date().toISOString()
    };
    
    localStorage.setItem(`dailyProgress_${user?.uid}`, JSON.stringify(progress));
    setCompletedChallenges(newCompleted);
    setStreak(newStreak);
  };

  const getTodaysDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isCompleted = (challengeId) => {
    const today = new Date().toDateString();
    return completedChallenges.some(c => c === challengeId && c.includes(today));
  };

  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-500 mb-4">🗓️ DAILY CHALLENGES</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">{getTodaysDate()}</p>
          
          {/* Stats Bar */}
          <div className="flex justify-center space-x-8 mb-8">
            <motion.div
              className="bg-gray-800 rounded-lg p-4 border-2 border-yellow-500 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center">
                <motion.div
                  animate={streak > 0 ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaFire className={`mr-2 text-2xl ${streak >= 7 ? 'text-orange-400' : streak >= 3 ? 'text-red-500' : 'text-red-400'}`} />
                </motion.div>
                <div>
                  <motion.p
                    className="text-2xl font-bold text-white"
                    key={streak}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {streak}
                  </motion.p>
                  <p className="text-sm text-gray-400">Day Streak</p>
                  {streak >= 7 && (
                    <motion.p
                      className="text-xs text-orange-400 font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      🔥 ON FIRE!
                    </motion.p>
                  )}
                </div>
              </div>
              {streak > 0 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>
            
            <motion.div
              className="bg-gray-800 rounded-lg p-4 border-2 border-blue-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <FaClock className="text-blue-500 mr-2 text-2xl" />
                </motion.div>
                <div>
                  <motion.p
                    className="text-2xl font-bold text-white"
                    key={getTimeUntilReset()}
                    initial={{ scale: 0.9, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getTimeUntilReset()}
                  </motion.p>
                  <p className="text-sm text-gray-400">Until Reset</p>
                  <motion.div
                    className="w-full bg-blue-900 rounded-full h-1 mt-1"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 60, ease: "linear" }}
                  >
                    <motion.div
                      className="bg-blue-500 h-1 rounded-full"
                      animate={{
                        width: ['100%', '0%']
                      }}
                      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <div className="bg-gray-800 rounded-lg p-4 border-2 border-green-500">
              <div className="flex items-center">
                <FaTrophy className="text-green-500 mr-2 text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-white">{completedChallenges.length}</p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-gray-800 rounded-lg p-4 border-2 border-purple-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FaStar className="text-purple-500 mr-2 text-2xl" />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold text-white">#{Math.max(1, 100 - (streak * 5) - (completedChallenges.length * 2))}</p>
                  <p className="text-sm text-gray-400">Challenge Rank</p>
                  <p className="text-xs text-purple-400">
                    {streak >= 5 ? 'Elite Challenger' : streak >= 3 ? 'Pro Challenger' : 'Rising Star'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Today's Featured Challenge */}
        {currentChallenge && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-white">🌟 TODAY'S FEATURED CHALLENGE</h2>
            <div className={`bg-gradient-to-br ${currentChallenge.color} rounded-xl p-8 border-4 border-yellow-500 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4">
                <div className="text-6xl opacity-20">{currentChallenge.icon}</div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-4xl font-black text-white mb-2">{currentChallenge.name}</h3>
                    <p className="text-xl text-gray-100 mb-4">{currentChallenge.description}</p>
                    
                    <div className="flex items-center space-x-6">
                      <div className="bg-black bg-opacity-30 rounded-lg px-4 py-2">
                        <p className="text-white font-bold">Target: {currentChallenge.target} correct</p>
                      </div>
                      <div className="bg-green-600 rounded-lg px-4 py-2">
                        <p className="text-white font-bold">Reward: {currentChallenge.reward.toLocaleString()} berries</p>
                      </div>
                    </div>
                  </div>
                  
                  {isCompleted(currentChallenge.id) ? (
                    <motion.div 
                      className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✅ COMPLETED!
                    </motion.div>
                  ) : (
                    <Link to={`/game/${currentChallenge.mode}`}>
                      <motion.button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 158, 11, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🚀 START CHALLENGE
                      </motion.button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Weekly Challenge Overview */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">📅 THIS WEEK'S CHALLENGES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            {challenges.map((challenge, index) => {
              const isToday = index === new Date().getDay();
              const completed = isCompleted(challenge.id);
              
              return (
                <motion.div
                  key={challenge.id}
                  variants={item}
                  className={`bg-gradient-to-br ${challenge.color} rounded-lg p-4 border-2 ${
                    isToday ? 'border-yellow-400 ring-4 ring-yellow-400/50' : 'border-gray-600'
                  } relative ${!isToday ? 'opacity-75' : ''}`}
                >
                  {isToday && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      TODAY
                    </div>
                  )}
                  
                  {completed && (
                    <div className="absolute -top-2 -left-2 bg-green-600 text-white p-1 rounded-full">
                      <FaStar size={12} />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-4xl mb-3">{challenge.icon}</div>
                    <h3 className="font-bold text-white text-lg mb-2">{challenge.name}</h3>
                    <p className="text-sm text-gray-200 mb-3">{challenge.description}</p>
                    <div className="text-xs text-gray-200 space-y-1">
                      <p>Target: {challenge.target}</p>
                      <p>Reward: {challenge.reward.toLocaleString()}</p>
                    </div>
                    
                    {isToday && !completed && (
                      <Link to={`/game/${challenge.mode}`}>
                        <motion.button
                          className="mt-3 bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          PLAY NOW
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Challenge Rules */}
        <motion.div 
          className="mt-16 bg-gray-800 rounded-lg p-8 border-2 border-yellow-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">📋 Challenge Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">🎯 How to Complete</h4>
              <ul className="space-y-1 text-sm">
                <li>• Play the daily featured game mode</li>
                <li>• Reach the target number of correct answers</li>
                <li>• Complete within a single game session</li>
                <li>• Earn bonus berries upon completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">🔥 Streak Bonuses</h4>
              <ul className="space-y-1 text-sm">
                <li>• 3 days: +25% bonus berries</li>
                <li>• 7 days: +50% bonus berries</li>
                <li>• 14 days: +100% bonus berries</li>
                <li>• Missing a day breaks your streak</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyChallenges;
