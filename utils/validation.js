const validateUsername = (username) => {
  if (typeof username !== 'string' || username.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }

  if (username.length > 20) {
    throw new Error('Username must be no more than 20 characters long');
  }

  const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(username);
  if (!isAlphanumeric) {
    throw new Error('Username must contain only letters and numbers');
  }

  return true;
};

const validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  if (!hasUppercase || !hasLowercase) {
    throw new Error('Password must contain both uppercase and lowercase letters');
  }

  const hasNumberOrSpecialChar = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasNumberOrSpecialChar) {
    throw new Error('Password must contain at least one number or special character');
  }

  return true;
};

module.exports = { validateUsername, validatePassword };