import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticate-user.usecase';

import { logger } from '../../../../utils/logger';

import { IUserRepository } from '../../repositories/user.repository';
import { IPasswordEncryption } from '../../../../shared/encryption/password.encryption';
import { IToken } from '../../../../shared/token/token';

class AuthenticateUserController {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncryption: IPasswordEncryption,
        private token: IToken
    ) {}

    async handle(request: Request, response: Response) {
        logger.info('User is being authenticated');
        
        try {
            const { username, password } = request.body;
        
            const useCase = new AuthenticateUserUseCase(
                this.userRepository, 
                this.passwordEncryption,
                this.token
            );

            const result = await useCase.execute({ username, password });

            return response.json(result);
        } catch(err: any) {
            logger.error(err.stack);

            return response.status(err.statusCode).json({
                error: err.message
            });
        }
    }
}

export { AuthenticateUserController }
