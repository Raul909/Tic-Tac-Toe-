const WINS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/**
 * Checks if there's a winner or a draw on the board.
 * @param {Array} board - The game board array.
 * @returns {Object|null} - Result object or null.
 */
function checkWinner(board) {
  for (const line of WINS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  if (board.every(Boolean)) return { draw: true, winner: null };
  return null;
}

/**
 * Generates a unique 4-character room code.
 * @param {Map} roomsMap - The existing rooms map to check for uniqueness.
 * @returns {string} - The generated room code.
 */
function generateRoomCode(roomsMap) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code;
  do {
    code = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (roomsMap.has(code));
  return code;
}

module.exports = {
  WINS,
  checkWinner,
  generateRoomCode
};
