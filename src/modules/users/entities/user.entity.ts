import { randomUUID } from 'crypto';

import { ParameterRequiredError } from '../../../errors/parameter-required.error';
import { PasswordBcrypt } from '../../../infra/shared/encryption/implementations/password.bcrypt';

type IUser = {
    name: string;
    username: string;
    password: string;
    avatar?: string | null;
}

class User {
    name: string;
    password: string;
    username: string;
    id: string;
    isAdmin: boolean;
    avatar?: string | null;

    private constructor(props: IUser) {
        if (!props.username || !props.password) {
            throw new ParameterRequiredError('Username/Password is required');
        }

        this.name = props.name;
        this.username = props.username;
        this.password = props.password;
        this.id = randomUUID();
        this.isAdmin = false;
        this.avatar = props.avatar;
    }

    static async create(props: IUser) {
        if (!props.password) {
            throw new ParameterRequiredError('Password is required');
        }

        const passwordEncryption = new PasswordBcrypt();

        const passwordHash = await passwordEncryption.hash(props.password);

        props.password = passwordHash;
        
        const user = new User(props);

        return user;
    }
}

export { User }
