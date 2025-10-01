import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { saveJob, getSavedJobs, unsaveJob } from "../controllers/savedJobs.controller.js";

const router = express.Router();

router.post("/save", protectRoute, saveJob);
router.get("/saved", protectRoute, getSavedJobs);
router.delete("/saved/:jobId", protectRoute, unsaveJob);

export default router;
