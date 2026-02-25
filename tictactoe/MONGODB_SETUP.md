# 🗄️ MongoDB Setup Guide

## Quick MongoDB Integration (5 Steps)

### Step 1: Create MongoDB Atlas Account (Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free (no credit card required)
3. Create a free M0 cluster (512MB storage)
4. Choose a cloud provider and region (closest to you)
5. Wait 3-5 minutes for cluster creation

### Step 2: Create Database User

1. In Atlas dashboard, go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `tictactoe_user`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Whitelist IP Address

1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render deployment)
4. IP: `0.0.0.0/0`
5. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **4.1 or later**
4. Copy the connection string:
   ```
   mongodb+srv://tictactoe_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `tictactoe`
   ```
   mongodb+srv://tictactoe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
   ```

### Step 5: Install Mongoose & Update Code

```bash
cd tictactoe
npm install mongoose
```

Now update your `server.js`:

## Updated server.js with MongoDB

Replace the file persistence code with this:

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tictactoe';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 16
  },
  displayName: { 
    type: String, 
    required: true 
  },
  hash: { 
    type: String, 
    required: true 
  },
  wins: { 
    type: Number, 
    default: 0 
  },
  losses: { 
    type: Number, 
    default: 0 
  },
  draws: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', UserSchema);

// Update registration endpoint
app.post('/api/register', authLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (!username?.trim() || !password) return res.json({ ok: false, error: 'Missing fields' });

  const key = username.trim().toLowerCase();
  if (key.length < 3) return res.json({ ok: false, error: 'Username too short (min 3 chars)' });
  if (key.length > 16) return res.json({ ok: false, error: 'Username too long (max 16 chars)' });
  if (!/^[a-z0-9_]+$/.test(key)) return res.json({ ok: false, error: 'Letters, numbers, underscores only' });
  if (password.length < 8) return res.json({ ok: false, error: 'Password min 8 characters' });

  try {
    // Check if user exists
    const existing = await User.findOne({ username: key });
    if (existing) return res.json({ ok: false, error: 'Username already taken' });

    // Create user
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: key,
      displayName: username.trim(),
      hash,
      wins: 0,
      losses: 0,
      draws: 0
    });

    const token = uuidv4();
    sessions.set(token, key);
    res.cookie('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      ok: true, 
      token, 
      username: user.displayName, 
      stats: { wins: user.wins, losses: user.losses, draws: user.draws } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.json({ ok: false, error: 'Registration failed' });
  }
});

// Update login endpoint
app.post('/api/login', authLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.json({ ok: false, error: 'Missing fields' });

  const key = username.trim().toLowerCase();

  try {
    const user = await User.findOne({ username: key });
    if (!user) return res.json({ ok: false, error: 'User not found' });

    const match = await bcrypt.compare(password, user.hash);
    if (!match) return res.json({ ok: false, error: 'Incorrect password' });

    const token = uuidv4();
    sessions.set(token, key);
    res.cookie('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      ok: true, 
      token, 
      username: user.displayName, 
      stats: { wins: user.wins, losses: user.losses, draws: user.draws } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.json({ ok: false, error: 'Login failed' });
  }
});

// Update leaderboard endpoint
app.get('/api/leaderboard', apiLimiter, async (req, res) => {
  try {
    const users = await User.find()
      .select('displayName wins losses draws')
      .sort({ wins: -1 })
      .limit(10);
    
    const board = users.map(u => ({
      name: u.displayName,
      wins: u.wins,
      losses: u.losses,
      draws: u.draws
    }));
    
    res.json(board);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.json([]);
  }
});

// Update stats tracking (in game:over handler)
socket.on('game:over', async ({ winner, code }) => {
  const room = rooms.get(code);
  if (!room) return;

  try {
    if (winner) {
      const winPlayer = room.players.find(p => p.symbol === winner);
      const losePlayer = room.players.find(p => p.symbol !== winner);
      
      if (winPlayer) {
        await User.findOneAndUpdate(
          { username: winPlayer.key },
          { $inc: { wins: 1 } }
        );
      }
      if (losePlayer) {
        await User.findOneAndUpdate(
          { username: losePlayer.key },
          { $inc: { losses: 1 } }
        );
      }
    } else {
      // Draw
      for (const player of room.players) {
        await User.findOneAndUpdate(
          { username: player.key },
          { $inc: { draws: 1 } }
        );
      }
    }
  } catch (error) {
    console.error('Stats update error:', error);
  }
});
```

## Environment Variables

### Local Development (.env file)
```env
MONGODB_URI=mongodb+srv://tictactoe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tictactoe?retryWrites=true&w=majority
NODE_ENV=development
PORT=3000
```

### Render Deployment

1. Go to Render Dashboard
2. Select your service
3. Go to **Environment** tab
4. Add variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
5. Save (auto-redeploys)

## Migration from File-Based to MongoDB

If you have existing users in `data/users.json`, migrate them:

```javascript
// migration.js
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('YOUR_MONGODB_URI');

const UserSchema = new mongoose.Schema({
  username: String,
  displayName: String,
  hash: String,
  wins: Number,
  losses: Number,
  draws: Number,
  createdAt: Date
});

const User = mongoose.model('User', UserSchema);

async function migrate() {
  const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  
  for (const [key, user] of Object.entries(data)) {
    await User.create({
      username: key,
      displayName: user.displayName,
      hash: user.hash,
      wins: user.wins,
      losses: user.losses,
      draws: user.draws,
      createdAt: new Date(user.createdAt)
    });
  }
  
  console.log('Migration complete!');
  process.exit(0);
}

migrate();
```

Run: `node migration.js`

## Testing

```bash
# Start server
npm start

# Test registration
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Check MongoDB Atlas
# Go to Collections → Browse Collections
# You should see your user!
```

## Troubleshooting

**Connection Error:**
- Check IP whitelist (0.0.0.0/0)
- Verify connection string
- Check username/password

**Authentication Failed:**
- Regenerate password in Atlas
- Update connection string

**Timeout:**
- Check network/firewall
- Try different region

## Benefits of MongoDB

✅ Automatic backups
✅ Horizontal scaling
✅ Better performance
✅ Query capabilities
✅ Free tier (512MB)
✅ No file I/O bottleneck

## Free Tier Limits

- Storage: 512MB
- RAM: Shared
- Connections: 500
- Good for: 1000-5000 users

Perfect for your app! 🚀
