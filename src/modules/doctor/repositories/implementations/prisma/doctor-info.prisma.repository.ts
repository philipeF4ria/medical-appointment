import { IDoctorInfoRepository } from '../../doctor-info.repository';

import { DoctorInfo } from '../../../entities/doctor-info.entity';

import { prismaClient } from '../../../../../infra/database/prisma.config';

import { DoctorInfoMapper } from '../../../mapper/doctor-info.map';

class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
    async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
        const doctor = await prismaClient.doctorInfo.upsert({
            where: {
                doctor_id: data.doctorId
            },
            create: {
                id: data.id,
                start_at: data.startAt,
                end_at: data.entAt,
                duration:  data.duration,
                price: data.price,
                doctor_id: data.doctorId,
            },
            update: {
                start_at: data.startAt,
                end_at: data.entAt,
                duration:  data.duration,
                price: data.price,
            },
        });

        return DoctorInfoMapper.prismaToEntityDoctorInfo(doctor);
    }
}

export { DoctorInfoPrismaRepository }
