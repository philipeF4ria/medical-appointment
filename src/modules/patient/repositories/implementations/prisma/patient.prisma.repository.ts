import { IPatientRepository } from '../../patient.repository';

import { Patient } from '../../../entities/patient.entity';

import { prismaClient } from '../../../../../infra/database/prisma.config';
import { PatientMapper } from '../../../mapper/patient.map';

class PatientPrismaRepository implements IPatientRepository {
    async save(data: Patient): Promise<Patient> {
        const patient = await prismaClient.patient.create({
            data: PatientMapper.entityToPrisma(data)
        });

        return PatientMapper.prismaToEntity(patient);
    }

    async findByDocumentOrEmail( document: string, email: string): Promise<Patient | null> {
        const patient = await prismaClient.patient.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: email,
                        },
                    },
                    {
                        document: {
                            equals: document,
                        },
                    },
                ],
            },
        });

        if (patient) return PatientMapper.prismaToEntity(patient);

        return null;
    }

    async findByUserId(userId: string): Promise<Patient | null> {
        throw new Error('This method does not implemented');
    }
}

export { PatientPrismaRepository }
