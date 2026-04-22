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
    randomEvents: [
      { text: 'A tourist hands you a $5 bill thinking you\'re a performer. You don\'t correct them.', currency: 5 },
      { text: 'Someone drops their wallet. You call after them. They\'re already gone. You pocket $8.', currency: 8 },
      { text: 'A pigeon lands on your head. You are now a local landmark.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You find a crumpled $10 bill half-buried in the leaves.', currency: 10 },
      { text: 'A squirrel gives you a meaningful look and leaves. You feel judged.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'The delayed train finally arrives. You ride it for free. +5 morale, no currency.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You find a $20 wedged between two dumpsters. The smell is worth it.', currency: 20 },
    ],
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
    randomEvents: [
      { text: 'An usher mistakes you for a reviewer and hands you a complimentary programme. +$5 resale value.', currency: 5 },
    ],
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
    randomEvents: [
      { text: 'Someone at the bar buys you a drink. You don\'t ask their name. They don\'t ask yours.', currency: 0 },
    ],
  },
  ny_airport: {
    id: 'ny_airport',
    city: 'New York',
    name: 'JFK International — Terminal 4',
    description:
      'The terminal hums with fluorescent efficiency. Departure boards flicker: **Istanbul**, **Ankara**, **Tokyo**, **Rome**, **London**, **Paris**. The world awaits.',
    exits: {
      east: 'ny_subway',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
      fly_london: 'lon_tower_bridge',
      fly_paris: 'par_eiffel',
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
    randomEvents: [
      { text: 'A street photographer catches you in the perfect shot. He gives you a print. You sell it for $8.', currency: 8 },
      { text: 'The call to prayer begins. Everything goes still for a moment. Even you.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You successfully haggle a merchant down to half price on nothing in particular. He seems proud of you anyway.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'A fisherman presses a fresh mackerel sandwich into your hands. You don\'t argue. (+12 HP feeling, no mechanic).', currency: 0 },
      { text: 'You find $12 worth of old lira tucked in a railing crack. An honest day\'s find.', currency: 12 },
    ],
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
    randomEvents: [
      { text: 'A cat allows you to pet it. This is the highest honour you have received in this city.', currency: 0 },
    ],
  },
  ist_airport: {
    id: 'ist_airport',
    city: 'Istanbul',
    name: 'Istanbul Airport',
    description:
      'A gleaming modern terminal. The departure board shows flights to **New York**, **Ankara**, **Tokyo**, **Rome**, **London**, **Paris**.',
    exits: {
      east: 'ist_bazaar',
      fly_newyork: 'ny_times_square',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
      fly_london: 'lon_tower_bridge',
      fly_paris: 'par_eiffel',
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
    randomEvents: [
      { text: 'A student hands you a political flyer. You pretend to read it seriously. They seem satisfied.', currency: 0 },
      { text: 'A vending machine gives you two drinks for the price of one. (+$4 value)', currency: 4 },
    ],
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
    randomEvents: [
      { text: 'You find a child\'s lost kite tangled in a tree. You free it, and it sails away beautifully.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You sample seven different pistachio varieties at a free-tasting stand. No purchase necessary.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'A diplomatic vehicle splashes you as it passes. You receive no apology, but $15 falls from its window.', currency: 15 },
    ],
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
    randomEvents: [
      { text: 'An old man beats you at backgammon without speaking a word. You feel enlightened by the loss.', currency: 0 },
    ],
  },
  ank_airport: {
    id: 'ank_airport',
    city: 'Ankara',
    name: 'Esenboğa Airport',
    description:
      'A functional, no-frills terminal. Flights depart to **New York**, **Istanbul**, **Tokyo**, **Rome**, **London**, **Paris**.',
    exits: {
      west: 'ank_underground',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
      fly_london: 'lon_tower_bridge',
      fly_paris: 'par_eiffel',
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
    randomEvents: [
      { text: 'You get swept up in a crowd chanting something you don\'t understand. You chant along. It feels good.', currency: 0 },
      { text: 'A vending machine dispenses a mystery drink. It is somehow both cold and warming.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You find a lost IC card with $18 remaining. The owner is long gone.', currency: 18 },
      { text: 'A station employee bows and apologizes for a 30-second delay. You are moved to tears by the professionalism.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'A stranger at the bar tells you his entire life story. You understand none of it. You both cry a little.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You draw an omikuji fortune slip. It reads: "Great fortune — but only if you stop second-guessing yourself."', currency: 0 },
    ],
  },
  tok_airport: {
    id: 'tok_airport',
    city: 'Tokyo',
    name: 'Narita International Airport',
    description:
      'Spotless floors, robotic announcements, vending machines selling everything. Flights to **New York**, **Istanbul**, **Ankara**, **Rome**, **London**, **Paris**.',
    exits: {
      east: 'tok_station',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_rome: 'rom_colosseum',
      fly_london: 'lon_tower_bridge',
      fly_paris: 'par_eiffel',
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
    randomEvents: [
      { text: 'A gladiator reenactor breaks character to ask for directions. You help them.', currency: 0 },
      { text: 'You find $14 worth of coins dropped among the ancient stones.', currency: 14 },
    ],
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
    randomEvents: [
      { text: 'A street artist insists on drawing your portrait. The result is flattering. You tip $5.', currency: -5 },
      { text: 'You find a tourist\'s dropped camera card. The photos are worth nothing, but the card sells for $8.', currency: 8 },
    ],
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
    randomEvents: [
      { text: 'You hear something drip in the darkness. It is definitely water. Definitely.', currency: 0 },
    ],
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
    randomEvents: [
      { text: 'You retrieve a coin from the fountain edge. $2, and now you owe Rome a return visit.', currency: 2 },
      { text: 'You throw a coin in the fountain. You feel compelled to come back. It works.', currency: -2 },
    ],
  },
  rom_airport: {
    id: 'rom_airport',
    city: 'Rome',
    name: 'Leonardo da Vinci Airport',
    description:
      'Chaos and espresso. The departure board shows flights to **New York**, **Istanbul**, **Ankara**, **Tokyo**, **London**, **Paris**.',
    exits: {
      west: 'rom_piazza',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_london: 'lon_tower_bridge',
      fly_paris: 'par_eiffel',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== LONDON ==========
  lon_tower_bridge: {
    id: 'lon_tower_bridge',
    city: 'London',
    name: 'Tower Bridge',
    description:
      'The Gothic towers rise over the steel-grey Thames. A fog rolls in from the east. Ravens circle the Tower of London visible across the road. A damp wind carries the smell of river.',
    exits: { north: 'lon_tower', east: 'lon_pub', west: 'lon_riverbank' },
    items: ['tower_bridge_keychain'],
    entities: [],
    randomEvents: [
      { text: 'A raven lands beside you on the bridge railing and stares. You feel it knows something.', currency: 0 },
      { text: 'A tourist asks you to take their photo. You do. They tip you £10. That\'s about $12.', currency: 12 },
    ],
  },
  lon_tower: {
    id: 'lon_tower',
    city: 'London',
    name: 'Tower of London',
    description:
      'A fortress that has served as palace, prison, and menagerie. The Jewel House draws a constant crowd. A Beefeater in full Tudor dress stands at every archway — but one of them isn\'t quite right.',
    exits: { south: 'lon_tower_bridge', east: 'lon_airport' },
    items: [],
    entities: ['beefeater', 'tower_archivist'],
    randomEvents: [
      { text: 'You touch a stone that Henry VIII himself may have walked past. History is damp and cold.', currency: 0 },
    ],
  },
  lon_pub: {
    id: 'lon_pub',
    city: 'London',
    name: 'The Foggy Pint',
    description:
      'A Victorian pub with dark wood, frosted glass, and the smell of centuries of spilled beer. The fire is going. The landlord is enormous and kind.',
    exits: { west: 'lon_tower_bridge', north: 'lon_market' },
    items: ['brolly'],
    entities: ['pub_landlord'],
    randomEvents: [
      { text: 'You win a pub quiz round on world geography. Appropriate. The prize is $6 in tokens.', currency: 6 },
      { text: 'Someone leaves a full pint unattended. You consider it. You don\'t take it. Small victory.', currency: 0 },
    ],
  },
  lon_market: {
    id: 'lon_market',
    city: 'London',
    name: 'Borough Market',
    description:
      'The ancient food market under London Bridge. Dozens of stalls selling artisan cheeses, exotic spices, craft beers, and pies the size of your head. The crowds are relentless but purposeful.',
    exits: { south: 'lon_pub' },
    items: ['fish_and_chips', 'london_fog_tea'],
    entities: [],
    randomEvents: [
      { text: 'A cheesemonger hands you a sample the size of a meal. You take three more when they look away.', currency: 0 },
      { text: 'You find $9 in a dropped wallet. No ID. It\'s gone into the charity tin. You feel better for it.', currency: 0 },
    ],
  },
  lon_riverbank: {
    id: 'lon_riverbank',
    city: 'London',
    name: 'Thames Riverbank — Southwark',
    description:
      'The embankment path runs south of the river. The Shard gleams above. A man in a flat cap is doing something suspicious near the water\'s edge.',
    exits: { east: 'lon_tower_bridge' },
    items: ['bandage'],
    entities: ['thames_smuggler'],
    randomEvents: [
      { text: 'The Thames is low tide. Mudlarkers are finding old pipes and pottery. You spot a Victorian button — sells for $7.', currency: 7 },
    ],
  },
  lon_airport: {
    id: 'lon_airport',
    city: 'London',
    name: 'Heathrow Airport — Terminal 5',
    description:
      'Cavernous and strangely beautiful. Flights to **New York**, **Istanbul**, **Ankara**, **Tokyo**, **Rome**, **Paris**.',
    exits: {
      west: 'lon_tower',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
      fly_paris: 'par_eiffel',
    },
    items: [],
    entities: [],
    isAirport: true,
  },

  // ========== PARIS ==========
  par_eiffel: {
    id: 'par_eiffel',
    city: 'Paris',
    name: 'Champ de Mars — Eiffel Tower',
    description:
      'The iron lattice tower dominates the twilight sky. Couples sit on the grass. Street vendors hawk miniature replicas. Every hour, on the hour, the tower erupts in a cascade of gold lights.',
    exits: { north: 'par_cafe', east: 'par_louvre', south: 'par_seine' },
    items: ['beret'],
    entities: [],
    randomEvents: [
      { text: 'The tower\'s light show begins. Ten thousand tourists lift their phones simultaneously. You just watch.', currency: 0 },
      { text: 'A vendor sells you a mini Eiffel Tower for $3. You immediately sell it to a tourist for $8.', currency: 5 },
    ],
  },
  par_cafe: {
    id: 'par_cafe',
    city: 'Paris',
    name: 'Le Petit Bistro',
    description:
      'A corner café with rattan chairs spilling onto the pavement. The waiter ignores you for exactly the right amount of time, then arrives with perfect coffee and an air of mild contempt.',
    exits: { south: 'par_eiffel', east: 'par_louvre' },
    items: ['macaroon'],
    entities: ['boulanger'],
    randomEvents: [
      { text: 'A philosopher at the next table argues that your existence is itself a form of art. You tip him $5 out of confusion.', currency: -5 },
      { text: 'You order a croissant and get two. This is Paris. This is the way.', currency: 0 },
    ],
  },
  par_louvre: {
    id: 'par_louvre',
    city: 'Paris',
    name: 'Musée du Louvre',
    description:
      'The glass pyramid casts diamond shadows across the courtyard. Inside, a million people per week shuffle past fourteen miles of art. One of the guards looks very nervous.',
    exits: { west: 'par_eiffel', north: 'par_cafe', east: 'par_airport' },
    items: [],
    entities: ['corrupt_museum_guard', 'art_thief'],
    randomEvents: [
      { text: 'You stand in front of the Mona Lisa for three minutes. It is smaller than you expected. You feel robbed, but also moved.', currency: 0 },
    ],
  },
  par_seine: {
    id: 'par_seine',
    city: 'Paris',
    name: 'Seine River Quays',
    description:
      'Bookstalls line the stone walls above the river. Bouquinistes sell dog-eared paperbacks and old postcards. A bateaux mouche drifts past, its passengers lit up like a diorama.',
    exits: { north: 'par_eiffel' },
    items: ['baguette', 'bordeaux_wine'],
    entities: ['seine_rat'],
    randomEvents: [
      { text: 'A bouquiniste sells you a Hemingway paperback for $2. Somehow it smells of 1950.', currency: -2 },
      { text: 'You find $11 tucked in a secondhand book. The previous owner left a note: "Treat yourself." You will.', currency: 11 },
    ],
  },
  par_airport: {
    id: 'par_airport',
    city: 'Paris',
    name: 'Charles de Gaulle Airport',
    description:
      'The futuristic tubes of Terminal 1 spiral overhead. Flights to **New York**, **Istanbul**, **Ankara**, **Tokyo**, **Rome**, **London**.',
    exits: {
      west: 'par_louvre',
      fly_newyork: 'ny_times_square',
      fly_istanbul: 'ist_sultanahmet',
      fly_ankara: 'ank_kizilay',
      fly_tokyo: 'tok_shibuya',
      fly_rome: 'rom_colosseum',
      fly_london: 'lon_tower_bridge',
    },
    items: [],
    entities: [],
    isAirport: true,
  },
};
