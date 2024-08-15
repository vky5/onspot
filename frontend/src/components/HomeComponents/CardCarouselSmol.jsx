import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

function CardCarouselSmol() {
  return (
    <div className="relative h-[390px] lg:ml-10 lg:mr-10 rounded-3xl bg-gray-200 animate-pulse">
      <Box className="h-full w-full bg-gray-200 rounded-3xl">
        <Skeleton variant="rectangular" className="h-full w-full rounded-3xl" />
      </Box>
      <div className="absolute inset-0 bg-priDark opacity-50"></div>
      <div className="absolute bottom-0 left-0 p-4 text-white w-5/6">
        <Skeleton variant="text" className="h-6 bg-gray-400 rounded mb-2" />
        <Skeleton variant="text" className="h-4 bg-gray-400 rounded" />
      </div>
    </div>
  );
}

export default CardCarouselSmol;
