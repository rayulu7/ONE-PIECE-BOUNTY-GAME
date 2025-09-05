import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaCoins, FaTrophy } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, getUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setProfile(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getUserProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-yellow-500 text-2xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-yellow-500"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          {/* Bounty Poster Header */}
          <div className="bg-yellow-700 p-4 text-center">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">WANTED</h2>
            <h3 className="text-xl text-white">DEAD OR ALIVE</h3>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              {/* Profile Image */}
              <div className="w-48 h-48 rounded-lg overflow-hidden border-4 border-yellow-600 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                {profile?.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <FaUser className="text-yellow-500 text-6xl" />
                  </div>
                )}
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-yellow-500 mb-4">{profile?.name || 'Unknown Pirate'}</h1>
                
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <FaCoins className="text-yellow-500 mr-2" />
                    <span className="text-white font-bold">Bounty:</span>
                    <span className="text-yellow-500 font-bold text-xl ml-2">{profile?.bounty?.toLocaleString() || 0} B</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaTrophy className="text-yellow-500 mr-2" />
                    <span className="text-white font-bold">Rank:</span>
                    <span className="text-yellow-500 ml-2">
                      {profile?.bounty >= 1000000000 ? 'Emperor' :
                       profile?.bounty >= 500000000 ? 'Yonko Commander' :
                       profile?.bounty >= 100000000 ? 'Supernova' :
                       profile?.bounty >= 50000000 ? 'Pirate Captain' :
                       profile?.bounty >= 10000000 ? 'Pirate Officer' :
                       'Rookie Pirate'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">Achievements</h3>
                  <ul className="text-white">
                    {profile?.achievements?.length > 0 ? (
                      profile.achievements.map((achievement, index) => (
                        <li key={index} className="mb-1">{achievement}</li>
                      ))
                    ) : (
                      <li>No achievements yet. Play games to earn achievements!</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bounty Poster Footer */}
          <div className="bg-yellow-700 p-4 text-center">
            <p className="text-white font-bold">ISSUED BY THE WORLD GOVERNMENT</p>
            <p className="text-sm text-white">Last Updated: {new Date(profile?.updatedAt || profile?.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;