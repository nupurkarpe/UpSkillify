import { Feedback } from "../models/feedback.model.js";
import { User } from "../models/user.model.js";

export const submitFeedback = async (req, res) => {
  try {
    const { feedbackText, userId, rating } = req.body;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    // Create the feedback
    const newFeedback = new Feedback({
      feedbackText,
      rating,
      user: userId,
    });

    await newFeedback.save();

    return res
      .status(201)
      .json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ message: "Error submitting feedback" });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name photoUrl");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    // Find and delete the feedback by ID
    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};
