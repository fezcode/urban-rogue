import { world } from '../data/world';
import { items } from '../data/items';
import { entities } from '../data/entities';

const DIRECTION_ALIASES = {
  n: 'north', s: 'south', e: 'east', w: 'west',
  north: 'north', south: 'south', east: 'east', west: 'west',
};

const FLY_ALIASES = {
  'new york': 'fly_newyork', newyork: 'fly_newyork', ny: 'fly_newyork', nyc: 'fly_newyork',
  istanbul: 'fly_istanbul', ist: 'fly_istanbul',
  ankara: 'fly_ankara', ank: 'fly_ankara',
  tokyo: 'fly_tokyo', tok: 'fly_tokyo',
  rome: 'fly_rome', rom: 'fly_rome',
};

export function handleCommand(input, state) {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;

  const parts = raw.split(/\s+/);
  const verb = parts[0];
  const rest = parts.slice(1).join(' ');

  const room = world[state.currentRoom];
  const rs = state.roomState[state.currentRoom];

  // In combat — restrict commands
  if (state.combatTarget) {
    return handleCombat(verb, rest, state, room, rs);
  }

  switch (verb) {
    case 'help':
    case '?':
      return cmdHelp(state, room);
    case 'look':
    case 'l':
      return cmdLook(state, room, rs);
    case 'go':
    case 'move':
      return cmdGo(rest, state, room);
    case 'n': case 's': case 'e': case 'w':
    case 'north': case 'south': case 'east': case 'west':
      return cmdGo(verb, state, room);
    case 'fly':
      return cmdFly(rest, state, room);
    case 'take':
    case 'get':
    case 'grab':
    case 'pick':
      return cmdTake(rest === 'up' ? parts.slice(2).join(' ') : rest, state, rs);
    case 'inventory':
    case 'i':
      return cmdInventory(state);
    case 'use':
      return cmdUse(rest, state, rs);
    case 'equip':
      return cmdEquip(rest, state);
    case 'drop':
      return cmdDrop(rest, state, rs);
    case 'talk':
      return cmdTalk(rest.replace(/^to\s+/, ''), state, rs);
    case 'attack':
    case 'hit':
    case 'fight':
      return cmdAttack(rest, state, rs);
    case 'buy':
    case 'purchase':
      return cmdBuy(rest, state, rs);
    case 'sell':
      return cmdSell(rest, state, rs);
    case 'stats':
    case 'status':
      return cmdStats(state);
    case 'save':
      return { stateUpdate: {}, text: '💾 Game saved.', doSave: true };
    case 'load':
      return { stateUpdate: {}, text: '', doLoad: true };
    case 'restart':
      return { stateUpdate: {}, text: '', doReset: true };
    default:
      return { stateUpdate: {}, text: `> Unknown command: **${verb}**. Type **help** for a list of commands.` };
  }
}

function cmdHelp(state, room) {
  let flyHelp = '';
  if (room.isAirport) {
    flyHelp = '\n| `fly [city]` | Fly to another city (at airports) |';
  }
  const text = `## Commands

| Command | Description |
|---------|-------------|
| \`look\` / \`l\` | Examine your surroundings |
| \`go [direction]\` / \`n/s/e/w\` | Move to adjacent area |${flyHelp}
| \`take [item]\` | Pick up an item |
| \`drop [item]\` | Drop an item |
| \`inventory\` / \`i\` | Check your belongings |
| \`equip [weapon]\` | Equip a weapon |
| \`use [item]\` | Use a consumable item |
| \`talk to [npc]\` | Talk to someone |
| \`attack [target]\` | Start a fight |
| \`buy [item]\` | Buy from a merchant |
| \`sell [item]\` | Sell an item to a merchant |
| \`stats\` | View your stats |
| \`save\` / \`load\` | Save or load your game |
| \`restart\` | Start a new game |`;
  return { stateUpdate: {}, text };
}

function cmdLook(state, room, rs) {
  let text = `## ${room.name}\n*${room.city}*\n\n${room.description}\n`;

  // Exits
  const exits = Object.keys(room.exits)
    .filter((e) => !e.startsWith('fly_'))
    .map((e) => `**${e}**`)
    .join(', ');
  text += `\n**Exits:** ${exits}`;

  if (room.isAirport) {
    const destinations = Object.keys(room.exits)
      .filter((e) => e.startsWith('fly_'))
      .map((e) => `**${e.replace('fly_', '').replace('newyork', 'New York').replace('istanbul', 'Istanbul').replace('ankara', 'Ankara').replace('tokyo', 'Tokyo').replace('rome', 'Rome')}**`)
      .join(', ');
    text += `\n**Flights:** ${destinations}`;
  }

  // Items on ground
  if (rs.items.length > 0) {
    const itemNames = rs.items.map((id) => items[id]?.name || id).join(', ');
    text += `\n\n*On the ground:* ${itemNames}`;
  }

  // Entities
  const alive = rs.entities.filter((e) => e.alive);
  if (alive.length > 0) {
    text += '\n';
    for (const ent of alive) {
      const tag = ent.type === 'hostile' ? ' ⚔️' : '';
      text += `\n**${ent.name}**${tag} — ${ent.description}`;
    }
  }

  return { stateUpdate: {}, text };
}

function cmdGo(dirInput, state, room) {
  const dir = DIRECTION_ALIASES[dirInput];
  if (!dir) {
    return { stateUpdate: {}, text: `You can't go "${dirInput}". Try **north**, **south**, **east**, or **west**.` };
  }
  const targetId = room.exits[dir];
  if (!targetId) {
    return { stateUpdate: {}, text: `There's no path to the **${dir}**.` };
  }
  return moveToRoom(targetId, state);
}

function cmdFly(dest, state, room) {
  if (!room.isAirport) {
    return { stateUpdate: {}, text: 'You need to be at an **airport** to fly. Look for one nearby.' };
  }
  const key = FLY_ALIASES[dest];
  if (!key || !room.exits[key]) {
    const available = Object.keys(room.exits)
      .filter((e) => e.startsWith('fly_'))
      .map((e) => e.replace('fly_', '').replace('newyork', 'New York'))
      .join(', ');
    return { stateUpdate: {}, text: `No flights to "${dest}". Available destinations: **${available}**` };
  }
  const cost = 20;
  if (state.player.currency < cost) {
    return { stateUpdate: {}, text: `A ticket costs **$${cost}** but you only have **$${state.player.currency}**.` };
  }
  const targetId = room.exits[key];
  const target = world[targetId];
  const newPlayer = { ...state.player, currency: state.player.currency - cost };
  const result = moveToRoom(targetId, { ...state, player: newPlayer });
  result.stateUpdate.player = { ...newPlayer, ...result.stateUpdate.player };
  result.text = `✈️ You board a flight to **${target.city}**. (-$${cost})\n\n---\n\n` + result.text;
  return result;
}

function moveToRoom(targetId, state) {
  const target = world[targetId];
  const newRoomState = { ...state.roomState };
  if (!newRoomState[targetId].visited) {
    newRoomState[targetId] = { ...newRoomState[targetId], visited: true };
  }

  const newVisited = new Set(state.visitedCities);
  newVisited.add(target.city);

  const rs = newRoomState[targetId];
  let text = `## ${target.name}\n*${target.city}*\n\n${target.description}`;

  const exits = Object.keys(target.exits)
    .filter((e) => !e.startsWith('fly_'))
    .map((e) => `**${e}**`)
    .join(', ');
  text += `\n\n**Exits:** ${exits}`;

  if (target.isAirport) {
    const destinations = Object.keys(target.exits)
      .filter((e) => e.startsWith('fly_'))
      .map((e) => `**${e.replace('fly_', '').replace('newyork', 'New York').replace('istanbul', 'Istanbul').replace('ankara', 'Ankara').replace('tokyo', 'Tokyo').replace('rome', 'Rome')}**`)
      .join(', ');
    text += `\n**Flights:** ${destinations}`;
  }

  if (rs.items.length > 0) {
    const itemNames = rs.items.map((id) => items[id]?.name || id).join(', ');
    text += `\n\n*On the ground:* ${itemNames}`;
  }

  const alive = rs.entities.filter((e) => e.alive);
  if (alive.length > 0) {
    text += '\n';
    for (const ent of alive) {
      const tag = ent.type === 'hostile' ? ' ⚔️' : '';
      text += `\n**${ent.name}**${tag} — ${ent.description}`;
    }
  }

  const flags = { ...state.flags };
  if (newVisited.size >= 5) {
    flags.visited_all_cities = true;
  }

  return {
    stateUpdate: {
      currentRoom: targetId,
      roomState: newRoomState,
      visitedCities: newVisited,
      flags,
    },
    text,
  };
}

function cmdTake(itemName, state, rs) {
  if (!itemName) return { stateUpdate: {}, text: 'Take what? Specify an item.' };

  const idx = rs.items.findIndex(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (idx === -1) {
    return { stateUpdate: {}, text: `There's no "${itemName}" here to take.` };
  }

  const itemId = rs.items[idx];
  const item = items[itemId];
  const newRoomItems = [...rs.items];
  newRoomItems.splice(idx, 1);

  const newRoomState = { ...state.roomState };
  newRoomState[state.currentRoom] = { ...rs, items: newRoomItems };

  const newInventory = [...state.player.inventory, itemId];

  return {
    stateUpdate: {
      player: { ...state.player, inventory: newInventory },
      roomState: newRoomState,
    },
    text: `You pick up the **${item.name}**. ${item.description}`,
  };
}

function cmdDrop(itemName, state, rs) {
  if (!itemName) return { stateUpdate: {}, text: 'Drop what?' };

  const idx = state.player.inventory.findIndex(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (idx === -1) {
    return { stateUpdate: {}, text: `You don't have "${itemName}".` };
  }

  const itemId = state.player.inventory[idx];
  const item = items[itemId];
  const newInventory = [...state.player.inventory];
  newInventory.splice(idx, 1);

  const newRoomItems = [...rs.items, itemId];
  const newRoomState = { ...state.roomState };
  newRoomState[state.currentRoom] = { ...rs, items: newRoomItems };

  let newWeapon = state.player.equippedWeapon;
  if (newWeapon === itemId) newWeapon = null;

  return {
    stateUpdate: {
      player: { ...state.player, inventory: newInventory, equippedWeapon: newWeapon },
      roomState: newRoomState,
    },
    text: `You drop the **${item.name}**.`,
  };
}

function cmdInventory(state) {
  if (state.player.inventory.length === 0) {
    return { stateUpdate: {}, text: 'Your pockets are empty.' };
  }
  let text = '## Inventory\n';
  for (const id of state.player.inventory) {
    const item = items[id];
    const equipped = state.player.equippedWeapon === id ? ' *(equipped)*' : '';
    text += `\n- **${item.name}**${equipped} — ${item.description}`;
  }
  return { stateUpdate: {}, text };
}

function cmdEquip(itemName, state) {
  if (!itemName) return { stateUpdate: {}, text: 'Equip what?' };

  const idx = state.player.inventory.findIndex(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (idx === -1) {
    return { stateUpdate: {}, text: `You don't have "${itemName}".` };
  }
  const itemId = state.player.inventory[idx];
  const item = items[itemId];
  if (item.type !== 'weapon') {
    return { stateUpdate: {}, text: `**${item.name}** isn't a weapon.` };
  }

  return {
    stateUpdate: { player: { ...state.player, equippedWeapon: itemId } },
    text: `You equip the **${item.name}**. (${item.damage} damage)`,
  };
}

function cmdUse(rest, state) {
  // Parse "use X" or "use X on Y"
  const match = rest.match(/^(.+?)(?:\s+on\s+(.+))?$/);
  if (!match) return { stateUpdate: {}, text: 'Use what?' };

  const itemName = match[1].trim();
  const idx = state.player.inventory.findIndex(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (idx === -1) {
    return { stateUpdate: {}, text: `You don't have "${itemName}".` };
  }
  const itemId = state.player.inventory[idx];
  const item = items[itemId];

  if (item.type === 'consumable') {
    const newHp = Math.min(state.player.maxHp, state.player.hp + item.healAmount);
    const healed = newHp - state.player.hp;
    const newInventory = [...state.player.inventory];
    newInventory.splice(idx, 1);
    return {
      stateUpdate: {
        player: { ...state.player, hp: newHp, inventory: newInventory },
      },
      text: `You use the **${item.name}**. Restored **${healed} HP**. (${newHp}/${state.player.maxHp})`,
    };
  }

  return { stateUpdate: {}, text: `You're not sure how to use the **${item.name}** right now.` };
}

function cmdTalk(npcName, state, rs) {
  if (!npcName) return { stateUpdate: {}, text: 'Talk to whom?' };

  const entity = rs.entities.find(
    (e) => e.alive && e.type === 'npc' && e.name.toLowerCase().includes(npcName)
  );
  if (!entity) {
    return { stateUpdate: {}, text: `There's no one called "${npcName}" here to talk to.` };
  }

  const def = entities[entity.id];
  let text = `**${entity.name}:** ${def.dialogue.greeting}`;

  if (def.dialogue.quest && !def.dialogue.quest.completed) {
    const q = def.dialogue.quest;
    text += `\n\n${def.dialogue.quest.prompt}`;

    // Check if player can complete quest
    if (q.requireItem && state.player.inventory.includes(q.requireItem)) {
      const newInventory = state.player.inventory.filter((id) => id !== q.requireItem);
      if (q.reward.item) newInventory.push(q.reward.item);
      const newCurrency = state.player.currency + (q.reward.currency || 0);

      // Mark quest completed
      const newRoomState = { ...state.roomState };
      const newEntities = rs.entities.map((e) => {
        if (e.id === entity.id) return { ...e };
        return e;
      });
      newRoomState[state.currentRoom] = { ...rs, entities: newEntities };

      text += `\n\n---\n*You hand over the **${items[q.requireItem].name}**.*`;
      text += `\n\n**Quest Complete!** Received **$${q.reward.currency}**`;
      if (q.reward.item) text += ` and **${items[q.reward.item].name}**`;
      text += '.';

      return {
        stateUpdate: {
          player: { ...state.player, inventory: newInventory, currency: newCurrency },
          roomState: newRoomState,
        },
        text,
      };
    } else if (q.requireFlag && state.flags[q.requireFlag]) {
      const newInventory = [...state.player.inventory];
      if (q.reward.item) newInventory.push(q.reward.item);
      const newCurrency = state.player.currency + (q.reward.currency || 0);
      text += `\n\n---\n**Quest Complete!** Received **$${q.reward.currency}**`;
      if (q.reward.item) text += ` and **${items[q.reward.item].name}**`;
      text += '.';
      return {
        stateUpdate: {
          player: { ...state.player, inventory: newInventory, currency: newCurrency },
        },
        text,
      };
    }
  }

  if (def.shop && def.shop.length > 0) {
    text += '\n\n**For sale:**\n';
    for (const itemId of def.shop) {
      const item = items[itemId];
      if (item) {
        text += `\n- **${item.name}** — $${item.value} — *${item.description}*`;
      }
    }
    text += '\n\n*Use `buy [item]` to purchase.*';
  }

  return { stateUpdate: {}, text };
}

function cmdBuy(itemName, state, rs) {
  if (!itemName) return { stateUpdate: {}, text: 'Buy what?' };

  // Find a merchant in the room
  const merchant = rs.entities.find((e) => e.alive && e.type === 'npc' && entities[e.id]?.shop?.length > 0);
  if (!merchant) {
    return { stateUpdate: {}, text: 'There\'s no one here to buy from.' };
  }

  const def = entities[merchant.id];
  const itemId = def.shop.find(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (!itemId) {
    return { stateUpdate: {}, text: `They don't sell "${itemName}".` };
  }

  const item = items[itemId];
  if (state.player.currency < item.value) {
    return { stateUpdate: {}, text: `You need **$${item.value}** but only have **$${state.player.currency}**.` };
  }

  return {
    stateUpdate: {
      player: {
        ...state.player,
        currency: state.player.currency - item.value,
        inventory: [...state.player.inventory, itemId],
      },
    },
    text: `You buy the **${item.name}** for **$${item.value}**. Remaining: $${state.player.currency - item.value}.`,
  };
}

function cmdSell(itemName, state, rs) {
  if (!itemName) return { stateUpdate: {}, text: 'Sell what?' };

  const merchant = rs.entities.find((e) => e.alive && e.type === 'npc' && entities[e.id]?.shop?.length > 0);
  if (!merchant) {
    return { stateUpdate: {}, text: 'There\'s no one here to sell to.' };
  }

  const idx = state.player.inventory.findIndex(
    (id) => id === itemName || items[id]?.name.toLowerCase() === itemName
  );
  if (idx === -1) {
    return { stateUpdate: {}, text: `You don't have "${itemName}".` };
  }

  const itemId = state.player.inventory[idx];
  const item = items[itemId];
  const sellPrice = Math.max(1, Math.floor(item.value / 2));
  const newInventory = [...state.player.inventory];
  newInventory.splice(idx, 1);

  let newWeapon = state.player.equippedWeapon;
  if (newWeapon === itemId) newWeapon = null;

  return {
    stateUpdate: {
      player: {
        ...state.player,
        currency: state.player.currency + sellPrice,
        inventory: newInventory,
        equippedWeapon: newWeapon,
      },
    },
    text: `You sell the **${item.name}** for **$${sellPrice}**.`,
  };
}

function cmdAttack(targetName, state, rs) {
  if (!targetName) return { stateUpdate: {}, text: 'Attack what?' };

  const entity = rs.entities.find(
    (e) => e.alive && e.name.toLowerCase().includes(targetName)
  );
  if (!entity) {
    return { stateUpdate: {}, text: `There's nothing called "${targetName}" here to attack.` };
  }
  if (entity.type === 'npc') {
    return { stateUpdate: {}, text: `**${entity.name}** is not hostile. Maybe try **talk to** them instead.` };
  }

  // Enter combat
  const weapon = state.player.equippedWeapon ? items[state.player.equippedWeapon] : null;
  const playerDmg = weapon ? weapon.damage : 5;
  const roll = Math.floor(Math.random() * 4) + playerDmg - 1;

  const newHp = Math.max(0, entity.hp - roll);
  let text = `⚔️ **Combat: ${entity.name}** (HP: ${entity.hp})\n\nYou strike with ${weapon ? `your **${weapon.name}**` : 'your fists'} for **${roll} damage**!`;

  if (newHp <= 0) {
    // Enemy defeated
    text += `\n\nThe **${entity.name}** is defeated!`;
    const def = entities[entity.id];
    const loot = def.loot || [];
    const xp = def.xpReward || 0;

    const newRoomState = { ...state.roomState };
    const newEntities = rs.entities.map((e) =>
      e.id === entity.id ? { ...e, hp: 0, alive: false } : e
    );
    const newRoomItems = [...rs.items, ...loot];
    newRoomState[state.currentRoom] = { ...rs, entities: newEntities, items: newRoomItems };

    if (loot.length > 0) {
      const lootNames = loot.map((id) => items[id]?.name || id).join(', ');
      text += `\n\n*Dropped:* ${lootNames}`;
    }

    const newXp = state.player.xp + xp;
    const newLevel = Math.floor(newXp / 50) + 1;
    const leveledUp = newLevel > state.player.level;
    text += `\n*+${xp} XP*`;
    if (leveledUp) {
      text += `\n\n🎉 **Level Up!** You are now level ${newLevel}. Max HP increased!`;
    }

    return {
      stateUpdate: {
        roomState: newRoomState,
        combatTarget: null,
        player: {
          ...state.player,
          xp: newXp,
          level: newLevel,
          maxHp: leveledUp ? state.player.maxHp + 10 : state.player.maxHp,
          hp: leveledUp ? Math.min(state.player.hp + 10, state.player.maxHp + 10) : state.player.hp,
        },
      },
      text,
    };
  }

  // Enemy survives, enter combat
  const enemyDmg = Math.floor(Math.random() * 4) + entity.damage - 1;
  const newPlayerHp = Math.max(0, state.player.hp - enemyDmg);

  text += `\n${entity.name} retaliates for **${enemyDmg} damage**!`;
  text += `\n\n*Your HP: ${newPlayerHp}/${state.player.maxHp} | ${entity.name} HP: ${newHp}*`;
  text += '\n\nType **attack** to continue fighting, **use [item]** to heal, or **flee** to run.';

  // Update entity HP in room state
  const newRoomState = { ...state.roomState };
  const newEntities = rs.entities.map((e) =>
    e.id === entity.id ? { ...e, hp: newHp } : e
  );
  newRoomState[state.currentRoom] = { ...rs, entities: newEntities };

  if (newPlayerHp <= 0) {
    return {
      stateUpdate: {
        player: { ...state.player, hp: 0 },
        gameOver: true,
        combatTarget: null,
      },
      text: `${text}\n\n---\n\n💀 **GAME OVER** — You have been defeated.\n\nType **restart** to begin again.`,
    };
  }

  return {
    stateUpdate: {
      player: { ...state.player, hp: newPlayerHp },
      roomState: newRoomState,
      combatTarget: entity.id,
    },
    text,
  };
}

function handleCombat(verb, rest, state, room, rs) {
  const entity = rs.entities.find((e) => e.id === state.combatTarget && e.alive);
  if (!entity) {
    return { stateUpdate: { combatTarget: null }, text: 'The fight is over.' };
  }

  if (verb === 'flee' || verb === 'run') {
    const dmg = Math.floor(Math.random() * entity.damage);
    const newHp = Math.max(0, state.player.hp - dmg);
    let text = `You turn and flee! ${entity.name} strikes you as you run for **${dmg} damage**. (HP: ${newHp}/${state.player.maxHp})`;
    if (newHp <= 0) {
      return {
        stateUpdate: { player: { ...state.player, hp: 0 }, gameOver: true, combatTarget: null },
        text: text + '\n\n💀 **GAME OVER**. Type **restart** to begin again.',
      };
    }
    return {
      stateUpdate: { combatTarget: null, player: { ...state.player, hp: newHp } },
      text,
    };
  }

  if (verb === 'use') {
    const result = cmdUse(rest, state);
    if (result.stateUpdate.player) {
      result.text += '\n\nYou\'re still in combat. **attack** or **flee**!';
    }
    return result;
  }

  if (verb === 'attack' || verb === 'hit' || verb === 'fight') {
    return cmdAttack(entity.name.toLowerCase(), { ...state, combatTarget: null }, rs);
  }

  return { stateUpdate: {}, text: 'You\'re in combat! **attack**, **use [item]**, or **flee**.' };
}

function cmdStats(state) {
  const weapon = state.player.equippedWeapon ? items[state.player.equippedWeapon] : null;
  const cities = [...state.visitedCities].join(', ');
  const text = `## Stats

| Stat | Value |
|------|-------|
| HP | ${state.player.hp} / ${state.player.maxHp} |
| Level | ${state.player.level} |
| XP | ${state.player.xp} |
| Currency | $${state.player.currency} |
| Weapon | ${weapon ? `${weapon.name} (${weapon.damage} dmg)` : 'Fists (5 dmg)'} |
| Cities Visited | ${cities} |`;

  return { stateUpdate: {}, text };
}
