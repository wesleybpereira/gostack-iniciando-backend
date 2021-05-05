import { Router } from 'express';
import ProfileController from '../controllers/ProfileControler';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
