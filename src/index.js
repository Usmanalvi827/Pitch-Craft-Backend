import dotenv from "dotenv";
dotenv.config("./.env");
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { connectRedis } from "./config/redis.db.js";
import cors from "cors";
import startUpRoute from "./routes/startup.routes.js";
import projRoute from "./routes/projects.routes.js";
// import { main } from "./services/ai.service.js";
const app = express();

// console.log(process.env.FRONTEND_URL)

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pitch-craft-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect to the database
await connectDB();

// Connect to Redis
await connectRedis();

// Check AI
// await main()

// Authentication routes
app.use("/api/auth", authRouter);

// All Projects Routes Here
app.use("/api/start-up", startUpRoute)

// All Projects AI-Routes Here
app.use("/api", projRoute)


// Test route to check if the server is running
// app.get("/health", (req, res) => {
//   res.send("Hello, World!");
// });

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;
