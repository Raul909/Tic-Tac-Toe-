#!/bin/bash

echo "🚀 Tic Tac Toe - Deployment Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Production-ready deployment with security features"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "📝 Please create a GitHub repository and add it as remote:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/tictactoe-multiplayer.git"
    echo ""
    echo "Or use GitHub CLI:"
    echo "   gh repo create tictactoe-multiplayer --public --source=. --remote=origin --push"
else
    echo "✅ Git remote configured"
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main || git push -u origin master
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://render.com and sign in"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository"
echo "4. Render will auto-detect render.yaml"
echo "5. Add environment variable: ALLOWED_ORIGINS=https://your-app.onrender.com"
echo "6. Click 'Create Web Service'"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
