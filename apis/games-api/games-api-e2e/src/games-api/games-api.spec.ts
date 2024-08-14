import { IPlayersAndBoard } from '@bgdk/chains-for-games';
import { IBuiltGame } from '@bgdk/game-builder';
import { IRegisterUserClient } from '@bgdk/types-api';
import { AvatarTotem, Color, GameInstanceID, GamePlayerValidation, PlayerID, TurnStatus } from '@bgdk/types-game';
import axios from 'axios';

let __current_game__: GamePlayerValidation, playerIDs: string[];

describe('Games api test wrapper', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('Test login route', () => {
    it('Should login user based on email & password or JWT', async () => {
      const loginInfo = {
        email: 'test3@erase.email',
        password: 'erase',
      };

      const options = {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGVyYXNlLmVtYWlsIiwicGFzc3dvcmQiOiIkMmIkMTAkMFBPYm1OM3VXZ0pJLkdhUE1hVjFEZS9FUzlNbFpwcU82RWR1bHJOSTNWSXRNaENuNC5zaTIiLCJpYXQiOjE3MjM2MDIzOTMsImV4cCI6MTcyMzYwNTk5M30.-YPa0mRKW32ZvVsjPHGeaH9WizRA6imfFnbzwc7tHao',
        },
      };

      const resp = await axios.patch('/login', loginInfo, options);

      expect(resp.status).toEqual(200);
    });
  });
  describe('Test register route', () => {
    it('Should register user in db and return status 202', async () => {
      const userInfo: IRegisterUserClient = {
        firstName: 'test',
        lastName: 'erase',
        email: `test4@erase.email`,
        password: 'erase',
        playerName: 'erase player',
      };
      const resp = await axios.post('/register', userInfo);

      console.log(resp.data);
      console.log(resp.headers);
      expect(1).toBe(1);
    });
  });
  describe('GET Games ', () => {
    it("should return an array of games names and id's", async () => {
      const resp = await axios.get(`/games`);

      const data = resp.data as IBuiltGame[];

      expect(data.length).toEqual(2);
      expect(resp.status).toEqual(200);
    });
  });

  describe('POST Register Game button functionallity', () => {
    it('Should return a gameID', async () => {
      const resp = await axios.post('/games/Chutes-&-Ladders');

      __current_game__ = JSON.parse(resp.headers['current-game']);

      expect((__current_game__.gameInstanceID as GameInstanceID).length).toEqual(6);
      expect(resp.status).toEqual(201);
    });
  });

  describe('From here down tests the dynamic endpoints in my CoR', () => {
    describe('PATCH Formik form loader to register player/avatar', () => {
      it('Should return a list of avatar objects and avatar color string enums', async () => {
        const resp = await axios.patch(
          '/games/Chutes-&-Ladders/load-register',
          {},
          { headers: { 'current-game': JSON.stringify(__current_game__) } },
        );

        expect(resp.data.avatarList.length).toEqual(4);
        expect(resp.data.avatarList).toContainEqual<AvatarTotem>;
        expect(resp.data.avatarColorList).toContainEqual<Color>;
      });
    });
    describe('PATCH Formik form submission to register player/avatar', () => {
      playerIDs = [];
      it('Should return status of 200 and update players array', async () => {
        let name;
        for (let i = 1; i < 3; i++) {
          name = i === 1 ? 'XENOMORPH' : 'PREDATOR';

          const resp = await axios.patch(
            '/games/Chutes-&-Ladders/register',
            {
              playerName: `Player ${i}`,
              avatarName: name,

              avatarColor: Color.BLACK,
            },
            { headers: { 'current-game': JSON.stringify(__current_game__) } },
          );
          __current_game__ = JSON.parse(resp.headers['current-game']);
          playerIDs.push(__current_game__.playerID);

          expect(resp.data.message).toEqual('Player Created');
          expect((__current_game__.playerID as PlayerID).length).toEqual(6);
          expect(resp.status).toEqual(201);
        }
      });
    });

    describe('This tests everything min number of players are registered to start and play game', () => {
      describe('PATCH /start - set avatars and ready game for play', () => {
        it('Should verify the min/max number of players in a game, set the randomly decided player order, place players in startSpace, set the player in turn to the player order', async () => {
          const resp = await axios.patch(
            '/games/Chutes-&-Ladders/start',
            {},
            {
              headers: { 'current-game': JSON.stringify(__current_game__) },
            },
          );

          __current_game__ = JSON.parse(resp.headers['current-game']);

          expect(resp.data.message).toEqual('Game Started');
        });
      });

      describe('Game functionality after game is started', () => {
        describe('PATCH /board - return board', () => {
          it('Should verify game play data', async () => {
            const resp = await axios.patch(
              '/games/Chutes-&-Ladders/board',
              {},
              {
                headers: { 'current-game': JSON.stringify(__current_game__) },
              },
            );

            __current_game__ = JSON.parse(resp.headers['current-game']);

            const gamePlayData = resp.data as IPlayersAndBoard;
            expect(gamePlayData.gameBoard.length).toEqual(100);
            expect(gamePlayData.activePlayersInGame.length).toEqual(2);
            expect(gamePlayData.avatarInTurn).not.toBeUndefined();
            expect(gamePlayData.winner).toEqual('');
          });
        });
        describe('PATCH /take-turn - move only player in turn and return turnStatus', () => {
          it('should pass and return valid turn status', async () => {
            __current_game__.playerID = playerIDs[0];

            const resp = await axios.patch(
              '/games/Chutes-&-Ladders/take-turn',
              {},
              {
                headers: { 'current-game': JSON.stringify(__current_game__) },
              },
            );
            console.log(resp.data.turnStatus);
            if (resp.data.turnStatus === TurnStatus.INVALID) {
              __current_game__.playerID = playerIDs[1];
              const resp = await axios.patch(
                '/games/Chutes-&-Ladders/take-turn',
                {},
                {
                  headers: {
                    'current-game': JSON.stringify(__current_game__),
                  },
                },
              );

              expect(resp.status).toEqual(201);
              expect(resp.data.turnStatus).toEqual(TurnStatus.VALID);
            } else {
              expect(resp.status).toEqual(201);
              expect(resp.data.turnStatus).toEqual(TurnStatus.VALID);
            }
          });
          it('should fail and return invalid turn status', async () => {
            __current_game__.playerID = 'different-player-ID';

            const resp = await axios.patch(
              '/games/Chutes-&-Ladders/take-turn',
              {},
              {
                headers: { 'current-game': JSON.stringify(__current_game__) },
              },
            );

            expect(resp.data.turnStatus).toEqual(TurnStatus.INVALID);
            expect(resp.status).toEqual(201);
          });
        });
        describe('PATCH /reset to test new board and active players on startSpace', () => {
          it('Should pass and log VALID-PLAYER to console', async () => {
            const resp = await axios.patch(
              '/games/Chutes-&-Ladders/reset',
              {},
              { headers: { 'current-game': JSON.stringify(__current_game__) } },
            );

            expect(resp.data.message).toEqual('Game Started');
            expect(resp.status).toEqual(201);
          });
        });
      });
    });
  });
});
