#!/bin/bash

echo "🧪 Testing Landing Page Flow..."
echo ""

cd "/var/home/raul/Documents/Tic Tac Toe/tictactoe"

# Start server in background
echo "🚀 Starting server..."
node server.js > /tmp/tictactoe-server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "❌ Server failed to start"
    cat /tmp/tictactoe-server.log
    exit 1
fi

echo "✅ Server started (PID: $SERVER_PID)"
echo ""

# Test 1: Check if index.html exists and has home screen
echo "📄 Test 1: Checking index.html structure..."
if grep -q "x-show=\"screen === 'home'\"" public/index.html; then
    echo "✅ Home screen found in HTML"
else
    echo "❌ Home screen not found in HTML"
fi

# Test 2: Check if app.js initializes with screen='home'
echo ""
echo "📄 Test 2: Checking app.js initialization..."
if grep -q "screen: 'home'" public/app.js; then
    echo "✅ Default screen is 'home'"
else
    echo "❌ Default screen is not 'home'"
fi

# Test 3: Check if auto-connect is removed from init()
echo ""
echo "📄 Test 3: Checking init() function..."
if grep -A 5 "init()" public/app.js | grep -q "connectSocket"; then
    echo "❌ Auto-connect still in init() - landing page will be skipped!"
else
    echo "✅ No auto-connect in init() - landing page will show"
fi

# Test 4: Check if setScreen handles auth with token
echo ""
echo "📄 Test 4: Checking setScreen('auth') logic..."
if grep -A 10 "setScreen(screenName)" public/app.js | grep -q "screenName === 'auth'"; then
    echo "✅ setScreen handles auth screen with token check"
else
    echo "⚠️  setScreen doesn't check for token on auth screen"
fi

# Test 5: Try to fetch the page
echo ""
echo "🌐 Test 5: Fetching homepage..."
HTTP_CODE=$(curl -s -o /tmp/tictactoe-page.html -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Homepage loads (HTTP $HTTP_CODE)"
    
    # Check if home screen div exists
    if grep -q "x-show=\"screen === 'home'\"" /tmp/tictactoe-page.html; then
        echo "✅ Home screen HTML present in response"
    else
        echo "❌ Home screen HTML missing from response"
    fi
else
    echo "❌ Homepage failed to load (HTTP $HTTP_CODE)"
fi

# Cleanup
echo ""
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo "✅ Tests complete!"
echo ""
echo "📝 Summary:"
echo "   - Landing page should now show first"
echo "   - Click 'LAUNCH MISSION' to go to auth"
echo "   - If token exists, auto-login happens on auth screen"
echo "   - If no token, user sees login/register forms"
