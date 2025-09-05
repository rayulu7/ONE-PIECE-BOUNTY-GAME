import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaQuestionCircle, FaVolumeUp, FaImage, FaPuzzlePiece, FaRandom } from 'react-icons/fa';
import { GiPirateCaptain, GiDevilMask } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';

const GameModes = () => {
  const { currentUser, logout } = useAuth();
  
  const gameModes = [
    {
      id: 'silhouette',
      name: 'Classic Silhouette Guess',
      description: 'Guess the character from their shadowed outline as it reveals piece by piece.',
      icon: <FaImage className="text-4xl" />,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'devil-fruit',
      name: 'Distorted Devil Fruit Mode',
      description: 'Identify the character from their Devil Fruit or a distorted fragment of it.',
      icon: <GiDevilMask className="text-4xl" />,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'bounty-poster',
      name: 'Bounty Poster Puzzle',
      description: 'Reconstruct who the character is from a torn or blurred wanted poster.',
      icon: <FaPuzzlePiece className="text-4xl" />,
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      id: 'gear-form',
      name: 'Gear/Form Guess',
      description: 'Guess the character and their specific form or gear.',
      icon: <FaQuestionCircle className="text-4xl" />,
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'crew',
      name: 'Crew-only Guess',
      description: 'Guess which crew from silhouettes of 3 crew members.',
      icon: <GiPirateCaptain className="text-4xl" />,
      color: 'from-indigo-600 to-indigo-800'
    },
    {
      id: 'manga-panel',
      name: 'Manga Panel Zoom',
      description: 'Guess the character from an ultra-zoomed manga panel before it fully reveals.',
      icon: <FaImage className="text-4xl" />,
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'fusion',
      name: 'Fusion/Glitch Mode',
      description: 'Guess both characters whose features have been mashed together for double score.',
      icon: <FaRandom className="text-4xl" />,
      color: 'from-pink-600 to-pink-800'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
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
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-yellow-500"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ONE PIECE GAME MODES
          </motion.h1>
          
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <motion.button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser className="mr-2" />
                Profile
              </motion.button>
            </Link>
            
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
        
        {/* Game Modes Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {gameModes.map((mode) => (
            <motion.div 
              key={mode.id}
              className={`bg-gradient-to-br ${mode.color} rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 border-2 border-yellow-500`}
              variants={item}
            >
              <Link to={`/game/${mode.id}`}>
                <div className="p-6">
                  <div className="flex justify-center mb-4 text-white">
                    {mode.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">{mode.name}</h3>
                  <p className="text-gray-200 text-center">{mode.description}</p>
                </div>
                <div className="bg-black bg-opacity-30 p-4 flex justify-center">
                  <motion.button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PLAY
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex justify-center space-x-6">
            <Link to="/challenges">
              <motion.button
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-lg font-bold text-xl shadow-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                🗓️ DAILY CHALLENGES
              </motion.button>
            </Link>
            
            <Link to="/leaderboard">
              <motion.button
                className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-8 py-3 rounded-lg font-bold text-xl shadow-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                🏆 BOUNTY LEADERBOARD
              </motion.button>
            </Link>
          </div>
          
          <motion.p 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Complete daily challenges for bonus berries! • Compete for the top bounty!
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default GameModes;