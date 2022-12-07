import { IDoctorInfoRepository } from '../../doctor-info.repository';

import { DoctorInfo } from '../../../entities/doctor-info.entity';

import { prismaClient } from '../../../../../infra/database/prisma.config';

import { DoctorInfoMapper } from '../../../mapper/doctor-info.map';

class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
    async save(data: DoctorInfo): Promise<DoctorInfo> {
        const doctor = await prismaClient.doctorInfo.create({
            data: {
                id: data.id,
                start_at: data.startAt,
                end_at: data.entAt,
                duration:  data.duration,
                price: data.price,
                doctor_id: data.doctorId,
            },
        });

        return DoctorInfoMapper.prismaToEntityDoctorInfo(doctor);
    }
}

export { DoctorInfoPrismaRepository }
