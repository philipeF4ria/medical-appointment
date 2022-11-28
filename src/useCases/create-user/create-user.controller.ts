import { Request, Response } from 'express';
import { CreateUserUseCase } from './create-user.usecase';

import { logger } from '../../utils/logger';

class CreateUserController {
    async handle(request: Request, response: Response) {
        logger.info('User is being created');
        
        try {
            const data = request.body;
        
            const useCase = new CreateUserUseCase();

            const result = await useCase.execute(data);

            return response.json(result);
        } catch(err: any) {
            logger.error(err.stack);

            return response.status(err.statusCode).json(err.message);
        }
    }
}

export { CreateUserController }
