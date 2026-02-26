const test = require('node:test');
const assert = require('node:assert');
const { generateRoomCode, checkWinner } = require('./utils');

test('generateRoomCode', async (t) => {
  await t.test('should return a 4-character string', () => {
    const rooms = new Map();
    const code = generateRoomCode(rooms);
    assert.strictEqual(typeof code, 'string');
    assert.strictEqual(code.length, 4);
  });

  await t.test('should only use allowed characters', () => {
    const rooms = new Map();
    const allowedChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const code = generateRoomCode(rooms);
    for (const char of code) {
      assert.ok(allowedChars.includes(char), `Character ${char} not allowed`);
    }
  });

  await t.test('should retry if code already exists', (t) => {
    const rooms = new Map();
    rooms.set('AAAA', {});

    // Mock Math.random to return 0 for the first 4 calls (generating 'AAAA')
    // then return 1/32 for the next 4 calls (generating 'BBBB')
    let calls = 0;
    t.mock.method(Math, 'random', () => {
      calls++;
      if (calls <= 4) return 0;
      return 1/32;
    });

    const code = generateRoomCode(rooms);
    assert.strictEqual(code, 'BBBB');
    assert.strictEqual(calls, 8);
  });
});

test('checkWinner', async (t) => {
  await t.test('should detect horizontal win for X', () => {
    const board = [
      'X', 'X', 'X',
      null, 'O', null,
      'O', null, null
    ];
    const result = checkWinner(board);
    assert.deepStrictEqual(result, { winner: 'X', line: [0, 1, 2] });
  });

  await t.test('should detect vertical win for O', () => {
    const board = [
      'X', 'O', 'X',
      'X', 'O', null,
      null, 'O', null
    ];
    const result = checkWinner(board);
    assert.deepStrictEqual(result, { winner: 'O', line: [1, 4, 7] });
  });

  await t.test('should detect diagonal win', () => {
    const board = [
      'X', 'O', null,
      null, 'X', 'O',
      null, null, 'X'
    ];
    const result = checkWinner(board);
    assert.deepStrictEqual(result, { winner: 'X', line: [0, 4, 8] });
  });

  await t.test('should detect a draw', () => {
    const board = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ];
    const result = checkWinner(board);
    assert.deepStrictEqual(result, { draw: true, winner: null });
  });

  await t.test('should return null if no winner and not a draw', () => {
    const board = [
      'X', 'O', 'X',
      null, null, null,
      null, null, null
    ];
    const result = checkWinner(board);
    assert.strictEqual(result, null);
  });
});
