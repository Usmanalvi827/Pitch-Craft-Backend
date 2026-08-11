import express from "express"
import authUser from "../middleware/auth.middleware.js"
import { generateOverview } from "../controllers/overview.controller.js"
import generateBusiness from "../controllers/business.controller.js"
import generateAudience from "../controllers/audience.controller.js"
import { generateFeatures } from "../controllers/features.controller.js"
import { generateLandingPage } from "../controllers/landingpage.controller.js"
import { generatePitch } from "../controllers/pitch.controller.js"
const projRoute = express.Router()

// OviewVieAI-Route--->>
projRoute.post("/projects/:id/generate-overview",authUser ,generateOverview)


// Business-Route--->>
projRoute.post("/projects/:id/business-model", authUser, generateBusiness)


// Audience-Route-->>
projRoute.post("/projects/:id/audience", authUser, generateAudience)


// Features-Route-->>
projRoute.post("/projects/:id/features", authUser, generateFeatures)


// LandingPage-Route-->>
projRoute.post("/projects/:id/landing-page", authUser, generateLandingPage)


// Pitch-Route-->>
projRoute.post("/projects/:id/pitch", authUser, generatePitch)


export default projRoute