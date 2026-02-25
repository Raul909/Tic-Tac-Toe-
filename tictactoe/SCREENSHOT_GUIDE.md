# 📸 Screenshot & Video Guide

## Quick Start

```bash
# Run the helper script
./screenshot-helper.sh
```

## 📸 Screenshots Needed

### 1. Auth Screen (auth-screen.png)
**What to capture:**
- Login screen with 3D space background
- Show planets and stars visible
- Both Google and Facebook buttons visible
- Traditional login form

**How to capture:**
1. Open http://localhost:3000
2. Wait for 3D background to load (2-3 seconds)
3. Take screenshot (1200x800px)
4. Save as `screenshots/auth-screen.png`

### 2. Game Board (game-board.png)
**What to capture:**
- Active game with some moves made
- Show X and O symbols
- Score display visible
- 3D background visible

**How to capture:**
1. Start a game (vs AI is easiest)
2. Make 3-4 moves
3. Take screenshot
4. Save as `screenshots/game-board.png`

### 3. Victory Screen (victory-share.png)
**What to capture:**
- Victory modal with emoji
- All 5 share buttons visible
- Score display
- Fireworks in background (if possible)

**How to capture:**
1. Win a game
2. Wait for victory modal
3. Take screenshot immediately
4. Save as `screenshots/victory-share.png`

### 4. Space Gallery (space-gallery.png)
**What to capture:**
- Space gallery with planets/stars
- Controls visible (zoom, speed)
- Object list on the side
- Interactive canvas

**How to capture:**
1. Click 🌌 SPACE button in lobby
2. Wait for gallery to load
3. Take screenshot
4. Save as `screenshots/space-gallery.png`

### 5. Mobile View (mobile-view.png)
**What to capture:**
- Mobile version of login or game
- Show responsive design
- Portrait orientation

**How to capture:**
1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 Pro or similar
4. Take screenshot (400x800px)
5. Save as `screenshots/mobile-view.png`

## 🎥 Demo Video

### What to Record

**Duration:** 2-3 minutes

**Scenes to include:**
1. **Intro (10s)**
   - Show login screen with 3D background
   - Zoom in on planets

2. **Authentication (20s)**
   - Click "Continue with Google" (or show traditional login)
   - Show successful login
   - Display lobby with stats

3. **Multiplayer Setup (30s)**
   - Click "LAUNCH ROOM"
   - Show room code
   - Open incognito window
   - Join room with code
   - Show "waiting for opponent"

4. **Gameplay (40s)**
   - Show both players making moves
   - Display chat messages
   - Show turn indicators
   - Complete a game

5. **Victory (20s)**
   - Show victory modal
   - Click share buttons
   - Download screenshot
   - Show fireworks

6. **Space Gallery (30s)**
   - Click 🌌 SPACE button
   - Switch between tabs
   - Click on planets
   - Show details panel
   - Zoom and pan

7. **Outro (10s)**
   - Show lobby again
   - Display stats
   - Fade out

### Recording Tools

**Free Options:**
- **OBS Studio** (Best, all platforms)
  - Download: https://obsproject.com/
  - Settings: 1920x1080, 30fps, MP4
  
- **ShareX** (Windows)
  - Download: https://getsharex.com/
  
- **QuickTime** (Mac)
  - Built-in screen recording
  
- **SimpleScreenRecorder** (Linux)
  - Install: `sudo apt install simplescreenrecorder`

**Browser Extensions:**
- Loom
- Screencastify
- Awesome Screenshot

### Recording Settings

```
Resolution: 1920x1080
Frame Rate: 30 FPS
Format: MP4
Codec: H.264
Audio: Optional (add music or narration)
```

### Editing Tips

1. **Trim** - Remove mistakes and pauses
2. **Speed up** - 1.5x for slow parts
3. **Add text** - Highlight features
4. **Add music** - Royalty-free background music
5. **Add transitions** - Smooth scene changes

**Free Editing Tools:**
- DaVinci Resolve (Professional, free)
- Shotcut (Simple, free)
- OpenShot (Easy, free)

## 📤 Upload Instructions

### Upload to GitHub

1. Go to your repository
2. Click "Issues" tab
3. Create a new issue (or use existing)
4. Drag and drop your video file
5. Wait for upload to complete
6. Copy the generated URL (looks like: `https://github.com/user-attachments/assets/...`)
7. Add to README:
   ```markdown
   https://github.com/user-attachments/assets/your-video-id-here
   ```

### Upload to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click "CREATE" → "Upload videos"
3. Select your video file
4. Fill in details:
   - Title: "Tic Tac Toe Mission Control - Full Demo"
   - Description: Include GitHub link
   - Visibility: Public or Unlisted
5. Copy video ID from URL
6. Add to README:
   ```markdown
   [![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
   ```

## 🎨 Optimize Screenshots

### Using ImageMagick

```bash
cd screenshots

# Resize and optimize
for img in *.png; do
  convert "$img" -resize 1200x -quality 85 "$img"
done

# Or specific sizes
convert auth-screen.png -resize 1200x800 -quality 85 auth-screen.png
convert mobile-view.png -resize 400x800 -quality 85 mobile-view.png
```

### Using Online Tools

- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **Compressor.io**: https://compressor.io/

## ✅ Checklist

Before committing:

- [ ] All 5 screenshots taken
- [ ] Screenshots are clear and high quality
- [ ] Screenshots show key features
- [ ] Images are optimized (< 500KB each)
- [ ] Demo video recorded (2-3 minutes)
- [ ] Video shows all major features
- [ ] Video uploaded to GitHub or YouTube
- [ ] README updated with video URL
- [ ] All files committed and pushed

## 🚀 Final Steps

```bash
# Create screenshots folder
mkdir -p screenshots

# Take all screenshots (follow guide above)

# Optimize (if ImageMagick installed)
cd screenshots
for img in *.png; do
  convert "$img" -resize 1200x -quality 85 "$img"
done

# Go back to project root
cd ..

# Commit
git add screenshots/
git add README.md
git commit -m "Add screenshots and demo video"
git push
```

## 💡 Tips for Great Screenshots

1. **Clean browser** - Close unnecessary tabs
2. **Full screen** - Hide bookmarks bar
3. **Good timing** - Capture at the right moment
4. **High resolution** - Use 1920x1080 or higher
5. **Consistent style** - Same browser, same zoom level
6. **Show features** - Make sure key elements are visible
7. **Good lighting** - If recording screen with camera

## 🎬 Tips for Great Videos

1. **Script it** - Plan what you'll show
2. **Practice** - Do a test run first
3. **Smooth movements** - Don't rush
4. **Show features** - Highlight key functionality
5. **Add narration** - Explain what you're doing (optional)
6. **Background music** - Adds professionalism (optional)
7. **Keep it short** - 2-3 minutes is perfect
8. **End with CTA** - "Try it yourself at..."

---

**Need help?** Open an issue on GitHub!
