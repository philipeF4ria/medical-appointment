import { User } from '../../../users/entities/user.entity';
import { Patient } from '../../entities/patient.entity';

import { CustomError } from '../../../../errors/custom.error';

import { IUserRepository } from '../../../users/repositories/user.repository';
import { IPatientRepository } from '../../repositories/patient.repository';

type CreatePatientRequest = {
    name: string;
    username: string;
    email: string;
    password: string;
    document: string;
}

class CreatePatientUseCase {
    constructor(
        private userRepository: IUserRepository,
        private patientRepository: IPatientRepository
    ){}

    async create(data: CreatePatientRequest) {
        const user = await User.create({
            name: data.name,
            username: data.username,
            password: data.password,
        });

        const existUser = await this.userRepository.findByUsername(data.username);

        if (existUser) {
            throw new CustomError('Username already exists', 400, 'USER_EXITS_ERROR');
        }

        const userCreated = await this.userRepository.save(user);

        const patient = Patient.create({
            document: data.document,
            email: data.email,
            userId: userCreated.id,
        });

        const existPatient = await this.patientRepository.findByDocumentOrEmail(
            data.document, 
            data.email
        );

        if (existPatient) {
            throw new CustomError('Patient already exists', 400);
        }

        const patientCreated = await this.patientRepository.save(patient);

        return patientCreated;
    }
}

export { CreatePatientUseCase }
