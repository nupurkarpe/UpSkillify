import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteFeedback,
  getFeedbacks,
  submitFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.route("/submitfeedback").post(isAuthenticated, submitFeedback);
router.route("/getfeedback").get(getFeedbacks);
router
  .route("/deletefeedback/:feedbackId")
  .delete(isAuthenticated, deleteFeedback);

export default router;
