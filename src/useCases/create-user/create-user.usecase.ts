import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

import { ParameterRequiredError } from '../../errors/parameter-required.error';


type IUserRequest = {
    name: string;
    username: string;
    password: string;
}

class CreateUserUseCase {
    async execute(data: IUserRequest) {
        const userRepository = UserRepository.getInstance();

        if (!data.username || !data.password) {
            throw new ParameterRequiredError('Username/password is required', 422);
        }

        const existUser = await userRepository.findByUsername(data.username);

        if (existUser) {
            throw new ParameterRequiredError('Username already exists', 400);
        }

        const user = User.create(data);

        const userCreated = await userRepository.save(user);
    
        return userCreated;
    }
}

export { CreateUserUseCase };
