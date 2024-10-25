export const error = () => {
  console.log('not found');
  const error = {
    errorMessage: 'GAME IS NOT FOUND. PLEASE GO BACK AND REGISTER A NEW GAME TO CONTINUE',
  };

  return error;
};
