import bcrypt from "bcrypt";
import UserModel from "../models/users.models.js";
import jwt from "jsonwebtoken";
import { redis } from "../config/redis.db.js";

async function registerUser(req, res) {
  try {
    const { firstname, lastname, username, email, password, confirmPassword } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration successful.",
      user: {
        id: newUser._id,
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email doest not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Redis Session Management
    const sessionData = {
      refreshToken,
      createdAt: new Date().toISOString(),
      device: req.headers["user-agent"] || "Unknown",
      ipAddress: req.ip || req.connection.remoteAddress || "Unknown",
    };

    await redis.set(`session:${user._id}`, JSON.stringify(sessionData), {
      EX: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set true in production with https
      // secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        firstName: user.firstname,
        lastName: user.lastname,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const session = await redis.get(`session:${decoded.userId}`);

    if (!session) {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    const sessionData = JSON.parse(session);
    if (sessionData.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      message: "Token refreshed successfully.",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message || "Refresh failed" });
  }
}


async function getMeUser(req, res) {
  try {
    const user = await UserModel.findById(req.user);
   
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.refreshToken;
    // console.log("Logout Token:", token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token:", decoded);
        // Delete the session from Redis
        await redis.del(`session:${decoded.userId}`);
        // Clear the refresh token cookie
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: false, // set true in production with https
          // secure: process.env.NODE_ENV === "production",
          // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          sameSite: "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export { registerUser, loginUser, getMeUser, refreshToken, logoutUser };
