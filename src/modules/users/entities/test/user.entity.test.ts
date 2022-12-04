import { describe, test, expect } from 'vitest';
import { User } from '../user.entity';

describe('User Entity', () => {
    test('Should be able to create a new user', async () => {
        const user = await User.create({
            name: 'USER_NAME',
            username: 'USERNAME',
            password: 'PASSWORD_TEST',
        });

        expect(user).toBeInstanceOf(User);
        expect(user).toHaveProperty('id');
        expect(user).not.equal('PASSWORD_TEST');
    });
});
