import rateLimit from "express-rate-limit";

const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many registration attempts from this IP, please try again after an 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after an 15 minutes ",
  standardHeaders: true,
  legacyHeaders: false,
});

const refreshTokenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message:
    "Too many refresh token requests from this IP, please try again after an 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const logoutRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message:
    "Too many logout requests from this IP, please try again after an 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

const getMeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again after an 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

export {
  registerRateLimiter,
  loginRateLimiter,
  refreshTokenRateLimiter,
  logoutRateLimiter,
  getMeRateLimiter,
};
