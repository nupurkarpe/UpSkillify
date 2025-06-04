import React, { useState, useEffect } from "react";
import {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} from "@/features/api/feedbackApi"; // Import the delete mutation
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"; // ShadCN UI table components
import { Delete, Loader2 } from "lucide-react"; // For the loading spinner
import { Button } from "@/components/ui/button"; // For the "Remove" button
import { toast } from "sonner"; // For showing toast notifications

const GetAllFeedbacks = () => {
  const { data, isLoading, isError, error } = useGetFeedbacksQuery();
  const [deleteFeedback, { isLoading: isDeleting }] =
    useDeleteFeedbackMutation(); // Get the delete feedback function
  const [feedbacks, setFeedbacks] = useState([]);

  // Update feedbacks state whenever new data is fetched
  useEffect(() => {
    if (data) {
      setFeedbacks(data);
    }
  }, [data]); // Only re-run this effect when data changes

  // Error handling
  if (isError) {
    toast.error(`Error fetching feedbacks: ${error.message}`);
  }

  // Handle deleting feedback
  const handleDelete = async (feedbackId) => {
    try {
      await deleteFeedback(feedbackId).unwrap(); // Call the delete function and unwrap the response
      // Remove the feedback from the local state after successful deletion
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId));
      toast.success("Feedback deleted successfully");
    } catch (error) {
      toast.error("Failed to delete feedback");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5">All Feedbacks</h1>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Loading Feedbacks...
        </div>
      ) : (
        <Table>
          <TableCaption>
            A list of all feedbacks submitted by users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold border-b">User</TableCell>
              <TableCell className="font-semibold border-b">Feedback</TableCell>
              <TableCell className="font-semibold border-b">Rating</TableCell>
              <TableCell className="font-semibold border-b">Date</TableCell>
              <TableCell className="font-semibold border-b">
                Actions
              </TableCell>{" "}
              {/* Actions column for Remove button */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Display feedbacks */}
            {feedbacks?.map((feedback) => (
              <TableRow key={feedback._id}>
                <TableCell className="border-b">
                  {feedback.user ? (
                    <>
                      <img
                        src={feedback.user.photoUrl || "/default-avatar.png"}
                        alt={feedback.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{feedback.user.name}</span>
                    </>
                  ) : (
                    "Unknown User"
                  )}
                </TableCell>
                <TableCell className="border-b">
                  {feedback.feedbackText}
                </TableCell>
                <TableCell className="border-b">{feedback.rating}</TableCell>
                <TableCell className="border-b">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="border-b">
                  <Button
                    onClick={() => handleDelete(feedback._id)}
                    disabled={isDeleting} // Disable button while deleting
                    variant="danger"
                  >
                    <Delete size={40}>Remove</Delete>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default GetAllFeedbacks;
