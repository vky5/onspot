import BlogCard from "../components/BlogCard";
import { useContext, useEffect, useState } from "react";
import { ModeContext, UserContext } from "../main";
import { vkyreq } from "../utils/vkyreq";
import MainSection from "../components/Profile/MainSection";

function Profile() {
  const { mode } = useContext(ModeContext);
  const { userData } = useContext(UserContext);
  const [active, setActive] = useState(1);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [somethingChanged, setSomethingChanged] = useState(false);

  useEffect(() => {
    const callingBlogs = async () => {
      try {
        const resAll = await Promise.all([vkyreq("GET", "/users/likes"), vkyreq("GET", "/posts/myposts") ])
        setLikedBlogs(resAll[0].data.data.likedPosts);
        setPublishedBlogs(resAll[1].data.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    callingBlogs(); // Call the function inside useEffect
  }, [somethingChanged]);

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } duration-200 pb-6 min-h-screen`}
    >
      <MainSection userData={userData} isProfilePage={true} />
      {/* Grid layout for large screens */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:px-10 lg:mt-10 mt-5">
        <div className="flex flex-col items-center space-y-5 md:space-y-6">
          <h2
            className={`text-2xl font-bold ${
              mode === "light" ? "text-black" : "text-white"
            } text-center`}
          >
            Published
          </h2>
          <div className="space-y-5 md:space-y-6 w-full">
            {publishedBlogs.map((blogInfo) => (
              <BlogCard
                key={blogInfo._id}
                id={blogInfo._id}
                heading={blogInfo.heading}
                user={blogInfo.user}
                like={blogInfo.like}
                img={blogInfo.img}
                status={blogInfo.status}
                handleChange ={setSomethingChanged}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 md:space-y-6">
          <h2
            className={`text-2xl font-bold ${
              mode === "light" ? "text-black" : "text-white"
            } text-center`}
          >
            Liked
          </h2>
          <div className="space-y-5 md:space-y-6 w-full">
            {likedBlogs.map((blogInfo) => (
              <BlogCard
                key={blogInfo._id}
                id={blogInfo._id}
                heading={blogInfo.heading}
                user={blogInfo.user}
                like={blogInfo.like}
                img={blogInfo.img}
                status={blogInfo.status}
                handleChange ={setSomethingChanged}
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
              img={blogInfo.img}
              status={blogInfo.status}
              handleChange ={setSomethingChanged}
            />
          ))) ||
          likedBlogs.map((blogInfo) => (
            <BlogCard
              key={blogInfo._id}
              id={blogInfo._id}
              heading={blogInfo.heading}
              user={blogInfo.user}
              like={blogInfo.like}
              img={blogInfo.img}
              status={blogInfo.status}
              handleChange ={setSomethingChanged}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;
