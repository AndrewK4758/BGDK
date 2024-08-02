const gameNotInList = () => ({
  errorMessage:
    'Please select a listed game; OR, Add game name to the uri with the endpoint /games/:id if the game is already constructed; OR, Check the spelling of the name property in your BuiltGame',
});

export default gameNotInList;
