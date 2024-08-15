import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

function CardCarBigSkeleton() {
  return (
    <div className="ml-4 mr-4 lg:ml-10 lg:mr-10">
      <div className="flex">
        {/* Image Skeleton */}
        <Box className="w-1/2">
          <Skeleton
            variant="rectangular"
            className="w-full rounded-3xl"
            style={{ height: '24rem' }} // Fixed height for the image placeholder
          />
        </Box>

        {/* Text and Button Skeleton */}
        <Box className="ml-10 text-left w-1/2">
          {/* Username Skeleton */}
          <Skeleton variant="text" className="h-8 w-1/3 mb-4" />
          
          {/* Heading Skeleton */}
          <Skeleton variant="text" className="h-12 w-full mb-4" />
          <Skeleton variant="text" className="h-12 w-full mb-4" />
          <Skeleton variant="text" className="h-12 w-full mb-4" />

          {/* Button Skeleton */}
          <Skeleton variant="rectangular" className="h-10 w-32 rounded-xl mt-10" />
        </Box>
      </div>
    </div>
  );
}

export default CardCarBigSkeleton;
