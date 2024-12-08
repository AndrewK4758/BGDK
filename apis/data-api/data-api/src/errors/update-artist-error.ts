/**
 * Creates an error object for artist update failures.
 *
 * @returns An object containing an error message indicating that the artist was not added and suggesting actions to the user.
 */

const updateArtistError = (): { errorMessage: string } => ({
  errorMessage: 'Update failed, artist_id not in database',
});
export default updateArtistError;
