# Tic-Tac-Toe Multiplayer - Render Deployment Guide

## Prerequisites
- GitHub account
- Render account (free tier)
- Git installed locally

## Step 1: Install Dependencies

```bash
cd "/var/home/raul/Documents/Tic Tac Toe/tictactoe"
npm install
```

## Step 2: Test Locally

```bash
npm start
```

Visit `http://localhost:3000` and test the game.

## Step 3: Initialize Git Repository

```bash
git init
git add .
git commit -m "Production-ready deployment"
```

## Step 4: Push to GitHub

```bash
# Create a new repository on GitHub
gh repo create tictactoe-multiplayer --public --source=. --remote=origin --push
```

Or manually:
1. Create a new repo at https://github.com/new
2. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/tictactoe-multiplayer.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `tictactoe-multiplayer`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `ALLOWED_ORIGINS` = `https://tictactoe-multiplayer.onrender.com` (use your actual URL)

6. Click **"Create Web Service"**

### Option B: Using render.yaml (Auto-deploy)

The `render.yaml` file is already configured. Render will auto-detect it.

1. Go to https://dashboard.render.com/select-repo
2. Select your repository
3. Render will use the `render.yaml` configuration
4. Add the `ALLOWED_ORIGINS` environment variable in the dashboard

## Step 6: Configure CORS

After deployment, update the environment variable:

1. Go to your service dashboard on Render
2. Navigate to **Environment** tab
3. Add/Update:
   - `ALLOWED_ORIGINS` = `https://your-app-name.onrender.com`

## Step 7: Test Your Deployment

1. Visit your Render URL (e.g., `https://tictactoe-multiplayer.onrender.com`)
2. Create an account (min 8 character password)
3. Test creating/joining rooms
4. Test AI mode

## Important Notes

### Free Tier Limitations
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free (enough for one service)

### Data Persistence
- Current setup uses file storage (`data/users.json`)
- Files persist on Render's free tier
- For production, consider migrating to a database (MongoDB Atlas free tier)

### Security Features Implemented
✅ Rate limiting (5 auth attempts per 15 min)
✅ HttpOnly cookies (XSS protection)
✅ 8-character minimum passwords
✅ Input sanitization for chat
✅ CORS restricted to your domain
✅ Secure cookies in production

## Troubleshooting

### Build Fails
- Check Node version: Render uses Node 16+ (specified in package.json)
- Verify all dependencies are in package.json

### WebSocket Connection Issues
- Ensure CORS is configured with your Render URL
- Check browser console for errors
- Verify `withCredentials: true` in Socket.IO client

### Session Issues
- Clear browser cookies
- Check that cookies are being set (DevTools → Application → Cookies)
- Verify `secure: true` is only set in production

## Monitoring

View logs in Render dashboard:
1. Go to your service
2. Click **"Logs"** tab
3. Monitor for errors

## Updating Your App

```bash
git add .
git commit -m "Update description"
git push origin main
```

Render will automatically redeploy on push.

## Custom Domain (Optional)

1. In Render dashboard, go to **Settings** → **Custom Domain**
2. Add your domain
3. Update DNS records as instructed
4. Update `ALLOWED_ORIGINS` environment variable

## Next Steps for Production

- [ ] Migrate to MongoDB Atlas (free tier)
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add game history/statistics
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Add automated backups
