const { test, expect } = require('@playwright/test');

test.describe('Tic Tac Toe Mission Control', () => {
  // Use a shorter username to satisfy the 16 char limit
  const username = `u${Date.now().toString().slice(-6)}`;
  const password = 'password123';

  test('Critical Path: Register -> Lobby -> Space Gallery -> Game', async ({ page }) => {
    // page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));
    // page.on('pageerror', exception => console.log(`BROWSER EXCEPTION: ${exception}`));

    console.log(`Testing with username: ${username}`);

    // Log API responses
    page.on('response', async response => {
      if (response.url().includes('/api/')) {
        try {
          // Clone response if needed, but here we just read it.
          // Note: reading body might consume it if not handled carefully in some frameworks, but in Playwright it's usually fine.
          // However, to be safe, we just check status.
          if (!response.ok()) console.log(`API ERROR: ${response.status()} ${response.url()}`);
        } catch (e) {}
      }
    });

    console.log('Navigating to home...');
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Tic Tac Toe - Mission Control/);

    console.log('Switching to Register tab...');
    await page.getByRole('button', { name: 'REGISTER', exact: true }).click();

    await expect(page.locator('input[placeholder="Choose callsign"]')).toBeVisible();

    console.log('Filling registration form...');
    await page.fill('input[placeholder="Choose callsign"]', username);
    await page.fill('input[placeholder="Set access code"]', password);

    console.log('Submitting registration...');
    await page.getByRole('button', { name: 'REGISTER OPERATOR' }).click();

    console.log('Waiting for lobby...');
    const userDisplay = page.locator(`div.text-3xl`, { hasText: username });
    await expect(userDisplay).toBeVisible({ timeout: 10000 });

    console.log('Lobby accessed. Navigating to Space Gallery...');
    await page.getByRole('button', { name: '🌌 SPACE' }).click();

    // Wait for the gallery to load
    await expect(page.locator('h2:has-text("🌌 SPACE EXPLORER")')).toBeVisible();

    console.log('Space Gallery verify. Going back...');
    await page.getByRole('button', { name: '← BACK' }).click();

    console.log('Starting AI Game...');
    await page.getByRole('button', { name: 'ENGAGE AI' }).click();

    const board = page.locator('.grid.grid-cols-3');
    await expect(board).toBeVisible();
    console.log('Game started successfully.');
  });
});
