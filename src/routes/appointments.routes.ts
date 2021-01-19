import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppontimentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensuraceAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensuraceAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body; // provider_id = nome do barbeiro

        const parsedDate = parseISO(date);
        const createAppointment = new CreateAppointmentService();
        /* const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        ); */

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });
        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
