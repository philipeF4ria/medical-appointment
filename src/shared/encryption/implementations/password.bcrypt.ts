import bcrypt from 'bcryptjs';

import { IPasswordEncryption } from "../password.encryption";

class PasswordBcrypt implements IPasswordEncryption {
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    compare(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}

export { PasswordBcrypt }
