import profile from "../assets/profile.png";
import BlogCard from "../components/BlogCard";

import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";

function Blogs() {
  const { mode } = useContext(ModeContext);

  const [writerList, setWriterList] = useState([]);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const getWriters = async () => {
      const res = await vkyreq("get", "/users");
      const res2 = await vkyreq("get", "/posts");
      setWriterList(res.data.writers);
      setBlogData(res2.data.data);
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
        className="pb-3 flex space-x-7 mt-2 pl-2 pr-5 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {writerList.map((writer) => (
          <div
            className="flex flex-col items-center w-28 space-y-2"
            key={writer.username}
          >
             <div className="w-14 h-14 rounded-full">
              <img
                src={writer.img || profile} // Use a default image if writer.img is not available
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="text-[12px]">{writer.username}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3 mt-3">
      {blogData.map((blogInfo) => (
          <BlogCard
            key={blogInfo.generatedId}
            id={blogInfo.generatedId}
            heading={blogInfo.heading}
            user={blogInfo.user}
            like={blogInfo.like}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
