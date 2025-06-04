import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { AlertCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";
  const categories = searchParams.get("categories") || "";
  const sortByPrice = searchParams.get("sortByPrice") || "";

  const [selectedCategories, setSelectedCategories] = useState(
    categories.split(",").filter(Boolean)
  );
  const [sortOption, setSortOption] = useState(sortByPrice);

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice: sortOption,
    isPublished: true,
  });
  const publishedCourses = data?.courses?.filter(
    (course) => course.isPublished
  );
  const isEmpty = !isLoading && data?.courses?.length === 0;

  const updateSearchParams = (newParams) => {
    const updatedParams = {
      query,
      categories: selectedCategories.join(","),
      sortByPrice: sortOption,
      ...newParams,
    };

    // Remove empty parameters
    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) delete updatedParams[key];
    });

    setSearchParams(updatedParams);
  };

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortOption(price);
    updateSearchParams({
      categories: categories.join(","),
      sortByPrice: price,
    });
  };

  useEffect(() => {
    // Update URL when filters change
    updateSearchParams({});
  }, [selectedCategories, sortOption]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 ">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">Result for "{query}"</h1>
        <p>
          Showing Results for {""}
          <span className="text-blue-800 italic font-bold">"{query}"</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            publishedCourses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};
