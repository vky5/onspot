import { Skeleton } from "@mui/material";
import { useContext } from "react";
import { ModeContext } from "../main";

function SideComponentSkeleton() {
  const { mode } = useContext(ModeContext);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Skeleton for Recommended Topics */}
      <div className="font-bold lg:text-2xl text-xl lg:mb-5 mb-3  mt-5 lg:mt-10">
        Recommended Topics
      </div>

      {/* Skeleton for Tags */}
      <div className="w-3/4 flex flex-wrap justify-center gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`lg:px-4 lg:py-2 px-3 py-1 rounded-3xl text-sm lg:text-lg ${
              mode === "light" ? "bg-gray-200" : "bg-gray-800"
            } duration-200 flex items-center justify-center w-32 h-10`} // Added width and height, flex properties for center alignment
          >
            <Skeleton
              variant="rectangular"
              className="w-full h-full" // Ensure the skeleton takes up the full size of the wrapper
              style={{ backgroundColor: "transparent" }} // Make skeleton background transparent
            />
          </div>
        ))}
      </div>

      {/* <div className="mt-10 lg:mt-24 lg:mb-5 mb-3 lg:text-2xl text-xl">
        Popular Bloggers this week
      </div> */}

      {/* Skeleton for Blogger Items */}
      {/* <div className="space-y-4 lg:space-y-7 flex flex-col text-sm lg:text-xl">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 px-4 py-2 lg:px-6 lg:py-4 rounded-3xl ${
              mode === "light" ? "bg-gray-200" : "bg-gray-800"
            }`}
          > */}
            {/* Skeleton for Profile Image */}
            {/* <div className="w-10 h-10 lg:h-16 lg:w-16 rounded-full overflow-hidden">
              <Skeleton variant="circular" width={64} height={64} />
            </div> */}
            {/* Skeleton for Blogger Name */}
            {/* <Skeleton
              variant="text"
              width={120}
              height={30}
              className="flex-grow"
            /> */}
            {/* Skeleton for Visit Button */}
            {/* <Skeleton variant="rectangular" width={60} height={30} />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default SideComponentSkeleton;
