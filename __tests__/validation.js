const { validateUsername, validatePassword } = require('../utils/validation');

describe('testing validation functions', () => {
	describe('testing validateUsername', () => {
		test('validateUsername should return true for a valid username', () => {
			expect(validateUsername('validUser123')).toBe(true);
		});

		test('validateUsername should throw an error for a short username', () => {
			try {
				validateUsername('ab');
			} catch (error) {
				expect(error.message).toBe('Username must be at least 3 characters long'); 
			}
		});

		test('validateUsername should throw an error for a too long username', () => {
			try {
				validateUsername('thisusernameiswaytoolong');
			} catch (error) {
				expect(error.message).toBe('Username must be no more than 20 characters long');
			}
		});

		test('validateUsername should throw an error for a username with special characters', () => {
			try {
				validateUsername('invalidUser!');
			} catch (error) {
				expect(error.message).toBe('Username must contain only letters and numbers'); 
			}
		});

		test('validateUsername should throw an error for a username with spaces', () => {
			try {
				validateUsername('invalid User');
			} catch (error) {
				expect(error.message).toBe('Username must contain only letters and numbers');
			}
		});
	});

	describe('testing validatePassword', () => {
		test('validatePassword should return true for a valid password', () => {
			expect(validatePassword('SecurePass123!')).toBe(true);
		});

		test('validatePassword should throw an error for a short password', () => {
			try {
				validatePassword('Short1!');
			} catch (error) {
				expect(error.message).toBe('Password must be at least 8 characters long');
			}
		});

		test('validatePassword should throw an error if no uppercase letter is present', () => {
			try {
				validatePassword('nouppercase1!');
			} catch (error) {
				expect(error.message).toBe('Password must contain both uppercase and lowercase letters');
			}
		});

		test('validatePassword should throw an error if no lowercase letter is present', () => {
			try {
				validatePassword('NOLOWERCASE1!');
			} catch (error) {
				expect(error.message).toBe('Password must contain both uppercase and lowercase letters');
			}
		});

		test('validatePassword should throw an error if no number or special character is present', () => {
			try {
				validatePassword('NoSpecialChar');
			} catch (error) {
				expect(error.message).toBe('Password must contain at least one number or special character');
			}
		});
	});
});