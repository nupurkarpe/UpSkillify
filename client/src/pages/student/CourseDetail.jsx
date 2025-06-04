import BuyCourseButton from "@/components/ui/BuyCourseButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, CheckCircle, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, error, isSuccess, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;
  console.log(purchased);

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-gray-100 py-5 px-2 md:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6">
          {/* Course Thumbnail */}
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={
                course?.courseThumbnail ||
                "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-3d-icon-download-in-png-blend-fbx-gltf-file-formats--college-degree-education-avatar-profession-pack-people-icons-10002806.png?f=webp"
              } // Default thumbnail if no image provided
              alt="Course Thumbnail"
              className="rounded-lg shadow-md w-80 h-70 object-cover"
            />
          </div>

          {/* Course Information */}
          <div className="flex-grow space-y-4">
            {/* Course Title and Subtitle */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {course?.courseTitle || "Course Title"}
              </h1>
              <p className="text-lg text-gray-600 italic">
                {course?.subTitle || "Learn and master the essentials!"}
              </p>
            </div>

            {/* Creator Name */}
            <div className="flex items-center gap-4">
              {/* Instructor Photo */}
              <img
                src={course?.creator?.photoUrl || "/default-avatar.png"} // Default photo if no photoUrl
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />
              {/* Instructor Info */}
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">
                  Instructor
                </p>
                <p className="text-lg font-medium text-blue-600">
                  {course?.creator?.name || "John Doe"}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="space-y-4">
              {/* Last Updated */}
              <div className="flex justify-between items-center border-b pb-3">
                <p className="text-sm font-semibold text-gray-500">
                  Last Updated
                </p>
                <p className="text-base text-gray-800">
                  {course?.createdAt?.split("T")[0] || "N/A"}
                </p>
              </div>

              {/* Enrolled Students */}
              <div className="flex justify-between items-center border-b pb-3">
                <p className="text-sm font-semibold text-gray-500">
                  Enrolled Students
                </p>
                <p className="text-base text-gray-800">
                  {course?.enrolledStudents?.length || 0} students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course?.objectives.split("|").map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{objective.trim()}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <h1 className=" text-2xl md:text-xl font-semibold">
            About this Course
          </h1>
          <p
            className="text-md text-gray-700"
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></p>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Course Curriculam</CardTitle>
              <CardDescription>
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 ">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={16} /> : <Lock size={16} />}
                  </span>
                  <p className="font-semibold">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                <ReactPlayer
                  className="react-player rounded-lg"
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>
                {" "}
                <span>Lecture 1 : </span>
                {course.lectures[0]?.lectureTitle || "No lecture available"}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price : ₹{course.coursePrice || "Not specified"}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C]"
                  onClick={handleContinueCourse}
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
