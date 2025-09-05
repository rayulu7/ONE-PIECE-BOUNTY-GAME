// One Piece Pirate Icons Data - Character Avatars and Expressions
export const pirateIcons = {
  // Straw Hat Pirates
  strawHats: {
    luffy: {
      id: 'luffy',
      name: 'Monkey D. Luffy',
      category: 'Straw Hat Pirates',
      variants: {
        happy: {
          emoji: '😄',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFB366"/>
            <circle cx="40" cy="40" r="3" fill="#000"/>
            <circle cx="60" cy="40" r="3" fill="#000"/>
            <path d="M35 60 Q50 75 65 60" stroke="#000" stroke-width="3" fill="none"/>
            <rect x="20" y="15" width="60" height="8" rx="4" fill="#FF0000"/>
          </svg>`,
          description: 'Happy Luffy with straw hat'
        },
        determined: {
          emoji: '😤',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFB366"/>
            <rect x="38" y="35" width="6" height="8" fill="#000"/>
            <rect x="56" y="35" width="6" height="8" fill="#000"/>
            <rect x="45" y="55" width="10" height="4" fill="#000"/>
            <rect x="20" y="15" width="60" height="8" rx="4" fill="#FF0000"/>
          </svg>`,
          description: 'Determined Luffy ready to fight'
        },
        laughing: {
          emoji: '🤣',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFB366"/>
            <path d="M38 35 Q42 32 46 35" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M54 35 Q58 32 62 35" stroke="#000" stroke-width="2" fill="none"/>
            <ellipse cx="50" cy="55" rx="12" ry="8" fill="#000"/>
            <rect x="20" y="15" width="60" height="8" rx="4" fill="#FF0000"/>
          </svg>`,
          description: 'Laughing Luffy'
        }
      },
      colors: {
        primary: '#FF0000',
        secondary: '#FFB366',
        accent: '#FFFF00'
      }
    },
    zoro: {
      id: 'zoro',
      name: 'Roronoa Zoro',
      category: 'Straw Hat Pirates',
      variants: {
        serious: {
          emoji: '😠',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#F4C2A1"/>
            <circle cx="40" cy="40" r="3" fill="#000"/>
            <circle cx="60" cy="40" r="3" fill="#000"/>
            <rect x="45" y="55" width="10" height="3" fill="#000"/>
            <rect x="25" y="25" width="50" height="15" rx="7" fill="#00AA00"/>
          </svg>`,
          description: 'Serious Zoro with green bandana'
        },
        sleeping: {
          emoji: '😴',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#F4C2A1"/>
            <path d="M35 40 Q45 35 55 40" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M35 45 Q45 40 55 45" stroke="#000" stroke-width="2" fill="none"/>
            <rect x="45" y="55" width="10" height="3" fill="#000"/>
            <rect x="25" y="25" width="50" height="15" rx="7" fill="#00AA00"/>
          </svg>`,
          description: 'Sleeping Zoro'
        },
        battle: {
          emoji: '⚔️',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#F4C2A1"/>
            <rect x="38" y="35" width="6" height="8" fill="#000"/>
            <rect x="56" y="35" width="6" height="8" fill="#000"/>
            <path d="M35 55 L65 55" stroke="#000" stroke-width="4"/>
            <rect x="25" y="25" width="50" height="15" rx="7" fill="#00AA00"/>
            <rect x="15" y="70" width="20" height="3" fill="#C0C0C0"/>
            <rect x="65" y="70" width="20" height="3" fill="#C0C0C0"/>
          </svg>`,
          description: 'Battle-ready Zoro with swords'
        }
      },
      colors: {
        primary: '#00AA00',
        secondary: '#F4C2A1',
        accent: '#C0C0C0'
      }
    },
    nami: {
      id: 'nami',
      name: 'Nami',
      category: 'Straw Hat Pirates',
      variants: {
        happy: {
          emoji: '😊',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDBAC"/>
            <circle cx="40" cy="40" r="3" fill="#000"/>
            <circle cx="60" cy="40" r="3" fill="#000"/>
            <path d="M35 60 Q50 70 65 60" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M30 20 Q50 10 70 20 Q60 35 50 30 Q40 35 30 20" fill="#FFA500"/>
          </svg>`,
          description: 'Happy Nami with orange hair'
        },
        money: {
          emoji: '🤑',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDBAC"/>
            <text x="40" y="45" font-size="12" fill="#00AA00">$</text>
            <text x="60" y="45" font-size="12" fill="#00AA00">$</text>
            <ellipse cx="50" cy="60" rx="8" ry="4" fill="#000"/>
            <path d="M30 20 Q50 10 70 20 Q60 35 50 30 Q40 35 30 20" fill="#FFA500"/>
          </svg>`,
          description: 'Money-loving Nami'
        },
        navigator: {
          emoji: '🧭',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDBAC"/>
            <circle cx="40" cy="40" r="3" fill="#000"/>
            <circle cx="60" cy="40" r="3" fill="#000"/>
            <path d="M40 60 Q50 65 60 60" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M30 20 Q50 10 70 20 Q60 35 50 30 Q40 35 30 20" fill="#FFA500"/>
            <circle cx="50" cy="75" r="8" fill="#DDD" stroke="#000" stroke-width="2"/>
            <path d="M50 70 L50 80 M45 75 L55 75" stroke="#000" stroke-width="1"/>
          </svg>`,
          description: 'Navigator Nami with compass'
        }
      },
      colors: {
        primary: '#FFA500',
        secondary: '#FFDBAC',
        accent: '#00AA00'
      }
    }
  },
  
  // Emperors/Yonko
  emperors: {
    kaido: {
      id: 'kaido',
      name: 'Kaido',
      category: 'Four Emperors',
      variants: {
        dragon: {
          emoji: '🐉',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#4169E1"/>
            <rect x="38" y="35" width="6" height="8" fill="#FF0000"/>
            <rect x="56" y="35" width="6" height="8" fill="#FF0000"/>
            <rect x="40" y="55" width="20" height="6" fill="#000"/>
            <path d="M20 30 Q30 20 40 25 M60 25 Q70 20 80 30" stroke="#000" stroke-width="3"/>
          </svg>`,
          description: 'Dragon form Kaido'
        },
        angry: {
          emoji: '😡',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#8B4513"/>
            <path d="M35 30 L45 40 M55 40 L65 30" stroke="#000" stroke-width="3"/>
            <rect x="38" y="40" width="6" height="6" fill="#FF0000"/>
            <rect x="56" y="40" width="6" height="6" fill="#FF0000"/>
            <rect x="35" y="60" width="30" height="8" fill="#000"/>
          </svg>`,
          description: 'Angry Kaido'
        }
      },
      colors: {
        primary: '#4169E1',
        secondary: '#8B4513',
        accent: '#FF0000'
      }
    },
    bigmom: {
      id: 'bigmom',
      name: 'Charlotte Linlin (Big Mom)',
      category: 'Four Emperors',
      variants: {
        hungry: {
          emoji: '🍰',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFB6C1"/>
            <circle cx="35" cy="40" r="4" fill="#000"/>
            <circle cx="65" cy="40" r="4" fill="#000"/>
            <ellipse cx="50" cy="60" rx="15" ry="10" fill="#000"/>
            <rect x="30" y="15" width="40" height="20" rx="10" fill="#FF69B4"/>
          </svg>`,
          description: 'Hungry Big Mom'
        },
        rage: {
          emoji: '👹',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#DC143C"/>
            <circle cx="35" cy="35" r="5" fill="#FF0000"/>
            <circle cx="65" cy="35" r="5" fill="#FF0000"/>
            <ellipse cx="50" cy="65" rx="20" ry="15" fill="#000"/>
            <rect x="30" y="10" width="40" height="25" rx="15" fill="#FF69B4"/>
          </svg>`,
          description: 'Enraged Big Mom'
        }
      },
      colors: {
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        accent: '#DC143C'
      }
    }
  },
  
  // Villains
  villains: {
    blackbeard: {
      id: 'blackbeard',
      name: 'Marshall D. Teach',
      category: 'Villains',
      variants: {
        evil: {
          emoji: '💀',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#2F4F4F"/>
            <circle cx="40" cy="40" r="3" fill="#FF0000"/>
            <circle cx="60" cy="40" r="3" fill="#FF0000"/>
            <path d="M35 65 Q50 75 65 65" stroke="#FFF" stroke-width="3" fill="none"/>
            <rect x="25" y="20" width="50" height="15" rx="7" fill="#000"/>
          </svg>`,
          description: 'Evil Blackbeard'
        },
        laughing: {
          emoji: '😈',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#2F4F4F"/>
            <path d="M35 35 Q40 30 45 35 M55 35 Q60 30 65 35" stroke="#000" stroke-width="2" fill="none"/>
            <ellipse cx="50" cy="60" rx="12" ry="8" fill="#000"/>
            <rect x="25" y="20" width="50" height="15" rx="7" fill="#000"/>
          </svg>`,
          description: 'Laughing Blackbeard'
        }
      },
      colors: {
        primary: '#000000',
        secondary: '#2F4F4F',
        accent: '#FF0000'
      }
    },
    doflamingo: {
      id: 'doflamingo',
      name: 'Donquixote Doflamingo',
      category: 'Villains',
      variants: {
        smirk: {
          emoji: '😏',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDBAC"/>
            <rect x="25" y="35" width="50" height="8" rx="4" fill="#FF1493"/>
            <path d="M35 60 Q45 65 55 60" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M30 25 Q50 15 70 25 Q60 35 50 30 Q40 35 30 25" fill="#FFD700"/>
          </svg>`,
          description: 'Smirking Doflamingo with sunglasses'
        },
        evil: {
          emoji: '👹',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FFDBAC"/>
            <rect x="25" y="35" width="50" height="8" rx="4" fill="#FF1493"/>
            <path d="M30 55 Q50 70 70 55" stroke="#000" stroke-width="3" fill="none"/>
            <path d="M30 25 Q50 15 70 25 Q60 35 50 30 Q40 35 30 25" fill="#FFD700"/>
            <path d="M20 15 L30 25 M70 25 L80 15" stroke="#FF0000" stroke-width="2"/>
          </svg>`,
          description: 'Evil Doflamingo with strings'
        }
      },
      colors: {
        primary: '#FF1493',
        secondary: '#FFDBAC',
        accent: '#FFD700'
      }
    }
  },
  
  // Marines
  marines: {
    akainu: {
      id: 'akainu',
      name: 'Sakazuki (Akainu)',
      category: 'Marines',
      variants: {
        serious: {
          emoji: '🌋',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#D2691E"/>
            <rect x="38" y="35" width="6" height="8" fill="#000"/>
            <rect x="56" y="35" width="6" height="8" fill="#000"/>
            <rect x="40" y="55" width="20" height="6" fill="#000"/>
            <rect x="30" y="20" width="40" height="12" rx="6" fill="#FFFFFF"/>
            <text x="50" y="30" text-anchor="middle" font-size="8" fill="#000">海</text>
          </svg>`,
          description: 'Serious Admiral Akainu'
        },
        magma: {
          emoji: '🔥',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#FF4500"/>
            <rect x="38" y="35" width="6" height="8" fill="#000"/>
            <rect x="56" y="35" width="6" height="8" fill="#000"/>
            <rect x="40" y="55" width="20" height="6" fill="#000"/>
            <rect x="30" y="20" width="40" height="12" rx="6" fill="#FFFFFF"/>
            <circle cx="30" cy="70" r="3" fill="#FF0000"/>
            <circle cx="70" cy="70" r="3" fill="#FF0000"/>
          </svg>`,
          description: 'Magma-powered Akainu'
        }
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#D2691E',
        accent: '#FF4500'
      }
    }
  },
  
  // Mystical/Special
  special: {
    dragon: {
      id: 'dragon',
      name: 'Monkey D. Dragon',
      category: 'Revolutionary Army',
      variants: {
        mysterious: {
          emoji: '🌪️',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#228B22"/>
            <rect x="38" y="35" width="6" height="8" fill="#000"/>
            <rect x="56" y="35" width="6" height="8" fill="#000"/>
            <rect x="40" y="55" width="20" height="4" fill="#000"/>
            <path d="M30 25 Q50 15 70 25 Q60 35 50 30 Q40 35 30 25" fill="#000"/>
            <path d="M20 60 Q30 55 40 60 M60 60 Q70 55 80 60" stroke="#00FFFF" stroke-width="2"/>
          </svg>`,
          description: 'Mysterious Dragon with wind powers'
        }
      },
      colors: {
        primary: '#228B22',
        secondary: '#000000',
        accent: '#00FFFF'
      }
    },
    roger: {
      id: 'roger',
      name: 'Gol D. Roger',
      category: 'Pirate King',
      variants: {
        legendary: {
          emoji: '👑',
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#DAA520"/>
            <circle cx="40" cy="40" r="3" fill="#000"/>
            <circle cx="60" cy="40" r="3" fill="#000"/>
            <path d="M30 60 Q50 75 70 60" stroke="#000" stroke-width="3" fill="none"/>
            <path d="M30 20 Q50 10 70 20 Q60 30 50 25 Q40 30 30 20" fill="#8B4513"/>
            <polygon points="50,15 45,5 55,5" fill="#FFD700"/>
          </svg>`,
          description: 'Legendary Pirate King Roger'
        }
      },
      colors: {
        primary: '#DAA520',
        secondary: '#8B4513',
        accent: '#FFD700'
      }
    }
  }
};

// Icon categories for easy access
export const iconCategories = [
  {
    id: 'strawHats',
    name: 'Straw Hat Pirates',
    description: 'The main crew protagonists',
    color: '#FF0000',
    icon: '🏴‍☠️'
  },
  {
    id: 'emperors',
    name: 'Four Emperors',
    description: 'The most powerful pirates',
    color: '#8B0000',
    icon: '👑'
  },
  {
    id: 'villains',
    name: 'Villains & Antagonists',
    description: 'The notorious pirates and enemies',
    color: '#4B0082',
    icon: '💀'
  },
  {
    id: 'marines',
    name: 'Marines & Government',
    description: 'The World Government forces',
    color: '#000080',
    icon: '⚓'
  },
  {
    id: 'special',
    name: 'Legendary Figures',
    description: 'Historic and mysterious characters',
    color: '#DAA520',
    icon: '✨'
  }
];

// Helper functions
export const getAllIcons = () => {
  const allIcons = [];
  Object.values(pirateIcons).forEach(category => {
    Object.values(category).forEach(character => {
      allIcons.push(character);
    });
  });
  return allIcons;
};

export const getIconById = (iconId) => {
  for (const category of Object.values(pirateIcons)) {
    for (const character of Object.values(category)) {
      if (character.id === iconId) {
        return character;
      }
    }
  }
  return null;
};

export const getRandomIcon = () => {
  const allIcons = getAllIcons();
  return allIcons[Math.floor(Math.random() * allIcons.length)];
};

export const getIconsByCategory = (categoryId) => {
  return Object.values(pirateIcons[categoryId] || {});
};
