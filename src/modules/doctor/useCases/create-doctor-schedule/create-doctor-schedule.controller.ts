import { Request, Response } from 'express';

import { IDoctorScheduleRepository } from '../../repositories/doctor-schedule.repository';
import { IDoctorRepository } from '../../repositories/doctor.repository';

import { CreateDoctorScheduleUseCase } from './create-doctor-schedule.usecase';

class CreateDoctorScheduleController {
    constructor(
        private doctorRepository: IDoctorRepository,
        private doctorScheduleRepository: IDoctorScheduleRepository,
    ) {}

    async handle(request: Request, response: Response) {
        const data = request.body;
        const userId = request.userId;

        const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(
            this.doctorRepository,
            this.doctorScheduleRepository,
        );

        try {
            await createDoctorScheduleUseCase.execute(data, userId);
            return response.sendStatus(204);
        } catch(err: any) {
            return response.status(err.statusCode ?? 500).json({
                error: err.message,
            });
        }
    }
}

export { CreateDoctorScheduleController }
