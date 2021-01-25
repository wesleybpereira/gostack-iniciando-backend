import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authenticatesUser = new AuthenticateUserService();

    const { user, token } = await authenticatesUser.execute({
        email,
        password,
    });

    delete user.password;

    return res.json({ user, token });
});

export default sessionsRouter;
