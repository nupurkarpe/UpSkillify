import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/features/api/authApi";
import {
  Eye,
  EyeOff,
  FileText,
  Info,
  InfoIcon,
  LucideFile,
} from "lucide-react";

import React from "react";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;
  const users = data?.users || [];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Registered Users</h1>
      <Table>
        <TableCaption>
          A list of all users registered on the platform.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-gray-600 font-bold">
              Name
            </TableHead>
            <TableHead className="text-xl text-gray-600 font-bold">
              Email
            </TableHead>
            <TableHead className="text-xl text-gray-600 font-bold">
              Role
            </TableHead>
            <TableHead className="text-xl text-gray-600 font-bold">
              Enrolled Courses
            </TableHead>
            <TableHead className="text-right text-xl text-gray-600 font-bold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.role === "instructor"
                        ? "bg-purple-200 text-purple-800"
                        : "bg-teal-200 text-teal-800"
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {user.role === "instructor" ? "Instructor" : "student"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.enrolledCourses.length > 0 ? (
                    <div>
                      {user.enrolledCourses.map((course, index) => (
                        <p
                          key={index}
                          className="text-sm text-gray-700 flex items-center cursor-pointer hover:font-bold"
                          onClick={() =>
                            navigate(`/course-detail/${course._id}`)
                          } // Navigate to course details page
                        >
                          {index + 1}. {course.courseTitle}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No courses enrolled</p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/all-users/${user._id}`)}
                  >
                    <LucideFile className="mr-2 w-4 h-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
