export const world = {
  // ========== NEW YORK ==========
  ny_times_square: {
    id: 'ny_times_square',
    city: 'New York',
    name: 'Times Square',
    description:
      'A blinding canyon of LED billboards and noise. Tourists cluster around costumed performers. The air smells of exhaust and roasted peanuts. Streets lead in every direction.',
    exits: { north: 'ny_central_park', south: 'ny_subway', east: 'ny_alley', west: 'ny_broadway' },
    items: ['pretzel'],
    entities: ['hot_dog_vendor'],
  },
  ny_central_park: {
    id: 'ny_central_park',
    city: 'New York',
    name: 'Central Park — South Gate',
    description:
      'Trees arch overhead, muffling the city into a distant hum. A jogger passes. Squirrels watch you with unsettling intensity. The park stretches north into shadow.',
    exits: { south: 'ny_times_square', east: 'ny_speakeasy' },
    items: ['bandage'],
    entities: [],
  },
  ny_subway: {
    id: 'ny_subway',
    city: 'New York',
    name: 'Brooklyn Subway Station',
    description:
      'Fluorescent lights flicker over grimy tile. A train rumbles in the distance. The platform is mostly empty — mostly. Something skitters in the far tunnel.',
    exits: { north: 'ny_times_square', west: 'ny_airport' },
    items: ['energy_drink'],
    entities: ['subway_rat'],
  },
  ny_alley: {
    id: 'ny_alley',
    city: 'New York',
    name: 'Back Alley — East Side',
    description:
      'Dumpsters overflow with garbage. Fire escapes zigzag above. A figure lurks near the far wall, hands in pockets.',
    exits: { west: 'ny_times_square' },
    items: ['crowbar'],
    entities: ['pickpocket'],
  },
  ny_broadway: {
    id: 'ny_broadway',
    city: 'New York',
    name: 'Broadway Theater District',
    description:
      'Marquee lights spell out names of shows you\'ve never heard of. Ticket scalpers whisper prices. The sidewalk is sticky with spilled drinks.',
    exits: { east: 'ny_times_square' },
    items: ['smartphone'],
    entities: [],
  },
  ny_speakeasy: {
    id: 'ny_speakeasy',
    city: 'New York',
    name: 'Hidden Speakeasy',
    description:
      'Behind an unmarked door, jazz drifts through smoky air. The bar gleams with polished brass. A bartender nods at you from behind a wall of amber bottles.',
    exits: { west: 'ny_central_park' },
    items: ['medkit'],
    entities: [],
  },
  ny_airport: {
    id: 'ny_airport',
    city: 'New York',
    name: 'JFK International — Terminal 4',
    description:
      'The terminal hums with fluorescent efficiency. Departure boards flicker: **Istanbul**, **Ankara**, **Tokyo**, **Rome**. The world awaits.',
    exits: {
      east: 'ny_subway',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== ISTANBUL ==========
  ist_sultanahmet: {
    id: 'ist_sultanahmet',
    city: 'Istanbul',
    name: 'Sultanahmet Square',
    description:
      'The Blue Mosque rises against an orange sky. Pigeons scatter across ancient cobblestones. Call to prayer echoes between minarets. History breathes here.',
    exits: { north: 'ist_bazaar', south: 'ist_ferry', east: 'ist_alley' },
    items: ['kebab'],
    entities: [],
  },
  ist_bazaar: {
    id: 'ist_bazaar',
    city: 'Istanbul',
    name: 'Grand Bazaar',
    description:
      'A labyrinth of vaulted corridors and gleaming stalls. Silk, spices, gold, and lanterns crowd every surface. Merchants call out in a dozen languages.',
    exits: { south: 'ist_sultanahmet', west: 'ist_airport' },
    items: ['bazaar_token'],
    entities: ['carpet_merchant'],
  },
  ist_ferry: {
    id: 'ist_ferry',
    city: 'Istanbul',
    name: 'Eminönü Ferry Terminal',
    description:
      'Seagulls wheel above the Bosphorus. Ferries chug between continents. The salt air carries the smell of grilled fish from the boats below.',
    exits: { north: 'ist_sultanahmet' },
    items: ['bandage'],
    entities: [],
  },
  ist_alley: {
    id: 'ist_alley',
    city: 'Istanbul',
    name: 'Narrow Cat-Filled Street',
    description:
      'A winding cobblestone lane barely wide enough for two. Cats sit on every ledge, wall, and windowsill, watching you with ancient, judgmental eyes.',
    exits: { west: 'ist_sultanahmet' },
    items: ['lucky_cat'],
    entities: ['stray_cat_gang'],
  },
  ist_airport: {
    id: 'ist_airport',
    city: 'Istanbul',
    name: 'Istanbul Airport',
    description:
      'A gleaming modern terminal. The departure board shows flights to **New York**, **Ankara**, **Tokyo**, **Rome**.',
    exits: {
      east: 'ist_bazaar',
      fly_newyork: 'ny_times_square',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== ANKARA ==========
  ank_kizilay: {
    id: 'ank_kizilay',
    city: 'Ankara',
    name: 'Kızılay Square',
    description:
      'The heart of the capital. Concrete towers loom over crowded sidewalks. Students and bureaucrats jostle for space. A cold wind whips through the plaza.',
    exits: { north: 'ank_park', south: 'ank_underground', east: 'ank_embassy', west: 'ank_teahouse' },
    items: ['energy_drink'],
    entities: [],
  },
  ank_park: {
    id: 'ank_park',
    city: 'Ankara',
    name: 'Gençlik Park',
    description:
      'Snow dusts the benches and bare trees. A frozen pond reflects the gray sky. It\'s quiet here — almost too quiet. A drone buzzes overhead.',
    exits: { south: 'ank_kizilay' },
    items: ['bandage'],
    entities: ['rogue_drone'],
  },
  ank_underground: {
    id: 'ank_underground',
    city: 'Ankara',
    name: 'Underground Mall — Kızılay',
    description:
      'A sprawling subterranean shopping center. Fluorescent lights bounce off polished tile. Shops sell everything from phones to pistachios. Escalators hum endlessly.',
    exits: { north: 'ank_kizilay', east: 'ank_airport' },
    items: ['pocket_knife'],
    entities: [],
  },
  ank_embassy: {
    id: 'ank_embassy',
    city: 'Ankara',
    name: 'Embassy Row',
    description:
      'A wide boulevard lined with gated compounds and security cameras. Flags of nations you can\'t identify flutter in the wind. A clerk\'s office stands open.',
    exits: { west: 'ank_kizilay' },
    items: [],
    entities: ['bureaucrat'],
  },
  ank_teahouse: {
    id: 'ank_teahouse',
    city: 'Ankara',
    name: 'Traditional Tea House',
    description:
      'Warm light spills from steamed-up windows. Inside, men play backgammon and sip dark tea from tulip-shaped glasses. The samovar bubbles contentedly.',
    exits: { east: 'ank_kizilay' },
    items: ['kebab'],
    entities: ['tea_house_owner'],
  },
  ank_airport: {
    id: 'ank_airport',
    city: 'Ankara',
    name: 'Esenboğa Airport',
    description:
      'A functional, no-frills terminal. Flights depart to **New York**, **Istanbul**, **Tokyo**, **Rome**.',
    exits: {
      west: 'ank_underground',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== TOKYO ==========
  tok_shibuya: {
    id: 'tok_shibuya',
    city: 'Tokyo',
    name: 'Shibuya Crossing',
    description:
      'A sea of umbrellas under neon rain. The scramble is deafening — thousands cross in organized chaos. Giant screens flash advertisements into the wet night.',
    exits: { north: 'tok_station', east: 'tok_alley', south: 'tok_shrine' },
    items: ['broken_umbrella'],
    entities: ['salaryman'],
  },
  tok_station: {
    id: 'tok_station',
    city: 'Tokyo',
    name: 'Shinjuku Station',
    description:
      'The busiest train station on Earth. A maze of underground corridors, exits numbered into the hundreds. The crowd moves like a river. Don\'t stop.',
    exits: { south: 'tok_shibuya', west: 'tok_airport' },
    items: ['onigiri'],
    entities: [],
  },
  tok_alley: {
    id: 'tok_alley',
    city: 'Tokyo',
    name: 'Golden Gai Alley',
    description:
      'Tiny bars stacked six stories high, each seating four. Lanterns sway. A corrupt ATM sparks and whirs at the end of the lane.',
    exits: { west: 'tok_shibuya' },
    items: ['energy_drink'],
    entities: ['corrupted_atm'],
  },
  tok_shrine: {
    id: 'tok_shrine',
    city: 'Tokyo',
    name: 'Meiji Shrine',
    description:
      'A torii gate frames a gravel path into ancient forest. The city vanishes. Incense curls through camphor trees. A monk rakes patterns in the silence.',
    exits: { north: 'tok_shibuya' },
    items: ['temple_seal'],
    entities: ['shrine_keeper'],
  },
  tok_airport: {
    id: 'tok_airport',
    city: 'Tokyo',
    name: 'Narita International Airport',
    description:
      'Spotless floors, robotic announcements, vending machines selling everything. Flights to **New York**, **Istanbul**, **Ankara**, **Rome**.',
    exits: {
      east: 'tok_station',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_rome: 'rom_colosseum',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== ROME ==========
  rom_colosseum: {
    id: 'rom_colosseum',
    city: 'Rome',
    name: 'The Colosseum',
    description:
      'The ancient arena rises against a blazing sunset. Tourists swarm the perimeter, but shadows pool in the arches. Gladiators once died here. Some things linger.',
    exits: { north: 'rom_piazza', east: 'rom_catacombs', west: 'rom_trevi' },
    items: ['gold_coin'],
    entities: [],
  },
  rom_piazza: {
    id: 'rom_piazza',
    city: 'Rome',
    name: 'Piazza Navona',
    description:
      'Baroque fountains splash in a sun-drenched square. Street artists sketch caricatures. The scent of fresh pasta drifts from trattorias lining the edges.',
    exits: { south: 'rom_colosseum', east: 'rom_airport' },
    items: ['espresso'],
    entities: ['gelato_vendor', 'street_artist'],
  },
  rom_catacombs: {
    id: 'rom_catacombs',
    city: 'Rome',
    name: 'Catacombs of San Callisto',
    description:
      'Darkness swallows you whole. The air is cool and still. Bones line the walls in careful rows. Something shuffles deeper in the tunnels.',
    exits: { west: 'rom_colosseum' },
    items: ['catacomb_map'],
    entities: ['catacomb_dweller'],
  },
  rom_trevi: {
    id: 'rom_trevi',
    city: 'Rome',
    name: 'Trevi Fountain',
    description:
      'Water cascades over marble gods. Coins glint at the bottom of the pool. Legend says throw one in, and you\'ll return. The crowd is thick.',
    exits: { east: 'rom_colosseum' },
    items: ['bandage'],
    entities: [],
  },
  rom_airport: {
    id: 'rom_airport',
    city: 'Rome',
    name: 'Leonardo da Vinci Airport',
    description:
      'Chaos and espresso. The departure board shows flights to **New York**, **Istanbul**, **Ankara**, **Tokyo**.',
    exits: {
      west: 'rom_piazza',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
    },
    items: [],
    entities: [],
    isAirport: true,
  },
};
