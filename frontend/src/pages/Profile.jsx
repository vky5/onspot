import BlogCard from "../components/BlogCard";
import profile from "../assets/profile.png";
import { useContext, useEffect, useState } from "react";
import { ModeContext, UserContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import { HiCog } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function Profile() {
  const { mode } = useContext(ModeContext);
  const { userData } = useContext(UserContext);
  const [active, setActive] = useState(1);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  useEffect(() => {
    const callingBlogs = async () => {
      try {
        const res = await vkyreq("GET", "/users/likes");
        setLikedBlogs(res.data.data.likedPosts);

        const res2 = await vkyreq("GET", "/posts/myposts");
        setPublishedBlogs(res2.data.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
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
      <div className="flex flex-col items-center pt-5 md:ml-10 md:mr-10 w-full ">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-10 mb-4">
          <div className="w-14 h-14 md:h-16 md:w-16 lg:h-32 lg:w-32 rounded-full">
            <img
              src={userData.img || profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-start space-y-1 md:space-y-2 text-center lg:text-left">
            <div
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-base md:text-xl lg:text-2xl`}
            >
              {userData.username}
            </div>
            <div
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-sm md:text-lg lg:text-xl`}
            >
              {userData.name}
            </div>
            <div
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-sm md:text-lg lg:text-xl`}
            >
              {userData.email}
            </div>
            <div className="flex space-x-4 lg:space-x-8 mt-10">
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-500 text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-700 text-2xl" />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-800 text-2xl" />
              </a>
            </div>
          </div>
          <div className="ml-4">
            <HiCog
              className={`text-2xl md:text-3xl lg:text-4xl cursor-pointer ${
                mode === "light" ? "text-black" : "text-white"
              }`}
              onClick={() => console.log("Open settings")}
            />
          </div>
        </div>
      </div>

      {/* Grid layout for large screens */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:px-10 lg:mt-10">
        <div className="flex flex-col items-center space-y-5 md:space-y-6">
          <h2 className={`text-2xl font-bold ${mode === "light" ? "text-black" : "text-white"} text-center`}>
            Published
          </h2>
          <div className="space-y-5 md:space-y-6">
            {publishedBlogs.map((blogInfo) => (
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

        <div className="flex flex-col items-center space-y-5 md:space-y-6">
          <h2 className={`text-2xl font-bold ${mode === "light" ? "text-black" : "text-white"} text-center`}>
            Liked
          </h2>
          <div className="space-y-5 md:space-y-6">
            {likedBlogs.map((blogInfo) => (
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
      </div>

      {/* Tabbed layout for other screen sizes */}
      <div className="flex justify-evenly ml-5 mr-5 mt-10 lg:hidden">
        <div
          className={`text-base w-24 rounded-xl font-bold flex justify-center items-center p-2 
    ${active ? "bg-primary text-gray-100" : "text-gray-800"}
    ${mode === "light" ? "lg:text-black" : "lg:text-white"}
    lg:bg-transparent lg:text-xl lg:font-semibold lg:cursor-default lg:pointer-events-none`}
          onClick={() => setActive(1)}
          style={{
            transition: "background-color 0.3s, color 0.3s",
            cursor: "pointer",
          }}
        >
          Published
        </div>

        <div
          className={`text-base w-24 rounded-xl font-bold flex justify-center items-center p-2 
    ${!active ? "bg-primary text-gray-100" : "text-gray-800"}
    ${mode === "light" ? "lg:text-black" : "lg:text-white"}
    lg:bg-transparent lg:text-xl lg:font-semibold lg:cursor-default lg:pointer-events-none`}
          onClick={() => setActive(0)}
          style={{
            transition: "background-color 0.3s, color 0.3s",
            cursor: "pointer",
          }}
        >
          Liked
        </div>
      </div>

      {/* Display blogs based on active tab */}
      <div className="space-y-5 md:space-y-6 mt-6 lg:hidden">
        {(active &&
          publishedBlogs.map((blogInfo) => (
            <BlogCard
              key={blogInfo._id}
              id={blogInfo._id}
              heading={blogInfo.heading}
              user={blogInfo.user}
              like={blogInfo.like}
            />
          ))) ||
          likedBlogs.map((blogInfo) => (
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
