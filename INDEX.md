# 📖 PROJECT DOCUMENTATION INDEX

Welcome to **Living Room Games** - A complete multiplayer web game platform!

## 🚀 Quick Start (5 Minutes)

**Start here if you want to get the game running immediately:**

→ [QUICKSTART.md](./QUICKSTART.md)

- Firebase configuration
- Running locally
- Testing with host + players
- Keyboard shortcuts

## 📚 Full Documentation

### For Users / Gamers

1. **README.md** - What is this? How does it work?
2. **QUICKSTART.md** - Get it running
3. **Controls** - How to play Tanks War

### For Developers / Contributors

**Understanding the Project:**

- **ARCHITECTURE.md** - How everything fits together
- **DEVELOPMENT.md** - File tree, data flows, debugging tips
- **README.md** - Tech stack, deployment, future enhancements

**Understanding the Code:**

- Each `.js` file has JSDoc comments
- Functions are well-named and organized
- See file headers for module purpose

## 📂 Project Files

### Configuration

- `package.json` - Dependencies (Vite, Firebase)
- `vite.config.js` - Build settings
- `index.html` - Main HTML file
- `.gitignore` - Git ignore patterns

### Source Code (`/src`)

```
src/
├── main.js                    - Entry point
├── router.js                  - Page routing
├── firebase/
│   ├── firebaseConfig.js      - Firebase setup
│   └── roomService.js         - Database operations
├── host/
│   ├── hostController.js      - Host game orchestration
│   ├── hostView.js            - Host UI
│   └── tanksHostGame.js       - Tanks rendering
├── player/
│   ├── playerController.js    - Player input handling
│   └── playerView.js          - Player UI
├── games/
│   ├── gameRegistry.js        - Available games
│   └── tanksGameLogic.js      - Game physics
├── utils/
│   └── domUtils.js            - DOM helpers
└── styles/
    └── main.css               - Styling
```

### Documentation

- **README.md** - Full project documentation
- **QUICKSTART.md** - 5-minute setup guide
- **ARCHITECTURE.md** - System design and data flow
- **DEVELOPMENT.md** - Developer reference
- **INDEX.md** - This file

## 🎮 Understanding Tanks War

### Game Objective

- Last tank alive wins!
- Eliminate opponents by hitting them with bullets

### Controls

```
Movement:      Arrow Keys or WASD (or touch buttons)
Rotation:      Left/Right arrows (or A/D)
Shoot:         Space or tap SHOOT button
```

### Game Mechanics

- Each tank has 3 HP
- Bullets deal 1 damage per hit
- Tank gets eliminated at 0 HP
- Game ends when 1 tank remains
- Max 6 players per room

## 🏗️ Architecture Overview

### Three Main Components

1. **Host (TV/Desktop)**

   - Creates rooms and manages game
   - Runs the game loop
   - Renders canvas
   - No direct player interaction

2. **Players (Phone/Tablet)**

   - Join rooms via 4-letter code
   - Send input (movement, shooting)
   - Receive game state updates
   - See live feedback

3. **Firebase (Cloud)**
   - Real-time synchronization
   - Room management
   - Player state
   - Game state persistence
   - No custom backend server needed

### Data Flow

```
Players             Firebase              Host
  ↓                    ↓                    ↓
Input buttons  →  update input  →  Read inputs
                                        ↓
                              Update game physics
                                        ↓
                              Detect winner
                                        ↓
                          Sync to Firebase  →  Players read state
```

## 🔧 Common Tasks

### Running the Project

```bash
# First time setup
pnpm install
# Edit src/firebase/firebaseConfig.js with your Firebase config

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview build
pnpm preview
```

### Deploying to GitHub Pages

See **README.md** section "Deployment to GitHub Pages"

### Adding a New Game

See **DEVELOPMENT.md** section "Common Modifications"

### Debugging

See **DEVELOPMENT.md** section "Debugging Tips"

### Customizing Colors/Speeds

See **DEVELOPMENT.md** section "Common Modifications"

## 📊 Project Stats

- **Total Lines of Code**: ~3,000
- **JavaScript Files**: 13
- **CSS**: 1 file (420 lines)
- **Core Modules**: 6 (Firebase, Router, Host, Player, Games, Utils)
- **Dependencies**: 2 (Vite, Firebase)
- **Current Games**: 1 (Tanks War)
- **Max Players**: 6 per room

## 🎯 Key Features

✅ **Production Ready**

- Real-time synchronization
- Collision detection
- Physics simulation
- Mobile responsive
- Error handling

✅ **Extensible**

- Easy to add new games
- Clear separation of concerns
- Reusable components
- Well-documented code

✅ **Scalable**

- Supports 6+ players per room
- Efficient network usage
- Throttled input updates
- Optimized rendering

✅ **Deployable**

- Static site (GitHub Pages)
- No backend needed
- Firebase for data
- Public config (secure via rules)

## 🔐 Security

The Firebase config is public (safe practice):

- Security is enforced via **Database Rules**
- See README.md for complete rules
- Each room is isolated
- Players can only join if game not in progress

## 🚨 Troubleshooting

**Players can't join?**

- Check room code is correct
- Verify game is not running (they can only join during lobby/results)
- Check Firebase config is set

**Controls not working?**

- Refresh the page
- Check browser console for errors
- Try keyboard if buttons don't work

**Game stuttering?**

- Close other browser tabs
- Check network latency
- Verify all players on same network for local play

See **QUICKSTART.md** for more troubleshooting.

## 📖 Further Reading

- **ES Modules**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- **Vite**: https://vitejs.dev/
- **Firebase Realtime Database**: https://firebase.google.com/docs/database
- **GitHub Pages**: https://pages.github.com/

## 💡 What's Next?

### Immediate

1. Install dependencies: `pnpm install`
2. Configure Firebase: Edit `firebaseConfig.js`
3. Run locally: `pnpm dev`

### Short Term

1. Test with multiple devices
2. Deploy to GitHub Pages
3. Share with friends

### Long Term

1. Add new games (Snake, Trivia, etc.)
2. Add leaderboard (requires backend)
3. Add custom avatars
4. Add sound effects
5. Add spectator mode

## 📞 Support

- Check the documentation files above
- Review code comments
- Open browser console (F12) for errors
- Check Firebase console for data

## 📝 License

MIT - Feel free to use and modify

---

**Ready to play? Start with [QUICKSTART.md](./QUICKSTART.md)** 🎮

**Want to understand the code? Read [DEVELOPMENT.md](./DEVELOPMENT.md)** 👨‍💻

**Need deployment help? See [README.md](./README.md)** 🚀
