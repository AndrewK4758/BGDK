import { Color, AvatarTotem } from '@aklapper/chutes-and-ladders';
import {
  IBuiltGame,
  GamePlayerValidation,
  IPlayersAndBoard,
  // TurnStatus,
  GameInstanceID,
  PlayerID,
} from '@aklapper/model';
import axios from 'axios';

describe('Games api test wrapper', () => {
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

      const __current_game__ = JSON.parse(resp.headers.__current_game__);

      expect((__current_game__.gameInstanceID as GameInstanceID).length).toEqual(6);
      expect(resp.status).toEqual(201);
    });
  });

  describe('From here down tests the dynamic endpoints in my CoR', () => {
    let __current_game__: GamePlayerValidation;
    beforeAll(async () => {
      const respForID = await axios.post('/games/Chutes-&-Ladders');
      __current_game__ = JSON.parse(respForID.headers.__current_game__);
    });

    describe('PATCH Formik form loader to register player/avatar', () => {
      it('Should return a list of avatar objects and avatar color string enums', async () => {
        const resp = await axios.patch(
          '/games/Chutes-&-Ladders/load-register',
          {},
          { headers: { __current_game__: JSON.stringify(__current_game__) } }
        );

        expect(resp.data.avatarList.length).toEqual(4);
        expect(resp.data.avatarList).toContainEqual(
          expect.objectContaining<AvatarTotem>({ id: expect.any(Number), name: expect.any(String) })
        );
        expect(resp.data.avatarColorList).toEqual(expect.objectContaining(Color));
      });
    });
    describe('PATCH Formik form submission to register player/avatar', () => {
      it('Should return status of 200 and update players array', async () => {
        const resp = await axios.patch(
          '/games/Chutes-&-Ladders/register',
          {
            playerName: 'test P',
            avatarName: 'test A',
            avatarColor: Color.BLACK,
          },
          { headers: { __current_game__: JSON.stringify(__current_game__) } }
        );

        __current_game__ = JSON.parse(resp.headers.__current_game__) as GamePlayerValidation;

        expect(resp.data.message).toEqual('Player Created');
        expect((__current_game__.playerID as PlayerID).length).toEqual(6);
        expect(resp.status).toEqual(201);
      });
    });

    describe('This tests everything min number of players are registered to start and play game', () => {
      beforeAll(async () => {
        for (let i = 1; i < 3; i++) {
          const resp = await axios.patch(
            '/games/Chutes-&-Ladders/register',
            {
              playerName: `Player ${i}`,
              avatarName: `Avatar ${i}`,
              avatarColor: Color.BLACK,
            },
            { headers: { __current_game__: JSON.stringify(__current_game__) } }
          );
          __current_game__ = JSON.parse(resp.headers.__current_game__);
        }
      });
      describe('PATCH /start - set avatars and ready game for play', () => {
        it('Should verify the min/max number of players in a game, set the randomly decided player order, place players in startSpace, set the player in turn to the player order', async () => {
          const resp = await axios.patch(
            '/games/Chutes-&-Ladders/start',
            {},
            { headers: { __current_game__: JSON.stringify(__current_game__) } }
          );

          __current_game__ = JSON.parse(resp.headers.__current_game__);

          expect(resp.data.message).toEqual('Game Started');
        });
      });

      describe('Game functionality after game is started', () => {
        beforeAll(async () => {
          await axios.patch(
            '/games/Chutes-&-Ladders/start',
            {},
            { headers: { __current_game__: JSON.stringify(__current_game__) } }
          );
        });
        describe('PATCH /board - return board', () => {
          it('Should verify game play data', async () => {
            const resp = await axios.patch(
              '/games/Chutes-&-Ladders/board',
              {},
              { headers: { __current_game__: JSON.stringify(__current_game__) } }
            );

            __current_game__ = JSON.parse(resp.headers.__current_game__);
            const gamePlayData = resp.data as IPlayersAndBoard;
            expect(gamePlayData.gameBoard).toEqual(
              expect.arrayContaining([expect.arrayContaining([expect.any(String)])])
            );
            expect(gamePlayData.activePlayersInGame).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  playerName: expect.any(String),
                  avatarName: expect.any(String),
                  avatarColor: expect.any(String),
                }),
              ])
            );
            expect(gamePlayData.playerInTurn).toEqual(expect.any(String));
            expect(gamePlayData.message).toEqual(expect.any(String));
          });
        });
        // describe('Patch /take-turn', () => {
        //   it('Should verify valid turn', async () => {
        //     __current_game__.test = true;

        //     const resp = await axios.patch(
        //       '/games/Chutes-&-Ladders/take-turn',
        //       {},
        //       { headers: { __current_game__: JSON.stringify(__current_game__) } }
        //     );
        //     console.log(resp.headers.__current_game__);
        //     __current_game__ = JSON.parse(resp.headers.__current_game__);

        //     expect(resp.data.message).toMatch(TurnStatus.VALID || TurnStatus.INVALID);
        //   });
        // });
      });
    });
  });
});
