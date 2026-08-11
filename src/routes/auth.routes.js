import express from "express";
import {
  getMeUser,
  loginUser,
  registerUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";
import {
  getMeRateLimiter,
  loginRateLimiter,
  logoutRateLimiter,
  refreshTokenRateLimiter,
  registerRateLimiter,
} from "../utils/auth.rateLimit.js";
const authRouter = express.Router();


authRouter.post("/register", registerRateLimiter, registerUser);

authRouter.post("/login", loginRateLimiter, loginUser);

authRouter.get("/get-me", authUser, getMeRateLimiter, getMeUser);

authRouter.post("/refresh-token", refreshTokenRateLimiter, refreshToken);

authRouter.post("/logout", logoutRateLimiter, logoutUser);

export default authRouter;
