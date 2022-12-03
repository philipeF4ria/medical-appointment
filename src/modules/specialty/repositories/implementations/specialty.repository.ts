import { prismaClient } from '../../../../infra/database/prisma.config';

import { ISpecialtyRepository } from '../specialty.repository';
import { Specialty } from '@prisma/client';

class SpecialtyRepository implements ISpecialtyRepository {
    async save(data: Specialty): Promise<Specialty> {
        const specialty = await prismaClient.specialty.create({
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
            },
        });

        return specialty;
    }

    async findByName(name: string): Promise<Specialty | null> {
        const specialty = await prismaClient.specialty.findUnique({
            where: {
                name,
            },
        });

        return specialty || null;
    }

    async findById(id: string): Promise<Specialty | null> {
        const specialty = await prismaClient.specialty.findUnique({
            where: {
                id,
            },
        });

        return specialty || null;
    }
   
}

export { SpecialtyRepository }
