import { useCallback, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { handleCommand } from './engine/parser';
import { world } from './data/world';
import Sidebar from './components/Sidebar';
import ChatFeed from './components/ChatFeed';
import CommandInput from './components/CommandInput';
import CityArrival from './components/CityArrival';
import './App.css';

const SAVE_KEY = 'urban-rogue-save';

function serializeState(state) {
  return JSON.stringify({
    ...state,
    visitedCities: [...state.visitedCities],
  });
}

function deserializeState(json) {
  const parsed = JSON.parse(json);
  return {
    ...parsed,
    visitedCities: new Set(parsed.visitedCities),
  };
}

function App() {
  const { state, addMessage, updateState, resetGame } = useGameState();
  const [cityTransition, setCityTransition] = useState(null);

  const onCommand = useCallback(
    (input) => {
      addMessage('user', input);

      if (state.gameOver && input.toLowerCase() !== 'restart') {
        addMessage('system', 'You are dead. Type **restart** to begin again.');
        return;
      }

      const result = handleCommand(input, state);
      if (!result) return;

      if (result.doSave) {
        try {
          localStorage.setItem(SAVE_KEY, serializeState(state));
          addMessage('system', 'Game saved successfully.');
        } catch {
          addMessage('system', 'Failed to save game.');
        }
        return;
      }

      if (result.doLoad) {
        try {
          const saved = localStorage.getItem(SAVE_KEY);
          if (!saved) {
            addMessage('system', 'No saved game found.');
            return;
          }
          const loaded = deserializeState(saved);
          updateState(loaded);
          addMessage('system', 'Game loaded. Type **look** to see your surroundings.');
        } catch {
          addMessage('system', 'Failed to load saved game.');
        }
        return;
      }

      if (result.doReset) {
        resetGame();
        setCityTransition(null);
        return;
      }

      if (result.stateUpdate && Object.keys(result.stateUpdate).length > 0) {
        updateState(result.stateUpdate);
      }

      // Detect city transition: only show skyline when flying (cityTransition field is set)
      if (result.cityTransition) {
        const prevCity = world[state.currentRoom]?.city;
        if (prevCity !== result.cityTransition) {
          setCityTransition(result.cityTransition);
        }
      }

      if (result.text) {
        addMessage('system', result.text);
      }
    },
    [state, addMessage, updateState, resetGame]
  );

  return (
    <div className="game-layout">
      <Sidebar
        player={state.player}
        currentRoom={state.currentRoom}
        visitedCities={state.visitedCities}
      />
      <div className="main-viewport">
        <ChatFeed messages={state.messages} />
        <CommandInput onSubmit={onCommand} disabled={false} />
      </div>

      {cityTransition && (
        <CityArrival
          city={cityTransition}
          onComplete={() => setCityTransition(null)}
        />
      )}
    </div>
  );
}

export default App;
