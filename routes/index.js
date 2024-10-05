const express = require("express");
const router = express.Router({ mergeParams: true });
const userRoute = require("./users");
const authRoute = require("./auth");
const { middleware } = require("../middleware/authMiddleware");
const requestLogger = require("../middleware/requestLogger");

router.use("/profile", requestLogger, middleware, userRoute);
router.use("/auth", requestLogger, middleware, authRoute);

module.exports = router;
