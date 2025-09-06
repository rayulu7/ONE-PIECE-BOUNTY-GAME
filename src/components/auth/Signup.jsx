import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate('/profile-setup');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-800 px-4 sm:px-6 md:px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Pirate-themed background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-yellow-400/20 text-6xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          🏴‍☠️
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-blue-400/20 text-4xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⚓
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 text-red-400/10 text-5xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          💰
        </motion.div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-lg px-6 sm:px-8 pt-6 pb-8 mb-4 border-2 border-yellow-500 relative overflow-hidden"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23fbbf24" fill-opacity="0.03"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")'
          }}
        >
          <div className="text-center mb-8 relative">
            <motion.h2
              className="text-4xl font-bold text-yellow-500 mb-2 font-serif tracking-wider"
              animate={{
                textShadow: ['0 0 5px rgba(251, 191, 36, 0.5)', '0 0 10px rgba(251, 191, 36, 0.8)', '0 0 5px rgba(251, 191, 36, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏴‍☠️ ONE PIECE
            </motion.h2>
            <motion.p
              className="text-xl text-white font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Join the Bounty Adventure
            </motion.p>
          </div>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-yellow-500" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-yellow-500" />
              </div>
              <input
                type="email"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-yellow-500" />
              </div>
              <input
                type="password"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-yellow-500" />
              </div>
              <input
                type="password"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div className="mb-6">
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 border-2 border-yellow-400"
                disabled={loading}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                }}
                whileTap={{ scale: 0.97 }}
                animate={loading ? {} : {
                  boxShadow: ['0 0 10px rgba(251, 191, 36, 0.3)', '0 0 20px rgba(251, 191, 36, 0.6)', '0 0 10px rgba(251, 191, 36, 0.3)']
                }}
                transition={{ duration: 2, repeat: loading ? 0 : Infinity }}
              >
                <motion.span
                  animate={loading ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                >
                  {loading ? '🏴‍☠️ Creating Account...' : '🏴‍☠️ Sign Up & Claim Your Bounty!'}
                </motion.span>
              </motion.button>
            </div>
            
            <div className="text-center text-white">
              <p>Already have an account? 
                <Link to="/login" className="text-yellow-500 hover:text-yellow-400 ml-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;