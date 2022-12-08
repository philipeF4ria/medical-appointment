import { Request, Response } from 'express';
import { string, z } from 'zod';

import { validatorSchema } from '../../../../infra/shared/validator/zod';
import { ValidationSchemaError } from '../../../../errors/validation-schema.error';

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
        const { body } = request;

            const doctorSchema = z.object({
                username: z.string(),
                name: z.string(),
                email: z.string().email({
                    message: 'You need insert a valid e-mail'
                }),
                password: z.string(),
                crm: z.string().length(6, {
                    message: 'CRM must contain 6 characters'
                }),
                specialtyId: string().uuid({
                    message: 'You need insert a valid specialty id'
                }),
            });
        
        try {
            validatorSchema(doctorSchema, body);

            const createDoctorUseCase = new CreateDoctorUseCase(
                this.userRepository,
                this.doctorRepository,
                this.specialtyRepository
            );

            const result = await createDoctorUseCase.execute(body);

            return response.json(result);
        } catch(err: any) {
            
            if (err instanceof ValidationSchemaError) {
                return response.status(err.statusCode).json(err.errors);
            }

            return response.status(err.statusCode).json(err.message);
        }
    }
}

export { CreateDoctorController }
