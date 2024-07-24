import profile from "../assets/profile.png";
import BlogCard from "../components/BlogCard";

import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import { Link } from "react-router-dom";


function Blogs() {
  const { mode } = useContext(ModeContext);

  const [writerList, setWriterList] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const getWriters = async () => {
      try {
        const res = await vkyreq("get", "/users");
        const res2 = await vkyreq("get", "/posts");
        setWriterList(res.data.writers);
        setBlogData(res2.data.data);
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
      } duration-200 pb-6`}
    >
      <div className="font-bold text-[30px] ml-5">LEAVES</div>
      <div
        className="pb-3 flex space-x-7 mt-2 pl-2 pr-5 md:pl-8 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {writerList.map((writer) => (
          <div
            className="flex flex-col items-center w-28 space-y-2"
            key={writer.username}
          >
            <Link to={`/users/${writer._id}`}>
              <div className="w-14 h-14 md:w-24 md:h-24 rounded-full">
                <img
                  src={writer.img || profile} // Use a default image if writer.img is not available
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="text-[12px] md:text-lg">{writer.username}</div>
            </Link>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-3 md:mt-8 w-full">
        {blogData.map((blogInfo) => (
          <div className="space-y-5 md:space-y-6" key={blogInfo._id}>
            <BlogCard
              id={blogInfo._id}
              heading={blogInfo.heading}
              user={blogInfo.user}
              like={blogInfo.like}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
