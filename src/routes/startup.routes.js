import express from "express";
import {
  startUpFormRegister,
  startUpFormUpdate,
  startUpGetAll,
  startUpDelete,
  startUpSingleGet,
  allStartUpPitchReport
} from "../controllers/startup.controller.js";
import authUser from "../middleware/auth.middleware.js";
const startUpRoute = express.Router();

startUpRoute.post("/projects", authUser, startUpFormRegister);
startUpRoute.get("/projects", authUser, startUpGetAll);
startUpRoute.get("/projects/:id", authUser, startUpSingleGet);
startUpRoute.put("/projects/:id", authUser, startUpFormUpdate);
startUpRoute.delete("/projects/:id", authUser, startUpDelete)

startUpRoute.get("/projects/:id/complete-report", authUser, allStartUpPitchReport)

export default startUpRoute;
