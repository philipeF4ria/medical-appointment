import { Doctor as DoctorPrisma, User as UserPrisma } from '@prisma/client';
import { DoctorWithUserDTO } from '../dtos/doctor.dto';

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

    static prismaToEntityWithUser(data: DoctorPrisma & { user: UserPrisma }): DoctorWithUserDTO {
        return {
            crm: data.crm,
            email: data.email,
            specialityId: data.specialty_id,
            userId: data.user_id,
            id: data.id,
            user: {
                name: data.user.name,
            },
        }
    }
}

export { DoctorMapper }
