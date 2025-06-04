import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi.js";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Populate fields when the dialog opens
  useEffect(() => {
    if (isDialogOpen && data?.user) {
      setName(data.user.name || "");
    }
  }, [isDialogOpen, data]);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    try {
      const result = await updateUser(formData).unwrap();
      toast.success(result.message || "Profile updated successfully");
      setIsDialogOpen(false); // Close the dialog
      refetch(); // Refresh user data
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return <Skeleton className="w-full h-40" />;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left" text-2xl>
        PROFILE
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 mt-2">
                {data?.user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 mt-2">
                {data?.user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role :{" "}
              <span className="font-normal text-gray-700 dark:text-gray-300 mt-2">
                {data?.user?.role?.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="profilePhoto">Profile Photo</Label>
                <Input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                />
              </div>
              <DialogFooter>
                <Button
                  disabled={isUpdating}
                  onClick={handleUpdate}
                  className="w-full"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-6 dark:bg-[#020817] bg-gray-100 rounded-lg shadow-md">
        <h1 className="font-medium text-xl mb-4 text-center">
          Courses you're enrolled in
        </h1>
        <div>
          {isLoading ? (
            <MyLearningSkeleton />
          ) : data?.user?.enrolledCourses.length === 0 ? (
            <p className="text-center text-gray-500">
              You have not enrolled in any courses.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data?.user?.enrolledCourses.map((course) => (
                <Course course={course} key={course._Id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
        >
          <Skeleton className="w-full h-36 animate-pulse" />
          <div className="px-5 py-4 space-y-3">
            <Skeleton className="h-6 w-3/4 animate-pulse" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
                <Skeleton className="h-4 w-20 animate-pulse" />
              </div>
              <Skeleton className="h-4 w-16 animate-pulse" />
            </div>
            <Skeleton className="h-4 w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
