import profile from "../../../src/assets/profile.png";
import { ModeContext } from "../../main";
import { useContext } from "react";
import PropTypes from "prop-types";

function SideComponent({tags}) {
  const { mode } = useContext(ModeContext);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="font-bold lg:text-2xl text-xl lg:mb-5 mb-3  mt-5 lg:mt-10">
        Recommended Topics
      </div>
      <div className="w-3/4 space-x-4 space-y-4">
      {tags.map((tag, index) => (
        <button
          key={index}
          className="bg-gray-500 lg:px-4 lg:py-2 px-3 py-1 rounded-3xl text-sm lg:text-lg"
        >
          {tag}
        </button>
      ))}
    </div>
      {/* <div className="mt-10 lg:mt-24 lg:mb-5 mb-3 lg:text-2xl text-xl">
        Popular Bloggers this week
      </div>
      <div className="space-y-4 lg:space-y-7 flex flex-col text-sm lg:text-xl">
        <div
          className={`${
            mode === "dark" ? "bg-gray-900" : "bg-gray-400"
          } flex items-center space-x-3 px-4 py-2 lg:px-6 lg:py-4 rounded-3xl`}
        >
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 lg:h-16 lg:w-16 rounded-full overflow-hidden">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-grow">Billy Butcher</div>
          <div>
            <button
              className={`border ${
                mode === "light" ? "border-black" : "border-white"
              } px-3 py-1 rounded-3xl lg:px-4 lg:py-2`}
            >
              Visit
            </button>
          </div>
        </div>

        <div
          className={`${
            mode === "dark" ? "bg-gray-900" : "bg-gray-400"
          } flex items-center space-x-3 px-4 py-2 lg:px-6 lg:py-4 rounded-3xl`}
        >
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 lg:h-16 lg:w-16 rounded-full overflow-hidden">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-grow">Billy Butcher</div>
          <div>
            <button
              className={`border ${
                mode === "light" ? "border-black" : "border-white"
              } px-3 py-1 rounded-3xl lg:px-4 lg:py-2`}
            >
              Visit
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

SideComponent.propTypes= {
  tags: PropTypes.array
}

export default SideComponent;
