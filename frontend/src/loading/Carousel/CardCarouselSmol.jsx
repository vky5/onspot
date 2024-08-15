import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { ModeContext } from "../../main";
import { useContext } from "react";

function CardCarouselSmol() {
  const {mode} = useContext(ModeContext);
  return (
    <div className={`relative h-[390px] lg:ml-10 lg:mr-10 animate-pulse ${mode==='light'?'bg-gray-200': 'bg-gray-800'} duration-200`}>
      <Box className="h-full w-full  overflow-hidden">
        <Skeleton
          variant="rectangular"
          className="h-full w-full"
        />
      </Box>
      {/* <div className="absolute inset-0 bg-gray-800 opacity-50 "></div> */}
      <div className="absolute bottom-0 left-0 p-4 w-5/6">
        <Skeleton
          variant="text"
          sx={{ bgcolor: 'gray.500', borderRadius: '0.375rem' }}
          className="h-6 mb-2"
        />
        <Skeleton
          variant="text"
          sx={{ bgcolor: 'gray.500', borderRadius: '0.375rem' }}
          className="h-4"
        />
      </div>
    </div>
  );
}

export default CardCarouselSmol;
