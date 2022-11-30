import { sign, verify } from 'jsonwebtoken';
import { createHmac } from 'crypto';

import { User } from '../../../modules/users/entities/user.entity';
import { IToken } from '../token';

class JWT implements IToken {
    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || '';

    private TokenSecretCrypto = createHmac('sha256', this.TOKEN_SECRET).digest('base64');

    create({ username, isAdmin, id }: User): string {
        const token = sign({
            user: {
                username,
                isAdmin,
                id,
            },
        }, 
        this.TokenSecretCrypto, 
        {
            subject: id,
            expiresIn: '1d',
        });

        return token;
    }

    validate(token: string): boolean {
        try {
            verify(token, this.TokenSecretCrypto);
            return true;
        } catch(err) {
            return false;
        }
    }
}

export { JWT }
