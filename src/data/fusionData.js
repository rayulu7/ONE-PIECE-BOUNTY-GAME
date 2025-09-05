// Data for Fusion/Glitch mode
const fusionData = [
  {
    id: 1,
    fusion: {
      character1: 'Monkey D. Luffy',
      character2: 'Roronoa Zoro',
      features1: 'Straw hat and stretching ability',
      features2: 'Three swords and green hair',
      image: '/images/fusions/luffy_zoro.png'
    },
    hints: [
      'Captain and first mate',
      'Rubber and steel',
      'East Blue origins'
    ],
    difficulty: 'easy',
    points: 200
  },
  {
    id: 2,
    fusion: {
      character1: 'Sanji',
      character2: 'Usopp',
      features1: 'Curly eyebrow and suit',
      features2: 'Long nose and slingshot',
      image: '/images/fusions/sanji_usopp.png'
    },
    hints: [
      'Cook and sniper',
      'Leg fighter and marksman',
      'Both joined in East Blue'
    ],
    difficulty: 'medium',
    points: 400
  },
  {
    id: 3,
    fusion: {
      character1: 'Nami',
      character2: 'Nico Robin',
      features1: 'Orange hair and Clima-Tact',
      features2: 'Black hair and multiple arms',
      image: '/images/fusions/nami_robin.png'
    },
    hints: [
      'Navigator and archaeologist',
      'Weather and history',
      'Female crewmates'
    ],
    difficulty: 'medium',
    points: 400
  },
  {
    id: 4,
    fusion: {
      character1: 'Tony Tony Chopper',
      character2: 'Brook',
      features1: 'Blue nose and antlers',
      features2: 'Afro and skeleton',
      image: '/images/fusions/chopper_brook.png'
    },
    hints: [
      'Doctor and musician',
      'Animal and undead',
      'Cute and scary'
    ],
    difficulty: 'medium',
    points: 400
  },
  {
    id: 5,
    fusion: {
      character1: 'Franky',
      character2: 'Jinbe',
      features1: 'Robotic arms and blue hair',
      features2: 'Fish-man features and kimono',
      image: '/images/fusions/franky_jinbe.png'
    },
    hints: [
      'Shipwright and helmsman',
      'Cyborg and fish-man',
      'Both joined after major arcs'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 6,
    fusion: {
      character1: 'Trafalgar D. Water Law',
      character2: 'Eustass Kid',
      features1: 'Spotted hat and nodachi',
      features2: 'Red hair and mechanical arm',
      image: '/images/fusions/law_kid.png'
    },
    hints: [
      'Worst Generation captains',
      'Surgeon and mechanic',
      'Both fought a Yonko'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 7,
    fusion: {
      character1: 'Portgas D. Ace',
      character2: 'Sabo',
      features1: 'Fire powers and beaded necklace',
      features2: 'Pipe weapon and top hat',
      image: '/images/fusions/ace_sabo.png'
    },
    hints: [
      'Luffy\'s brothers',
      'Fire abilities',
      'One died, one survived'
    ],
    difficulty: 'medium',
    points: 400
  },
  {
    id: 8,
    fusion: {
      character1: 'Kaido',
      character2: 'Charlotte Linlin (Big Mom)',
      features1: 'Horns and dragon scales',
      features2: 'Pink hair and hunger cravings',
      image: '/images/fusions/kaido_bigmom.png'
    },
    hints: [
      'Two Emperors',
      'Former Rocks Pirates',
      'Alliance in Wano'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 9,
    fusion: {
      character1: 'Shanks',
      character2: 'Dracule Mihawk',
      features1: 'Red hair and three scars',
      features2: 'Hawk eyes and black blade',
      image: '/images/fusions/shanks_mihawk.png'
    },
    hints: [
      'Former rivals',
      'Emperor and Warlord',
      'One-armed and swordsman'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 10,
    fusion: {
      character1: 'Monkey D. Garp',
      character2: 'Silvers Rayleigh',
      features1: 'Marine uniform and fist scar',
      features2: 'Round glasses and white hair',
      image: '/images/fusions/garp_rayleigh.png'
    },
    hints: [
      'Legendary old men',
      'Marine hero and Pirate King\'s right hand',
      'Both trained Luffy'
    ],
    difficulty: 'extreme',
    points: 1000
  },
  {
    id: 11,
    fusion: {
      character1: 'Donquixote Doflamingo',
      character2: 'Crocodile',
      features1: 'Pink feather coat and sunglasses',
      features2: 'Hook hand and scar',
      image: '/images/fusions/doflamingo_crocodile.png'
    },
    hints: [
      'Former Warlords',
      'Underground leaders',
      'Both defeated by Luffy'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 12,
    fusion: {
      character1: 'Boa Hancock',
      character2: 'Perona',
      features1: 'Snake motifs and long black hair',
      features2: 'Gothic style and ghosts',
      image: '/images/fusions/hancock_perona.png'
    },
    hints: [
      'Female characters with unique powers',
      'One turns to stone, one to negativity',
      'Both have connections to Warlords'
    ],
    difficulty: 'extreme',
    points: 1000
  },
  {
    id: 13,
    fusion: {
      character1: 'Vinsmoke Sanji',
      character2: 'Charlotte Pudding',
      features1: 'Curly eyebrow and black suit',
      features2: 'Third eye and chocolate theme',
      image: '/images/fusions/sanji_pudding.png'
    },
    hints: [
      'Almost married',
      'Both are cooks',
      'Whole Cake Island arc'
    ],
    difficulty: 'hard',
    points: 600
  },
  {
    id: 14,
    fusion: {
      character1: 'Kozuki Oden',
      character2: 'Yamato',
      features1: 'Dual swords and headband',
      features2: 'Horns and side ponytail',
      image: '/images/fusions/oden_yamato.png'
    },
    hints: [
      'Wano connection',
      'One is real, one identifies as',
      'Both have connections to logbooks'
    ],
    difficulty: 'extreme',
    points: 1000
  },
  {
    id: 15,
    fusion: {
      character1: 'Gol D. Roger',
      character2: 'Monkey D. Luffy',
      features1: 'Mustache and captain\'s coat',
      features2: 'Straw hat and scar under eye',
      image: '/images/fusions/roger_luffy.png'
    },
    hints: [
      'Past and future Pirate Kings',
      'D. clan members',
      'Same dream'
    ],
    difficulty: 'medium',
    points: 400
  }
];

export default fusionData;