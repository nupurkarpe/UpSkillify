import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetUserDetailsQuery } from "@/features/api/authApi";

const UserDetail = () => {
  const { userId } = useParams();
  const { data, isLoading, isError, error } = useGetUserDetailsQuery(userId);
  const navigate = useNavigate();

  if (isLoading) return <Loader2 className="w-8 h-8 animate-spin" />;
  if (isError)
    return (
      <p>
        Failed to load user details.{" "}
        {error?.message || "Please try again later."}
      </p>
    );

  const user = data?.user;

  return (
    <div className="p-4 md:p-6 lg:p-8 dark:bg-[#020817]">
      {/* Check if user data exists */}
      {user ? (
        <>
          <Card className="">
            <CardHeader className="text-xl font-semibold">
              {user?.name}'s Details
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <img
                  src={user?.photoUrl || "/default-avatar.jpg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto md:mx-0"
                />
                <div className="p-4 flex-grow">
                  <div className="flex items-center mb-2">
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-100 text-gray-950 mr-2">
                      Name:
                    </h1>
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-400 text-gray-600">
                      {user?.name}
                    </h1>
                  </div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-100 text-gray-950 mr-2">
                      EmailID:
                    </h1>
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-400 text-gray-600">
                      {user?.email}
                    </h1>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <div className="flex items-center mb-2">
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-100 text-gray-950 mr-2">
                      Account Creation Date:
                    </h1>
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-400 text-gray-600">
                      {new Date(user?.createdAt).toLocaleString()}
                    </h1>
                  </div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-100 text-gray-950 mr-2">
                      Last Updated On:
                    </h1>
                    <h1 className="text-base md:text-lg font-medium dark:text-gray-400 text-gray-600">
                      {new Date(user?.updatedAt).toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl mt-6 font-semibold">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {data?.coursesWithProgress &&
            data.coursesWithProgress.length > 0 ? (
              data.coursesWithProgress.map((course, index) => (
                <Card
                  key={index}
                  className="shadow-lg p-4 bg-white dark:bg-[#020817]"
                >
                  <CardHeader className="text-lg font-semibold">
                    {course.courseTitle}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <p className="font-medium">Progress:</p>
                        <p className="ml-2">{course.progress}%</p>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          style={{
                            width: `${course.progress}%`,
                            backgroundColor:
                              course.progress === 100 ? "green" : "orange",
                          }}
                          className="h-2 rounded-full"
                        ></div>
                      </div>

                      <div className="flex items-center">
                        <p className="font-medium">Status:</p>
                        <p className="ml-2">{course.status}</p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => navigate(`/course-detail/${course.id}`)}
                      >
                        View Course Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No courses enrolled</p>
            )}
          </div>
        </>
      ) : (
        <p>No user data available</p>
      )}
      <Button className="mt-4" onClick={() => window.history.back()}>
        Back to Users List
      </Button>
    </div>
  );
};

export default UserDetail;
