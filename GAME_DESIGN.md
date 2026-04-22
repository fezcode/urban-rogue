# Urban Rogue — Game Design Document

> *A browser-based text adventure about a wanderer with no fixed address and $25 to their name.*

---

## Table of Contents

1. [Overview](#1-overview)
2. [How to Win](#2-how-to-win)
3. [Commands Reference](#3-commands-reference)
4. [The World — All 7 Cities](#4-the-world--all-7-cities)
5. [All Items](#5-all-items)
6. [All Enemies](#6-all-enemies)
7. [All NPCs & Quests](#7-all-npcs--quests)
8. [Combat System](#8-combat-system)
9. [Leveling & XP](#9-leveling--xp)
10. [Economy](#10-economy)
11. [Status Effects](#11-status-effects)
12. [Random Events](#12-random-events)
13. [Optimal Walkthrough](#13-optimal-walkthrough)

---

## 1. Overview

Urban Rogue is a text-adventure RPG set across seven real-world cities. You start at Times Square in New York with **100 HP**, **$25**, no weapons, and no plan. The world is navigated through typed commands. You fight enemies, complete quests, buy and sell items, and travel between cities by air.

**Core loop:** Explore rooms → Pick up items → Fight or talk to entities → Earn currency and XP → Level up → Travel to new cities → Repeat until you've visited all 7 and completed the main quest.

---

## 2. How to Win

There is one **main objective** and three **side quests** that reward powerful items.

### Main Objective — The Bureaucrat's Grand Clearance

The Ankara Bureaucrat on **Embassy Row** will issue you a special **Embassy ID Badge** and **$150** if you bring proof you've visited all 7 cities.

**The game tracks this automatically.** Once you step foot in all 7 cities, the hidden flag `visited_all_cities` is set. Then:

1. Travel to **Ankara → Kızılay Square → (east) → Embassy Row**
2. Type `talk to bureaucrat`
3. He confirms the flag, completes the quest, and rewards you

**That's the win condition.** There's no game-over screen for winning — it's a completionist milestone that closes the loop on every other quest and city. The true ending is having:
- All 7 cities visited ✓
- Embassy ID Badge in inventory ✓
- All three side quests completed ✓
- Max level (or close) ✓

### Victory Checklist

| Task | Reward | Location |
|------|--------|----------|
| Visit all 7 cities | Unlocks bureaucrat quest | Everywhere |
| Complete Bureaucrat quest | **$150 + Embassy ID Badge** | Ankara, Embassy Row |
| Complete Carpet Merchant quest | **$50 + Medkit** | Istanbul, Grand Bazaar |
| Complete Street Artist quest | **$75 + Replica Katana** | Rome, Piazza Navona |
| Complete Tower Archivist quest | **$120 + Taser** | London, Tower of London |
| Complete Art Thief quest | **$200 + Replica Katana** | Paris, Louvre |

**Total maximum quest rewards:** ~$595 in currency + best weapons in the game.

---

## 3. Commands Reference

### Movement
| Command | Effect |
|---------|--------|
| `look` or `l` | Describe current room, items, exits, entities |
| `go north` / `n` | Move north (also `s`, `e`, `w`) |
| `go south` / `s` | Move south |
| `fly [city]` | Fly to another city (only at airports, costs $20) |
| `map` | Show all rooms in the current city, marking visited ones |

### Items
| Command | Effect |
|---------|--------|
| `take [item]` | Pick up an item from the floor |
| `drop [item]` | Drop an item from your inventory |
| `inventory` or `i` | List everything you're carrying |
| `examine [item/npc]` | Inspect something for detailed stats or lore |
| `equip [weapon]` | Ready a weapon for combat |
| `use [item]` | Use a consumable (heals HP, cures poison) |

### Social & Commerce
| Command | Effect |
|---------|--------|
| `talk to [npc]` | Speak to an NPC; triggers quest dialogue and shop listings |
| `buy [item]` | Purchase from the current room's merchant |
| `sell [item]` | Sell an item to the current room's merchant (50% of value) |

### Combat
| Command | Effect |
|---------|--------|
| `attack [target]` | Initiate combat with a hostile entity |
| `attack` (in combat) | Continue attacking the current target |
| `flee` (in combat) | Attempt to escape (70% success, take damage either way) |
| `use [item]` (in combat) | Use a consumable mid-fight |

### Meta
| Command | Effect |
|---------|--------|
| `stats` | Display HP, level, XP, currency, weapon, cities visited |
| `help` | Display command list |
| `save` | Save game to browser local storage |
| `load` | Load a saved game |
| `restart` | Start a completely new game |

### Shortcuts for `fly`
You can use short codes: `fly ny`, `fly ist`, `fly ank`, `fly tok`, `fly rom`, `fly lon`, `fly par`

---

## 4. The World — All 7 Cities

Each city has 4–6 explorable areas plus one airport. You arrive at each city's **landmark starting room** when you fly in, then walk to other areas. Airports are accessed by walking to them and using `fly [city]`.

---

### 🗽 New York

*Starting city. Dense, loud, and full of desperate people.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Times Square *(start)* | N: Central Park, S: Subway, E: Alley, W: Broadway | 🥨 Pretzel | 🌭 Hot Dog Vendor |
| Central Park | S: Times Square, E: Speakeasy | 🩹 Bandage | — |
| Brooklyn Subway Station | N: Times Square, W: JFK Airport | 🥤 Energy Drink | 🐀 Giant Subway Rat |
| Back Alley — East Side | W: Times Square | 🔧 Crowbar | 👤 Pickpocket |
| Broadway Theater District | E: Times Square | 📱 Cracked Smartphone | — |
| Hidden Speakeasy | W: Central Park | 🏥 Medkit | — |
| JFK International *(airport)* | E: Subway, Flights to all cities | — | — |

**Route to airport:** Times Square → Subway (south) → JFK (west)

---

### 🕌 Istanbul

*Ancient and electric. The city that straddles two continents.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Sultanahmet Square *(arrival)* | N: Bazaar, S: Ferry, E: Alley | 🥙 Kebab | — |
| Grand Bazaar | S: Sultanahmet, W: Airport | 🪙 Bazaar Token | 🧶 Carpet Merchant |
| Eminönü Ferry Terminal | N: Sultanahmet | 🩹 Bandage | — |
| Narrow Cat-Filled Street | W: Sultanahmet | 🐱 Lucky Cat | 🐈 Feral Cat Pack |
| Istanbul Airport *(airport)* | E: Bazaar, Flights to all cities | — | — |

**Route to airport:** Sultanahmet → Bazaar (north) → Airport (west)

**⚠ Note:** The Bazaar Token spawns in the Bazaar, but the Carpet Merchant's quest says he *lost* it near the ferry. In practice, you just pick it up in the Bazaar and hand it back to him — he doesn't mind.

---

### 🏛️ Ankara

*Cold, bureaucratic, and surprisingly deep if you know where to look.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Kızılay Square *(arrival)* | N: Park, S: Underground, E: Embassy, W: Teahouse | 🥤 Energy Drink | — |
| Gençlik Park | S: Kızılay | 🩹 Bandage | 🚁 Rogue Drone |
| Underground Mall | N: Kızılay, E: Airport | 🔪 Pocket Knife | — |
| Embassy Row | W: Kızılay | — | 📋 Bureaucrat |
| Traditional Tea House | E: Kızılay | 🥙 Kebab | 🍵 Tea House Owner |
| Esenboğa Airport *(airport)* | W: Underground, Flights to all cities | — | — |

**Route to airport:** Kızılay → Underground (south) → Airport (east)

**⭐ Main Quest Hub.** The Bureaucrat on Embassy Row is your primary objective. Visit him only after you've been to all 7 cities.

---

### ⛩️ Tokyo

*Neon-drenched, impossibly fast, and hiding ancient things.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Shibuya Crossing *(arrival)* | N: Station, E: Golden Gai, S: Shrine | ☂️ Broken Umbrella | 💼 Exhausted Salaryman |
| Shinjuku Station | S: Shibuya, W: Airport | 🍙 Onigiri | — |
| Golden Gai Alley | W: Shibuya | 🥤 Energy Drink | 💳 Corrupted ATM |
| Meiji Shrine | N: Shibuya | 🔮 Temple Seal | 🧘 Shrine Keeper |
| Narita International *(airport)* | E: Station, Flights to all cities | — | — |

**Route to airport:** Shibuya → Station (north) → Airport (west)

---

### 🏛️ Rome

*Eternal, beautiful, and genuinely dangerous underground.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| The Colosseum *(arrival)* | N: Piazza, E: Catacombs, W: Trevi | 💰 Gold Coin | — |
| Piazza Navona | S: Colosseum, E: Airport | ☕ Espresso | 🍦 Gelato Vendor, 🎨 Street Artist |
| Catacombs of San Callisto | W: Colosseum | 🗺️ Catacomb Map | 👻 Catacomb Dweller |
| Trevi Fountain | E: Colosseum | 🩹 Bandage | — |
| Leonardo da Vinci Airport *(airport)* | W: Piazza, Flights to all cities | — | — |

**Route to airport:** Colosseum → Piazza (north) → Airport (east)

**⚠ Danger:** The Catacomb Dweller has a **35% poison chance**. Don't go in without an Antidote or Medkit.

---

### 🎡 London

*Foggy, Victorian, and haunted by things that should have retired centuries ago.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Tower Bridge *(arrival)* | N: Tower of London, E: Foggy Pint, W: Riverbank | 🔑 Tower Bridge Keychain | — |
| Tower of London | S: Tower Bridge, E: Airport | — | 🗡️ Rogue Beefeater, 📖 Tower Archivist |
| The Foggy Pint | W: Tower Bridge, N: Borough Market | ☂️ Brolly | 🍺 Pub Landlord |
| Borough Market | S: Foggy Pint | 🐟 Fish & Chips, 🫖 London Fog Tea | — |
| Thames Riverbank | E: Tower Bridge | 🩹 Bandage | 🚤 Thames Smuggler |
| Heathrow Airport *(airport)* | W: Tower of London, Flights to all cities | — | — |

**Route to airport:** Tower Bridge → Tower of London (north) → Heathrow (east)

**⚠ Note:** The Rogue Beefeater is the toughest enemy in London. Defeat him before talking to the Archivist for the quest reward.

---

### 🗼 Paris

*Romantic on the surface. Considerably more criminal underneath.*

| Area | Connections | Items | Entities |
|------|-------------|-------|----------|
| Champ de Mars — Eiffel Tower *(arrival)* | N: Le Petit Bistro, E: Louvre, S: Seine Quays | 🎩 Black Beret | — |
| Le Petit Bistro | S: Eiffel Tower, E: Louvre | 🟣 Macaron | 🥐 Boulanger |
| Musée du Louvre | W: Eiffel Tower, N: Bistro, E: Airport | — | 💂 Corrupt Museum Guard, 🎭 Art Thief |
| Seine River Quays | N: Eiffel Tower | 🥖 Baguette, 🍷 Bordeaux Wine | 🐀 Seine River Rat |
| Charles de Gaulle Airport *(airport)* | W: Louvre, Flights to all cities | — | — |

**Route to airport:** Eiffel → Louvre (east) → CDG (east)

---

## 5. All Items

### Consumables (use to heal HP)

| Item | Emoji | HP Restored | Value | Where Found |
|------|-------|-------------|-------|-------------|
| Street Pretzel | 🥨 | 10 HP | $4 | NY: Times Square |
| Energy Drink | 🥤 | 10 HP | $5 | NY: Subway, Tokyo: Golden Gai, Ankara: Kızılay |
| Bandage | 🩹 | 15 HP | $10 | NY: Central Park; Istanbul: Ferry; Ankara: Park; Tokyo: Shrine (shop); Rome: Trevi; London: Riverbank; many shops |
| Onigiri | 🍙 | 12 HP | $3 | Tokyo: Shinjuku Station |
| Baguette | 🥖 | 14 HP | $4 | Paris: Seine Quays |
| Espresso | ☕ | 8 HP | $4 | Rome: Piazza Navona |
| London Fog Tea | 🫖 | 8 HP | $5 | London: Borough Market, Foggy Pint (shop) |
| Döner Kebab | 🥙 | 20 HP | $8 | Istanbul: Sultanahmet; Ankara: Teahouse |
| Macaron | 🟣 | 6 HP | $12 | Paris: Bistro |
| Fish & Chips | 🐟 | 22 HP | $9 | London: Borough Market |
| Bordeaux Wine | 🍷 | 18 HP | $20 | Paris: Seine Quays |
| Medkit | 🏥 | 40 HP + cures poison | $35 | NY: Speakeasy; Ankara: Teahouse (shop); Rome: Gelato (shop) |
| Antidote Vial | 💉 | 5 HP + cures poison | $25 | Tokyo: Shrine (shop); Paris: Louvre (enemy drop) |

### Weapons (equip to deal damage in combat)

Fists deal **5 base damage** when nothing is equipped. All weapons add a ±0–3 random roll on top of their listed damage.

| Item | Emoji | Damage | Value | Where Found |
|------|-------|--------|-------|-------------|
| Broken Umbrella | ☂️ | 4 | $1 | Tokyo: Shibuya Crossing |
| Stale Baguette | 🥖 | 6 | $1 | *Drop / special* |
| Reinforced Brolly | ☂️ | 9 | $12 | London: Foggy Pint; shop |
| Pocket Knife | 🔪 | 8 | $15 | Ankara: Underground Mall |
| Crowbar | 🔧 | 14 | $25 | NY: Back Alley |
| Brass Knuckles | 👊 | 12 | $20 | *Shop / drop* |
| Replica Katana | ⚔️ | 18 | $40 | **Quest reward** (Rome or Paris) |
| Taser | ⚡ | 20 | $50 | **Quest reward** (London); Tokyo: enemy drop |

**Best weapon path:** Crowbar (free, NY) → Katana (Rome quest) → Taser (London quest)

### Key Items & Quest Items

| Item | Emoji | Purpose | Where Found |
|------|-------|---------|-------------|
| Subway Pass | 🎫 | No mechanic currently; collectible | *Legacy item* |
| Bazaar Token | 🪙 | Istanbul quest — give to Carpet Merchant | Istanbul: Grand Bazaar (ground) |
| Temple Seal | 🔮 | Collectible from Tokyo | Tokyo: Meiji Shrine (shop) |
| Catacomb Map | 🗺️ | Collectible from Rome | Rome: Catacombs (ground), enemy drop |
| Embassy ID Badge | 🪪 | Main quest reward from Bureaucrat | Ankara: Embassy Row (quest) |
| London Tube Pass | 🎫 | Collectible from London | *Legacy item* |
| Crown Jewel Fragment | 💎 | London quest — give to Tower Archivist | London: Tower of London (Beefeater drop) |
| Stolen Painting | 🖼️ | Paris quest — give to Art Thief | Paris: Louvre (Corrupt Guard drop) |

### Misc / Loot (sell for currency)

| Item | Emoji | Sell Value | Notes |
|------|-------|------------|-------|
| Cracked Smartphone | 📱 | $6 | Dropped by NY Pickpocket |
| Lucky Cat Figurine | 🐱 | $4 | Dropped by Istanbul cats |
| Gold Coin | 💰 | $25 | Rome: Colosseum (ground); enemy drop |
| Tower Bridge Keychain | 🔑 | ~$1 | London: Tower Bridge (ground) |
| Black Beret | 🎩 | $7 | Paris: Eiffel Tower (ground); enemy drop |

---

## 6. All Enemies

Enemies are **hostile** entities. They don't initiate combat — you must `attack [name]` to start a fight, or they respond during room entry events. Once combat starts, every command outside of `attack`, `use`, and `flee` is locked.

Damage shown is the enemy's base damage per round. The actual value per hit is: `base damage + random(0–3) - 1`.

| Enemy | City | HP | Damage | Poison? | XP | Loot |
|-------|------|----|--------|---------|-----|------|
| 🐀 Giant Subway Rat | New York | 20 | 5 | No | 10 | 🥤 Energy Drink |
| 👤 Desperate Pickpocket | New York | 25 | 7 | No | 15 | 🔪 Pocket Knife, 📱 Smartphone |
| 🐈 Feral Cat Pack | Istanbul | 18 | 6 | **25%** | 8 | 🐱 Lucky Cat |
| 🚁 Rogue Drone | Ankara | 30 | 10 | No | 25 | 📱 Smartphone, ⚡ Taser |
| 💳 Corrupted ATM | Tokyo | 35 | 12 | No | 30 | 💰 Gold Coin |
| 👻 Catacomb Dweller | Rome | 28 | 9 | **35%** | 20 | 💰 Gold Coin, 🗺️ Catacomb Map |
| 🗡️ Rogue Beefeater | London | 40 | 11 | No | 35 | 💎 Crown Jewel Fragment, 🩹 Bandage |
| 🚤 Thames Smuggler | London | 30 | 8 | No | 20 | 🔑 Keychain, 📱 Smartphone |
| 💂 Corrupt Museum Guard | Paris | 32 | 10 | No | 28 | 🖼️ Stolen Painting, 💉 Antidote |
| 🐀 Seine River Rat | Paris | 22 | 6 | **20%** | 12 | 🎩 Black Beret |

### Enemy Tips

- **Subway Rat** — First enemy you'll likely fight. Easy warm-up. Use it to level up before leaving NY.
- **Feral Cat Pack** — Low HP but poison risk. If you don't have an antidote, consider skipping.
- **Rogue Drone** — Drops the Taser if you're lucky. High damage — have 60+ HP before engaging.
- **Corrupted ATM** — Highest HP of the non-boss enemies. Drops gold. Worth farming if you need cash.
- **Catacomb Dweller** — Highest poison chance (35%). Always bring a Medkit or Antidote to Rome's Catacombs.
- **Rogue Beefeater** — Tankiest enemy in the game (40 HP) and hits hard. Equip your best weapon and have 80+ HP. He drops the Crown Jewel Fragment needed for the Tower Archivist quest.
- **Corrupt Museum Guard** — Medium difficulty. Drops the Stolen Painting required for the Paris quest. Must be killed to get it.

---

## 7. All NPCs & Quests

NPCs are **non-hostile** entities. Use `talk to [name]` to interact. Merchants show their shop when you talk to them. Quest NPCs reveal their quest and check your inventory.

### Shops

| Merchant | City / Area | Sells |
|----------|-------------|-------|
| 🌭 Hot Dog Vendor | NY: Times Square | 🥨 Pretzel ($4), 🥤 Energy Drink ($5), 🩹 Bandage ($10) |
| 🧶 Carpet Merchant | Istanbul: Grand Bazaar | 🥙 Kebab ($8), 🩹 Bandage ($10), 🪙 Bazaar Token ($0) |
| 🍵 Tea House Owner | Ankara: Teahouse | 🥙 Kebab ($8), 🏥 Medkit ($35), 🩹 Bandage ($10) |
| 🧘 Shrine Keeper | Tokyo: Meiji Shrine | 🍙 Onigiri ($3), 🩹 Bandage ($10), 💉 Antidote ($25), 🔮 Temple Seal ($0) |
| 🍦 Gelato Vendor | Rome: Piazza Navona | ☕ Espresso ($4), 🩹 Bandage ($10), 🏥 Medkit ($35) |
| 🍺 Pub Landlord | London: Foggy Pint | 🐟 Fish & Chips ($9), 🫖 Tea ($5), ☂️ Brolly ($12), 🩹 Bandage ($10) |
| 🥐 Boulanger | Paris: Le Petit Bistro | 🥖 Baguette ($4), 🟣 Macaron ($12), 🍷 Wine ($20), 🩹 Bandage ($10) |
| 📋 Bureaucrat | Ankara: Embassy Row | 🪪 Embassy ID ($0) |

> **Selling:** Any merchant buys items from you at **50% of face value** (minimum $1). Best items to sell: Gold Coin ($25 → $12 sell), Taser if you have extras.

---

### Quests

#### Quest 1 — The Lost Token *(Istanbul)*

| | |
|-|-|
| **Quest Giver** | Carpet Merchant — Grand Bazaar, Istanbul |
| **Trigger** | `talk to carpet merchant` |
| **Quest Text** | *"I lost a carved token somewhere near the ferry terminal. Bring it back, and I'll make it worth your while."* |
| **What To Do** | The Bazaar Token (🪙) is already sitting on the floor of the Grand Bazaar (same room). Pick it up with `take bazaar token`, then `talk to carpet merchant`. |
| **Reward** | **$50 + 🏥 Medkit** |
| **Notes** | The easiest quest in the game. Do it immediately on arriving in Istanbul. |

---

#### Quest 2 — The Gold Coin *(Rome)*

| | |
|-|-|
| **Quest Giver** | Street Artist — Piazza Navona, Rome |
| **Trigger** | `talk to street artist` |
| **Quest Text** | *"I heard there's a gold coin lost in the catacombs. Bring it to me — I collect ancient things."* |
| **What To Do** | Go to the Catacombs of San Callisto (east from Colosseum). The Gold Coin (💰) spawns on the floor AND drops from the Catacomb Dweller. Either pick it up or kill the enemy — you only need one. Return to Piazza Navona and `talk to street artist`. |
| **Reward** | **$75 + ⚔️ Replica Katana (18 damage)** |
| **Notes** | The Catacomb Dweller has a 35% poison chance. Bring a Medkit. The Katana is a major upgrade — get this done early in your Rome visit. |

---

#### Quest 3 — The Crown Jewel Fragment *(London)*

| | |
|-|-|
| **Quest Giver** | Tower Archivist — Tower of London, London |
| **Trigger** | `talk to tower archivist` |
| **Quest Text** | *"A fragment of the Crown Jewels has gone missing from the lower vault. There are unofficial rumours about the Beefeater on the east wing. If you find it, I can make it worth your while."* |
| **What To Do** | The Rogue Beefeater is in the same room (Tower of London). Attack him with `attack rogue beefeater`. He drops the Crown Jewel Fragment (💎) and a Bandage. Then `talk to tower archivist` to complete. |
| **Reward** | **$120 + ⚡ Taser (20 damage)** |
| **Notes** | The Beefeater is 40 HP and hits for 11. You should have the Replica Katana (from Rome) or a Crowbar before attempting this. The Taser is the best weapon in the game. |

---

#### Quest 4 — The Stolen Painting *(Paris)*

| | |
|-|-|
| **Quest Giver** | Art Thief — Musée du Louvre, Paris |
| **Trigger** | `talk to art thief` |
| **Quest Text** | *"A Monet was taken from the Louvre last night — not by me, I insist — and I need it returned before Interpol traces it here. Retrieve it from the museum guard who took it."* |
| **What To Do** | The Corrupt Museum Guard is in the same room (Louvre). Attack him with `attack corrupt museum guard`. He drops the Stolen Painting (🖼️) and an Antidote. Then `talk to art thief` to collect your reward. |
| **Reward** | **$200 + ⚔️ Replica Katana** |
| **Notes** | Highest cash reward in the game. Do this if you need money for flights. If you already have a Taser from London, sell the second Katana. |

---

#### Quest 5 (MAIN) — The Bureaucrat's Grand Clearance *(Ankara)*

| | |
|-|-|
| **Quest Giver** | Bureaucrat — Embassy Row, Ankara |
| **Trigger** | `talk to bureaucrat` after visiting all 7 cities |
| **Quest Text** | *"Bring me proof you've been to all seven cities and I'll issue you a special clearance badge."* |
| **What To Do** | Visit all 7 cities (New York, Istanbul, Ankara, Tokyo, Rome, London, Paris). Once the `visited_all_cities` flag is set automatically, return to Embassy Row and `talk to bureaucrat`. |
| **Reward** | **$150 + 🪪 Embassy ID Badge** |
| **Notes** | This is the win condition. The flag is set silently — you don't need to do anything special in each city. Just set foot there. |

---

## 8. Combat System

### Initiating Combat

Type `attack [enemy name]`. Partial names work: `attack rat`, `attack beefeater`, `attack guard`.

You can only attack hostile entities (marked ⚔️ when you `look`). Attacking an NPC returns an error.

### Damage Calculation

```
Player damage per hit = (base weapon damage + random(0–3) - 1)
```

- No weapon equipped: base = **5**
- Pocket Knife: base = **8**
- Crowbar: base = **14**
- Katana: base = **18**
- Taser: base = **20**

**Critical Hit (20% chance):** The entire rolled damage is doubled. Shown as `✨ CRITICAL HIT!` in the combat log.

Enemy damage works the same way: `(enemy base damage + random(0–3) - 1)`.

### Combat Flow

Each `attack` command is one **full round**:
1. You attack → deal damage to enemy
2. If enemy survives → enemy retaliates → deal damage to you
3. Repeat until someone reaches 0 HP

If **you** reach 0 HP: **GAME OVER**. Type `restart`.

If **enemy** reaches 0 HP: they die, drop loot onto the floor, you gain XP. You can then `take` their drops.

### Fleeing

Type `flee` during combat. **70% success rate.**

- **Success:** You escape. Enemy gets a free hit for partial damage before you're clear.
- **Failure:** You don't escape. Enemy deals 1.5× normal damage. You're still in combat.

### Mid-Combat Healing

`use [item]` works during combat. After healing, the game reminds you that you're still fighting. You don't get a free turn — the next enemy attack follows immediately after you type `attack` again.

---

## 9. Leveling & XP

You start at **Level 1** with **100 max HP**.

### XP Thresholds

| Level | XP Required | Max HP |
|-------|-------------|--------|
| 1 | 0 | 100 |
| 2 | 50 XP | 110 |
| 3 | 100 XP | 120 |
| 4 | 150 XP | 130 |
| … | +50 per level | +10 per level |

On level-up: max HP increases by 10, and current HP also increases by 10 (free partial heal).

### XP per Enemy

| Enemy | XP |
|-------|----|
| Feral Cat Pack | 8 |
| Giant Subway Rat | 10 |
| Desperate Pickpocket | 15 |
| Seine River Rat | 12 |
| Catacomb Dweller | 20 |
| Thames Smuggler | 20 |
| Rogue Drone | 25 |
| Corrupt Museum Guard | 28 |
| Rogue Beefeater | 35 |
| Corrupted ATM | 30 |

To hit **Level 3** (safe for hard enemies): kill ~4 easy enemies or 2 hard ones.

---

## 10. Economy

### Starting Money: $25

### Earning Currency

| Method | Amount |
|--------|--------|
| Sell items to merchants | 50% of item value |
| Quest rewards | $50–$200 |
| Random events | $2–$20 (22% chance per room transition) |
| Enemy loot (sell the drops) | Variable |

### Spending Currency

| Expense | Cost |
|---------|------|
| Flight (any route) | $20 |
| Bandage (shop) | $10 |
| Medkit (shop) | $35 |
| Antidote (shop) | $25 |
| Kebab (shop) | $8 |
| Fish & Chips (shop) | $9 |

### Economy Tips

- You need **$20 per flight** × at least 6 flights = **$120 minimum** just for travel.
- The Istanbul quest ($50) covers 2.5 flights. Do it first.
- Sell useless misc items (Keychain, Lucky Cat, Beret) immediately.
- The Gold Coin ($50 value → $25 sell) is good emergency cash.
- Don't buy Medkits unless injured — pick up Bandages for free everywhere.

---

## 11. Status Effects

### ☠️ Poison

Certain enemies have a chance to poison you on each hit:

| Enemy | Poison Chance |
|-------|--------------|
| Feral Cat Pack | 25% |
| Catacomb Dweller | 35% |
| Seine River Rat | 20% |

**What poison does:**
- You lose **8 HP** every time you move to a new room
- Shown in the sidebar as a pulsing `☠️ Poisoned` indicator
- You are warned in the movement text each time it ticks
- HP cannot drop below 1 from poison (you're kept alive, barely)

**How to cure poison:**
- `use antidote` — cures poison + restores 5 HP
- `use medkit` — also cures poison + restores 40 HP
- **You cannot outlast poison** — it ticks every room forever until cured

**Strategy:** Always carry at least one Medkit or Antidote when entering the Catacombs (Rome) or fighting cats (Istanbul). The Shrine Keeper in Tokyo sells Antidotes for $25.

---

## 12. Random Events

When moving between rooms, there is a **22% chance** of a random event firing. Events are tied to specific rooms and either add flavor text only, or add a small currency bonus.

Examples:
- Times Square: Tourist mistakes you for a performer (+$5)
- Central Park: Crumpled $10 bill in the leaves (+$10)
- Ankara Embassy Row: Diplomatic vehicle splashes you, $15 falls from window (+$15)
- Istanbul Ferry: Find $12 in a railing crack (+$12)
- Tokyo Station: Find a lost IC card (+$18)
- Paris Seine: Find $11 tucked in a secondhand book (+$11)

These are minor economic boosts but add up over a full playthrough. They don't affect progression.

---

## 13. Optimal Walkthrough

This is the fastest path to completing all quests and visiting all 7 cities.

### Phase 1 — New York (Start)

1. `look` to orient yourself
2. `go east` → Back Alley: `take crowbar` (equip it: `equip crowbar`)
3. `go west` → Times Square
4. `go south` → Subway: `attack subway rat` (easy fight, 10 XP)
5. `take energy drink` from Subway floor if you need it
6. `go north` → Times Square
7. `go north` → Central Park: `take bandage`
8. `go east` → Speakeasy: `take medkit`
9. `go west` → Central Park → `go south` → Times Square
10. `go west` → Broadway: `take smartphone` (sell later)
11. `go east` → Times Square → `go east` → Alley: kill the pickpocket (`attack pickpocket`, 15 XP)
12. You're now ~Level 1, have Crowbar equipped, Medkit, Bandage
13. `go west` → Times Square → `go south` → Subway → `go west` → JFK Airport
14. `fly istanbul` (-$20)

### Phase 2 — Istanbul

15. Arrive at Sultanahmet. `take kebab`
16. `go north` → Grand Bazaar: `take bazaar token`
17. `talk to carpet merchant` → Quest accepted and immediately completed → **$50 + Medkit**
18. Now at ~$55 + 2 Medkits
19. `go south` → Sultanahmet → `go east` → Cat Alley
20. Optional: fight the Feral Cat Pack (8 XP, drops Lucky Cat to sell). **Bring a Bandage in case you get poisoned.**
21. `go west` → Sultanahmet → `go north` → Bazaar → `go west` → Istanbul Airport
22. `fly ankara` (-$20)

### Phase 3 — Ankara (Partial Visit)

23. Arrive at Kızılay. `go east` → Embassy Row
24. `talk to bureaucrat` → He tells you to visit all 7 cities first. He won't give the quest yet — that's fine.
25. `go west` → Kızılay → `go south` → Underground: `take pocket knife` (ignore — you have Crowbar)
26. `go north` → Kızılay → `go west` → Teahouse: optional shop
27. `go north` → Park: fight Rogue Drone (25 XP, drops Taser if lucky — very worth it)
28. `go south` → Kızılay → `go south` → Underground → `go east` → Esenboğa Airport
29. `fly tokyo` (-$20)

### Phase 4 — Tokyo

30. Arrive at Shibuya. `go south` → Meiji Shrine
31. `talk to shrine keeper` — buy **Antidote ($25)** here. This is important for the Catacombs.
32. `go north` → Shibuya → `go east` → Golden Gai
33. Fight Corrupted ATM (30 XP, drops Gold Coin). This is a tough fight — use Medkit if below 40 HP.
34. `go west` → Shibuya → `go north` → Shinjuku Station → `go west` → Narita Airport
35. `fly rome` (-$20)

### Phase 5 — Rome

36. Arrive at Colosseum. `take gold coin`
37. `go east` → Catacombs: **fight the Catacomb Dweller** (20 XP, drops Gold Coin + Catacomb Map)
    - 35% poison chance — use your Antidote if poisoned, or Medkit
38. `take gold coin` and `take catacomb map`
39. `go west` → Colosseum → `go north` → Piazza Navona
40. `talk to street artist` → Hand over the Gold Coin → **$75 + Replica Katana ⚔️**
41. `equip replica katana` (big damage upgrade from Crowbar)
42. `sell crowbar` to Gelato Vendor for ~$12 (optional — keep if you want backup)
43. `go east` → Leonardo da Vinci Airport
44. `fly london` (-$20)

### Phase 6 — London

45. Arrive at Tower Bridge. `go north` → Tower of London
46. `talk to tower archivist` → Quest accepted
47. **Fight the Rogue Beefeater** (35 XP): `attack rogue beefeater`
    - He's 40 HP, hits for 11. With the Replica Katana (~15–21 damage per hit), you'll win in 2–3 rounds.
    - Heal if you drop below 30 HP
48. Beefeater drops: Crown Jewel Fragment + Bandage
49. `take crown jewel fragment`
50. `talk to tower archivist` → **$120 + Taser ⚡**
51. `equip taser` (best weapon in the game)
52. `go east` → Heathrow Airport
53. `fly paris` (-$20)

### Phase 7 — Paris

54. Arrive at Eiffel Tower. `take beret` (sell later)
55. `go north` → Bistro: optional shopping (buy Bordeaux Wine if HP is low)
56. `go east` → Louvre (from Bistro), or `go east` (from Eiffel) → Louvre
57. `talk to art thief` → Quest accepted
58. **Fight the Corrupt Museum Guard** (28 XP): `attack corrupt museum guard`
59. Guard drops: Stolen Painting + Antidote
60. `take stolen painting`
61. `talk to art thief` → **$200 + Replica Katana** (sell the extra Katana — $20)
62. `go east` → Charles de Gaulle Airport
63. `fly ankara` (-$20)

### Phase 8 — Ankara (Final)

64. Arrive at Kızılay. `go east` → Embassy Row
65. `talk to bureaucrat`
66. All 7 cities visited ✓ → **$150 + Embassy ID Badge 🪪**

### 🏆 You Win

**Final inventory should include:** Embassy ID Badge, Taser (equipped), Temple Seal (collectible), maybe some Medkits. You've completed every quest, visited every city, and have roughly **$300–$400** depending on random events and what you sold.

---

## Appendix A — City Visit Order Reasoning

You need to visit all 7 cities, and flights cost $20 each. The order above minimizes backtracking:

```
New York → Istanbul → Ankara → Tokyo → Rome → London → Paris → Ankara
```

That's 7 flights = **$140 in travel costs**. The Istanbul quest ($50) covers most of it early. The Rome and Paris quests ($75 + $200) more than cover the rest.

You end in Ankara (the main quest location) which is efficient. You could also end in any city and then fly back to Ankara at the end.

---

## Appendix B — Full Item Value Table

For selling purposes (all prices are 50% of listed value):

| Item | Listed Value | Sell Price |
|------|-------------|------------|
| Cracked Smartphone | $12 | $6 |
| Lucky Cat Figurine | $8 | $4 |
| Tower Bridge Keychain | $3 | $1 |
| Black Beret | $15 | $7 |
| Gold Coin | $50 | $25 |
| Catacomb Map | $0 | $1 (min) |
| Crowbar (if selling) | $25 | $12 |
| Replica Katana (extra) | $40 | $20 |

---

*Last updated: April 2026 — Urban Rogue v1.1*
