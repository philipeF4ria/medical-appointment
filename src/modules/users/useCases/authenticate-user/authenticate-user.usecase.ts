import { IPasswordEncryption } from '../../../../infra/shared/encryption/password.encryption';
import { IUserRepository } from '../../repositories/user.repository';
import { IToken } from '../../../../infra/shared/token/token';

import { CustomError } from '../../../../errors/custom.error';

type AuthenticateRequest = {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncryption: IPasswordEncryption,
        private token: IToken
    ){}

    async execute({ username, password }: AuthenticateRequest) {
        if (!username || !password) {
            throw new CustomError('Username/password incorrect - nao mandou senha ou username', 401);
        }

        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new CustomError('Username/password incorrect - user nao existe', 401);
        }

        const comparePassword = await this.passwordEncryption.compare(password, user.password);

        if (!comparePassword) {
            throw new CustomError('Username/password incorrect - senha incorreta', 401);
        }

        const tokenGenerated = this.token.create(user);

        return tokenGenerated;
    }
}

export { AuthenticateUserUseCase }
