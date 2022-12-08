import { Request, Response } from 'express';

import { ISpecialtyRepository } from '../../../specialty/repositories/specialty.repository';
import { IUserRepository } from '../../../users/repositories/user.repository';
import { IDoctorRepository } from '../../repositories/doctor.repository';

import { CreateDoctorUseCase } from './create-doctor.usecase';

class CreateDoctorController {
    constructor(
        private userRepository: IUserRepository,
        private doctorRepository: IDoctorRepository,
        private specialtyRepository: ISpecialtyRepository,
    ){}

    async handle(request: Request, response: Response) {
        try {
            const data = request.body;

            const createDoctorUseCase = new CreateDoctorUseCase(
                this.userRepository,
                this.doctorRepository,
                this.specialtyRepository
            );

            const result = await createDoctorUseCase.execute(data);

            return response.json(result);
        } catch(err: any) {
            
            return response.json({
                error: err.message,
            });
        }
    }
}

export { CreateDoctorController }
