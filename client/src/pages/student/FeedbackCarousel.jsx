import { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
import { useGetFeedbacksQuery } from "@/features/api/feedbackApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// API setup for feedback

// FeedbackCarousel Component
const FeedbackCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { data, error } = useGetFeedbacksQuery(); // Fetch feedbacks using the RTK Query

  useEffect(() => {
    if (data) {
      setFeedbacks(data);
    } else if (error) {
      console.error("Error fetching feedbacks:", error);
    }
  }, [data, error]);

  return (
    <div className="my-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-center font-bold text-2xl text-gray-800 dark:text-white">
        We Deliver What We Promise
      </h1>
      <h1 className="text-center font-bold text-2xl mb-8 text-gray-800 dark:text-white">
        See What Students Are Saying About Us
      </h1>

      <div className="relative">
        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {feedbacks.map((feedback) => (
              <CarouselItem key={feedback._id}>
                <div className="flex flex-col items-center">
                  {/* User Photo Overlapping Circle */}
                  <div className="relative z-10">
                    <img
                      src={feedback.user.photoUrl || "/default-avatar.png"} // Default avatar if no photo URL
                      alt="User Photo"
                      className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-lg -mb-12"
                    />
                  </div>

                  {/* Feedback Container */}
                  <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center w-full max-w-4xl ">
                    {/* Rating */}
                    <div className=" flex items-center justify-center ">
                      <br />
                      <br />
                      <br />
                      <br />
                      <Rating
                        count={5}
                        value={feedback.rating || 0} // Display rating if available, default to 0
                        size={24}
                        edit={false} // Make it read-only
                        activeColor="#ffd700" // Gold color for selected stars
                        className=""
                      />
                    </div>

                    {/* Feedback Text */}
                    <p className="text-sm text-gray-700 italic mb-4">
                      "{feedback.feedbackText}"
                    </p>

                    {/* User Name */}
                    <h3 className="font-semibold text-lg text-gray-900">
                      {feedback.user.name}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom navigation arrows */}
          <CarouselPrevious>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-lg">
              <FaChevronLeft size={24} />
            </button>
          </CarouselPrevious>
          <CarouselNext>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-lg">
              <FaChevronRight size={24} />
            </button>
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default FeedbackCarousel;
