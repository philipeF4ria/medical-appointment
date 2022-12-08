import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../errors/custom.error';
import { JWT } from '../token/implementations/jwt';

const ensureAuthenticate = (
    request: Request, 
    response: Response, 
    next: NextFunction
) => {
    const headerAuth = request.headers.authorization;

    if (!headerAuth) {
        return response.status(401).json({
            error: 'Token is missing',
        });
    }

    const [, token] = headerAuth.split(' ');

    if (!token) {
        return response.status(401).json({
            error: 'Token is missing',
        });
    }

    const jwt = new JWT();

    const verifyToken = jwt.validate(token);

    if (verifyToken) {
        request.userId = verifyToken.sub;
        
        return next();
    }

    return response.status(401).json({
        error: 'Token invalid.'
    });
}

export { ensureAuthenticate }
