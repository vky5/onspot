import MyCarousel from "../components/HomeComponents/MyCarousel";
import BlogCard from "../components/BlogCard";
import SideComponent from "../components/HomeComponents/SideComponent";

import { useContext, useEffect, useState } from "react";

import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";

function Home() {
  const { mode } = useContext(ModeContext);

  const [blogData, setBlogData] = useState([]);
  const [blogsInCarousel, setBlogsInCarousel] = useState([]);

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await vkyreq("get", "/posts");
        setBlogData(res.data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    setBlogsInCarousel(blogData.slice(0, 5));
    setTimeout(() => setIsLoading(false), 100);
  }, [blogData]);

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-priDark " : "bg-priDark text-white"
      } duration-200 pb-6`}
    >
      <div className="md:hidden">
        <div className="flex flex-col text-center pt-6">
          <div className="text-[10px] tracking-widest font-thin">BLACKTREE</div>
          <div className="font-bold text-xl mt-2">Unveiling Stories</div>
          <div className="font-bold text-xl">Branching Perspectives</div>
        </div>
      </div>
      <div className="pt-12">
        {loading ? (
          <h1>create a loading screen idiot</h1>
        ) : (
          <MyCarousel list={blogsInCarousel} />
        )}
      </div>

      <div className="pt-6">
        <ul
          className="flex sm:hidden px-4 list-none space-x-7 scrollbar overflow-auto text-xs font-medium"
          style={{ scrollbarWidth: "none" }}
        >
          <li>Latest</li>
          <li>Trending</li>
          <li>Blockchain</li>
          <li>AI</li>
          <li>Networking</li>
          <li>Cyber Security</li>
          <li>System Design</li>
        </ul>
      </div>

      <div className="sm:flex">
        <div className="sm:w-1/2">
          <div className="space-y-3 md:space-y-6 mt-3">
            {blogData.map((blogInfo) => (
              <BlogCard
                key={blogInfo._id}
                id={blogInfo._id}
                heading={blogInfo.heading}
                user={blogInfo.user}
                like={blogInfo.like}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 sm:block hidden">
          <SideComponent/>
        </div>
      </div>
    </div>
  );
}

export default Home;
