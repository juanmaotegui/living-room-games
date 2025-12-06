# Living Room Games 🎮

A multiplayer web game platform built with vanilla JavaScript, Vite, and Firebase Realtime Database. Perfect for playing games together on the TV with multiple players joining from their phones.

## Features

- **Host & Players Architecture**: One TV host displays the game, multiple players control via phones
- **Real-time Synchronization**: Firebase Realtime Database keeps all clients in sync
- **Room-based Gameplay**: Players join via 4-letter room codes
- **Multiple Games**: Currently includes "Tanks War" with an extensible architecture for adding more games
- **Phone Controls**: Touch-friendly buttons for mobile players
- **Static Site**: Deploy to GitHub Pages with no backend required

## Current Games

### Tanks War 🏹

- Control a tank with directional movement
- Rotate turret and shoot bullets
- Last tank alive wins
- Supports 2-6 players
- Real-time collision detection

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Build Tool**: Vite (latest)
- **Backend**: Firebase Realtime Database (no custom server)
- **Deployment**: GitHub Pages (static site)

## Getting Started

### Prerequisites

- Node.js 16+ with pnpm
- A Firebase project with Realtime Database enabled

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd living-room-games
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Realtime Database
   - Copy your project credentials
   - Edit `src/firebase/firebaseConfig.js` and replace the placeholder values:
     ```js
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
     ```

4. Set up Firebase Security Rules:
   In the Firebase Console, go to Realtime Database > Rules and set:
   ```json
   {
     "rules": {
       "rooms": {
         "$roomCode": {
           ".read": true,
           ".write": true,
           "info": {
             ".validate": "newData.hasChildren(['code', 'hostSessionId', 'phase', 'currentGameId', 'createdAt'])"
           },
           "players": {
             "$playerId": {
               ".validate": "newData.hasChildren(['name', 'color', 'joinedAt', 'connected'])"
             }
           },
           "inputs": {
             "$playerId": {
               ".validate": "newData.hasChildren(['moveX', 'moveY', 'shoot', 'updatedAt'])"
             }
           },
           "games": {
             "tanks": {
               "state": {
                 ".validate": "newData.hasChildren(['startedAt', 'tanks', 'bullets']) && newData.child('tanks').numChildren() > 0"
               }
             }
           }
         }
       }
     }
   }
   ```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

- **Host**: Go to `http://localhost:5173/#/host`
- **Player**: Go to `http://localhost:5173/#/player` (or use the room code link)

### Build

Build for production:

```bash
pnpm build
```

Preview the built site:

```bash
pnpm preview
```

## Deployment to GitHub Pages

1. Update `vite.config.js` to set the correct base path:

   ```js
   export default defineConfig({
     base: "/your-repo-name/", // Replace with your repository name
   });
   ```

2. Build the project:

   ```bash
   pnpm build
   ```

3. Deploy the `dist` folder to GitHub Pages:

   ```bash
   # Using GitHub CLI
   gh pages deploy dist --source

   # Or manually push to gh-pages branch
   git branch -D gh-pages 2>/dev/null
   git checkout --orphan gh-pages
   git --work-tree=dist add --all
   git --work-tree=dist commit -m "deploy"
   git push origin gh-pages:gh-pages --force
   git checkout main
   ```

Your game will be available at `https://your-username.github.io/your-repo-name`

## Project Structure

```
src/
├── main.js                 # Entry point and router setup
├── router.js              # Hash-based routing (host/player views)
├── firebase/
│   ├── firebaseConfig.js  # Firebase initialization
│   └── roomService.js     # Realtime Database operations
├── host/
│   ├── hostView.js        # Host UI rendering
│   ├── hostController.js  # Host game logic & orchestration
│   └── tanksHostGame.js   # Tanks canvas rendering & game loop
├── player/
│   ├── playerView.js      # Player UI rendering
│   └── playerController.js# Player input & state management
├── games/
│   ├── gameRegistry.js    # Game registry & metadata
│   └── tanksGameLogic.js  # Game logic (model & collision)
├── utils/
│   └── domUtils.js        # DOM manipulation helpers
└── styles/
    └── main.css           # Styling for all views
```

## Game Flow

### Host Side

1. Click "Create Room" → Get a 4-letter room code
2. Share the code with players (or display as QR code)
3. Wait for players to join
4. Select a game (currently only "Tanks War")
5. Click "Start Game" to begin
6. Watch the game on the TV via canvas
7. After game ends, can start another game with the same players

### Player Side

1. Enter room code and name
2. Wait in lobby for host to start game
3. When game starts, see the controller UI (game-specific)
4. Use buttons/keyboard to control tank
5. Game ends when only one player remains alive
6. Return to waiting screen for next game

## Adding New Games

To add a new game:

1. **Register the game** in `src/games/gameRegistry.js`:

   ```js
   export const GAMES = {
     myNewGame: {
       id: "myNewGame",
       name: "My New Game",
       minPlayers: 2,
       maxPlayers: 6,
     },
     // ... existing games
   };
   ```

2. **Create game logic** in `src/games/myNewGameLogic.js`:

   - Export functions like `updateGameState()`, `detectWinner()`
   - Keep logic separate from rendering

3. **Create host game** in `src/host/myNewHostGame.js`:

   - Implement `startMyNewGameLoop()` function
   - Handle canvas rendering and game loop

4. **Update host controller** (`src/host/hostController.js`):

   - Add case for starting your new game in `handleStartGame()`

5. **Create player controller extension** (`src/player/playerController.js`):
   - Add game-specific UI rendering when `currentGameId === 'myNewGame'`

## Firebase Data Model

### Room Structure

```
/rooms/{roomCode}/
  info/
    - code: string
    - hostSessionId: string
    - phase: "lobby" | "inGame" | "results"
    - currentGameId: string | null
    - createdAt: number
  players/{playerId}/
    - name: string
    - color: string
    - joinedAt: number
    - connected: boolean
  inputs/{playerId}/
    - moveX: -1|0|1
    - moveY: -1|0|1
    - shoot: boolean
    - updatedAt: number
  games/tanks/state/
    - startedAt: number
    - finishedAt: number | null
    - winnerPlayerId: string | null
    - tanks/{playerId}/...
    - bullets/{bulletId}/...
```

## Performance Notes

- Game updates run at ~60 FPS for smooth movement
- Player inputs are throttled to 20 updates/second to reduce Firebase writes
- Game state is synced to Firebase every ~100ms for persistence
- Canvas uses `image-rendering: crisp-edges` for pixel-perfect graphics

## Known Limitations

- No persistent leaderboard (would require backend/auth)
- Rooms are not cleaned up automatically (manual cleanup via Firebase)
- Maximum 6 players supported (adjustable)
- No sound effects (yet)

## Troubleshooting

### "Cannot join while game in progress"

Players can only join during lobby or results phase. Wait for the current game to end.

### Inputs not registering

- Check browser console for Firebase errors
- Ensure Firebase config is correct
- Verify database rules allow read/write

### Canvas not rendering

- Check browser console for WebGL errors
- Ensure hardware acceleration is enabled
- Try a different browser

## Future Enhancements

- [ ] Additional games (Snake, Trivia, etc.)
- [ ] Leaderboard with persistent scores
- [ ] Custom player avatars
- [ ] Game variations/difficulty levels
- [ ] Sound effects & music
- [ ] QR code generation for easy joining
- [ ] Spectator mode for additional players
- [ ] AI opponent

## License

MIT

## Contributing

Contributions welcome! Feel free to add games, features, or fixes.

## Support

For issues or questions, please open an issue on GitHub.
