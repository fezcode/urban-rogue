import { useReducer, useCallback } from 'react';
import { world } from '../data/world';
import { items } from '../data/items';
import { entities } from '../data/entities';

const START_ROOM = 'ny_times_square';

function createInitialState() {
  const roomState = {};
  for (const [id, room] of Object.entries(world)) {
    roomState[id] = {
      items: [...room.items],
      entities: room.entities.map((eid) => ({
        ...entities[eid],
        hp: entities[eid].hp,
        alive: true,
      })),
      visited: false,
    };
  }
  roomState[START_ROOM].visited = true;

  return {
    player: {
      hp: 100,
      maxHp: 100,
      currency: 25,
      inventory: [],
      equippedWeapon: null,
      xp: 0,
      level: 1,
      poisoned: false,
    },
    currentRoom: START_ROOM,
    roomState,
    messages: [
      {
        type: 'system',
        text: `# Urban Rogue\n\n*You step out of a yellow cab into the sensory assault of Times Square.*\n\n${world[START_ROOM].description}\n\nType **help** to see available commands.`,
      },
    ],
    flags: {},
    visitedCities: new Set(['New York']),
    combatTarget: null,
    gameOver: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_STATE':
      return { ...state, ...action.payload };
    case 'RESET':
      return createInitialState();
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, null, createInitialState);

  const addMessage = useCallback((type, text) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { type, text } });
  }, []);

  const updateState = useCallback((partial) => {
    dispatch({ type: 'SET_STATE', payload: partial });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return { state, addMessage, updateState, resetGame };
}

export { world, items, entities };
