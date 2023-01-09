import { prismaClient } from '../../../../../infra/database/prisma.config';

import { DoctorSchedule } from '../../../entities/doctor-schedule.entity';
import { DoctorScheduleMapper, DoctorScheduleWeek } from '../../../mapper/doctor-schedule.map';
import { IDoctorScheduleRepository } from '../../doctor-schedule.repository';

class DoctorScheduleRepository implements IDoctorScheduleRepository {
    async findByDoctorIdAndDayOfWeek(doctorId: string, dayOfWeek: number): Promise<DoctorScheduleWeek | null> {
      const result = await prismaClient.doctorSchedule.findFirst({
        where: {
          day_of_week: dayOfWeek,
          AND: {
            doctor_id: doctorId,
          },
        },
        include: {
          doctor: {
            include: {
              doctorInfo: true,
            },
          },
        },
      });

      if (result) return DoctorScheduleMapper.prismaToEntity(result);
      return null
    }

    async save(data: DoctorSchedule): Promise<void> {
        await prismaClient.$transaction([
          prismaClient.doctorSchedule.deleteMany({
            where: {
              doctor_id: data.doctorId,
            },
          }),
          
          prismaClient.doctorSchedule.createMany({
            data: DoctorScheduleMapper.entityToPrisma(data),
          }),
        ]);
    }

}

export { DoctorScheduleRepository }
