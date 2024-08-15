import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { ModeContext } from "../../main";
import { useContext } from "react";

function CardCarBigSkeleton() {
  const { mode } = useContext(ModeContext);

  // Conditional background colors for light and dark modes
  const bgColor = mode === 'light' ? 'bg-gray-200' : 'bg-gray-800';
  const skeletonBgColor = mode === 'light' ? 'bg-gray-200' : 'bg-gray-800';

  return (
    <div className={`ml-4 mr-4 lg:ml-10 lg:mr-10 `}>
      <div className="flex">
        {/* Image Skeleton */}
        <Box className="w-1/2">
          <div className={`w-full rounded-3xl ${bgColor} duration-200`} style={{ height: '24rem' }}>
            <Skeleton
              variant="rectangular"
              className="w-full rounded-3xl"
              style={{ height: '100%', backgroundColor: skeletonBgColor }} // Set to mode-based color
            />
          </div>
        </Box>

        {/* Text and Button Skeleton */}
        <Box className="ml-10 text-left w-1/2">
          {/* Username Skeleton */}
          <div className={`h-8 w-1/3 mb-4 rounded-lg ${skeletonBgColor} duration-200`}>
            <Skeleton
              variant="text"
              className="h-full"
              style={{ backgroundColor: 'transparent' }} // Transparent to show parent bg
            />
          </div>

          {/* Heading Skeleton */}
          <div className={`h-6 w-full rounded-lg mb-4 ${skeletonBgColor} duration-200`}>
            <Skeleton
              variant="text"
              className="h-full"
              style={{ backgroundColor: 'transparent' }} // Transparent to show parent bg
            />
          </div>
          <div className={`h-6 w-full mb-4 rounded-lg ${skeletonBgColor} duration-200`}>
            <Skeleton
              variant="text"
              className="h-full"
              style={{ backgroundColor: 'transparent' }} // Transparent to show parent bg
            />
          </div>
          <div className={`h-6 w-full mb-4 rounded-lg ${skeletonBgColor} duration-200`}>
            <Skeleton
              variant="text"
              className="h-full"
              style={{ backgroundColor: 'transparent' }} // Transparent to show parent bg
            />
          </div>

          {/* Button Skeleton */}
          <div className={`h-8 w-32 rounded-xl mt-10 ${skeletonBgColor} duration-200`}>
            <Skeleton
              variant="rectangular"
              className="h-full"
              style={{ backgroundColor: 'transparent' }} // Transparent to show parent bg
            />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default CardCarBigSkeleton;
