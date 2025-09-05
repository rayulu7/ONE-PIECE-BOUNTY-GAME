import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaStar, FaQuestionCircle } from 'react-icons/fa';

const GameStats = ({ 
  currentQuestion, 
  totalQuestions, 
  score, 
  timeLeft, 
  gameStreak = 0,
  dailyStreak = 0,
  className = "" 
}) => {
  const timeWarning = timeLeft <= 10;
  const timeCritical = timeLeft <= 5;

  return (
    <motion.div 
      className={`bg-gray-800 rounded-lg p-4 border-2 border-yellow-500 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        {/* Question Progress */}
        <div className="flex items-center space-x-2">
          <FaQuestionCircle className="text-blue-400" />
          <span className="text-white font-bold">
            Question: {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center space-x-2">
          <FaStar className="text-yellow-500" />
          <span className="text-white font-bold">
            Score: <span className="text-yellow-500">{score}</span>
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center space-x-2">
          <FaClock className={`${
            timeCritical ? 'text-red-500' : 
            timeWarning ? 'text-orange-500' : 
            'text-green-500'
          }`} />
          <motion.span 
            className={`font-bold ${
              timeCritical ? 'text-red-500' : 
              timeWarning ? 'text-orange-500' : 
              'text-white'
            }`}
            animate={timeCritical ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: timeCritical ? Infinity : 0, duration: 0.5 }}
          >
            {timeLeft}s
          </motion.span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      <div className="text-xs text-gray-400 mt-1 text-center">
        Progress: {Math.round(((currentQuestion) / totalQuestions) * 100)}%
      </div>
    </div>
    
    {/* Streak Display */}
    {(gameStreak > 0 || dailyStreak > 0) && (
      <div className="mt-3 flex justify-center space-x-4">
        {gameStreak > 0 && (
          <div className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold text-white">
            🔥 Game: {gameStreak}
          </div>
        )}
        {dailyStreak > 0 && (
          <div className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold text-white">
            📅 Daily: {dailyStreak}
          </div>
        )}
      </div>
    )}
    </motion.div>
  );
};

export default GameStats;
