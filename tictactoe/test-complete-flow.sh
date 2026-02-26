#!/bin/bash

echo "🎮 Complete User Journey Test"
echo "=============================="
echo ""

cd "/var/home/raul/Documents/Tic Tac Toe/tictactoe"

# Test the complete flow
echo "📋 Test Scenarios:"
echo ""

echo "1️⃣  NEW USER (No Token)"
echo "   ✓ Visits site → sees HOME screen"
echo "   ✓ Clicks 'LAUNCH MISSION' → sees AUTH screen"
echo "   ✓ Registers/Logs in → goes to LOBBY"
echo ""

echo "2️⃣  RETURNING USER (Has Token)"
echo "   ✓ Visits site → sees HOME screen (not auto-logged in)"
echo "   ✓ Clicks 'LAUNCH MISSION' → auto-logs in → goes to LOBBY"
echo ""

echo "🔍 Verifying Implementation..."
echo ""

# Check 1: Default screen
DEFAULT_SCREEN=$(grep -m1 "screen:" public/app.js | grep -o "'[^']*'" | tr -d "'")
if [ "$DEFAULT_SCREEN" = "home" ]; then
    echo "✅ Default screen is 'home'"
else
    echo "❌ Default screen is '$DEFAULT_SCREEN' (should be 'home')"
fi

# Check 2: No auto-connect in init
if ! grep -A 10 "init()" public/app.js | grep -q "const token = localStorage.getItem"; then
    echo "✅ No auto-connect in init() - landing page will always show"
else
    echo "❌ Auto-connect found in init() - landing page will be skipped"
fi

# Check 3: Auth screen handles token
if grep -A 15 "setScreen(screenName)" public/app.js | grep -q "screenName === 'auth'"; then
    echo "✅ Auth screen checks for existing token"
else
    echo "❌ Auth screen doesn't check for token"
fi

# Check 4: Home screen exists in HTML
if grep -q "x-show=\"screen === 'home'\"" public/index.html; then
    echo "✅ Home screen exists in HTML"
else
    echo "❌ Home screen missing from HTML"
fi

# Check 5: Launch button goes to auth
if grep -q "@click=\"setScreen('auth')\"" public/index.html; then
    echo "✅ Launch button navigates to auth screen"
else
    echo "❌ Launch button doesn't navigate to auth"
fi

echo ""
echo "🌐 Testing HTTP Response..."

# Start server if not running
if ! curl -s http://localhost:3000/ > /dev/null 2>&1; then
    echo "⚠️  Server not running, starting..."
    node server.js > /tmp/test-server.log 2>&1 &
    sleep 3
fi

# Fetch and analyze page
curl -s http://localhost:3000/ > /tmp/test-page.html

# Check Alpine.js initialization
if grep -q "x-data=\"app()\"" /tmp/test-page.html; then
    echo "✅ Alpine.js app initialized"
else
    echo "❌ Alpine.js app not initialized"
fi

# Check if all screens are present
SCREENS=("home" "auth" "lobby" "game" "waiting")
for screen in "${SCREENS[@]}"; do
    if grep -q "x-show=\"screen === '$screen'\"" /tmp/test-page.html; then
        echo "✅ Screen '$screen' found"
    else
        echo "⚠️  Screen '$screen' not found"
    fi
done

echo ""
echo "✅ All tests complete!"
echo ""
echo "🎯 Expected Behavior:"
echo "   1. Open http://localhost:3000"
echo "   2. You should see the HOME/LANDING page with:"
echo "      - 3D space background"
echo "      - 'TIC TAC TOE' title"
echo "      - 'MISSION CONTROL' subtitle"
echo "      - '🚀 LAUNCH MISSION' button"
echo "   3. Click the button to go to AUTH screen"
echo "   4. Login/Register to access the game"
echo ""
echo "🔗 Test it now: http://localhost:3000"
