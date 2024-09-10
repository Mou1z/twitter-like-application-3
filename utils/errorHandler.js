const handleError = (res, message, statusCode = 500) => {
  res.status(statusCode).send({ error: message });
};

module.exports = { handleError };