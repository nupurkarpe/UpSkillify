import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadUserQuery } from "@/features/api/authApi";

const Mylearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <p className="text-gray-700 mt-2">
        Welcome to your learning hub! Here, you can track your progress, explore
        enrolled courses, and take your learning journey to the next level.
      </p>
      <br />
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You have not enrolled in any couses</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mylearning;

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
        >
          <Skeleton className="w-full h-36 animate-pulse" />
          <div className="px-5 py-4 space-y-3">
            <Skeleton className="h-6 w-3/4 animate-pulse" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
                <Skeleton className="h-4 w-20 animate-pulse" />
              </div>
              <Skeleton className="h-4 w-16 animate-pulse" />
            </div>
            <Skeleton className="h-4 w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
