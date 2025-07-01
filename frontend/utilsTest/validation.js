function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

module.exports = { validatePasswordMatch };
function isValidEmail(email) {
  if (typeof email !== 'string') return false;

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

module.exports = {
  validatePasswordMatch,
  isValidEmail,
};