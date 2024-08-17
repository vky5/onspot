import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import { ModeContext } from "../main";
import { useContext } from "react";

function UsersList() {
  const { mode } = useContext(ModeContext);

  // Softer background colors for light and dark modes
  const skeletonBgColor = mode === "light" ? "bg-gray-300" : "bg-gray-700";

  return (
    <div className="flex flex-col items-center w-28 space-y-2">
      {/* Image Skeleton */}
      <Box className="w-full flex justify-center">
        <div
          className={`w-14 h-14 md:w-24 md:h-24 rounded-full ${skeletonBgColor} duration-200`}
        >
          <Skeleton
            variant="circular"
            className="w-full h-full rounded-full"
            style={{ backgroundColor: skeletonBgColor }} // Set to mode-based color
          />
        </div>
      </Box>

      {/* Username Skeleton */}
      <Box className="w-full flex justify-center">
        <div
          className={`h-4 w-3/4 md:h-6 md:w-full rounded-lg ${skeletonBgColor} duration-200`}
        >
          <Skeleton
            variant="text"
            className="h-full"
            style={{ backgroundColor: "transparent" }} // Transparent to show parent bg
          />
        </div>
      </Box>
    </div>
  );
}

export default UsersList;
