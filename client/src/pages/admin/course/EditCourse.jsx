import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detailed information regarding your course
        </h1>
        <Link to="lecture">
          <Button className="hover:text-blue-600" variant="link">
            Go to lectures Page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
