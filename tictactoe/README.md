# 🎮 Tic Tac Toe — Real-time Multiplayer

A beautiful, real-time multiplayer Tic Tac Toe game with user authentication.

## Features
- 🔐 **User Auth** — Register/login with hashed passwords
- 🌐 **Online Multiplayer** — Real-time via Socket.io with room codes
- 🤖 **AI Mode** — Unbeatable minimax AI opponent
- 💬 **In-game Chat** — Chat with your opponent during the game
- 🏆 **Persistent Stats** — Wins/losses/draws tracked across sessions
- ✨ **Fluid Animations** — Particle bursts, draw animations, glowing effects

## Tech Stack
- **Backend**: Node.js, Express, Socket.io
- **Auth**: bcryptjs (password hashing), UUID tokens
- **Frontend**: Vanilla JS, HTML5 Canvas (starfield), CSS animations

## Run Locally
```bash
npm install
npm start
# Open http://localhost:3000
```

## Deploy on Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **Create Web Service**

> ⚠️ Free Render tier spins down after 15 min inactivity (30-60s cold start).
> Upgrade to Starter ($7/mo) for always-on hosting.

## Deploy on Railway (Alternative)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## How to Play

1. **Register/Login** with a username and password
2. **Create a Room** — share the 4-letter code with a friend
3. Friend clicks **Join** and enters the code
4. Game starts automatically — chat while you play!
5. **Rematch** or **Leave** after each game

## File Structure
```
├── server.js          # Express + Socket.io backend
├── package.json
├── render.yaml        # Render deployment config
├── data/
│   └── users.json     # Persisted user accounts (auto-created)
└── public/
    └── index.html     # Full frontend SPA
```
