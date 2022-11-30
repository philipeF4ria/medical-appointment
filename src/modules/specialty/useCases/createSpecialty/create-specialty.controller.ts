import { Request, Response } from 'express';

import { ISpecialtyRepository } from '../../repositories/specialty.repository';
import { CreateSpecialtyUseCase } from './create-specialty.usecase';

import { logger } from '../../../../utils/logger';

class CreateSpecialtyController {
    constructor(private specialtyRepository: ISpecialtyRepository) {}

    async handle(request: Request, response: Response) {
        try {
            const { name, description } = request.body;

            const useCase = new CreateSpecialtyUseCase(this.specialtyRepository);
            
            const result = await useCase.execute({ name, description });

            return response.json(result);
        } catch (err: any) {
            logger.error(err.stack);

            return response.json({
                error: err.message,
            });
        }
    }
}

export { CreateSpecialtyController }
