/**
 *
 * @param {string} errorMessage - Error message sent from try / catch block
 * @returns {string} - String showing the error message and instructions to rectify
 */

const gamesAutoStartError = (errorMessage: string): string =>
  `Error ${errorMessage}. Please refresh or select a new game`;

export default gamesAutoStartError;
