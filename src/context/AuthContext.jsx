import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { imageUploader } from '../utils/imageUploader';
import { getRandomIcon } from '../data/pirateIcons';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Check if Firestore is available
      if (!db) {
        throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
      }
      
      // Create user profile in Firestore
      const defaultIcon = getRandomIcon();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        bounty: 0,
        createdAt: new Date().toISOString(),
        profileImage: '',
        profileIcon: defaultIcon
      });
      
      // Update profile
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      toast.success('Account created successfully!');
      return userCredential.user;
    } catch (error) {
      console.error('❌ Signup error:', error);
      
      // Provide more specific error messages
      if (error.code === 'permission-denied') {
        toast.error('Permission denied. Please check Firestore security rules.');
      } else if (error.code === 'unavailable') {
        toast.error('Firestore is currently unavailable. Please try again later.');
      } else if (error.message.includes('Firestore is not initialized')) {
        toast.error('Database connection failed. Please check your internet connection.');
      } else {
        toast.error(error.message);
      }
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      return userCredential.user;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (userData, profileImage) => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      
      // If there's a new profile image
      if (profileImage) {
        // Get current profile data to delete old image
        const currentProfileDoc = await getDoc(userRef);
        const currentProfile = currentProfileDoc.data();

        // Upload new image
        const uploadResult = await imageUploader.uploadImage(profileImage, currentUser.uid);
        userData.profileImage = uploadResult.url;
        userData.profileImagePath = uploadResult.fileName;
        
        // Update auth profile
        await updateProfile(currentUser, {
          photoURL: uploadResult.url
        });
        
        // Delete old image if it exists
        if (currentProfile?.profileImagePath) {
          imageUploader.deleteImage(currentProfile.profileImagePath);
        }
      }
      
      // Update user document
      await setDoc(userRef, userData, { merge: true });
      
      toast.success('Profile updated successfully!');
      
      // Refresh user data
      const updatedUser = await getDoc(userRef);
      return updatedUser.data();
    } catch (error) {
      console.error('❌ Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  // Update user bounty
  const updateBounty = async (points) => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const newBounty = userData.bounty + points;
      
      await setDoc(userRef, { bounty: newBounty }, { merge: true });
      toast.success(`Bounty updated! +${points}`);
      
      return newBounty;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Get user profile
  const getUserProfile = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId || currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        toast.error('User profile not found');
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    user: currentUser, // Alias for easier access
    signup,
    login,
    logout,
    updateUserProfile,
    updateBounty,
    getUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};