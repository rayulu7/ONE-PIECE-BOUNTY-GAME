// Data for Classic Silhouette Guess mode - Progressive reveal system
const silhouetteData = [
  {
    id: 1,
    character: 'Monkey D. Luffy',
    silhouette: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=🏴‍☠️',
    revealStages: [
      'https://via.placeholder.com/300x300/111111/FFFFFF?text=Stage1',
      'https://via.placeholder.com/300x300/333333/FFFFFF?text=Stage2', 
      'https://via.placeholder.com/300x300/555555/FFFFFF?text=Stage3',
      'https://via.placeholder.com/300x300/777777/FFFFFF?text=Stage4'
    ],
    image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Luffy',
    hints: [
      'Captain of the Straw Hat Pirates',
      'Ate the Gomu Gomu no Mi',
      'Dreams of becoming the Pirate King'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 2,
    character: 'Roronoa Zoro',
    image: '/images/characters/zoro_silhouette.png',
    hints: [
      'Three-sword style swordsman',
      'First mate of the Straw Hat Pirates',
      'Dreams of becoming the world\'s greatest swordsman'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 3,
    character: 'Nami',
    image: '/images/characters/nami_silhouette.png',
    hints: [
      'Navigator of the Straw Hat Pirates',
      'Uses a weather-based weapon',
      'Dreams of drawing a map of the entire world'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 4,
    character: 'Usopp',
    image: '/images/characters/usopp_silhouette.png',
    hints: [
      'Sniper of the Straw Hat Pirates',
      'Known for telling tall tales',
      'Son of Yasopp'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 5,
    character: 'Sanji',
    image: '/images/characters/sanji_silhouette.png',
    hints: [
      'Cook of the Straw Hat Pirates',
      'Only fights with his legs',
      'From the Vinsmoke family'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 6,
    character: 'Tony Tony Chopper',
    image: '/images/characters/chopper_silhouette.png',
    hints: [
      'Doctor of the Straw Hat Pirates',
      'A reindeer who ate the Human-Human Fruit',
      'Can transform into different forms'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 7,
    character: 'Nico Robin',
    image: '/images/characters/robin_silhouette.png',
    hints: [
      'Archaeologist of the Straw Hat Pirates',
      'Ate the Flower-Flower Fruit',
      'Survivor of Ohara'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 8,
    character: 'Franky',
    image: '/images/characters/franky_silhouette.png',
    hints: [
      'Shipwright of the Straw Hat Pirates',
      'A cyborg with various weapons',
      'Built the Thousand Sunny'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 9,
    character: 'Brook',
    image: '/images/characters/brook_silhouette.png',
    hints: [
      'Musician of the Straw Hat Pirates',
      'A skeleton who ate the Revive-Revive Fruit',
      'Former member of the Rumbar Pirates'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 10,
    character: 'Jinbe',
    image: '/images/characters/jinbe_silhouette.png',
    hints: [
      'Helmsman of the Straw Hat Pirates',
      'Former Warlord of the Sea',
      'A whale shark fishman'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 11,
    character: 'Trafalgar D. Water Law',
    image: '/images/characters/law_silhouette.png',
    hints: [
      'Captain of the Heart Pirates',
      'Ate the Op-Op Fruit',
      'Former Warlord of the Sea'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 12,
    character: 'Portgas D. Ace',
    image: '/images/characters/ace_silhouette.png',
    hints: [
      'Luffy\'s sworn brother',
      'Ate the Flame-Flame Fruit',
      'Son of Gol D. Roger'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 13,
    character: 'Boa Hancock',
    image: '/images/characters/hancock_silhouette.png',
    hints: [
      'Empress of Amazon Lily',
      'Former Warlord of the Sea',
      'Ate the Love-Love Fruit'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 14,
    character: 'Dracule Mihawk',
    image: '/images/characters/mihawk_silhouette.png',
    hints: [
      'World\'s Greatest Swordsman',
      'Former Warlord of the Sea',
      'Wields the Black Blade Yoru'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 15,
    character: 'Shanks',
    image: '/images/characters/shanks_silhouette.png',
    hints: [
      'One of the Four Emperors',
      'Captain of the Red Hair Pirates',
      'Gave Luffy his straw hat'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 16,
    character: 'Kaido',
    image: '/images/characters/kaido_silhouette.png',
    hints: [
      'One of the Four Emperors',
      'Captain of the Beast Pirates',
      'Known as the Strongest Creature'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 17,
    character: 'Charlotte Linlin (Big Mom)',
    image: '/images/characters/bigmom_silhouette.png',
    hints: [
      'One of the Four Emperors',
      'Captain of the Big Mom Pirates',
      'Has 85 children'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 18,
    character: 'Marshall D. Teach (Blackbeard)',
    image: '/images/characters/blackbeard_silhouette.png',
    hints: [
      'One of the Four Emperors',
      'Captain of the Blackbeard Pirates',
      'Has two Devil Fruit powers'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 19,
    character: 'Monkey D. Garp',
    image: '/images/characters/garp_silhouette.png',
    hints: [
      'Marine Vice Admiral',
      'Known as "Garp the Fist"',
      'Luffy\'s grandfather'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 20,
    character: 'Gol D. Roger',
    image: '/images/characters/roger_silhouette.png',
    hints: [
      'The Pirate King',
      'Captain of the Roger Pirates',
      'Found the One Piece'
    ],
    difficulty: 'extreme',
    points: 500
  }
];

export default silhouetteData;