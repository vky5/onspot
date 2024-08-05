import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

function CardCarouselSkeleton() {
  return (
    <Box className="relative h-[390px] bg-gray-200 animate-pulse">
      {/* Image Placeholder */}
      <Skeleton variant="rectangular" className="h-full w-full" />

      {/* Overlay */}
      <Box className="absolute inset-0 bg-gray-500 opacity-50" />

      {/* Text Placeholder */}
      <Box className="absolute bottom-0 left-0 p-4 w-5/6">
        <Skeleton className="h-6 bg-gray-400 rounded mb-2" />
        <Skeleton className="h-4 bg-gray-400 rounded" />
      </Box>

      {/* Clickable Area Placeholder */}
      <Box className="absolute inset-0 cursor-pointer bg-gray-400 opacity-0" />
    </Box>
  );
}

export default CardCarouselSkeleton;
