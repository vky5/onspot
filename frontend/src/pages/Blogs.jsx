import profile from "../assets/profile.png";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../loading/BlogCard/BlogCardSkeleton";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../main";
import { Skeleton } from "@mui/material";
import  {useTheme} from "@mui/material";
import UsersList from "../loading/UsersList";

function Blogs() {
  const { mode } = useContext(ModeContext);
  const { isLoggedin } = useContext(LoggedInContext);
  const [isLoading, setIsLoading] = useState(true);
  const [writerList, setWriterList] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getWriters = async () => {
      try {
        const resAll = await Promise.all([
          vkyreq("get", "/users"),
          vkyreq("get", "/posts"),
        ]);
        setWriterList(resAll[0].data.writers);
        setBlogData(resAll[1].data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getWriters();
  }, []);

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
    >
      <div className="font-bold text-[30px] ml-5">LEAVES</div>
      <div
        className="pb-3 flex space-x-7 mt-2 pl-2 pr-5 md:pl-8 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading ? (
           <div className="flex justify-center gap-4">
           {Array.from({ length: 100 }).map((_, index) => (
             <UsersList key={index} />
           ))}
         </div>
        ) : (
          writerList.map((writer) => (
            <div
              className="flex flex-col items-center w-28 space-y-2"
              key={writer.username}
            >
              <Link to={isLoggedin ? `/users/${writer._id}` : "/login"}>
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full">
                  <img
                    src={writer.img || profile} // Use a default image if writer.img is not available
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-[12px] text-center mt-2 md:text-lg">
                  {writer.username}
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-3 md:mt-8 w-full">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : blogData.map((blogInfo) => (
              <div className="space-y-5 md:space-y-6" key={blogInfo._id}>
                <BlogCard
                  id={blogInfo._id}
                  heading={blogInfo.heading}
                  user={blogInfo.user}
                  like={blogInfo.like}
                  img={blogInfo.img}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Blogs;
