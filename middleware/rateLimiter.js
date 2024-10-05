const rateLimiter = require("express-rate-limit");

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX = 100; // 100 requests per minute

const limiter = rateLimiter({
  windowMs: WINDOW_MS,
  max: MAX,
  message: "Too many requests, please try again later",
});

module.exports = limiter;