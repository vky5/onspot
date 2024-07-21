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

  useEffect(() => {
    const callingBlogs = async () => {
      try {
  
      if (!active) {
        const res = await vkyreq('GET', '/users/likes');
        setBlogData(res.data.data.likedPosts);
      } else {
        const res = await vkyreq('GET', '/posts/myposts');
        setBlogData(res.data.data);
      }
  
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
  
    callingBlogs(); // Call the function inside useEffect
  
  }, [active]);
  
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
      style={{
        transition: "background-color 0.3s, color 0.3s",
      }}
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
          className={`text-base w-24 rounded-xl font-bold flex justify-center items-center p-2 
            ${active ? "bg-primary text-gray-100" : "text-gray-800"}`}
          onClick={() => setActive(1)}
          style={{
            transition: "background-color 0.3s, color 0.3s",
            cursor: "pointer",
          }}
        >
          Published
        </div>
          <div
            className={`font-bold text-base w-24 rounded-xl flex justify-center items-center ${
              !active ? "bg-primary text-gray-100" : "text-gray-800"
            }`}
            onClick={() => setActive(0)}
            style={{
              transition: "background-color 0.3s, color 0.3s",
              cursor: "pointer",
            }}
          >
            Liked
          </div>
      </div>

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
  );
}

export default Profile;
