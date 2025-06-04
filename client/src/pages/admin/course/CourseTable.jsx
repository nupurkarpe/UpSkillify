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
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isloading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isloading) return <h1>Loading...</h1>;
  const courses = data?.courses || [];

  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new Course</Button>
      <br />
      <br />
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-gray-600 font-bold">
              Title
            </TableHead>
            <TableHead className="text-xl text-gray-600 font-bold">
              SubTitle
            </TableHead>
            <TableHead className="w-[100px] text-xl text-gray-600 font-bold">
              Price
            </TableHead>
            <TableHead className="text-xl text-gray-600 font-bold">
              Status
            </TableHead>
            <TableHead className="text-right text-xl text-gray-600 font-bold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell>{course.subTitle}</TableCell>
                <TableCell className="font-medium ">
                  {course.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      course.isPublished
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-700"
                    } px-2 py-1 rounded-full text-sm`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
