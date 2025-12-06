# FILE TREE & QUICK REFERENCE

```
living-room-games/
├── index.html                          (12 lines)   - Main HTML, app root
├── package.json                        (18 lines)   - Dependencies
├── vite.config.js                      (10 lines)   - Vite config
├── .gitignore                          (4 lines)    - Git ignore
├── README.md                           (400+ lines) - Full documentation
├── QUICKSTART.md                       (80 lines)   - 5-minute setup
├── ARCHITECTURE.md                     (450 lines)  - This file
│
└── src/
    ├── main.js                         (20 lines)   - Entry point
    ├── router.js                       (60 lines)   - Hash router
    │
    ├── firebase/
    │   ├── firebaseConfig.js           (25 lines)   - Firebase init
    │   └── roomService.js              (220 lines)  - Database operations
    │
    ├── host/
    │   ├── hostView.js                 (150 lines)  - Host UI rendering
    │   ├── hostController.js           (264 lines)  - Host game logic
    │   └── tanksHostGame.js            (180 lines)  - Canvas & rendering
    │
    ├── player/
    │   ├── playerView.js               (170 lines)  - Player UI
    │   └── playerController.js         (280 lines)  - Player input handling
    │
    ├── games/
    │   ├── gameRegistry.js             (40 lines)   - Game registry
    │   └── tanksGameLogic.js           (220 lines)  - Game physics/logic
    │
    ├── utils/
    │   └── domUtils.js                 (80 lines)   - DOM helpers
    │
    └── styles/
        └── main.css                    (420 lines)  - Complete styling
```

---

# MODULE DEPENDENCIES

```
main.js
├── firebaseConfig.js        (Initialize Firebase)
├── router.js                (Setup routing)
├── hostController.js
│   ├── hostView.js
│   ├── tanksHostGame.js     ← Canvas rendering
│   ├── roomService.js       ← Firebase
│   └── tanksGameLogic.js    ← Game physics
└── playerController.js
    ├── playerView.js
    ├── roomService.js       ← Firebase
    ├── gameRegistry.js      ← Game info
    └── domUtils.js          ← DOM helpers

domUtils.js                  (No dependencies)
```

---

# EXECUTION FLOW

## Application Start

```
User opens browser
     ↓
index.html loads main.js
     ↓
main.js initializes Firebase
     ↓
Router sets up hashchange listener
     ↓
Display landing page
     ↓
User chooses: Host OR Join
```

## Host Flow

```
Click "Host a Game"
     ↓
router.js mounts hostController
     ↓
hostController shows create room button
     ↓
User clicks "Create Room"
     ↓
hostController calls createRoom(db)
     ↓
Firebase: /rooms/{code}/info created
     ↓
hostController starts listening to:
  - Room info (phase, game)
  - Players joining
  - Player inputs
     ↓
User selects "Tanks War" game
     ↓
User clicks "Start Game"
     ↓
hostController calls initTanksGameState(db)
     ↓
Firebase: /games/tanks/state created
     ↓
hostController starts game loop (RAF)
     ↓
Canvas rendering every frame
     ↓
Game physics updates at 60fps
     ↓
Game state synced to Firebase every 100ms
     ↓
detectWinner() returns winning playerId
     ↓
Show results screen
     ↓
Host can "Play Again" → same room/players
```

## Player Flow

```
Click "Join a Game"
     ↓
router.js mounts playerController
     ↓
playerController shows join form
     ↓
User enters room code + name
     ↓
playerController calls joinRoomAsPlayer()
     ↓
Firebase: Check if room exists + phase!="inGame"
     ↓
Firebase: /rooms/{code}/players/{playerId} created
     ↓
playerController starts listening to room phase
     ↓
Show "Waiting for game..."
     ↓
Host starts game (phase becomes "inGame")
     ↓
playerController detects phase change
     ↓
Show game controller (4 arrows + shoot)
     ↓
User presses buttons
     ↓
Button handlers update buttonState
     ↓
updateInputState() calculates moveX, moveY, shoot
     ↓
Throttled update to Firebase (/inputs/{playerId})
     ↓
Host reads inputs, passes to game loop
     ↓
Tank moves/rotates/shoots
     ↓
Game ends, phase becomes "results"
     ↓
playerController detects phase change
     ↓
Show results screen
```

---

# FIREBASE DATA SYNC

## Room Info (Realtime)

```
Host updates:
  setRoomPhaseAndGame(db, roomCode, phase, gameId)

Players listen:
  listenToRoomInfo(db, roomCode, callback)

Phases:
  "lobby"    - Waiting to start
  "inGame"   - Game running (no new joins)
  "results"  - Game finished, waiting to restart
```

## Players (Realtime)

```
Player on join:
  /rooms/{code}/players/{playerId} ← {name, color, joinedAt, connected}

Host listens:
  listenToPlayers(db, roomCode, callback) ← gets array of all players

Color assigned:
  Cycling through palette: [#FF6B6B, #4ECDC4, #45B7D1, ...]
```

## Inputs (20 updates/sec max)

```
Player sends:
  updatePlayerInput(db, roomCode, playerId, {moveX, moveY, shoot})

Host listens:
  listenToInputs(db, roomCode, callback) ← gets all inputs

Throttled:
  Player-side: max every 50ms (20/sec)
  Firebase: max every 16ms (browser limit)
```

## Game State (Every 100ms)

```
Initial state:
  initTanksGameState(db, roomCode, players)
  ↓
  /rooms/{code}/games/tanks/state
  {
    startedAt, finishedAt, winnerPlayerId,
    tanks: {
      {playerId}: {x, y, angle, hp, alive}
    },
    bullets: {
      {bulletId}: {x, y, vx, vy, ownerPlayerId}
    }
  }

Host updates:
  updateTanksGameState(db, roomCode, statePatch)

Frequency:
  Every ~100ms (only host writes)

Used for:
  - Persistence
  - Leaderboards (future)
  - Replay (future)
```

---

# KEY TIMINGS

```
Host-side:
  Game logic loop:     ~16ms (60fps)
  Firebase sync:       ~100ms (10fps for persistence)

Player-side:
  Button inputs:       Instant
  Firebase upload:     Throttled to 50ms (20/sec max)

Network:
  Firebase latency:    ~50-200ms typical

Result:
  Responsive controls (instant local feedback)
  Smooth 60fps gameplay
  All clients stay synchronized
```

---

# SCALABILITY LIMITS

```
Players per room:
  Theoretical: Unlimited
  Practical: 6 (color palette, screen space)
  Can be increased: Add more colors, adjust UI

Rooms per database:
  Practical: Millions
  Cost: Pay per GB stored
  Cleanup: Periodic script needed

Bullet count:
  Per game: ~30-50 max practical
  Physics: O(n²) collision check (acceptable for 50)

Network bandwidth:
  Per player input: ~30 bytes
  Per game state: ~500 bytes
  Per second: ~1KB per player + 5KB host

Firebase Realtime Database limits:
  Reads: ~100 per second per client (plenty)
  Writes: ~10 per second per client (throttle to 20 inputs/sec)
  Connection: 1 per client needed
```

---

# COMMON MODIFICATIONS

### Change tank speed

```javascript
// src/games/tanksGameLogic.js
export const TANK_SPEED = 150; // pixels per second
// → Change to 200 for faster, 100 for slower
```

### Change bullet speed

```javascript
export const BULLET_SPEED = 300; // pixels per second
```

### Add more player colors

```javascript
// src/firebase/roomService.js
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1", // existing
  "#YOUR_COLOR_1",
  "#YOUR_COLOR_2", // add more
];
```

### Change arena size

```javascript
// src/host/tanksHostGame.js, line: const ARENA_WIDTH = 800;
// Change canvas width/height attributes in HTML if needed
```

### Adjust game balance

```javascript
// src/games/tanksGameLogic.js
export const TANK_HP = 3; // hits to die
export const SHOOT_COOLDOWN = 300; // ms between shots
export const TURN_SPEED = Math.PI * 2; // rotation speed
```

### Change input throttle

```javascript
// src/player/playerController.js
const INPUT_THROTTLE_MS = 50; // max 20 updates/sec
// → 100 for 10/sec (lag-like), 25 for 40/sec (heavy network)
```

---

# DEBUGGING TIPS

### View Firebase data in real-time

```javascript
// Open browser console on host
console.log(gameState); // See current game state
console.log(currentInputs); // See all player inputs
```

### Monitor network traffic

```
Browser DevTools → Network tab → WS (WebSocket)
Watch Firebase connections for data flow
```

### Test locally without Firebase

```javascript
// In hostController.js, replace Firebase calls with:
const mockGameState = {tanks: {...}, bullets: {...}};
// Useful for testing UI without Firebase setup
```

### Check player positions

```javascript
// src/host/tanksHostGame.js, add to draw function:
ctx.fillStyle = "#aaa";
ctx.font = "12px monospace";
state.tanks.forEach(({ playerId, x, y }) => {
  ctx.fillText(`${playerId}:(${x | 0},${y | 0})`, x, y - 30);
});
```

---

# NEXT STEPS

1. **Install & configure**: Follow QUICKSTART.md
2. **Test locally**: `pnpm dev` on desktop + phone
3. **Deploy**: `pnpm build` → GitHub Pages
4. **Add games**: Extend gameRegistry + create new logic/views
5. **Customize**: Modify colors, speeds, UI
6. **Scale**: Monitor Firebase usage, optimize for your needs

---

**This project is production-ready!** 🚀
