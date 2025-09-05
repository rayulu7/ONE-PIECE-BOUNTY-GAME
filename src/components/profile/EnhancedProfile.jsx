import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCoins, FaTrophy, FaEdit, FaSave, FaTimes, FaCalendarDay, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import BountyPoster from '../ui/BountyPoster';
import IconSelector from '../IconSelector';
import { createStreakManager } from '../../utils/streakManager';
import { getRandomIcon } from '../../data/pirateIcons';

const EnhancedProfile = () => {
  const { currentUser, getUserProfile, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', profileIcon: null });
  const [streakData, setStreakData] = useState(null);
  const [showIconSelector, setShowIconSelector] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setProfile(userData);
        setEditData({
          name: userData?.name || '',
          profileIcon: userData?.profileIcon || getRandomIcon()
        });

        // Load streak data
        if (currentUser?.uid) {
          const streakManager = createStreakManager(currentUser.uid);
          setStreakData(streakManager.getStreakData());
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getUserProfile, currentUser]);


  const handleIconSelect = (iconData) => {
    setEditData(prev => ({ ...prev, profileIcon: iconData }));
    setShowIconSelector(false);
    toast.success('Pirate icon selected!');
  };

  const handleSave = async () => {
    if (!editData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name: editData.name.trim(),
        profileIcon: editData.profileIcon,
        updatedAt: new Date().toISOString()
      };

      const updatedProfile = await updateUserProfile(userData, null);
      setProfile(prev => ({ ...prev, ...updatedProfile, ...userData }));

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: profile?.name || '',
      profileIcon: profile?.profileIcon || getRandomIcon()
    });
    setIsEditing(false);
    setShowIconSelector(false);
  };

  const getBountyTitle = (bounty) => {
    if (bounty >= 1000000000) return { title: 'Emperor', color: 'text-purple-500' };
    if (bounty >= 500000000) return { title: 'Yonko Commander', color: 'text-red-500' };
    if (bounty >= 100000000) return { title: 'Supernova', color: 'text-blue-500' };
    if (bounty >= 50000000) return { title: 'Pirate Captain', color: 'text-green-500' };
    if (bounty >= 10000000) return { title: 'Pirate Officer', color: 'text-yellow-500' };
    return { title: 'Rookie Pirate', color: 'text-gray-500' };
  };

  const getStreakCalendar = () => {
    if (!currentUser?.uid) return [];
    const streakManager = createStreakManager(currentUser.uid);
    return streakManager.getStreakCalendar(7); // Last 7 days
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-yellow-500 text-xl">Loading your bounty profile...</p>
        </div>
      </div>
    );
  }

  const bountyInfo = getBountyTitle(profile?.bounty || 0);
  const calendar = getStreakCalendar();

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-yellow-500"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
          >
            🏴‍☠️ PIRATE PROFILE
          </motion.h1>
          
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
          >
            <FaEdit className="mr-2" />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bounty Poster */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BountyPoster
              name={profile?.name || 'Unknown Pirate'}
              bounty={profile?.bounty || 0}
              profileIcon={editData.profileIcon || profile?.profileIcon}
              rank={1} // Would be calculated from leaderboard
              title="WANTED"
              isDeadOrAlive="ALIVE"
            />
            
            {/* Edit Image/Icon Buttons */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  className="text-center mt-4 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowIconSelector(!showIconSelector)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center"
                    >
                      <FaImage className="mr-2" />
                      Choose Pirate Icon
                    </button>
                  </div>

                  {/* Pirate Icon Selector */}
                  <AnimatePresence>
                    {showIconSelector && (
                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <IconSelector
                          selectedIcon={editData.profileIcon}
                          onIconSelect={handleIconSelect}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Profile Details */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Name Section */}
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-yellow-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-yellow-500">Pirate Identity</h2>
                <AnimatePresence>
                  {isEditing && (
                    <motion.div 
                      className="flex space-x-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center"
                      >
                        <FaSave className="mr-2" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {isEditing ? (
                <motion.input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-2xl font-bold"
                  placeholder="Enter your pirate name..."
                  maxLength={30}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                />
              ) : (
                <h1 className="text-3xl font-bold text-white">{profile?.name || 'Unknown Pirate'}</h1>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bounty Stats */}
              <div className="bg-gray-800 rounded-lg p-6 border-2 border-green-500">
                <div className="flex items-center mb-4">
                  <FaCoins className="text-green-500 mr-3 text-2xl" />
                  <h3 className="text-xl font-bold text-white">Bounty Status</h3>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400 mb-2">
                    {(profile?.bounty || 0).toLocaleString()} B
                  </p>
                  <p className={`text-lg font-bold ${bountyInfo.color}`}>
                    {bountyInfo.title}
                  </p>
                </div>
              </div>

              {/* Rank Stats */}
              <div className="bg-gray-800 rounded-lg p-6 border-2 border-purple-500">
                <div className="flex items-center mb-4">
                  <FaTrophy className="text-purple-500 mr-3 text-2xl" />
                  <h3 className="text-xl font-bold text-white">Achievements</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">World Rank:</span>
                    <span className="text-white font-bold">#???</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Games Played:</span>
                    <span className="text-white font-bold">{streakData?.totalDaysPlayed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Streak:</span>
                    <span className="text-white font-bold">{streakData?.maxStreak || 0} days</span>
                  </div>
                </div>
              </div>

              {/* Current Streak */}
              <div className="bg-gray-800 rounded-lg p-6 border-2 border-red-500">
                <div className="flex items-center mb-4">
                  <FaCalendarDay className="text-red-500 mr-3 text-2xl" />
                  <h3 className="text-xl font-bold text-white">Current Streak</h3>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400 mb-2">
                    {streakData?.currentStreak || 0} 🔥
                  </p>
                  <p className="text-sm text-gray-400">
                    {streakData?.currentStreak > 0 ? 'Keep it up!' : 'Start your streak today!'}
                  </p>
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-500">
                <div className="flex items-center mb-4">
                  <FaCalendarDay className="text-blue-500 mr-3 text-2xl" />
                  <h3 className="text-xl font-bold text-white">This Week</h3>
                </div>
                <div className="flex justify-between">
                  {calendar.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        day.hasPlayed ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                      } ${day.isToday ? 'ring-2 ring-yellow-400' : ''}`}>
                        {new Date(day.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProfile;
