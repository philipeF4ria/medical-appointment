import { prismaClient } from '../../../../../infra/database/prisma.config';

import { DoctorSchedule } from '../../../entities/doctor-schedule.entity';
import { DoctorScheduleMapper } from '../../../mapper/doctor-schedule.map';
import { IDoctorScheduleRepository } from '../../doctor-schedule.repository';

class DoctorScheduleRepository implements IDoctorScheduleRepository {
    async save(data: DoctorSchedule): Promise<void> {
        await prismaClient.doctorSchedule.createMany({
          data: DoctorScheduleMapper.entityToPrisma(data),
        });
    }

}

export { DoctorScheduleRepository }
