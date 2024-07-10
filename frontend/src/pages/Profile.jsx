import BlogCard from "../components/BlogCard";
import profile from "../assets/profile.png";
import { useContext, useEffect, useState } from "react";
import { ModeContext, UserContext } from "../main";
import { vkyreq } from "../utils/vkyreq";

function Profile() {
  const { mode } = useContext(ModeContext);
  const { userData } = useContext(UserContext);
  const [active, setActive] = useState(1);

  const [blogData, setBlogData] = useState([]);

  useEffect(()=>{
    const callingBlogs = async ()=>{
      const res = await vkyreq('')
    }
    callingBlogs
  }, [active])

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6`}
    >
      <div className="flex items-center p-5">
        <div className="w-14 h-14 rounded-full">
          <img
            src={userData.img || profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4">
          <div className={`${mode === "light" ? "text-black" : "text-white"}`}>
            {userData.username}
          </div>
          <div className={`${mode === "light" ? "text-black" : "text-white"}`}>
            {userData.name}
          </div>
          <div className={`${mode === "light" ? "text-black" : "text-white"}`}>
            {userData.email}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly ml-5 mr-5">
        <div
          className={`font-bold text-lg w-1/2 rounded-xl flex justify-center items-center ${
            !active ? "bg-primary text-gray-100" : "text-gray-800"
          }`}
        >
          Liked
        </div>
        <div
          className={`text-lg w-1/2 rounded-xl font-bold flex justify-center items-center p-2 
         ${active ? "bg-primary text-gray-100" : "text-gray-800"}`}
        >
          Published
        </div>
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

export default Profile;
