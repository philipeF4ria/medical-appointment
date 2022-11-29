import { User } from '../../entities/user.entity';

import { IUserRepository } from '../../repositories/user.repository';
import { IPasswordEncryption } from '../../../../shared/encryption/password.encryption';

import { ParameterRequiredError } from '../../../../errors/parameter-required.error';
import { CustomError } from '../../../../errors/custom.error';

type UserRequest = {
    name: string;
    username: string;
    password: string;
}

class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncryption: IPasswordEncryption
    ) {}

    async execute(data: UserRequest) {

        if (!data.username || !data.password) {
            throw new ParameterRequiredError('Username/password is required', 422);
        }

        const existUser = await this.userRepository.findByUsername(data.username);

        if (existUser) {
            throw new CustomError('Username already exists', 400, 'USER_EXISTS_ERROR');
        }

        const passwordHash = await this.passwordEncryption.hash(data.password);

        const user = User.create(data);

        user.password = passwordHash;

        const userCreated = await this.userRepository.save(user);
    
        return userCreated;
    }
}

export { CreateUserUseCase };
