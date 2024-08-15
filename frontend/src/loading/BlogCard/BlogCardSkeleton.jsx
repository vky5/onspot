import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { ModeContext } from "../../main";
import { useContext } from "react";

function BlogCardSkeleton() {

  const {mode} = useContext(ModeContext);
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-md p-3 ml-2 mr-2 md:ml-10 md:mr-10 ${mode==='light'?'bg-gray-200': 'bg-gray-800'} duration-200`}>
      <Box className="flex">
        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          className="h-full w-[105px] rounded-xl"
        />
        <Box className="ml-4 flex-grow">
          {/* Skeleton for heading */}
          <Skeleton variant="text" className="h-6 mb-2 w-3/4" />
          <Skeleton variant="text" className="h-4 mb-2 w-1/2" />

          {/* Skeleton for user info */}
          <div className="flex items-center mt-2">
            <Skeleton variant="circular" className="h-6 w-6 mr-2" />
            <Skeleton variant="text" className="h-4 w-1/4" />
          </div>
        </Box>
        {/* Skeleton for like button */}
        <div className="flex items-center mt-2">
          <Skeleton
            variant="rectangular"
            className="h-6 w-6 rounded-full mr-2"
          />
          <Skeleton variant="text" className="h-4 w-1/4" />
        </div>
      </Box>
    </div>
  );
}

export default BlogCardSkeleton;
