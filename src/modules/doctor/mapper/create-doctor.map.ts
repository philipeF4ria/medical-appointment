import { Doctor as DoctorPrisma } from '@prisma/client';

import { Doctor } from '../entities/doctor.entity';

class DoctorMapper {
    static prismaToEntityDoctor(data: DoctorPrisma): Doctor {
        return {
            crm: data.crm,
            email: data.email,
            specialityId: data.specialty_id,
            userId: data.user_id,
            id: data.id,
        }
    }
}

export { DoctorMapper }
