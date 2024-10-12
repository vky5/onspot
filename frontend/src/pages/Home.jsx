import MyCarousel from "../components/HomeComponents/MyCarousel";
import BlogCard from "../components/BlogCard";
import SideComponent from "../components/HomeComponents/SideComponent";
import BlogCardSkeleton from "../loading/BlogCard/BlogCardSkeleton";
import { Skeleton } from "@mui/material";

import { useContext, useEffect, useState } from "react";

import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import SideComponentSkeleton from "../loading/SideComponentSkeleton";

function Home() {
  const { mode } = useContext(ModeContext);

  const [blogData, setBlogData] = useState([]);
  const [blogsInCarousel, setBlogsInCarousel] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const resAll = await Promise.all([
          vkyreq("get", "/posts"),
          vkyreq("get", "/posts/tags/gettags"),
        ]);
        setBlogData(resAll[0].data.data);
        setTags(resAll[1].data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    if (blogData.length > 0) {
      setBlogsInCarousel(blogData.slice(0, 5));
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [blogData]);

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-priDark " : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
    >
      <div className="md:hidden">
        <div className="flex flex-col text-center pt-6">
          <div className="text-[10px] tracking-widest font-thin">OnSpot</div>
          <div className="font-bold text-xl mt-2">Unveiling Stories</div>
          <div className="font-bold text-xl">Branching Perspectives</div>
        </div>
      </div>
      <div className="pt-12">
        <MyCarousel list={blogsInCarousel} loading={loading} />
      </div>

      <div className="pt-6">
        {loading ? (
          <ul
            className="flex sm:hidden px-4 list-none space-x-7 scrollbar overflow-auto text-xs font-medium"
            style={{ scrollbarWidth: "none" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className={`w-24 h-8 rounded-full ${
                  mode === "light" ? "bg-gray-200" : "bg-gray-800"
                } flex items-center justify-center duration-200`}
              >
                <Skeleton
                  variant="text"
                  className="w-full h-full"
                  style={{ backgroundColor: "transparent" }} // Ensure background color of skeleton is transparent
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className="flex sm:hidden px-4 list-none space-x-7 scrollbar overflow-auto text-xs font-medium"
            style={{ scrollbarWidth: "none" }}
          >
            {tags.map((ele) => (
              <li
                key={ele}
                className={`text-xs font-medium ${
                  mode === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {ele}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sm:flex">
        <div className="lg:w-1/2">
          <div className="space-y-3 md:space-y-6 lg:space-y-8 mt-3">
            {loading
              ? // Rendering 5 BlogCardSkeleton components while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))
              : // Rendering BlogCard components when data is available
                blogData.map((blogInfo) => (
                  <BlogCard
                    key={blogInfo._id}
                    id={blogInfo._id}
                    heading={blogInfo.heading}
                    user={blogInfo.user}
                    like={blogInfo.like}
                    img={blogInfo.img}
                  />
                ))}
          </div>
        </div>
        <div className="w-1/2 lg:block hidden">
          {loading ? <SideComponentSkeleton /> : <SideComponent tags={tags} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
