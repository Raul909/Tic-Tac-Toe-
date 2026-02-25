# 🎮 Tic Tac Toe — Real-time Multiplayer

A beautiful, real-time multiplayer Tic Tac Toe game with secure authentication.

## Features
- 🔐 **Secure Auth** — HttpOnly cookies, 8-char passwords, rate limiting
- 🌐 **Online Multiplayer** — Real-time via Socket.io with room codes
- 🤖 **AI Mode** — Unbeatable minimax AI opponent
- 💬 **In-game Chat** — Sanitized chat with your opponent
- 🏆 **Persistent Stats** — Wins/losses/draws tracked across sessions
- ✨ **Fluid Animations** — Particle bursts, draw animations, glowing effects

## Tech Stack
- **Backend**: Node.js, Express, Socket.io
- **Auth**: bcryptjs, httpOnly cookies, rate limiting
- **Frontend**: Vanilla JS, HTML5 Canvas, CSS animations

## Run Locally
```bash
npm install
npm start
# Open http://localhost:3000
```

## Deploy to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy:**
1. Push to GitHub
2. Connect to Render
3. Add `ALLOWED_ORIGINS` environment variable
4. Deploy!

## Security Features
- ✅ Rate limiting (5 auth attempts/15min)
- ✅ HttpOnly cookies (XSS protection)
- ✅ 8-character minimum passwords
- ✅ Input sanitization
- ✅ CORS restrictions

## How to Play

1. **Register/Login** with username (3-16 chars) and password (8+ chars)
2. **Create a Room** — share the 4-letter code with a friend
3. Friend clicks **Join** and enters the code
4. Game starts automatically — chat while you play!
5. **Rematch** or **Leave** after each game

## File Structure
```
├── server.js          # Express + Socket.io backend
├── package.json
├── render.yaml        # Render deployment config
├── DEPLOYMENT.md      # Deployment guide
├── .env.example       # Environment variables template
├── data/
│   └── users.json     # Persisted user accounts (auto-created)
└── public/
    └── index.html     # Full frontend SPA
```
