import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/features/api/authApi";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUsersQuery(); // Fetching user data

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  //
  const users = userData?.users || [];
  const totalUsers = users.length;
  console.log(totalUsers);

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse
    .filter(
      (course) =>
        course.courseId &&
        course.courseId.courseTitle &&
        course.courseId.coursePrice
    )
    .map((course) => ({
      name: course.courseId.courseTitle,
      price: course.courseId.coursePrice,
    }));
  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;
  const totalCourses = new Set(
    purchasedCourse.map((course) => course.courseId?.courseTitle)
  ).size;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-900">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-900">₹ {totalRevenue}</p>
        </CardContent>
      </Card>
      {/* Total Courses Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-900">{totalCourses}</p>
        </CardContent>
      </Card>

      {/* Total Users Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-900">{totalUsers}</p>
        </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30} // Rotated labels for better visibility
                textAnchor="end"
                interval={0} // Display all labels
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2" // Changed color to a different shade of blue
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
