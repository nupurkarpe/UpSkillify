import { Edit } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  return (
    <div className="bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-4 rounded-md my-2 shadow-md">
      {/* Lecture Title */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-gray-800 dark:text-gray-100">
          Lecture - {index + 1}: {lecture.lectureTitle}
        </h1>
        <Edit
          onClick={goToUpdateLecture}
          size={20}
          className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        />
      </div>

      {/* Video Preview */}
      {lecture.videoUrl ? (
        <div className="mt-4">
          <ReactPlayer
            className="react-player w-36 h-24 object-cover rounded-md shadow-md"
            url={lecture.videoUrl}
            controls={true}
            width="30%" // Set width to 100%
            height="30%"
          />
          {/* <video
            src={lecture.videoUrl}
            controls
            className="w-64 h-48 object-cover rounded-md shadow-md"
          /> */}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          No video uploaded for this lecture.
        </p>
      )}
    </div>
  );
};

export default Lecture;
