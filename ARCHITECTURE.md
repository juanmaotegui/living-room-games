# PROJECT STRUCTURE SUMMARY

## Complete Vite + Firebase Realtime Database Multiplayer Game Platform

### Root Files

- `package.json` - Dependencies (Vite 5.4.0, Firebase 10.7.0)
- `vite.config.js` - Vite configuration with base path for GitHub Pages
- `index.html` - Main HTML with app root and script entry
- `.gitignore` - Node modules, dist, and OS files
- `README.md` - Full documentation (40+ sections)
- `QUICKSTART.md` - 5-minute setup guide

### Source Structure

#### `/src/main.js`

- **Purpose**: Entry point and initialization
- **Responsibilities**:
  - Initialize Firebase (once, globally)
  - Set up router
  - Wire controllers

#### `/src/router.js`

- **Purpose**: Hash-based routing (#/, #/host, #/player)
- **Features**:
  - Simple landing page with "Host" and "Join" buttons
  - Auto-unmounts previous view
  - Wires up correct controller

#### `/src/firebase/`

**firebaseConfig.js**

- Firebase initialization (`initFirebase()`)
- Placeholder config with TODO comments
- Notes about public config + security via rules

**roomService.js**

- 12+ exported functions for database operations:
  - `generateRoomCode()` - 4-letter codes
  - `createRoom()` - Initialize new room with host
  - `joinRoomAsPlayer()` - Add player to existing room
  - `listenToRoomInfo()` - Watch room phase/game
  - `listenToPlayers()` - Watch all players
  - `listenToInputs()` - Watch player inputs
  - `setRoomPhaseAndGame()` - Change game state
  - `updatePlayerInput()` - Player sends controls
  - `initTanksGameState()` - Create tanks game
  - `updateTanksGameState()` - Persist game state
  - `listenToTanksGameState()` - Watch game
  - `deleteRoom()` - Cleanup

#### `/src/host/`

**hostView.js**

- Pure DOM rendering (no logic)
- Sections:
  - Room creation (button → room code display)
  - Players list (badges with colors)
  - Game selection (dropdown for tanks)
  - Controls (start/end game buttons)
  - Canvas container (800x600)
  - Results screen (winner announcement)
- No Firebase knowledge

**hostController.js**

- Main orchestrator for host side
- Lifecycle:
  1. Create room on button click
  2. Listen to room info, players, inputs
  3. Select game from dropdown
  4. Start game → Initialize Firebase state
  5. Run game loop with inputs
  6. Detect winner → Show results
  7. Back to lobby (same players, same room)
- Coordinates: view + Firebase + game loop

**tanksHostGame.js**

- Canvas-based game rendering
- Game loop via `requestAnimationFrame`
- Exports `startTanksGameLoop()` and `stopTanksGameLoop()`
- Rendering:
  - Grid background
  - Tanks as colored rectangles with turrets
  - Bullets as glowing circles
  - HP bars above tanks
  - Death X for eliminated tanks
  - Arena border

#### `/src/player/`

**playerView.js**

- Pure DOM rendering for 3 states:
  1. Join form (room code + name inputs)
  2. Waiting lobby (show player color, waiting message)
  3. Game controller (4 directions + shoot button)
  4. Results screen
- Touch-friendly buttons
- Support for keyboard (WASD, Space)

**playerController.js**

- Main orchestrator for player side
- Lifecycle:
  1. Show join form
  2. On submit: call `joinRoomAsPlayer()`
  3. Listen to room phase
  4. When phase=inGame: show controller
  5. Button presses → Update local input state
  6. Throttled updates to Firebase (20/sec)
- Button state tracking (pressed/released)
- Keyboard support (arrow keys + WASD + space)
- Supports touch + mouse + keyboard

#### `/src/games/`

**gameRegistry.js**

- Centralized game metadata
- `GAMES` object with:
  - `id`, `name`, `minPlayers`, `maxPlayers`
- Helpers:
  - `getAvailableGameIds()`
  - `getGameInfo(gameId)`
  - `isValidGameId(gameId)`
- Easy to extend: just add to GAMES object

**tanksGameLogic.js**

- Pure game logic (no rendering, no Firebase)
- Constants: TANK_SPEED, BULLET_SPEED, TANK_RADIUS, etc.
- Key functions:
  - `createInitialTanksState()` - Setup
  - `updateTanksState()` - Physics & collision
  - `detectWinner()` - Win condition
  - `getAliveTankIds()` - Helper
- Physics:
  - Movement: keyboard input → position update
  - Rotation: horizontal input → angle change
  - Shooting: cooldown + velocity calculations
  - Bullets: linear motion, out-of-bounds removal
  - Collision: AABB (distance-based) bullet→tank
  - HP: 3 hits, then eliminated

#### `/src/utils/`

**domUtils.js**

- Small helper functions:
  - `qs()`, `qsa()` - Query selectors
  - `on()`, `off()` - Event listeners
  - `show()`, `hide()`, `setVisible()` - Visibility
  - `setText()` - Update text
  - `createElement()` - Create elements
  - `copyToClipboard()` - Clipboard

#### `/src/styles/`

**main.css**

- 400+ lines of styling
- Layout:
  - Header with title
  - Card-based sections
  - Responsive grid for controller
  - Canvas container
- Components:
  - Buttons (primary, danger, disabled states)
  - Form inputs
  - Player badges with colors
  - HP bars
  - Mobile responsive

---

## DATA FLOW

### Host Creation Flow

1. User clicks "Create Room"
2. `hostController.handleCreateRoom()`
3. Calls `createRoom(db)` → Firebase creates `/rooms/{code}/info`
4. Displays room code + URL for players
5. Starts listeners: room info, players, inputs
6. UI shows players as they join

### Player Join Flow

1. User enters room code + name
2. `playerController.handleJoinRoom()`
3. Calls `joinRoomAsPlayer(db, code, name)`
4. Firebase: Check phase (reject if inGame)
5. Create `/rooms/{code}/players/{playerId}`
6. Start listener to room phase
7. Show waiting screen until game starts

### Game Start Flow

1. Host selects "Tanks War" in dropdown
2. Host clicks "Start Game"
3. Set room phase to "inGame" + currentGameId="tanks"
4. `initTanksGameState()` creates initial state in Firebase
5. Show canvas on host
6. Show controller buttons on players
7. Start game loop:
   - Read player inputs every frame
   - Update physics (~60fps)
   - Detect winner
   - Render to canvas
   - Sync to Firebase every ~100ms

### Player Input Flow

1. Player presses button (or keyboard)
2. `playerController` updates local input state
3. Throttles to Firebase (max 20/sec)
4. Host reads inputs via listener
5. Game loop uses current inputs for physics
6. Next frame: tank moves/rotates/shoots

### Game End Flow

1. Game loop detects winner (1 alive tank)
2. `hostController.handleGameEnd(winnerId)`
3. Set phase to "results"
4. Show winner on host
5. Show results on players
6. Players back to waiting
7. Host can restart with "Play Again"

---

## KEY DESIGN DECISIONS

1. **No backend/server** - All logic runs on client, Firebase RTDB is only data store
2. **Hash-based routing** - Simple, no server routing needed
3. **Separate game logic** - `tanksGameLogic.js` has no Firebase/rendering
4. **Throttled inputs** - 20/sec to Firebase, full 60fps locally
5. **Periodic state sync** - Every ~100ms update Firebase (enough for network)
6. **Host is orchestrator** - Only host runs game loop and determines state
7. **Players are read-only** - They only send inputs and read game state
8. **Room codes** - 4 uppercase letters (36^4 = 1.6M possible, low collision)
9. **Color assignment** - Cycling palette (6 colors) assigned on join
10. **Collision is distance-based** - Simple circle-circle, fast to compute

---

## EXTENSIBILITY POINTS

### Adding a New Game

1. **Register in gameRegistry.js**

   ```js
   const GAMES = {
     myGame: {
       id: "myGame",
       name: "My Game",
       minPlayers: 2,
       maxPlayers: 4,
     },
   };
   ```

2. **Create game logic** (`src/games/myGameLogic.js`)

   - Export: `createInitialState()`, `updateState()`, `detectWinner()`

3. **Create host game** (`src/host/myHostGame.js`)

   - Export: `startMyGameLoop({ canvas, roomCode, db, ... })`

4. **Update hostController.js**

   - Add case in `startTanksGame()` → `if (currentGameId === 'myGame') { startMyGameLoop(...) }`

5. **Update playerController.js**
   - Add UI rendering when `currentGameId === 'myGame'`

### Customizing UI

- Edit `src/styles/main.css` for styling
- Modify `hostView.js` and `playerView.js` for layout
- Controller buttons are in `playerView.js` grid

### Changing Game Settings

- `tanksGameLogic.js` has constants at top (speeds, HP, sizes)
- Game arena size: `tanksHostGame.js` canvas dimensions
- Colors palette: `roomService.js` COLORS array

---

## FILE COUNT & SIZE ESTIMATE

- **JS Files**: 13 files, ~2500 lines
- **CSS**: 1 file, ~400 lines
- **HTML**: 1 file, ~12 lines
- **Config**: 3 files (package.json, vite.config.js, .gitignore)
- **Docs**: 3 files (README.md, QUICKSTART.md, this file)

**Total source**: ~3000 lines, easily readable and maintainable

---

## DEPLOYMENT CHECKLIST

- [ ] Fill in Firebase config in `src/firebase/firebaseConfig.js`
- [ ] Set Firebase RTDB rules (see README)
- [ ] Test locally with `pnpm dev`
- [ ] Build with `pnpm build`
- [ ] Update `vite.config.js` base path for GitHub Pages
- [ ] Deploy `dist` to GitHub Pages
- [ ] Share public URL with players

---

## TESTING CHECKLIST

- [ ] Host can create room
- [ ] Players can join with room code
- [ ] Room code and color display correctly
- [ ] Cannot join while game in progress
- [ ] Can select game (Tanks War)
- [ ] Start Game button enables/disables correctly
- [ ] Game starts when host clicks Start
- [ ] Tanks render on canvas
- [ ] Tank movement works (arrows/WASD)
- [ ] Tank rotation works
- [ ] Bullets fire and move
- [ ] Collision detection works (bullets hit tanks)
- [ ] HP decreases on hits
- [ ] Tank dies at 0 HP
- [ ] Winner detected when 1 tank alive
- [ ] Results screen shows
- [ ] Can play again in same room
- [ ] Mobile button controls work
- [ ] Keyboard controls work
- [ ] Works on multiple devices

---

**Ready to deploy!** 🚀
