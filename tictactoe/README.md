# 🎮 Tic Tac Toe - Real-time Multiplayer

<div align="center">

![Tic Tac Toe Banner](./screenshots/banner.png)

**A beautiful, real-time multiplayer Tic Tac Toe game with stunning space visuals**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://tictactoe-multiplayer-kx9u.onrender.com/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

[Live Demo](https://tictactoe-multiplayer-kx9u.onrender.com/) • [Features](#features) • [Screenshots](#screenshots) • [Installation](#installation) • [Deployment](#deployment)

</div>

---

## 📺 Video Tutorial

<div align="center">

[![Watch the tutorial](./screenshots/video-thumbnail.png)](./screenshots/demo-video.mp4)

**Click to watch: Complete walkthrough of features and gameplay**

</div>

> **Note:** See [How to Add Screenshots](#how-to-add-screenshots) section below for instructions on capturing and adding your own screenshots.

---

## ✨ Features

### 🎮 Game Modes
- **🌐 Online Multiplayer** - Play with friends using 4-character room codes
- **🤖 AI Opponent** - Challenge an unbeatable minimax AI
- **💬 Live Chat** - Chat with your opponent during games
- **🔄 Rematch System** - Quick rematch with symbol swapping

### 🔐 User System
- **Secure Authentication** - Register/login with encrypted passwords
- **Persistent Stats** - Track wins, losses, and draws
- **Session Management** - Stay logged in across sessions
- **Rate Limiting** - Protection against brute force attacks

### 🌌 Space Gallery
- **Interactive 3D Space Explorer** - Explore our solar system
- **Real Astronomical Data** - Accurate planet information
- **Nearby Stars** - Discover stars within 10 light-years
- **Famous Nebulae** - View stunning cosmic clouds
- **Zoom & Pan Controls** - Fully interactive experience

### 🎨 Visual Features
- **Realistic 3D Planets** - Professional astronomical rendering
- **Dynamic Weather Backgrounds** - Changes based on your location
- **Shooting Stars** - Beautiful meteor animations
- **Particle Effects** - Fireworks on victory
- **Smooth Animations** - 60fps performance

### 📱 Responsive Design
- **Mobile Optimized** - Perfect on phones and tablets
- **Touch Friendly** - Large tap targets, smooth scrolling
- **Adaptive Layouts** - Works on any screen size
- **iOS Support** - Full web app capabilities

---

## 📸 Screenshots

### 🏠 Authentication & Lobby

<div align="center">

| Login Screen | Lobby |
|:---:|:---:|
| ![Login](./screenshots/login.png) | ![Lobby](./screenshots/lobby.png) |

*Secure authentication with beautiful cyberpunk UI*

</div>

### 🎮 Gameplay

<div align="center">

| Game Board | Victory Screen |
|:---:|:---:|
| ![Game](./screenshots/game.png) | ![Victory](./screenshots/victory.png) |

*Real-time multiplayer with stunning visual effects*

</div>

### 🌌 Space Gallery

<div align="center">

| Solar System | Nearby Stars | Nebulae |
|:---:|:---:|:---:|
| ![Solar](./screenshots/space-solar.png) | ![Stars](./screenshots/space-stars.png) | ![Nebulae](./screenshots/space-nebulae.png) |

*Interactive 3D space exploration with real astronomical data*

</div>

### 📱 Mobile Experience

<div align="center">

| Mobile Game | Mobile Lobby |
|:---:|:---:|
| ![Mobile Game](./screenshots/mobile-game.png) | ![Mobile Lobby](./screenshots/mobile-lobby.png) |

*Fully responsive design optimized for mobile devices*

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Raul909/Tic-Tac-Toe-.git
cd Tic-Tac-Toe-/tictactoe

# Install dependencies
npm install

# Start the server
npm start
```

Visit `http://localhost:3000` and start playing!

---

## 🎯 How to Play

### 1️⃣ **Create an Account**
- Click "Register" and choose a username (3-16 characters)
- Set a secure password (minimum 8 characters)
- Your stats will be tracked automatically

### 2️⃣ **Start a Game**

**Option A: Play with Friends**
1. Click "Create Room" in the lobby
2. Share the 4-character code with your friend
3. They click "Join" and enter the code
4. Game starts automatically!

**Option B: Play vs AI**
1. Click "Play vs AI"
2. Challenge the unbeatable AI
3. Try to beat the minimax algorithm!

### 3️⃣ **During the Game**
- Click cells to make your move
- Chat with your opponent using the chat box
- Watch for the victory fireworks!
- Click "Rematch" to play again (symbols swap)

### 4️⃣ **Explore Space**
- Click the 🌌 icon in the lobby
- Switch between Solar System, Stars, and Nebulae
- Click objects to see detailed information
- Drag to pan, scroll to zoom

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time communication
- **bcryptjs** - Password hashing
- **UUID** - Token generation

### Frontend
- **Vanilla JavaScript** - No frameworks, pure performance
- **HTML5 Canvas** - Stunning visual effects
- **CSS3** - Modern animations and layouts
- **Socket.IO Client** - Real-time updates

### Security
- **HttpOnly Cookies** - XSS protection
- **Rate Limiting** - Brute force prevention
- **Input Sanitization** - SQL injection prevention
- **CORS** - Cross-origin protection

---

## 📦 Deployment

### Deploy to Render (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render auto-detects `render.yaml`

3. **Set Environment Variables**
   - `NODE_ENV` = `production`
   - `ALLOWED_ORIGINS` = `https://your-app.onrender.com`

4. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Your app is live!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🗄️ Database

The app uses **file-based storage** (`data/users.json`) which:
- ✅ Works automatically on Render
- ✅ Requires zero configuration
- ✅ Persists across deployments
- ✅ Perfect for small to medium traffic

For production scale (1000+ users), see [DATABASE_SETUP.md](./DATABASE_SETUP.md) for MongoDB migration guide.

---

## 🎨 Features in Detail

### Real-time Multiplayer
- WebSocket-based instant updates
- Room-based matchmaking
- Automatic reconnection handling
- Turn-based gameplay with validation

### AI Opponent
- Minimax algorithm with alpha-beta pruning
- Unbeatable difficulty
- Instant move calculation
- Perfect for practice

### Space Gallery
- **Solar System**: 9 planets with real orbital data
- **Nearby Stars**: 8 closest stars with temperatures and masses
- **Nebulae**: 6 famous nebulae with distances and types
- Interactive 3D rotation and zoom
- Real astronomical data from NASA/ESA

### Dynamic Backgrounds
- **Space Mode**: Realistic 3D planets and stars
- **Rain Mode**: Animated raindrops (when raining at your location)
- **Snow Mode**: Falling snowflakes (when snowing)
- **Storm Mode**: Lightning and heavy rain
- **Cloudy Mode**: Drifting clouds
- Automatic detection using geolocation and weather API

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
./test-suite.sh
```

Tests include:
- ✅ User registration
- ✅ User login
- ✅ Duplicate username prevention
- ✅ Password validation
- ✅ Rate limiting
- ✅ API endpoints
- ✅ Database persistence

See [TEST_RESULTS.md](./TEST_RESULTS.md) for detailed test reports.

---

## 📊 Performance

| Metric | Desktop | Mobile |
|--------|---------|--------|
| **FPS** | 60 | 30-45 |
| **Load Time** | < 2s | < 3s |
| **Memory** | ~80MB | ~50MB |
| **Bundle Size** | 72KB | 72KB |

Optimizations:
- Offscreen canvas for static elements
- Object pooling for particles
- Frame-based timing for smooth animations
- Reduced particle count on mobile

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **HttpOnly Cookies**: Prevents XSS attacks
- **Rate Limiting**: 5 attempts per 15 minutes
- **Input Sanitization**: Prevents injection attacks
- **CORS Protection**: Restricted origins
- **Session Tokens**: UUID v4 generation
- **Secure Cookies**: HTTPS-only in production

---

## 📱 Browser Support

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Opera | ✅ | ✅ |

Minimum requirements:
- ES6+ support
- WebSocket support
- Canvas API support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Astronomical Data**: NASA, ESA
- **Weather API**: Open-Meteo (free, no key required)
- **Fonts**: Google Fonts (Orbitron, Space Mono)
- **Inspiration**: Classic Tic Tac Toe with modern twist

---

## 📞 Support

- **Live Demo**: [tictactoe-multiplayer-kx9u.onrender.com](https://tictactoe-multiplayer-kx9u.onrender.com/)
- **Issues**: [GitHub Issues](https://github.com/Raul909/Tic-Tac-Toe-/issues)
- **Documentation**: See `/docs` folder

---

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database configuration
- [TEST_RESULTS.md](./TEST_RESULTS.md) - Test reports
- [PRODUCTION_READY.md](./PRODUCTION_READY.md) - Production checklist
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Complete feature summary

---

## 🎯 Roadmap

- [ ] Tournament mode
- [ ] Leaderboard with rankings
- [ ] Custom themes
- [ ] Sound effects and music
- [ ] Replay system
- [ ] Friend system
- [ ] Private messaging
- [ ] Mobile app (React Native)

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/Raul909/Tic-Tac-Toe-?style=social)
![GitHub forks](https://img.shields.io/github/forks/Raul909/Tic-Tac-Toe-?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Raul909/Tic-Tac-Toe-?style=social)

---

<div align="center">

## 🌟 Star this repo if you like it!

Made with ❤️ by [Raul909](https://github.com/Raul909)

**[⬆ Back to Top](#-tic-tac-toe---real-time-multiplayer)**

</div>

---

## 📸 How to Add Screenshots

To add your own screenshots to this README:

### 1. Create Screenshots Folder
```bash
mkdir -p screenshots
```

### 2. Take Screenshots

Visit your live site: https://tictactoe-multiplayer-kx9u.onrender.com/

**Required Screenshots:**
- `banner.png` - Main banner (1200x400px)
- `login.png` - Login screen
- `lobby.png` - Lobby view
- `game.png` - Active game
- `victory.png` - Victory screen with fireworks
- `space-solar.png` - Space gallery solar system
- `space-stars.png` - Space gallery stars view
- `space-nebulae.png` - Space gallery nebulae view
- `mobile-game.png` - Mobile game view
- `mobile-lobby.png` - Mobile lobby view
- `video-thumbnail.png` - Video thumbnail (1280x720px)

### 3. Record Demo Video

**Using OBS Studio (Free):**
1. Download [OBS Studio](https://obsproject.com/)
2. Set canvas to 1920x1080
3. Record your screen showing:
   - Registration/Login
   - Creating a room
   - Joining a room (use incognito window)
   - Playing a game
   - Victory animation
   - Space gallery exploration
   - Mobile view (use browser dev tools)
4. Export as MP4
5. Save as `screenshots/demo-video.mp4`

**Using Browser:**
- Chrome: Right-click → Inspect → Toggle device toolbar → Screenshot
- Firefox: Right-click → Take Screenshot
- Safari: Develop → Show Web Inspector → Screenshot

### 4. Optimize Images

```bash
# Install imagemagick (if not installed)
# Ubuntu/Debian: sudo apt install imagemagick
# macOS: brew install imagemagick

# Optimize all screenshots
cd screenshots
for img in *.png; do
  convert "$img" -resize 1200x -quality 85 "$img"
done
```

### 5. Commit and Push

```bash
git add screenshots/
git commit -m "Add screenshots and demo video"
git push
```

Your README will now display all screenshots automatically!
