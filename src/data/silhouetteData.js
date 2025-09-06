// Data for Classic Silhouette Guess mode - Progressive reveal system
const silhouetteData = [
  {
    id: 1,
    character: 'Monkey D. Luffy',
    silhouette: '/images/characters/luffy_silhouette.png',
    revealStages: [
      '/images/characters/luffy_stage1.png',
      '/images/characters/luffy_stage2.png',
      '/images/characters/luffy_stage3.png',
      '/images/characters/luffy_stage4.png'
    ],
    image: '/images/characters/luffy.png',
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
    silhouette: '/images/characters/zoro_silhouette.png',
    revealStages: [
      '/images/characters/zoro_stage1.png',
      '/images/characters/zoro_stage2.png',
      '/images/characters/zoro_stage3.png',
      '/images/characters/zoro_stage4.png'
    ],
    image: '/images/characters/zoro.png',
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
    silhouette: '/images/characters/nami_silhouette.png',
    revealStages: [
      '/images/characters/nami_stage1.png',
      '/images/characters/nami_stage2.png',
      '/images/characters/nami_stage3.png',
      '/images/characters/nami_stage4.png'
    ],
    image: '/images/characters/nami.png',
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
    silhouette: '/images/characters/usopp_silhouette.png',
    revealStages: [
      '/images/characters/usopp_stage1.png',
      '/images/characters/usopp_stage2.png',
      '/images/characters/usopp_stage3.png',
      '/images/characters/usopp_stage4.png'
    ],
    image: '/images/characters/usopp.png',
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
    silhouette: '/images/characters/sanji_silhouette.png',
    revealStages: [
      '/images/characters/sanji_stage1.png',
      '/images/characters/sanji_stage2.png',
      '/images/characters/sanji_stage3.png',
      '/images/characters/sanji_stage4.png'
    ],
    image: '/images/characters/sanji.png',
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
    silhouette: '/images/characters/chopper_silhouette.png',
    revealStages: [
      '/images/characters/chopper_stage1.png',
      '/images/characters/chopper_stage2.png',
      '/images/characters/chopper_stage3.png',
      '/images/characters/chopper_stage4.png'
    ],
    image: '/images/characters/chopper.png',
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
    silhouette: '/images/characters/robin_silhouette.png',
    revealStages: [
      '/images/characters/robin_stage1.png',
      '/images/characters/robin_stage2.png',
      '/images/characters/robin_stage3.png',
      '/images/characters/robin_stage4.png'
    ],
    image: '/images/characters/robin.png',
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
    silhouette: '/images/characters/franky_silhouette.png',
    revealStages: [
      '/images/characters/franky_stage1.png',
      '/images/characters/franky_stage2.png',
      '/images/characters/franky_stage3.png',
      '/images/characters/franky_stage4.png'
    ],
    image: '/images/characters/franky.png',
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
    silhouette: '/images/characters/brook_silhouette.png',
    revealStages: [
      '/images/characters/brook_stage1.png',
      '/images/characters/brook_stage2.png',
      '/images/characters/brook_stage3.png',
      '/images/characters/brook_stage4.png'
    ],
    image: '/images/characters/brook.png',
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
    silhouette: '/images/characters/jinbe_silhouette.png',
    revealStages: [
      '/images/characters/jinbe_stage1.png',
      '/images/characters/jinbe_stage2.png',
      '/images/characters/jinbe_stage3.png',
      '/images/characters/jinbe_stage4.png'
    ],
    image: '/images/characters/jinbe.png',
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
    silhouette: '/images/characters/law_silhouette.png',
    revealStages: [
      '/images/characters/law_stage1.png',
      '/images/characters/law_stage2.png',
      '/images/characters/law_stage3.png',
      '/images/characters/law_stage4.png'
    ],
    image: '/images/characters/law.png',
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
    silhouette: '/images/characters/ace_silhouette.png',
    revealStages: [
      '/images/characters/ace_stage1.png',
      '/images/characters/ace_stage2.png',
      '/images/characters/ace_stage3.png',
      '/images/characters/ace_stage4.png'
    ],
    image: '/images/characters/ace.png',
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
    silhouette: '/images/characters/hancock_silhouette.png',
    revealStages: [
      '/images/characters/hancock_stage1.png',
      '/images/characters/hancock_stage2.png',
      '/images/characters/hancock_stage3.png',
      '/images/characters/hancock_stage4.png'
    ],
    image: '/images/characters/hancock.png',
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
    silhouette: '/images/characters/mihawk_silhouette.png',
    revealStages: [
      '/images/characters/mihawk_stage1.png',
      '/images/characters/mihawk_stage2.png',
      '/images/characters/mihawk_stage3.png',
      '/images/characters/mihawk_stage4.png'
    ],
    image: '/images/characters/mihawk.png',
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
    silhouette: '/images/characters/shanks_silhouette.png',
    revealStages: [
      '/images/characters/shanks_stage1.png',
      '/images/characters/shanks_stage2.png',
      '/images/characters/shanks_stage3.png',
      '/images/characters/shanks_stage4.png'
    ],
    image: '/images/characters/shanks.png',
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
    silhouette: '/images/characters/kaido_silhouette.png',
    revealStages: [
      '/images/characters/kaido_stage1.png',
      '/images/characters/kaido_stage2.png',
      '/images/characters/kaido_stage3.png',
      '/images/characters/kaido_stage4.png'
    ],
    image: '/images/characters/kaido.png',
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
    silhouette: '/images/characters/bigmom_silhouette.png',
    revealStages: [
      '/images/characters/bigmom_stage1.png',
      '/images/characters/bigmom_stage2.png',
      '/images/characters/bigmom_stage3.png',
      '/images/characters/bigmom_stage4.png'
    ],
    image: '/images/characters/bigmom.png',
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
    silhouette: '/images/characters/blackbeard_silhouette.png',
    revealStages: [
      '/images/characters/blackbeard_stage1.png',
      '/images/characters/blackbeard_stage2.png',
      '/images/characters/blackbeard_stage3.png',
      '/images/characters/blackbeard_stage4.png'
    ],
    image: '/images/characters/blackbeard.png',
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
    silhouette: '/images/characters/garp_silhouette.png',
    revealStages: [
      '/images/characters/garp_stage1.png',
      '/images/characters/garp_stage2.png',
      '/images/characters/garp_stage3.png',
      '/images/characters/garp_stage4.png'
    ],
    image: '/images/characters/garp.png',
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
    silhouette: '/images/characters/roger_silhouette.png',
    revealStages: [
      '/images/characters/roger_stage1.png',
      '/images/characters/roger_stage2.png',
      '/images/characters/roger_stage3.png',
      '/images/characters/roger_stage4.png'
    ],
    image: '/images/characters/roger.png',
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
