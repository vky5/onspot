import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import stripText from "../utils/textStrip";
import { IoHeartSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";

function BlogCard({ heading, user, id, like = 0, img }) {
  const { mode } = useContext(ModeContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [usePrimary, setUsePrimary] = useState(false);

  useEffect(() => {
    const checkLocation = () => {
      if (location.pathname === "/liked") {
        setUsePrimary(true);
      }

      console.log(img)
    };
    checkLocation();
  }, [location.pathname]);

  return (
    <div
      className={`duration-200 rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2 md:ml-10 md:mr-10
        ${
          usePrimary
            ? "bg-primary"
            : mode === "light"
            ? "bg-white"
            : "bg-secDark"
        }
       ${mode === "light" ? "text-black" : "text-white"}`}
      onClick={() => {
        navigate(`/blogs/${id}`, { state: { id } });
      }}
    >
      <div className="flex pt-4 pb-4 items-center">
        <div className="flex-shrink-0">
          <img
            src={img || "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"}
            alt=""
            className="rounded-xl h-[107px] w-[105px]"
          />
        </div>
        <div className="text-[13px] lg:text-xl md:ml-5 ml-2 mr-2 text-left flex-grow">
          <p className="whitespace-normal break-words">
            {stripText(heading, 100)}
          </p>
          <div
            className={`flex items-center space-x-2 mt-2 duration-200 md:w-3/4 w-full justify-between ${
              mode === "light" ? "text-gray-800" : "text-gray-300"
            } `}
          >
            <span className="flex items-center mr-3">
              <img
                src={user.img || profile}
                alt=""
                className="h-6 w-6 rounded-full lg:mr-2 sm:mr-1"
              />
              <span className="text-xs lg:text-lg ">{user.username}</span>
            </span>
            <span className="flex items-center ">
              <IoHeartSharp className="h-6 w-6 lg:h-8 lg:w-8 rounded-full text-primary lg:mr-2 sm:mr-1" />
              <span className="text-xs lg:text-lg">{like}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  heading: PropTypes.string.isRequired,
  user: PropTypes.shape({
    img: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  like: PropTypes.number,
  img: PropTypes.string
};

export default BlogCard;
