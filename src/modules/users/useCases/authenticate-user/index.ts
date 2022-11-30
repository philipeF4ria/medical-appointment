import { UserPrismaRepository } from '../../repositories/implementations/user.prisma.repository';
import { PasswordBcrypt } from '../../../../shared/encryption/implementations/password.bcrypt';
import { JWT } from '../../../../shared/token/implementations/jwt';

import { AuthenticateUserController } from './authenticate-user.controller';

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PasswordBcrypt();
const token = new JWT();

const authenticateUserController = new AuthenticateUserController(
    userPrismaRepository, 
    passwordBcrypt,
    token,
);

export { authenticateUserController }
