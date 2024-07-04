import MyCarousel from "../components/HomeComponents/MyCarousel";
import BlogCard from "../components/BlogCard";

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
      const res = await vkyreq("get", "/posts");
      setBlogData(res.data.posts);
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
        mode === "light" ? "bg-gray-100 text-priDark" : "bg-priDark text-white"
      } duration-200 pb-6`}
    >
      <div className="">
        <div className="flex flex-col text-center pt-6">
          <div className="text-[10px] tracking-widest font-thin">BLACKTREE</div>
          <div className="font-bold text-xl mt-2">Unveiling Stories</div>
          <div className="font-bold text-xl">Branching Perspectives</div>
        </div>
      </div>
      <div className="pt-12">
        {/* {blogsInCarousel.map(blogInfo => (
          <MyCarousel 
            imgHome="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" 
            heading={blogInfo.heading} 
            key={blogInfo.id} 
          />
        ))} */}

        {loading ? (
          <h1>create a loading screen idiot</h1>
        ) : (
          <MyCarousel list={blogsInCarousel} />
        )}
      </div>

      <div className="pt-6">
        <ul
          className="flex px-4 list-none space-x-7 scrollbar overflow-auto text-xs font-medium"
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

      <div className="space-y-3 mt-3">
        {blogData.map((blogInfo) => (
          <BlogCard
            key={blogInfo.generatedId}
            id={blogInfo.generatedId}
            heading={blogInfo.heading}
            username={blogInfo.username}
            like={blogInfo.like}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
