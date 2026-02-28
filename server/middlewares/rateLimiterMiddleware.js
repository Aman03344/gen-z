const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,

  message: "Too many login attemps, try again after 15 min..!",
});

module.exports = limiter;
