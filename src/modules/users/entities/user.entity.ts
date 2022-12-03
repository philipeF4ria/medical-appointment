import { randomUUID } from 'crypto';

import { ParameterRequiredError } from '../../../errors/parameter-required.error';

type IUser = {
    name: string;
    username: string;
    password: string;
}

class User {
    name: string;
    password: string;
    username: string;
    id: string;
    isAdmin: boolean;

    private constructor(props: IUser) {
        if (!props.username || !props.password) {
            throw new ParameterRequiredError('Username/Password is required');
        }

        this.name = props.name;
        this.username = props.username;
        this.password = props.password;
        this.id = randomUUID();
        this.isAdmin = false;
    }

    static create(props: IUser) {
        const user = new User(props);

        return user;
    }
}

export { User }
