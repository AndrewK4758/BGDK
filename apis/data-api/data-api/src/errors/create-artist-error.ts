/**
 * Creates an error object for artist creation failures.
 *
 * @returns An object containing an error message indicating that the artist was not added and suggesting actions to the user.
 */

const createArtistsError = (): { errorMessage: string } => ({
  errorMessage: 'Artist not added. Please Select existing artist to view or update',
});
export default createArtistsError;
