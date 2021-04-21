import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppontimentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

/**
 * Dependency Inversion (SOLID)
 *
 * S - Single Responsability Principle
 * D - Dependency Inversion Principle
 */

class CreateAppointmentService {
    /* private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    } */

    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked.');
        }

        /* const appointment = {
        id: uuid(),
        provider_id,
        date: parsedDate,
    }; */

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
