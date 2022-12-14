import { User } from '../../entities/user.entity';
import { IUserRepository } from '../user.repository';

class UserMemoryRepository implements IUserRepository {
    users: User[];

    private static instance: UserMemoryRepository;

    constructor() {
        this.users = [];
    }
    findById(id: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }

    static getInstance() {
        if (!UserMemoryRepository.instance) {
            UserMemoryRepository.instance = new UserMemoryRepository();
        }

        return UserMemoryRepository.instance;
    }

    async findByUsername(username: string) {
        return this.users.find(user => user.username === username);
    }

    async save(data: User) {
        this.users.push(data);
        return data;
    }
}

export { UserMemoryRepository }
