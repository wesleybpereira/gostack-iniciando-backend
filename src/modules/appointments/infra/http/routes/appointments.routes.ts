import { Router } from 'express';
import ensuraceAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsControler from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsControler();

appointmentsRouter.use(ensuraceAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
