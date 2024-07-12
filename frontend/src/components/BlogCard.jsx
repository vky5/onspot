import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import stripText from "../utils/textStrip";
import { IoHeartSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";

function BlogCard({ heading, user, id, like = 0 }) {
  const { mode } = useContext(ModeContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [usePrimary, setUsePrimary] = useState(false);

  useEffect(() => {
    const checkLocation = () => {
      if (location.pathname === "/liked") {
        setUsePrimary(true);
      }
    };
    checkLocation();
  }, [location.pathname]);

  return (
    <div
      className={`duration-200 rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2 
        ${usePrimary ? "bg-primary" : mode === "light" ? "bg-white" : "bg-secDark"}
       ${mode === "light" ? "text-black" : "text-white"}`}
      onClick={() => {
        navigate(`/blogs/${id}`, { state: { id } });
      }}
    >
      <div className="flex pt-4 pb-4 items-center">
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt=""
            className="rounded-xl h-[107px] w-[105px]"
          />
        </div>
        <div className="text-[13px] ml-2 mr-2 text-left flex-grow">
          <p className="whitespace-normal break-words">
            {stripText(heading, 100)}
          </p>
          <div className={`flex items-center space-x-2 mt-2 duration-200 ${mode === "light" ? "text-gray-800" : "text-gray-300"}`}>
            <img src={user.img || profile} alt="" className="h-6 w-6 rounded-full" />
            <span className="text-xs">{user.username}</span>
            <IoHeartSharp className="h-6 w-6 rounded-full text-primary" />
            <span className="text-xs">{like}</span>
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
};

export default BlogCard;
