const registerUserError = (message: string) => ({
  errorMessage: `Error registering user. \n ${message}`,
});

export default registerUserError;
