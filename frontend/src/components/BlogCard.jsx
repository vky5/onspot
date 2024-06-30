import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import stripText from "../utils/textStrip";
import time from "../assets/time.png";

import { useLocation, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../main";

function BlogCard({ heading, username = "username", id}) {
  const { mode } = useContext(ModeContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [usePrimary, setUsePrimary] = useState(false);

  useEffect(() => {
    const checkLocation = () => {
      if (location.pathname === "/liked") { //TODO update this condition to show primary color as background for every liked card and not just in /liked route
        setUsePrimary(true); 
      }
    };
    checkLocation();
  }, []);

  return (
    <div
      className={`duration-200 rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2 
        ${ 
          // this is to check if we need to use display primary color or light / dark mode
          usePrimary
            ? "bg-primary"
            : mode === "light"
            ? "bg-white "
            : "bg-secDark"
        }
       ${
         // this is to change the color of the text according to light or dark mode.
         mode === "light" ? "text-black" : "text-white"
       }`}

       // this is to open a blog with particular id. We are going to gather the data of blogs like id and headings from an endpoijnt and more details like content from the particular id in the page that they have asked that for 
       onClick={()=>{
         navigate(`/blogs/${id}`, {state: {id}}) // thie passed object must be named 'state' any other type wont work.
       }}
    >
      <div className={` flex pt-4 pb-4 items-center`}>
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            className="rounded-xl h-[107px] w-[105px]"
          />
        </div>
        <div className="text-[13px] ml-2 mr-2 text-left flex-grow">
          <p className="whitespace-normal break-words">
            {stripText(heading, 100)}
          </p>
          <div
            className={`flex items-center space-x-2 mt-2 duration-200 ${
              mode === "light" ? "text-gray-800" : "text-gray-300"
            }`}
          >
            <img src={profile} alt="" className="h-6 w-6 rounded-full" />
            <span className="text-xs">{username}</span>
            <img src={time} alt="" className="h-6 w-6 rounded-full" />
            <span className="text-xs">43 mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  heading: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default BlogCard;
