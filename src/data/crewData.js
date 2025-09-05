// Data for Crew-only Guess mode
const crewData = [
  {
    id: 1,
    crew: 'Straw Hat Pirates',
    members: [
      {
        name: 'Monkey D. Luffy',
        silhouette: '/images/silhouettes/luffy_silhouette.png'
      },
      {
        name: 'Roronoa Zoro',
        silhouette: '/images/silhouettes/zoro_silhouette.png'
      },
      {
        name: 'Nami',
        silhouette: '/images/silhouettes/nami_silhouette.png'
      }
    ],
    hints: [
      'Captain aims to be Pirate King',
      'First mate uses three swords',
      'Navigator who loves money'
    ],
    difficulty: 'easy',
    points: 100
  },
  {
    id: 2,
    crew: 'Heart Pirates',
    members: [
      {
        name: 'Trafalgar D. Water Law',
        silhouette: '/images/silhouettes/law_silhouette.png'
      },
      {
        name: 'Bepo',
        silhouette: '/images/silhouettes/bepo_silhouette.png'
      },
      {
        name: 'Jean Bart',
        silhouette: '/images/silhouettes/jean_bart_silhouette.png'
      }
    ],
    hints: [
      'Captain is a former Warlord',
      'Navigator is a polar bear mink',
      'Former captain of the Nox Pirates'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 3,
    crew: 'Kid Pirates',
    members: [
      {
        name: 'Eustass Kid',
        silhouette: '/images/silhouettes/kid_silhouette.png'
      },
      {
        name: 'Killer',
        silhouette: '/images/silhouettes/killer_silhouette.png'
      },
      {
        name: 'Heat',
        silhouette: '/images/silhouettes/heat_silhouette.png'
      }
    ],
    hints: [
      'Captain has magnetic powers',
      'First mate uses spinning blades',
      'Member breathes fire'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 4,
    crew: 'Red Hair Pirates',
    members: [
      {
        name: 'Shanks',
        silhouette: '/images/silhouettes/shanks_silhouette.png'
      },
      {
        name: 'Benn Beckman',
        silhouette: '/images/silhouettes/beckman_silhouette.png'
      },
      {
        name: 'Lucky Roo',
        silhouette: '/images/silhouettes/lucky_roo_silhouette.png'
      }
    ],
    hints: [
      'Captain gave Luffy his straw hat',
      'First mate is considered the smartest in East Blue',
      'Member always eating meat'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 5,
    crew: 'Whitebeard Pirates',
    members: [
      {
        name: 'Edward Newgate (Whitebeard)',
        silhouette: '/images/silhouettes/whitebeard_silhouette.png'
      },
      {
        name: 'Marco',
        silhouette: '/images/silhouettes/marco_silhouette.png'
      },
      {
        name: 'Portgas D. Ace',
        silhouette: '/images/silhouettes/ace_silhouette.png'
      }
    ],
    hints: [
      'Captain was the strongest man in the world',
      'First division commander has phoenix powers',
      'Second division commander was Luffy\'s brother'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 6,
    crew: 'Big Mom Pirates',
    members: [
      {
        name: 'Charlotte Linlin (Big Mom)',
        silhouette: '/images/silhouettes/big_mom_silhouette.png'
      },
      {
        name: 'Charlotte Katakuri',
        silhouette: '/images/silhouettes/katakuri_silhouette.png'
      },
      {
        name: 'Charlotte Smoothie',
        silhouette: '/images/silhouettes/smoothie_silhouette.png'
      }
    ],
    hints: [
      'Captain has 85 children',
      'Son with mochi powers',
      'Daughter who can squeeze the life out of anything'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 7,
    crew: 'Beast Pirates',
    members: [
      {
        name: 'Kaido',
        silhouette: '/images/silhouettes/kaido_silhouette.png'
      },
      {
        name: 'King',
        silhouette: '/images/silhouettes/king_silhouette.png'
      },
      {
        name: 'Queen',
        silhouette: '/images/silhouettes/queen_silhouette.png'
      }
    ],
    hints: [
      'Captain can transform into a dragon',
      'All-Star who is a Lunarian',
      'All-Star who is a cyborg scientist'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 8,
    crew: 'Blackbeard Pirates',
    members: [
      {
        name: 'Marshall D. Teach (Blackbeard)',
        silhouette: '/images/silhouettes/blackbeard_silhouette.png'
      },
      {
        name: 'Jesus Burgess',
        silhouette: '/images/silhouettes/burgess_silhouette.png'
      },
      {
        name: 'Van Augur',
        silhouette: '/images/silhouettes/augur_silhouette.png'
      }
    ],
    hints: [
      'Captain has two Devil Fruits',
      'Helmsman who is a champion wrestler',
      'Sniper with exceptional eyesight'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 9,
    crew: 'Roger Pirates',
    members: [
      {
        name: 'Gol D. Roger',
        silhouette: '/images/silhouettes/roger_silhouette.png'
      },
      {
        name: 'Silvers Rayleigh',
        silhouette: '/images/silhouettes/rayleigh_silhouette.png'
      },
      {
        name: 'Scopper Gaban',
        silhouette: '/images/silhouettes/gaban_silhouette.png'
      }
    ],
    hints: [
      'Captain was the Pirate King',
      'First mate known as the Dark King',
      'Axe-wielding officer'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 10,
    crew: 'Rocks Pirates',
    members: [
      {
        name: 'Rocks D. Xebec',
        silhouette: '/images/silhouettes/rocks_silhouette.png'
      },
      {
        name: 'Charlotte Linlin (young)',
        silhouette: '/images/silhouettes/young_linlin_silhouette.png'
      },
      {
        name: 'Kaido (young)',
        silhouette: '/images/silhouettes/young_kaido_silhouette.png'
      }
    ],
    hints: [
      'Captain who challenged the World Government',
      'Future Emperor who loves sweets',
      'Future Emperor who was an apprentice'
    ],
    difficulty: 'extreme',
    points: 500
  },
  {
    id: 11,
    crew: 'Sun Pirates',
    members: [
      {
        name: 'Fisher Tiger',
        silhouette: '/images/silhouettes/tiger_silhouette.png'
      },
      {
        name: 'Jinbe',
        silhouette: '/images/silhouettes/jinbe_silhouette.png'
      },
      {
        name: 'Aladine',
        silhouette: '/images/silhouettes/aladine_silhouette.png'
      }
    ],
    hints: [
      'Captain who climbed the Red Line',
      'Former Warlord of the Sea',
      'Doctor who married a Charlotte daughter'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 12,
    crew: 'Donquixote Pirates',
    members: [
      {
        name: 'Donquixote Doflamingo',
        silhouette: '/images/silhouettes/doflamingo_silhouette.png'
      },
      {
        name: 'Vergo',
        silhouette: '/images/silhouettes/vergo_silhouette.png'
      },
      {
        name: 'Caesar Clown',
        silhouette: '/images/silhouettes/caesar_silhouette.png'
      }
    ],
    hints: [
      'Captain was a former Celestial Dragon',
      'Marine who was a double agent',
      'Scientist who created artificial Devil Fruits'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 13,
    crew: 'Revolutionary Army',
    members: [
      {
        name: 'Monkey D. Dragon',
        silhouette: '/images/silhouettes/dragon_silhouette.png'
      },
      {
        name: 'Sabo',
        silhouette: '/images/silhouettes/sabo_silhouette.png'
      },
      {
        name: 'Emporio Ivankov',
        silhouette: '/images/silhouettes/ivankov_silhouette.png'
      }
    ],
    hints: [
      'Leader is the most wanted man in the world',
      'Chief of Staff with the Flame-Flame Fruit',
      'Okama with hormone powers'
    ],
    difficulty: 'hard',
    points: 300
  },
  {
    id: 14,
    crew: 'CP9',
    members: [
      {
        name: 'Rob Lucci',
        silhouette: '/images/silhouettes/lucci_silhouette.png'
      },
      {
        name: 'Kaku',
        silhouette: '/images/silhouettes/kaku_silhouette.png'
      },
      {
        name: 'Jabra',
        silhouette: '/images/silhouettes/jabra_silhouette.png'
      }
    ],
    hints: [
      'Leader with leopard powers',
      'Agent with giraffe powers',
      'Agent with wolf powers'
    ],
    difficulty: 'medium',
    points: 200
  },
  {
    id: 15,
    crew: 'Straw Hat Grand Fleet',
    members: [
      {
        name: 'Cavendish',
        silhouette: '/images/silhouettes/cavendish_silhouette.png'
      },
      {
        name: 'Bartolomeo',
        silhouette: '/images/silhouettes/bartolomeo_silhouette.png'
      },
      {
        name: 'Sai',
        silhouette: '/images/silhouettes/sai_silhouette.png'
      }
    ],
    hints: [
      'Beautiful pirate with a split personality',
      'Fan-boy with barrier powers',
      'Leader of the Happo Navy'
    ],
    difficulty: 'hard',
    points: 300
  }
];

export default crewData;