import { sign, verify } from 'jsonwebtoken';
import { createHmac } from 'crypto';

import { User } from '../../../modules/users/entities/user.entity';
import { IToken, TokenUser } from '../token';

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

    validate(token: string): TokenUser | null {
        try {
            const tokenUser =verify(token, this.TokenSecretCrypto) as TokenUser;
            return tokenUser;
        } catch(err) {
            return null;
        }
    }
}

export { JWT }
