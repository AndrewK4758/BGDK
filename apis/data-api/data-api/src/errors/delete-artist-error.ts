/**
 * Creates an error object for artist deletion failures.
 *
 * @returns An object containing an error message indicating that the artist was not added and suggesting actions to the user.
 */

const deleteArtistError = (): { errorMessage: string } => ({ errorMessage: 'Artist ID not in the artist list' });
export default deleteArtistError;
