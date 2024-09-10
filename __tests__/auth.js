const { hashPassword, comparePassword } = require('../utils/auth');

describe('testing hashPassword function', () => {
    test('Hash a valid password', async () => {
        const password = 'examplePassword123';
        const hash = await hashPassword(password);

        expect(hash).not.toBe(password);
    });

    test('Hash an empty password', async () => {
        const password = '';
        const hash = await hashPassword(password);

        expect(hash).not.toBe('');
        expect(hash).not.toBeNull();
    });
});

describe('testing comparePassword function', () => {
    test('Compare a valid password with its correct hash', async () => {
        const password = 'examplePassword123';
        const hash = await hashPassword(password);
        const result = await comparePassword(password, hash);

        expect(result).toBeTruthy();
    });

    test('Compare a valid password with an incorrect hash', async () => {
        const originalPassword = 'examplePassword123';
        const inputPassword = 'wrongPassword123';
        const hash = await hashPassword(originalPassword);
        const result = await comparePassword(inputPassword, hash);

        expect(result).toBeFalsy();
    });
});