const { findUserById } = require("../controllers/userController");
const { responseHandler } = require("../services/responses");
const { authenticateJWT } = require("../controllers/tokenController");

const AUTH_ROUTES = ["/auth/register", "/auth/login"];
const PROTECTED_ROUTES = ["/profile/"];

const auth_check = async (req, res, next) => {
  const id = req.userId;

  const dbUser = await findUserById(id);

  if (dbUser) {
    next();
  } else {
    return responseHandler(res, 403, "Unauthorized");
  }
};

const middleware = (req, res, next) => {
  const { pathname } = req._parsedUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.includes(route)
  );
  const isAuth = AUTH_ROUTES.some((route) => pathname.includes(route));

  if (isProtected) {
    authenticateJWT(req, res, next);
    return auth_check(req, res, next);
  }

  if (isAuth) {
    const token = req.cookies.token;

    if (token) {
      return responseHandler(res, 403, "Already authenticated");
    }

    return next();
  }

  return responseHandler(res, 404, "Not found");
};

module.exports = {
  middleware,
};
