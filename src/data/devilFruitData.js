// Data for Distorted Devil Fruit Mode - Enhanced with crew bonuses
const devilFruitData = [
  {
    id: 1,
    character: 'Monkey D. Luffy',
    devilFruit: 'Gomu Gomu no Mi (Gum-Gum Fruit)',
    image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Gomu+Gomu',
    distortedImage: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Distorted+Rubber',
    crew: 'Straw Hat Pirates',
    hints: [
      'Rubber properties',
      'Allows the user to stretch their body',
      'Awakened as the "Hito Hito no Mi, Model: Nika"'
    ],
    difficulty: 'easy',
    points: {
      character: 100,
      crew: 50
    }
  },
  {
    id: 2,
    character: 'Tony Tony Chopper',
    devilFruit: 'Hito Hito no Mi (Human-Human Fruit)',
    image: '/images/devil-fruits/hito_hito.png',
    distortedImage: '/images/devil-fruits/hito_hito_distorted.png',
    crew: 'Straw Hat Pirates',
    hints: [
      'Grants human intelligence and abilities to an animal',
      'Allows transformation between human and animal forms',
      'User can develop "Rumble Ball" to enhance abilities'
    ],
    difficulty: 'easy',
    points: {
      character: 100,
      crew: 50
    }
  },
  {
    id: 3,
    character: 'Brook',
    devilFruit: 'Yomi Yomi no Mi (Revive-Revive Fruit)',
    image: '/images/devil-fruits/yomi_yomi.png',
    distortedImage: '/images/devil-fruits/yomi_yomi_distorted.png',
    crew: 'Straw Hat Pirates',
    hints: [
      'Grants a second life after death',
      'User returned as a skeleton',
      'Allows soul manipulation'
    ],
    difficulty: 'medium',
    points: {
      character: 200,
      crew: 50
    }
  },
  {
    id: 4,
    character: 'Nico Robin',
    devilFruit: 'Hana Hana no Mi (Flower-Flower Fruit)',
    image: '/images/devil-fruits/hana_hana.png',
    distortedImage: '/images/devil-fruits/hana_hana_distorted.png',
    crew: 'Straw Hat Pirates',
    hints: [
      'Allows user to replicate body parts',
      'Can sprout limbs from any surface',
      'Useful for espionage and restraining enemies'
    ],
    difficulty: 'medium',
    points: {
      character: 200,
      crew: 50
    }
  },
  {
    id: 5,
    character: 'Trafalgar D. Water Law',
    devilFruit: 'Ope Ope no Mi (Op-Op Fruit)',
    image: '/images/devil-fruits/ope_ope.png',
    distortedImage: '/images/devil-fruits/ope_ope_distorted.png',
    crew: 'Heart Pirates',
    hints: [
      'Creates a spherical territory where the user has complete control',
      'Allows for surgical precision and body manipulation',
      'Known as the "Ultimate Devil Fruit" for its immortality operation'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 6,
    character: 'Portgas D. Ace',
    devilFruit: 'Mera Mera no Mi (Flame-Flame Fruit)',
    image: '/images/devil-fruits/mera_mera.png',
    distortedImage: '/images/devil-fruits/mera_mera_distorted.png',
    crew: 'Whitebeard Pirates',
    hints: [
      'Transforms the user into fire',
      'Allows control over flames',
      'Currently possessed by Sabo'
    ],
    difficulty: 'medium',
    points: {
      character: 200,
      crew: 100
    }
  },
  {
    id: 7,
    character: 'Marshall D. Teach (Blackbeard)',
    devilFruit: 'Yami Yami no Mi (Dark-Dark Fruit)',
    image: '/images/devil-fruits/yami_yami.png',
    distortedImage: '/images/devil-fruits/yami_yami_distorted.png',
    crew: 'Blackbeard Pirates',
    hints: [
      'Creates and controls darkness',
      'Can nullify other Devil Fruit powers',
      'Allows user to absorb things into darkness'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 8,
    character: 'Eustass Kid',
    devilFruit: 'Jiki Jiki no Mi (Magnet-Magnet Fruit)',
    image: '/images/devil-fruits/jiki_jiki.png',
    distortedImage: '/images/devil-fruits/jiki_jiki_distorted.png',
    crew: 'Kid Pirates',
    hints: [
      'Grants magnetic abilities',
      'Can attract and repel metallic objects',
      'Allows creation of powerful metal constructs'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 9,
    character: 'Charlotte Katakuri',
    devilFruit: 'Mochi Mochi no Mi (Mochi-Mochi Fruit)',
    image: '/images/devil-fruits/mochi_mochi.png',
    distortedImage: '/images/devil-fruits/mochi_mochi_distorted.png',
    crew: 'Big Mom Pirates',
    hints: [
      'Transforms user into and controls mochi (sticky rice cake)',
      'Special Paramecia type',
      'Allows for future sight when combined with advanced Observation Haki'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 10,
    character: 'Donquixote Doflamingo',
    devilFruit: 'Ito Ito no Mi (String-String Fruit)',
    image: '/images/devil-fruits/ito_ito.png',
    distortedImage: '/images/devil-fruits/ito_ito_distorted.png',
    crew: 'Donquixote Pirates',
    hints: [
      'Creates and manipulates strings',
      'Can control people like puppets',
      'Allows flight and powerful cutting attacks'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 11,
    character: 'Crocodile',
    devilFruit: 'Suna Suna no Mi (Sand-Sand Fruit)',
    image: '/images/devil-fruits/suna_suna.png',
    distortedImage: '/images/devil-fruits/suna_suna_distorted.png',
    crew: 'Baroque Works',
    hints: [
      'Transforms user into and controls sand',
      'Allows dehydration of anything touched',
      'Weakness is liquid, which solidifies the sand'
    ],
    difficulty: 'medium',
    points: {
      character: 200,
      crew: 100
    }
  },
  {
    id: 12,
    character: 'Marco',
    devilFruit: 'Tori Tori no Mi, Model: Phoenix (Bird-Bird Fruit, Phoenix Model)',
    image: '/images/devil-fruits/tori_tori_phoenix.png',
    distortedImage: '/images/devil-fruits/tori_tori_phoenix_distorted.png',
    crew: 'Whitebeard Pirates',
    hints: [
      'Mythical Zoan type',
      'Transforms user into a phoenix',
      'Grants regenerative healing flames'
    ],
    difficulty: 'hard',
    points: {
      character: 300,
      crew: 150
    }
  },
  {
    id: 13,
    character: 'Kaido',
    devilFruit: 'Uo Uo no Mi, Model: Seiryu (Fish-Fish Fruit, Azure Dragon Model)',
    image: '/images/devil-fruits/uo_uo_seiryu.png',
    distortedImage: '/images/devil-fruits/uo_uo_seiryu_distorted.png',
    crew: 'Beast Pirates',
    hints: [
      'Mythical Zoan type',
      'Transforms user into an eastern dragon',
      'Grants ability to create flame clouds for flight'
    ],
    difficulty: 'extreme',
    points: {
      character: 500,
      crew: 250
    }
  },
  {
    id: 14,
    character: 'Charlotte Linlin (Big Mom)',
    devilFruit: 'Soru Soru no Mi (Soul-Soul Fruit)',
    image: '/images/devil-fruits/soru_soru.png',
    distortedImage: '/images/devil-fruits/soru_soru_distorted.png',
    crew: 'Big Mom Pirates',
    hints: [
      'Manipulates souls',
      'Can create sentient homies by infusing objects with souls',
      'Allows lifespan extraction from fearful victims'
    ],
    difficulty: 'extreme',
    points: {
      character: 500,
      crew: 250
    }
  },
  {
    id: 15,
    character: 'Kozuki Momonosuke',
    devilFruit: 'Artificial Dragon Devil Fruit (created by Vegapunk)',
    image: '/images/devil-fruits/artificial_dragon.png',
    distortedImage: '/images/devil-fruits/artificial_dragon_distorted.png',
    crew: 'None',
    hints: [
      'Artificial Zoan type',
      'Transforms user into a pink eastern dragon',
      'Created as an imperfect replica of Kaido\'s fruit'
    ],
    difficulty: 'extreme',
    points: {
      character: 500,
      crew: 0
    }
  }
];

export default devilFruitData;