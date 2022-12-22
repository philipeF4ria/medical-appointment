import { DoctorSchedule } from '../entities/doctor-schedule.entity';

interface IDoctorScheduleRepository {
    save(data: DoctorSchedule): Promise<void>
}

export { IDoctorScheduleRepository }
