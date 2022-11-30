import { User } from "../../modules/users/entities/user.entity"

interface IToken {
    create(user: User): string;
    validate(token: string): boolean;
}

export { IToken }
