import { Label } from "@/components/ui/label";
import { useSubmitFeedbackMutation } from "@/features/api/feedbackApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Rating from "react-rating-stars-component";

const FeedbackForm = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitFeedback] = useSubmitFeedbackMutation();

  const user = useSelector((state) => state.auth.user); // Access user data from auth state
  const userId = user ? user._id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("You must be logged in to submit feedback.");
      return;
    }
    try {
      await submitFeedback({ feedbackText, userId, rating });
      setFeedbackText("");
      setRating(0);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Share Your Feedback
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Your feedback helps us improve our platform. Thank you for sharing your
        thoughts!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-6">
          <Label className="block text-gray-700 font-medium mb-2">
            Rating:
          </Label>
          <Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={30}
            activeColor="#ffd700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
