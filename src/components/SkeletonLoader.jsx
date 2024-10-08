import React from "react";

const SkeletonLoader = () => {
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="w-full h-full">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex p-2 mx-2 rounded-lg items-center animate-pulse duration-75"
        >
          <div className="w-14 sm:w-20 h-20 sm:h-28 bg-slate-700 rounded-md"></div>
          <div className="w-[80%] text-xs sm:text-sm md:text-base px-4 space-y-2">
            <div className="bg-gray-700 h-4 rounded w-1/2"></div>
            <div className="bg-gray-700 h-4 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
