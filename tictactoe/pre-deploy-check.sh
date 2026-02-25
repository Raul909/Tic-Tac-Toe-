#!/bin/bash

echo "🔍 Pre-Deployment Checklist"
echo "============================"
echo ""

# Check Node version
NODE_VERSION=$(node -v)
echo "✓ Node version: $NODE_VERSION"

# Check if package.json exists
if [ -f package.json ]; then
    echo "✓ package.json found"
else
    echo "✗ package.json missing"
    exit 1
fi

# Check if server.js exists
if [ -f server.js ]; then
    echo "✓ server.js found"
else
    echo "✗ server.js missing"
    exit 1
fi

# Check if public/index.html exists
if [ -f public/index.html ]; then
    echo "✓ public/index.html found"
else
    echo "✗ public/index.html missing"
    exit 1
fi

# Check if render.yaml exists
if [ -f render.yaml ]; then
    echo "✓ render.yaml found"
else
    echo "✗ render.yaml missing"
    exit 1
fi

# Check if .env.example exists
if [ -f .env.example ]; then
    echo "✓ .env.example found"
else
    echo "⚠ .env.example missing (optional)"
fi

# Check if node_modules exists
if [ -d node_modules ]; then
    echo "✓ Dependencies installed"
else
    echo "⚠ Dependencies not installed. Run: npm install"
fi

# Check if git is initialized
if [ -d .git ]; then
    echo "✓ Git initialized"
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠ Uncommitted changes detected"
        echo "  Run: git add . && git commit -m 'Your message'"
    else
        echo "✓ No uncommitted changes"
    fi
    
    # Check if remote is configured
    if git remote | grep -q origin; then
        echo "✓ Git remote configured"
        REMOTE_URL=$(git remote get-url origin)
        echo "  Remote: $REMOTE_URL"
    else
        echo "⚠ Git remote not configured"
        echo "  Run: gh repo create tictactoe-multiplayer --public --source=. --remote=origin --push"
    fi
else
    echo "⚠ Git not initialized"
    echo "  Run: git init"
fi

echo ""
echo "📋 Manual Checks:"
echo "  [ ] Tested locally (npm start)"
echo "  [ ] Registration works (8+ char password)"
echo "  [ ] Login works"
echo "  [ ] Multiplayer room creation/joining works"
echo "  [ ] AI mode works"
echo "  [ ] Chat works"
echo ""
echo "🚀 Ready to deploy?"
echo "  1. Run: ./deploy-setup.sh"
echo "  2. Follow instructions in QUICKSTART.md"
echo ""
