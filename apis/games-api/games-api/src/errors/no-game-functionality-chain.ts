const noChainOrFunctionalityOnBuiltGame = () => ({
  errorMessage:
    'The selected BuiltGame has an undefied chain property. Please add an array of Commands with continueOnError flag to setGameFunctionality method',
});

export default noChainOrFunctionalityOnBuiltGame;
