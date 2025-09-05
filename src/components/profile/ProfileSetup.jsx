import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import IconSelector from '../IconSelector';
import { getRandomIcon } from '../../data/pirateIcons';

const ProfileSetup = () => {
  const { currentUser, updateUserProfile, getUserProfile } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadExistingProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile?.profileIcon) {
          setSelectedIcon(profile.profileIcon);
        } else {
          setSelectedIcon(getRandomIcon());
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setSelectedIcon(getRandomIcon());
      } finally {
        setLoading(false);
      }
    };

    loadExistingProfile();
  }, [getUserProfile]);

  const handleIconSelect = (iconData) => {
    setSelectedIcon(iconData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const userData = {
        name,
        profileIcon: selectedIcon,
        updatedAt: new Date().toISOString()
      };
      
      await updateUserProfile(userData, null);
      navigate('/game-modes');
    } catch (error) {
      console.error('Profile setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-yellow-500 text-xl">Preparing your pirate avatar...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-90 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <motion.div 
          className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border-2 border-yellow-500"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">PROFILE SETUP</h2>
            <p className="text-xl text-white">Create Your Bounty Poster</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 overflow-hidden relative border-4 border-yellow-500 p-2">
                {selectedIcon ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {selectedIcon.svg ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                      />
                    ) : (
                      <span className="text-4xl">{selectedIcon.emoji}</span>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUser className="text-yellow-500 text-5xl" />
                  </div>
                )}
              </div>
              <p className="text-yellow-500 text-sm mb-4 text-center">
                {selectedIcon ? selectedIcon.name : 'Choose your pirate avatar'}
              </p>
            </div>
            
            {/* Icon Selector */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">Choose Your Pirate Avatar</h3>
              <div className="max-h-96 overflow-y-auto border border-gray-600 rounded-lg p-4 bg-gray-700">
                <IconSelector 
                  selectedIcon={selectedIcon}
                  onIconSelect={handleIconSelect}
                  className=""
                />
              </div>
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-yellow-500" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your Pirate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <motion.button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Saving Profile...' : 'Continue to Adventure'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileSetup;