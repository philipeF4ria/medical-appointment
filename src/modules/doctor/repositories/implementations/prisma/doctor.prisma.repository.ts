import { prismaClient } from '../../../../../infra/database/prisma.config';

import { Doctor } from '../../../entities/doctor.entity';
import { IDoctorRepository } from '../../doctor.repository';

import { DoctorMapper } from '../../../mapper/create-doctor.map';
import { DoctorWithUserDTO } from '../../../dtos/doctor.dto';

class DoctorPrismaRepository implements IDoctorRepository {
    async findById(id: string): Promise<DoctorWithUserDTO | null> {
        const doctor = await prismaClient.doctor.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        });

        if (doctor) return DoctorMapper.prismaToEntityWithUser(doctor);
        return null;
    }

    async findByUserId(userId: string): Promise<Doctor | null> {
        const doctor = await prismaClient.doctor.findUnique({
            where: {
                user_id: userId,
            },
        });

        if (doctor) return DoctorMapper.prismaToEntityDoctor(doctor)
        return null;
    }
    async save(data: Doctor): Promise<Doctor> {
        const doctor = await prismaClient.doctor.create({
            data: {
                crm: data.crm,
                email: data.email,
                specialty_id: data.specialityId,
                user_id: data.userId,
            },
        });

        return DoctorMapper.prismaToEntityDoctor(doctor);
    }
    async findByCRM(crm: string): Promise<Doctor | null> {
        const doctor = await prismaClient.doctor.findUnique({
            where: {
                crm,
            },
        });

        if (doctor) return DoctorMapper.prismaToEntityDoctor(doctor)
        return null;
    }
}

export { DoctorPrismaRepository }
