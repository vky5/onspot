import { ModeContext } from "../main";
import { useContext } from "react";
import { Skeleton } from "@mui/material";


function HomeLoad() {
    const { mode } = useContext(ModeContext);
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-priDark " : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
    >
      <Skeleton variant="rectangular" width={210} height={60} />
    </div>
  )
}

export default HomeLoad;
