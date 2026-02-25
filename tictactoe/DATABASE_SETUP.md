# Database Setup for Render Deployment

## Current Setup (File-Based)

Your app currently uses **file-based storage** (`data/users.json`). This works on Render's free tier with some limitations.

## ✅ What You DON'T Need to Do

**Good news**: The current file-based database works automatically on Render! No additional setup needed.

### How it works:
1. Render creates the `data/` directory automatically
2. `users.json` is created on first user registration
3. Data persists across deployments (Render keeps the disk)
4. No external database service required

## ⚠️ Limitations of File-Based Storage on Render

1. **Data loss on service deletion** - If you delete the Render service, data is lost
2. **No backups** - Manual backups required
3. **Single instance only** - Can't scale horizontally
4. **Slower writes** - File I/O is slower than database

## 🚀 For Production: Upgrade to MongoDB (Optional)

If you want better reliability, follow these steps:

### Step 1: Create MongoDB Atlas Account (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free tier (512MB storage)
3. Create a cluster (takes 3-5 minutes)
4. Create database user with password
5. Whitelist IP: `0.0.0.0/0` (allow all - Render uses dynamic IPs)
6. Get connection string

### Step 2: Add MongoDB to Your App

Install mongoose:
```bash
npm install mongoose
```

Update `server.js`:
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tictactoe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true },
  displayName: String,
  hash: String,
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
```

### Step 3: Add Environment Variable on Render

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add new variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://username:password@cluster.mongodb.net/tictactoe`
5. Save and redeploy

## 📊 Current Status

✅ **Your app is production-ready with file-based storage**

The file-based approach is:
- ✅ Simple and works out of the box
- ✅ No additional configuration needed
- ✅ Free (no external service costs)
- ✅ Sufficient for small to medium traffic
- ✅ Data persists on Render's disk

## 🔄 Backup Strategy (Recommended)

Since you're using file-based storage, set up periodic backups:

### Option 1: Manual Backup
1. Download `data/users.json` from Render shell
2. Store in version control (encrypted) or cloud storage

### Option 2: Automated Backup Script
Add to `server.js`:
```javascript
const fs = require('fs');
const path = require('path');

// Backup every 24 hours
setInterval(() => {
  const backup = path.join(__dirname, 'data', `users-backup-${Date.now()}.json`);
  fs.copyFileSync(USERS_FILE, backup);
  console.log('Backup created:', backup);
}, 24 * 60 * 60 * 1000);
```

## 🎯 Recommendation

**For your current use case**: Stick with file-based storage. It's:
- Already working
- Zero configuration
- Free
- Sufficient for your traffic

**Upgrade to MongoDB when**:
- You have 1000+ users
- You need horizontal scaling
- You want automated backups
- You need better query performance

## ✅ Summary

**You don't need to do anything for the database on Render!**

Your current setup:
- ✅ Works automatically
- ✅ Data persists
- ✅ No additional steps needed
- ✅ Production-ready for small/medium apps

Just deploy and it works! 🚀
