import { ChartNoAxesColumn, SquareLibrary, Star, User2 } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar - Fixed on Large Screens, Hidden on Small Screens */}
      <div className="hidden lg:flex flex-col fixed left-0 top-0 w-[250px] h-screen space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 bg-white dark:bg-gray-900 mt-16">
        <div className="space-y-4">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          <Link to="all-users" className="flex items-center gap-2">
            <User2 size={22} />
            <h1>Users</h1>
          </Link>
          <Link to="feedback" className="flex items-center gap-2">
            <Star size={22} />
            <h1>Feedback</h1>
          </Link>
        </div>
      </div>

      {/* Main Content - Adjusted for Sidebar */}
      <div className="flex-1 p-10 overflow-y-auto h-screen lg:ml-[250px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
