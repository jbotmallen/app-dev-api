const jwt = require("jsonwebtoken");
const { responseHandler, genericError } = require("../services/responses");

const authenticateJWT = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;

      next();
    } else {
      return responseHandler(res, 403, "Unauthorized");
    }
  } catch (error) {
    return genericError(res, error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  authenticateJWT,
  generateToken,
};
