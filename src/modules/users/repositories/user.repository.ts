import { User } from "../entities/user.entity"

interface IUserRepository {
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    save(data: User): Promise<User>;
}

export { IUserRepository }
