#!/bin/bash

echo "🚀 Starting Tic Tac Toe - Mission Control"
echo "========================================"
echo ""

cd "/var/home/raul/Documents/Tic Tac Toe/tictactoe"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🌟 Launching server on http://localhost:3000"
echo ""
echo "✨ Features:"
echo "   - 3D Space Background with all 8 planets"
echo "   - Real-time weather sync"
echo "   - NASA-inspired UI"
echo "   - Multiplayer & AI modes"
echo ""
echo "🎯 What to expect:"
echo "   1. Landing page with 3D space animation"
echo "   2. Click '🚀 LAUNCH MISSION' to start"
echo "   3. Login or register to play"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node server.js
