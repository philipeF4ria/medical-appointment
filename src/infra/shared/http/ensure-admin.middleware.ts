import { Request, Response, NextFunction } from 'express';

import { UserPrismaRepository } from '../../../modules/users/repositories/implementations/user.prisma.repository';

async function ensureAdmin(
    request: Request, 
    response: Response,
    next: NextFunction
) {
    const userRepository = new UserPrismaRepository();

    const user = await userRepository.findById(request.userId);

    if (!user) {
        return response.status(400).json({
            error: 'User does not exists'
        });
    }

    if (!user.isAdmin) {
        return response.status(401).json({
            error: 'User is not admin'
        });
    }

    return next();
}

export { ensureAdmin }
