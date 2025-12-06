# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd /Users/juanmaotegui/Projects/my-games/living-room-games
pnpm install
```

## Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "living-room-games"
3. Create a Realtime Database (select "US" region)
4. Go to Project Settings and copy your config
5. Edit `src/firebase/firebaseConfig.js` and paste your config:

```js
const firebaseConfig = {
  apiKey: "YOUR_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};
```

## Step 3: Set Firebase Rules

In Firebase Console → Realtime Database → Rules, paste:

```json
{
  "rules": {
    "rooms": {
      "$roomCode": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

(For production, use stricter rules - see README for detailed rules)

## Step 4: Start Development Server

```bash
pnpm dev
```

Open your browser to `http://localhost:5173`

## Step 5: Test the Game

### On Your TV/Host Machine:

- Click "Host a Game"
- Click "Create Room"
- Note the room code (e.g., "ABCD")
- You'll see a "Tanks War" option

### On Your Phone/Player Device:

- On the same network, go to `http://localhost:5173` (or your computer's IP:5173)
- Click "Join a Game"
- Enter the room code
- Enter your name
- Click "Join Room"

### Back on Host:

- Select "Tanks War"
- Click "Start Game" (after 2+ players join)
- You should see the game canvas with tanks!

### On Player Phone:

- You'll see 4 direction buttons and a SHOOT button
- Use Up/Down/Left/Right to move and rotate
- Press SHOOT to fire bullets
- Last tank alive wins!

## Keyboard Controls (For Testing)

If playing on desktop:

- **WASD** or **Arrow Keys**: Move
- **Space**: Shoot

## Troubleshooting

**Firebase errors?**

- Check your config in `firebaseConfig.js`
- Make sure RTDB is created and running
- Check browser console (F12) for error details

**Players can't see the game?**

- Make sure Firebase rules allow read/write
- Restart dev server: `pnpm dev`
- Check all players are on same WiFi network

**Controls not working?**

- Try refreshing the page
- Check browser console for errors
- On phone, make sure browser isn't throttling

## Next Steps

1. Test with multiple devices on your local network
2. Deploy to GitHub Pages (see README for deployment steps)
3. Share the URL with friends and start playing!

## Need Help?

- Check README.md for full documentation
- Look at the code comments in src/ folders
- Check browser console (F12) for errors
- Make sure Firebase config is correct
