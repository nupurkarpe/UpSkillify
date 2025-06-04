import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    objectives: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
  const [
    removeCourse,
    {
      data: removeCourseData,
      isSuccess: removeCourseSuccess,
      isError: removeCourseError,
    },
  ] = useRemoveCourseMutation();
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const [publishCourse, {}] = usePublishCourseMutation();
  const [editCourse, { data, isLoading, isSuccess, isError, error }] =
    useEditCourseMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        objectives: course.objectives || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "",
      });
      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("objectives", input.objectives);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };
  const handleRemoveCourse = async () => {
    await removeCourse(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (isError) {
      toast.error(error.data.message || "Failed to update Course");
    }
  }, [isSuccess, isError, error]);

  useEffect(() => {
    if (removeCourseSuccess) {
      toast.success(removeCourseData.message);
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [removeCourseSuccess, removeCourseData]);
  if (courseByIdLoading) return <Loader2 className="h-4 w-4 animate-spin" />;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="">
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your Course. Click Save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-4">
          <Button
            variant="outline"
            disabled={courseByIdData?.course.lectures.length === 0}
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button onClick={handleRemoveCourse}>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="">
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack development"
            />
          </div>
        </div>
        <div className="space-y-4 mt-5">
          <div className="">
            <Label>Sub Title</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. "
            />
          </div>
        </div>
        <div className="space-y-4 mt-5">
          <div className="">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="space-y-2">
            <div className="flex flex-row items-center space-x-2">
              <Label>Objectives</Label>{" "}
              <p className="text-sm text-gray-600">
                (Separate your objectives with | (pipe symbol))
              </p>
            </div>
            <Textarea
              type="text"
              name="objectives"
              value={input.objectives}
              onChange={changeEventHandler}
              placeholder="Separate your objectives with | (pipe symbol)"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="">
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div className="">
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />

            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex flex-row gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/course")}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
