import MainSection from "../components/Profile/MainSection";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { vkyreq } from "../utils/vkyreq";
import { ModeContext } from "../main";
import BlogCard from "../components/BlogCard";

function Users() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);

  const { mode } = useContext(ModeContext);

  useEffect(() => {
    const handleComponentMount = async () => {
      try {
        const res = await vkyreq("get", `/users/${id}`);
        const res2 = await vkyreq("get", `/posts/${id}/authors`);
        setBlogData(res2.data.data); // set blogData
        setUserData(res.data.data); // Set the fetched data to userData state
      } catch (error) {
        console.log(error);
      }
    };

    handleComponentMount(); // Call the function to fetch data
  }, [id]); // Add id as a dependency to refetch when it changes

  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100 text-black" : "bg-priDark text-white"
      } pb-6 duration-200 min-h-screen`}
    >
      <MainSection userData={userData} />

      {(blogData.length !== 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-3 md:mt-8 w-full">
          {blogData.map((blogInfo) => (
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
      )) || <div>No blogs/ project request published</div>}
    </div>
  );
}

export default Users;
