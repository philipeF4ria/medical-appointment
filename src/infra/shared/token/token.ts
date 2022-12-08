import { User } from "../../../modules/users/entities/user.entity"

type TokenUser = {
    sub: string;
}

interface IToken {
    create(user: User): string;
    validate(token: string): TokenUser | null;
}

export { TokenUser, IToken }
