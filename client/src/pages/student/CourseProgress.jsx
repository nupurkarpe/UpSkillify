import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Confetti from "react-confetti"; // Add this library
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse] = useCompleteCourseMutation();
  const [inCompleteCourse] = useInCompleteCourseMutation();

  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { courseDetails, progress, completed } = data.data;
  const currentLecture = courseDetails.lectures[currentLectureIndex] || null;

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleSelectLecture = (index) => {
    if (isLectureCompleted(courseDetails.lectures[index]._id)) {
      setCurrentLectureIndex(index);
    } else {
      toast.error("You must complete the previous lecture first.");
    }
  };

  const handleVideoEnded = async () => {
    const lectureId = currentLecture._id;
    await updateLectureProgress({ courseId, lectureId });
    const isLastLecture =
      currentLectureIndex + 1 === courseDetails.lectures.length;

    if (isLastLecture) {
      await completeCourse(courseId);
      setShowConfetti(true);
      setShowAlert(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    } else {
      setCurrentLectureIndex(currentLectureIndex + 1);
    }
    refetch(); // Refresh progress
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    setShowConfetti(true);
    setShowAlert(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    refetch();
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
    setCurrentLectureIndex(0); // Reset to the first lecture
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-4">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          gravity={0.2} // Slower falling effect
        />
      )}

      {/* Alert Dialog */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-center">Congratulations!</h2>
            <p className="mt-2 text-center">
              You have successfully completed the course.
            </p>
            <div className="mt-4 flex justify-center">
              <Button onClick={closeAlert} variant="default">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <div className="flex items-center gap-2">
          {completed && (
            <>
              <Badge
                variant="outline"
                className="flex items-center justify-center bg-green-200 text-green-800 rounded-md px-4 py-2 text-sm h-10 shadow-2xl"
              >
                <CheckCircle className="h-5 w-5 mr-2 shadow-black" />
                <span>Course Completed</span>
              </Badge>
              <Button
                onClick={handleInCompleteCourse}
                className="flex items-center justify-center  hover:bg-gray-100 hover:text-black rounded-md px-4 py-2 text-sm h-10 shadow-2xl"
              >
                Continue Rewatching
              </Button>
            </>
          )}
          {!completed && (
            <Button
              onClick={handleCompleteCourse}
              className=" hover:bg-gray-700"
            >
              Mark as Completed
            </Button>
          )}
        </div>

        {/* <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button> */}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div className="w-full aspect-w-16 aspect-h-9 md:rounded-lg overflow-hidden">
            <video
              src={currentLecture?.videoUrl}
              controls
              className="w-full h-full md:rounded-lg"
              onEnded={handleVideoEnded}
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${currentLectureIndex + 1}: ${
                currentLecture?.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture, index) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  index === currentLectureIndex
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => handleSelectLecture(index)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-800"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
