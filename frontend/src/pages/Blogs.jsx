import profile from "../assets/profile.png";
import BlogCard from "../components/BlogCard";

import { useContext } from "react";
import { ModeContext } from "../main";

function Blogs() {
  const { mode } = useContext(ModeContext);
  

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6`}
    >
      <div className="font-bold text-[30px] ml-5">LEAVES</div>
      <div
        className="pb-3 flex space-x-7 mt-2 pl-5 pr-5 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
        <div className="flex flex-col items-center h-16 w-28">
          <img src={profile} alt="" className="h-16 w-16" />
          <div className="text-xs">Username</div>
        </div>
      </div>
      <div className="space-y-3 mt-3">
        <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />

        <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />

        <BlogCard heading="This is the introductory blog post and are going to build something unique what we are trying to build is so unique that it is unique" />
      </div>
    </div>
  );
}

export default Blogs;
