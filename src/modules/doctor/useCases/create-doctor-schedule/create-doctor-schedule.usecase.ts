import { CustomError } from '../../../../errors/custom.error';
import { DoctorSchedule } from '../../entities/doctor-schedule.entity';

import { IDoctorRepository } from '../../repositories/doctor.repository';
import { IDoctorScheduleRepository } from '../../repositories/doctor-schedule.repository';

type DoctorSchedulesRequest = {
    startAt: string;
    endAt: string;
    dayOfWeek: number;
}

type CreateDoctorScheduleRequest = {
    schedules: DoctorSchedulesRequest[];
}

class CreateDoctorScheduleUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
        private doctorScheduleRepository: IDoctorScheduleRepository
    ) {}

    async execute(data: CreateDoctorScheduleRequest,  userId: string) {

        const doctor = await this.doctorRepository.findByUserId(userId);

        if (!doctor ) {
            throw new CustomError('Doctor does not exists', 400);
        }

        const doctorSchedule = DoctorSchedule.create({
            schedules: data.schedules,
            doctorId: doctor.id,
        });

        await this.doctorScheduleRepository.save(doctorSchedule);

    }
}

export { CreateDoctorScheduleUseCase }
