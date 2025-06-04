import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    feedbackText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Ensures that rating is between 1 and 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
