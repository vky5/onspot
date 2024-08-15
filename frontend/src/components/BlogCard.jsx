import PropTypes from "prop-types";
import profile from "../assets/profile.png";
import stripText from "../utils/textStrip";
import { IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ModeContext } from "../main";
import { vkyreq } from "../utils/vkyreq";

function BlogCard({ heading, user, id, like = 0, img, status, handleChange }) {
  const [likeState, setLike] = useState(like);
  const { mode } = useContext(ModeContext);
  const navigate = useNavigate();

  const updateLikeOfCard = async (e) => {
    e.stopPropagation();
    try {
      const res = await vkyreq("PATCH", `/posts/${id}/likes`);
      if (res.data.counter === 1) {
        setLike((curr) => curr + 1);
      } else {
        setLike((curr) => curr - 1);
      }
      handleChange((curr) => !curr);
    } catch (error) {
      console.log(error);
    }
  };

  const overlayStyle = {
    moderation: "bg-gray-500 bg-opacity-30",
    rejected: "bg-red-500 bg-opacity-30",
  }[status] || "";

  return (
    <div
      className={`relative duration-200 rounded-lg overflow-hidden shadow-md pl-3 pr-3 ml-2 mr-2 md:ml-10 md:mr-10 ${
        mode === "light" ? "bg-white" : "bg-secDark"
      }`}
    >
      {overlayStyle && (
        <div
          className={`absolute inset-0 ${overlayStyle} z-10 pointer-events-none`}
        ></div>
      )}
      <div
        className={`relative ${overlayStyle ? "bg-transparent" : ""} ${
          mode === "light" ? "text-black" : "text-white"
        }`}
        onClick={() => navigate(`/blogs/${id}`, { state: { id } })}
      >
        <div className="flex pt-4 pb-4 items-center">
          <div className="flex-shrink-0">
            <img
              src={
                img ||
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              }
              alt=""
              className="rounded-xl h-[107px] w-[105px]"
            />
          </div>
          <div className="text-[13px] lg:text-xl md:ml-5 ml-2 mr-2 text-left flex-grow">
            <p className="whitespace-normal break-words">
              {stripText(heading, 100)}
            </p>
            <div
              className={`flex items-center space-x-2 mt-2 md:w-3/4 w-full justify-between ${
                mode === "light" ? "text-gray-800" : "text-gray-300"
              }`}
            >
              <span className="flex items-center mr-3">
                <img
                  src={user.img || profile}
                  alt=""
                  className="h-6 w-6 rounded-full mr-1 lg:mr-2"
                />
                <span className="text-xs lg:text-lg">{user.username}</span>
              </span>
              <span className="flex items-center">
                <IoHeartSharp
                  className="h-6 w-6 lg:h-8 lg:w-8 text-primary lg:mr-2 sm:mr-1"
                  onClick={updateLikeOfCard}
                />
                <span className="text-xs lg:text-lg">{likeState}</span>
              </span>
            </div>
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
  img: PropTypes.string,
  status: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

export default BlogCard;
