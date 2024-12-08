/**
 * Creates an error object for get artists failures.
 *
 * @returns An object containing an error message indicating that the artist was not added and suggesting actions to the user.
 */

const findArtistError = (): { errorMessage: string } => ({ errorMessage: 'findArtists logged an error' });
export default findArtistError;
