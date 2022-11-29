import { Request, Response } from 'express';
import { CreateUserUseCase } from './create-user.usecase';

import { logger } from '../../../../utils/logger';

import { IUserRepository } from '../../repositories/user.repository';
import { IPasswordEncryption } from '../../../../shared/encryption/password.encryption';

class CreateUserController {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncryption: IPasswordEncryption
    ) {}

    async handle(request: Request, response: Response) {
        logger.info('User is being created');
        
        try {
            const data = request.body;
        
            const useCase = new CreateUserUseCase(this.userRepository, this.passwordEncryption);

            const result = await useCase.execute(data);

            return response.json(result);
        } catch(err: any) {
            logger.error(err.stack);

            return response.status(err.statusCode).json({
                error: err.message
            });
        }
    }
}

export { CreateUserController }
