# Quick Deployment Guide

## 🚀 Deploy to Render in 5 Minutes

### Step 1: Install & Test (2 min)
```bash
cd "/var/home/raul/Documents/Tic Tac Toe/tictactoe"
npm install
npm start
```
Test at `http://localhost:3000`

### Step 2: Push to GitHub (1 min)
```bash
./deploy-setup.sh
```
Or manually:
```bash
git init
git add .
git commit -m "Initial deployment"
gh repo create tictactoe-multiplayer --public --source=. --remote=origin --push
```

### Step 3: Deploy on Render (2 min)
1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` ✅
5. Add environment variable:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://tictactoe-multiplayer.onrender.com` (use your actual URL)
6. Click **"Create Web Service"**

### Step 4: Update CORS After First Deploy
1. Copy your Render URL (e.g., `https://tictactoe-multiplayer.onrender.com`)
2. Go to **Environment** tab in Render
3. Update `ALLOWED_ORIGINS` with your actual URL
4. Render will auto-redeploy

### Done! 🎉

Your app is live at: `https://your-app-name.onrender.com`

---

## ⚠️ Important Notes

- **First load takes 30-60s** (free tier spins down after 15 min)
- **Data persists** in `data/users.json` on Render
- **Logs available** in Render dashboard

## 🔧 Troubleshooting

**WebSocket not connecting?**
- Check `ALLOWED_ORIGINS` matches your Render URL exactly
- Include `https://` in the URL

**Can't log in?**
- Clear browser cookies
- Check Render logs for errors

**Build fails?**
- Verify `package.json` has all dependencies
- Check Node version (16+ required)

## 📖 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
