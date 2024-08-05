import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function AboutMe({ mode, about, handleChange }) {
  const [activeTextarea, setActiveTextarea] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveTextarea(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
        <div className="text-center mt-3 text-xl md:text-2xl flex">
          <div className="flex items-center">
            <span>About me</span>
            {(!activeTextarea && (
              <FaPencilAlt
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setActiveTextarea(true)}
              />
            )) || (
              <FaTimes
                className="ml-2 text-sm cursor-pointer"
                onClick={() => setActiveTextarea(false)}
              />
            )}
          </div>
        </div>

        <div ref={containerRef} className="w-full">
          {!activeTextarea && (
            <div
              className={`${
                about === "" ? "text-gray-500 text-center" : "text-left"
              } ${
                mode === "light" ? "border-gray-800" : "border-gray-300"
              } border py-2 rounded mt-2 text-sm px-2 md:text-lg`}
            >
              {about === "" ? "Tell us about yourself" : about}
            </div>
          )}
          {activeTextarea && (
            <textarea
              name="about"
              id="about"
              className={`w-full p-2 rounded border ${
                mode === "light"
                  ? "bg-gray-100 text-black border-gray-800"
                  : "bg-priDark text-white  border-gray-300"
              } duration-200 text-sm md:text-lg mt-2 h-64`}
              value={about}
              onChange={(e) =>
                handleChange((prevState) => ({
                  ...prevState,
                  about: e.target.value,
                }))
              }
            />
          )}
        </div>
      </div>
  );
}

AboutMe.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  about: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AboutMe;
