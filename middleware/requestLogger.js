const requestLogger = (req, res, next) => {
  const methodType = req.method; // GET, POST, PUT, DELETE
  const route = req.originalUrl; // ex: /api/v1/users
  const timeStamp = new Date().toISOString(); // ex: 2021-09-15T14:00:00.000Z

  console.log(`Using: ${methodType}, From: ${route}, On: ${timeStamp}`);
  next();
};

module.exports = requestLogger;
