import React from 'react';
import { motion } from 'framer-motion';

const BountyPoster = ({
  name = "Unknown Pirate",
  bounty = 0,
  profileImage = null,
  profileIcon = null,
  rank = 1,
  isDeadOrAlive = "ALIVE",
  title = "WANTED"
}) => {
  const formatBounty = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
    return amount.toString();
  };

  const getBountyTitle = (bountyAmount) => {
    if (bountyAmount >= 1000000000) return 'EMPEROR';
    if (bountyAmount >= 500000000) return 'YONKO COMMANDER';
    if (bountyAmount >= 100000000) return 'SUPERNOVA';
    if (bountyAmount >= 50000000) return 'PIRATE CAPTAIN';
    if (bountyAmount >= 10000000) return 'PIRATE OFFICER';
    return 'ROOKIE PIRATE';
  };

  return (
    <motion.div 
      className="relative w-80 h-96 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-2xl border-4 border-yellow-700"
      whileHover={{ scale: 1.02, rotate: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Weathered paper effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200 to-yellow-300 rounded-lg opacity-30"></div>
      
      {/* Wanted header */}
      <div className="relative text-center pt-4">
        <h1 className="text-4xl font-black text-red-800 tracking-wider transform -rotate-1">
          {title}
        </h1>
        <div className="text-sm font-bold text-gray-800 mt-1">
          {isDeadOrAlive}
        </div>
      </div>

      {/* Character image */}
      <div className="flex justify-center mt-4">
        <div className="w-32 h-32 bg-gray-300 border-4 border-black rounded-lg overflow-hidden shadow-lg">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : profileIcon ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              {profileIcon.svg ? (
                <div
                  className="w-20 h-20"
                  dangerouslySetInnerHTML={{ __html: profileIcon.svg }}
                />
              ) : (
                <span className="text-4xl">
                  {profileIcon.emoji}
                </span>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Character name */}
      <div className="text-center mt-4 px-4">
        <h2 className="text-xl font-black text-black leading-tight">
          {name.toUpperCase()}
        </h2>
        <div className="text-xs font-bold text-red-700 mt-1">
          {getBountyTitle(bounty)}
        </div>
      </div>

      {/* Bounty amount */}
      <div className="text-center mt-4">
        <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg transform -rotate-1">
          <div className="text-2xl font-black">
            ฿{formatBounty(bounty)}
          </div>
          <div className="text-xs">BERRIES</div>
        </div>
      </div>

      {/* Rank badge */}
      {rank <= 3 && (
        <div className="absolute top-2 right-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            rank === 1 ? 'bg-yellow-400 text-black' :
            rank === 2 ? 'bg-gray-300 text-black' :
            'bg-yellow-600 text-white'
          }`}>
            #{rank}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <div className="text-xs font-bold text-gray-700">
          MARINE HEADQUARTERS
        </div>
      </div>

      {/* Torn edges effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-8 h-4 bg-gray-900 opacity-20 transform -rotate-12"></div>
        <div className="absolute bottom-2 right-1/4 w-6 h-3 bg-gray-900 opacity-20 transform rotate-45"></div>
      </div>
    </motion.div>
  );
};

export default BountyPoster;
