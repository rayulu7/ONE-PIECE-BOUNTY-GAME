import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion } from 'framer-motion';
import { FaTrophy, FaArrowLeft, FaEye } from 'react-icons/fa';
import BountyPoster from '../ui/BountyPoster';
import { pirateIcons, getIconById } from '../../data/pirateIcons';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          orderBy('bounty', 'desc'),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const leaderboardData = [];
        
        querySnapshot.forEach((doc) => {
          leaderboardData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setPlayers(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return 'bg-yellow-500 text-black'; // Gold
      case 1: return 'bg-gray-300 text-black'; // Silver
      case 2: return 'bg-yellow-700 text-white'; // Bronze
      default: return 'bg-gray-700 text-white';
    }
  };

  const getTrophyIcon = (index) => {
    switch(index) {
      case 0: return <FaTrophy className="text-yellow-500" />;
      case 1: return <FaTrophy className="text-gray-300" />;
      case 2: return <FaTrophy className="text-yellow-700" />;
      default: return null;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-yellow-500 text-2xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link to="/game-modes">
            <motion.button
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="mr-2" />
              Back to Game Modes
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-yellow-500"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-yellow-600 p-4 sm:p-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">BOUNTY LEADERBOARD</h1>
            <p className="text-white text-base sm:text-lg mt-2">The Most Wanted Pirates</p>
          </div>
          
          {players.length === 0 ? (
            <div className="p-8 text-center text-white text-xl">
              No pirates have earned bounties yet. Be the first one!
            </div>
          ) : (
            <motion.div 
              className="divide-y divide-gray-700"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {players.map((player, index) => (
                <motion.div 
                  key={player.id} 
                  className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
                  variants={item}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${getRankStyle(index)}`}>
                    {index + 1}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 mr-4">
                    {player.profileImage ? (
                      <img
                        src={player.profileImage}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : player.profileIcon ? (
                      (() => {
                        const iconData = getIconById(player.profileIcon);
                        if (iconData) {
                          // Get the first available variant
                          const firstVariant = Object.values(iconData.variants)[0];
                          return (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: firstVariant.svg }}
                            />
                          );
                        }
                        // Show default pirate icon if no profile icon is set
                        const defaultIcon = getIconById('luffy'); // Default to Luffy
                        if (defaultIcon) {
                          const firstVariant = Object.values(defaultIcon.variants)[0];
                          return (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: firstVariant.svg }}
                            />
                          );
                        }
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gray-600">
                            <span className="text-yellow-500 font-bold">🏴‍☠️</span>
                          </div>
                        );
                      })()
                    ) : (
                      (() => {
                        // Show default pirate icon for users without profile icon
                        const defaultIcon = getIconById('luffy'); // Default to Luffy
                        if (defaultIcon) {
                          const firstVariant = Object.values(defaultIcon.variants)[0];
                          return (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: firstVariant.svg }}
                            />
                          );
                        }
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gray-600">
                            <span className="text-yellow-500 font-bold">🏴‍☠️</span>
                          </div>
                        );
                      })()
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-white font-bold text-lg">{player.name}</h3>
                      {getTrophyIcon(index) && (
                        <span className="ml-2">{getTrophyIcon(index)}</span>
                      )}
                    </div>
                    <div className="text-yellow-500 font-bold">
                      {player.bounty?.toLocaleString() || 0} B
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    {player.bounty >= 1000000000 ? 'Emperor' :
                     player.bounty >= 500000000 ? 'Yonko Commander' :
                     player.bounty >= 100000000 ? 'Supernova' :
                     player.bounty >= 50000000 ? 'Pirate Captain' :
                     player.bounty >= 10000000 ? 'Pirate Officer' :
                     'Rookie Pirate'}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;