import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pirateIcons, iconCategories, getIconsByCategory } from '../data/pirateIcons';

const IconSelector = ({ selectedIcon, onIconSelect, className = "" }) => {
  const [activeCategory, setActiveCategory] = useState('strawHats');
  const [selectedVariant, setSelectedVariant] = useState('happy');

  const handleIconSelect = (character, variantKey) => {
    const iconData = {
      characterId: character.id,
      variant: variantKey,
      name: character.name,
      category: character.category,
      emoji: character.variants[variantKey].emoji,
      svg: character.variants[variantKey].svg,
      colors: character.colors,
      description: character.variants[variantKey].description
    };
    onIconSelect(iconData);
  };

  const renderIcon = (character, variantKey, variant) => {
    const isSelected = selectedIcon?.characterId === character.id && 
                     selectedIcon?.variant === variantKey;

    return (
      <motion.div
        key={`${character.id}-${variantKey}`}
        className={`
          relative p-2 rounded-xl cursor-pointer transition-all duration-200
          border-2 hover:scale-105 group
          ${isSelected 
            ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 ring-2 ring-yellow-400/50' 
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
          }
        `}
        onClick={() => handleIconSelect(character, variantKey)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        {/* Icon Display */}
        <div className="w-16 h-16 flex items-center justify-center mb-2">
          {variant.svg ? (
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: variant.svg }}
            />
          ) : (
            <span className="text-3xl">{variant.emoji}</span>
          )}
        </div>

        {/* Character Name & Variant */}
        <div className="text-center">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {character.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {variantKey}
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <span className="text-xs font-bold text-black">✓</span>
          </motion.div>
        )}

        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {variant.description}
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`icon-selector ${className}`}>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {iconCategories.map(category => (
          <motion.button
            key={category.id}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center gap-2
              ${activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: activeCategory === category.id ? category.color : undefined
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Category Description */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {iconCategories.find(cat => cat.id === activeCategory)?.description}
        </p>
      </div>

      {/* Icons Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getIconsByCategory(activeCategory).map(character => 
            Object.entries(character.variants).map(([variantKey, variant]) =>
              renderIcon(character, variantKey, variant)
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Selected Icon Preview */}
      {selectedIcon && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              {selectedIcon.svg ? (
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
                />
              ) : (
                <span className="text-2xl">{selectedIcon.emoji}</span>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {selectedIcon.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedIcon.description}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {selectedIcon.category}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Random Selection Button */}
      <div className="mt-4 flex justify-center">
        <motion.button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          onClick={() => {
            const categoryIcons = getIconsByCategory(activeCategory);
            if (categoryIcons.length > 0) {
              const randomCharacter = categoryIcons[Math.floor(Math.random() * categoryIcons.length)];
              const variants = Object.keys(randomCharacter.variants);
              const randomVariant = variants[Math.floor(Math.random() * variants.length)];
              handleIconSelect(randomCharacter, randomVariant);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🎲</span>
          <span>Random {iconCategories.find(cat => cat.id === activeCategory)?.name}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default IconSelector;
