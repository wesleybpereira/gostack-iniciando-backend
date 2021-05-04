import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatesUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticatesUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
