import { CommandBuilder, Context } from '@bgdk/chain';
import { deRefContextObject } from '@bgdk/de-referencing-utilities';
import { GameContextKeys } from '@bgdk/types-game';
import { IRegisterUser } from '@bgdk/types-api';

const registerUserStart = CommandBuilder.build((context: Context) => {
  if (context.get(GameContextKeys.ACTION) && context.getString(GameContextKeys.ACTION) === 'register-user') {
    const { req } = deRefContextObject(context);

    const { id, firstName, lastName, email, password } = req.body;

    const registerUser: IRegisterUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdOn: new Date(),
      password: password,
    };

    console.log(registerUser);

    return true;
  }

  return false;
});

export default registerUserStart;
