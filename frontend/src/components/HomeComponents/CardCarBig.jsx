import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import stripText from "../../utils/textStrip";

import { ModeContext } from "../../main";
import { useContext, useEffect, useState } from "react";

function CardCarBig({ img, heading, id, username }) {
  const navigate = useNavigate();

  const {mode} = useContext(ModeContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const handleCardClick = () => {
    navigate(`/blogs/${id}`, { state: { id } });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${mode==='light'?'text-black': 'text-white'} duration-200`}>
      <div className="ml-4 mr-4 lg:ml-10 lg:mr-10">
        <div className="flex">
          {img && (
            <div className="w-1/2">
              <img
                src={img}
                className="lg:h-96 md:h-64 w-full object-cover rounded-3xl" // Fixed height for the image container
                alt="Image failed to load."
              />
            </div>
          )}
          <div className={img ? "ml-10 text-left w-1/2" : "text-left w-full"}>
            <div className="lg:text-xl">
              by <span className="text-primary">{username}</span>
            </div>
            <div className="lg:text-3xl text-xl mt-6">{stripText(heading, windowWidth>768?275:90)}</div>
            <div className="mt-4">
              <button
                className="bg-primary text-white px-4 py-1 rounded-xl mt-10"
                onClick={handleCardClick}
              >
                Read Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardCarBig.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default CardCarBig;
