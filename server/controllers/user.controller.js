import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }
    const instructorEmails = ["instructor1@example.com", "admin@e.com"];
    const role = instructorEmails.includes(email) ? "instructor" : "student";
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    // .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updatedData = {};
    if (name) updatedData.name = name;

    if (profilePhoto) {
      // Delete existing photo if available
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        deleteMediaFromCloudinary(publicId);
      }

      const cloudResponse = await uploadMedia(profilePhoto.path);
      updatedData.photoUrl = cloudResponse.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    return res.status(200).json({
      success: true,
      user: updateUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate({
        path: "enrolledCourses", // Path to populate
        select: "courseTitle", // Fields to include from the Course collection
      })
      .exec();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user details, including enrolled courses
    const user = await User.findById(userId).populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch course progress for the user
    const courseProgressDetails = await CourseProgress.find({ userId: userId });

    // Log data to ensure everything is fetched correctly
    console.log("User:", user);
    console.log("Course Progress Details:", courseProgressDetails);

    const coursesWithProgress = user.enrolledCourses.map((course) => {
      // Find the corresponding course progress
      const courseProgress = courseProgressDetails.find(
        (progress) => progress.courseId === course._id.toString()
      );

      let progress = 0;
      let completedLectures = 0;

      // Check if the course has progress data
      if (courseProgress) {
        const totalLectures = course.lectures.length; // Get the total number of lectures
        completedLectures = courseProgress.lectureProgress.filter(
          (lecture) => lecture.viewed
        ).length; // Count how many are marked as viewed

        // Calculate the progress percentage
        progress = (completedLectures / totalLectures) * 100;
      }

      const status = progress === 100 ? "Completed" : "Incomplete";

      return {
        id: course._id,
        courseTitle: course.courseTitle,
        progress: Math.round(progress), // Round the progress percentage
        status: status,
      };
    });

    // Send the user details along with the course progress
    return res.status(200).json({ user, coursesWithProgress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
