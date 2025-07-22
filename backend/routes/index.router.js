import express from "express";


import healthRoutes from "./health.routes.js";
import jobRouter from "./jobs.routes.js";
import alumniRouter from "./alumni/alumni.routes.js";
import studentRouter from "./student.routes.js";
import authRoutes from "./auth.routes.js";
import threadRoutes from "./thread.routes.js";
import statsRouter from "./stats.routes.js";
import referalRouter from "./referral.routes.js";
import resumeRouter from "./resume.routes.js";
import applicationRoutes from "./application.routes.js";
import profileRouter from "./profile.routes.js";

const router = express.Router();

// Mount each route under /api/*
router.use("/health", healthRoutes);
router.use("/jobs", jobRouter);
router.use("/alumni", alumniRouter);
router.use("/student", studentRouter);
router.use("/auth", authRoutes);
router.use("/threads", threadRoutes);
router.use("/stats", statsRouter);
router.use("/referrals", referalRouter);
router.use("/resume", resumeRouter);
router.use("/applications", applicationRoutes);
router.use("/profile", profileRouter);

export default router;
