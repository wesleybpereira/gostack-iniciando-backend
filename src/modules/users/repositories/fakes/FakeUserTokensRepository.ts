import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userToken.find(
      findedToken => findedToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
