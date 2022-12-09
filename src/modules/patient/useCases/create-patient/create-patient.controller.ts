import { Request, Response } from 'express';

import { IUserRepository } from '../../../users/repositories/user.repository';
import { IPatientRepository } from '../../repositories/patient.repository';

import { CreatePatientUseCase } from './create-patient.usecase';

class CreatePatientController {
    constructor(
        private userRepository: IUserRepository,
        private patientRepository: IPatientRepository
        ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        try {
            const createPatientUseCase = new CreatePatientUseCase(
                this.userRepository,
                this.patientRepository
            );

            const result = await createPatientUseCase.create(body);

            return response.json(result);

        } catch(err: any) {
            return response.status(err.statusCode).json({
                error: err.message
            });
        }
    }
}

export { CreatePatientController }
