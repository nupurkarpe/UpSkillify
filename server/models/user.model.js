import mongoose from "mongoose";

const userSChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["instructor", "student"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    photoUrl: {
      type: String,
      default:
        "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-3d-icon-download-in-png-blend-fbx-gltf-file-formats--college-degree-education-avatar-profession-pack-people-icons-10002806.png?f=webp",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSChema);
