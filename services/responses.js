const responseHandler = (res, status, message, data) => {
  if (!res.headersSent) {
    res.status(status).json({
      status,
      message,
      data,
    });
  }
};

const genericError = (res, error) => {
  if (!res.headersSent) {
    const status = 500;
    const message = error ? error.message : "Internal Server Error";

    res.status(status).json({
      status: status,
      message: message,
    });
  }
};

module.exports = {
  responseHandler,
  genericError,
};
