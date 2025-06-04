import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

export const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error.data.message || "Failed to create lecture");
    }
  }, [isSuccess, isLoading, error]);
  console.log(lectureData);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add Lectures, add some basic course details for your new Lectures
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dosto
          itaque? Dolore fugit quidem quasi minima omnis ipsa, aliquid itaque
          odit.
        </p>
      </div>
      <div className="space-y-4">
        <div className="">
          <Label>Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your lecture title name"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/admin/course/${courseId}`)}
            variant="outline"
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          <br />

          {lectureLoading ? (
            <p>Loading Lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateLecture;
