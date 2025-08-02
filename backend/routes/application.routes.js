import express from "express";
import {
  getStudentApplications,
  applyToJob,
  cancelApplication,
  getJobApplications,
} from "../controllers/applications.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/student-applications", protectRoute, getStudentApplications);
router.post("/apply", protectRoute, applyToJob);
router.delete("/cancel/:jobId", protectRoute, authorizeRoles("admin"), cancelApplication);
router.get("/job/:jobId/applicants", protectRoute, authorizeRoles("admin"), getJobApplications);

export default router;
