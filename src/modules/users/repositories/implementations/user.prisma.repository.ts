import { prismaClient } from '../../../../infra/database/prisma.config';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../user.repository';

class UserPrismaRepository implements IUserRepository {
    async findByUsername(username: string): Promise<User | undefined> {
        const user = await prismaClient.user.findUnique({
            where: {
                username,
            },
        });

        return user || undefined;
    }

    async findById(id: string): Promise<User | undefined>{
        const user = await prismaClient.user.findUnique({
            where: {
                id,
            },
        });

        return user || undefined;
    }

    async save(data: User): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                username: data.username,
                password: data.password,
            }
        });

        return user;
    }
}

export { UserPrismaRepository }
