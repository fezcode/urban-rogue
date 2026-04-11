# Urban Rogue - Game Design & Implementation Plan

## Objective
Create a sleek, browser-based text adventure (roguelike) featuring a "Claude Dark Mode" aesthetic. The game will be an interactive fiction experience where the user interacts via a chat-like terminal, exploring modern urban environments (New York, Istanbul, Ankara, Tokyo, Rome).

## Aesthetic & UI Design: "Claude Dark Mode"
The visual language must mimic a premium, modern AI chat interface (like Claude.ai or Cursor.ai), characterized by minimalism, high-contrast dark themes, elegant typography, and subtle interactions.

*   **Color Palette:**
    *   Background: Deep, rich dark gray (e.g., `#121212` or `#0A0A0A`).
    *   Surface/Panels: Slightly lighter gray (`#1E1E1E`).
    *   Text (Primary): Off-white/Silver (`#EDEDED`).
    *   Text (Muted/System): Cool Gray (`#888888`).
    *   Accents/Highlights: Subtle amber or soft blue to indicate actionable items or system states.
*   **Typography:**
    *   Headers/Locations: A refined serif (e.g., Playfair Display or similar elegant font).
    *   Body/Narrative: Clean, legible sans-serif (e.g., Inter, Outfit, or system-ui).
    *   Code/System Data: Monospace (JetBrains Mono or Fira Code).
*   **Layout:**
    *   **Two-Pane Structure:**
        1.  **Left Sidebar (The Context Window):** Displays vital "System State" metrics (Health, Currency, Inventory, Current City, Active Quests). This area is static but updates dynamically as the game progresses.
        2.  **Main Viewport (The Feed):** A scrolling, chat-like interface.
            *   User commands appear as right-aligned or distinctly styled "user prompts".
            *   The game's narrative responses appear as left-aligned "AI responses," utilizing markdown formatting (bolding key items, quoting dialogue, rendering tables for stats).
    *   **Bottom Input Bar:** A fixed, pill-shaped input field with a subtle glowing border on focus, mimicking an AI prompt box.

## Core Gameplay Mechanics
The game operates on a text parser engine, interpreting natural language-like commands.

### 1. The World & Travel
*   **Nodes:** Each city is comprised of interconnected "Nodes" (e.g., "Shibuya Crossing," "Kızılay Square," "Brooklyn Subway").
*   **Navigation:** Movement is cardinal (`go north`, `go south`, etc.) or contextual (`enter metro`, `fly to Rome` at an airport).
*   **The Cities:**
    *   **New York:** Concrete canyons, hidden speakeasies, subway tunnels.
    *   **Istanbul:** Ancient bazaars, ferry terminals, narrow cats-filled streets.
    *   **Ankara:** Bureaucratic brutalism, snowy parks, underground malls.
    *   **Tokyo:** Neon-drenched alleys, silent shrines, high-speed rail stations.
    *   **Rome:** Sun-baked ruins, bustling piazzas, subterranean catacombs.

### 2. The Parser (Commands)
The engine must parse and execute fundamental MUD/Interactive Fiction commands:
*   `look` or `l`: Describes the current location, exits, items, and NPCs.
*   `go [direction]` or `[n/s/e/w]`: Moves the player to an adjacent node.
*   `take [item]` or `get [item]`: Adds an item in the room to the inventory.
*   `inventory` or `i`: Lists current possessions.
*   `use [item] on [target]`: Applies an item (e.g., `use key on door`, `use bandage`).
*   `talk to [npc]`: Initiates dialogue.
*   `attack [target]` or `hit [target]`: Initiates combat.
*   `buy [item]` / `sell [item]`: Merchant interactions.
*   `help`: Lists available commands.

### 3. Encounters & State Management
*   **Procedural Generation:** While major city landmarks are fixed, connecting streets, minor encounters, and loot are procedurally generated upon entry.
*   **Entities:**
    *   **NPCs:** Provide lore, quests, or trade.
    *   **Hostiles:** Initiate turn-based combat (e.g., "Rogue Drone," "Desperate Pickpocket," "Corrupted ATM").
*   **State Hook:** The game state (Player HP, Inventory, Current Node, World State Flags) will be managed via a robust React context or reducer to ensure the UI updates instantly when commands are executed.

## Technical Architecture (React/Vite setup assumed)

### Data Structures
1.  **Room/Node Object:**
    ```json
    {
      "id": "tokyo_shibuya_01",
      "name": "Shibuya Crossing",
      "description": "A sea of umbrellas under neon rain. The scramble is deafening. To the north lies the station.",
      "exits": { "north": "tokyo_station_01", "east": "tokyo_alley_02" },
      "items": ["broken_umbrella", "¥500_coin"],
      "entities": ["salaryman_npc"]
    }
    ```
2.  **Item Object:** `id`, `name`, `description`, `type` (weapon, consumable, key), `value`.
3.  **Entity Object:** `id`, `name`, `description`, `hp`, `dialogueTree`, `lootDrop`.

### Components
1.  **`GameLayout`:** The master container managing the split panes.
2.  **`SidebarContext`:** Renders the player's stats and inventory.
3.  **`ChatFeed`:** The main scrolling container. Renders a list of `Message` components.
4.  **`Message`:** A stylized chat bubble. Can differentiate between `type: 'user'` (the command) and `type: 'system'` (the game's response). Supports markdown rendering.
5.  **`CommandInput`:** The text input field at the bottom. Handles `Enter` key presses, history cycling (Up/Down arrows like a real terminal), and focus management.

### The Engine Loop
1.  User types command -> hits Enter.
2.  `handleCommand(input)` is called.
3.  Append user command to `messageHistory`.
4.  Parse command (verb + noun).
5.  Check against current game state (is the noun here? is the path open?).
6.  Execute action -> Update Game State (e.g., reduce HP, move to new room).
7.  Generate narrative text response.
8.  Append narrative response to `messageHistory`.
9.  `ChatFeed` auto-scrolls to bottom.

## Implementation Phases

### Phase 1: Engine Foundation & UI Shell
*   Set up the React project structure.
*   Build the CSS/Tailwind framework for the "Claude Dark Mode" aesthetic.
*   Implement the `GameLayout`, `SidebarContext`, `ChatFeed`, and `CommandInput`.
*   Create the basic state hook (`useGameState`) with dummy data.

### Phase 2: Parser & Core Logic
*   Implement the verb-noun parsing system.
*   Write handlers for `look`, `go`, `inventory`, and `take`.
*   Create a small mock map (e.g., just 3-4 rooms in one city) to test navigation.

### Phase 3: Content Generation (The Cities)
*   Flesh out the JSON structures for New York, Istanbul, Ankara, Tokyo, and Rome.
*   Define the airport/transit nodes connecting them.
*   Populate rooms with atmospheric descriptions, items, and basic NPCs.

### Phase 4: Advanced Mechanics
*   Implement the combat system (`attack`, enemy AI/response loop).
*   Add the dialogue tree system for `talk to`.
*   Implement the economy (`buy`/`sell` with currency).

### Phase 5: Polish & Polish
*   Add typewriter animations to the system responses.
*   Implement command history (up/down arrows).
*   Save/Load functionality (using `localStorage`).
*   Sound design (subtle mechanical keystrokes, ambient city noise - optional).

## Future Expansion Ideas
*   **LLM Integration:** Hook the NPC dialogue or room descriptions up to an actual LLM API for infinite, dynamic content, truly realizing the "AI Chat" aesthetic.
*   **Dynamic Visuals:** As you change cities, the subtle background glow or accent color of the dark theme shifts (e.g., neon pink for Tokyo, warm amber for Rome).

## Storage
*  Store the game data on local storage of the browser and allow user to reset